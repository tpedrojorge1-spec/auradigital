import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const PLAN_PRICES = {
  Essencial: 900,
  Profissional: 1300,
  Premium: 1800,
};

Deno.serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log('Stripe event received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Só processa se o pagamento foi confirmado
    if (session.payment_status !== 'paid') {
      console.log('Payment not yet paid, skipping.');
      return Response.json({ received: true });
    }

    const plan = session.metadata?.plan;
    const client_name = session.metadata?.client_name || '';
    const client_email = session.metadata?.client_email || session.customer_email || '';
    const plan_price = PLAN_PRICES[plan] || 0;

    console.log(`Processing paid order: ${plan} for ${client_email}`);

    const base44 = createClientFromRequest(req);

    // Verifica se já existe um pedido com esse session_id para evitar duplicatas
    const existing = await base44.asServiceRole.entities.Order.filter({
      stripe_session_id: session.id
    });

    if (existing && existing.length > 0) {
      console.log('Order already exists for session:', session.id);
      return Response.json({ received: true });
    }

    // Cria o pedido com status pagamento_confirmado
    const order = await base44.asServiceRole.entities.Order.create({
      client_name,
      client_email,
      plan,
      plan_price,
      payment_method: 'cartao',
      status: 'pagamento_confirmado',
      stripe_session_id: session.id,
      notes: `Pagamento via cartão confirmado pelo Stripe. Session: ${session.id}`,
    });

    console.log('Order created:', order.id);

    // Envia e-mail de confirmação para o cliente
    if (client_email) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          from_name: 'Aureon Digital',
          to: client_email,
          subject: `✅ Pagamento Confirmado — Plano ${plan} | Aureon Digital`,
          body: `Olá, ${client_name}!\n\nSeu pagamento do Plano ${plan} foi confirmado com sucesso! 🎉\n\nValor: R$ ${plan_price.toLocaleString('pt-BR')}\nForma de pagamento: Cartão de Crédito\n\nJá iniciamos o seu projeto e entraremos em contato em breve para dar início ao desenvolvimento.\n\nAcompanhe o status do seu pedido em:\nhttps://aureondigitalofc.com.br/meus-pedidos\n\nQualquer dúvida, fale conosco:\nWhatsApp: (99) 98493-0092\nInstagram: @aureon.digital_ofc\n\nObrigado por escolher a Aureon Digital!\n\n— Equipe Aureon Digital`,
        });
        console.log('Confirmation email sent to:', client_email);
      } catch (emailErr) {
        console.error('Failed to send confirmation email:', emailErr.message);
      }
    }
  }

  return Response.json({ received: true });
});