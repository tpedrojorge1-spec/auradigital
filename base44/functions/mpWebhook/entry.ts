import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const accessToken = Deno.env.get('MP_ACCESS_TOKEN');

    // MP envia notificação via POST
    const body = await req.json();
    console.log('MP Webhook received:', JSON.stringify(body));

    // Só processa pagamentos aprovados
    if (body.type !== 'payment') {
      return Response.json({ ok: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return Response.json({ ok: true });
    }

    // Busca detalhes do pagamento na API do MP
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const payment = await mpRes.json();
    console.log('MP Payment:', JSON.stringify(payment));

    if (payment.status !== 'approved') {
      console.log('Payment not approved, status:', payment.status);
      return Response.json({ ok: true });
    }

    // Extrai dados do external_reference (enviado no checkout)
    let planData = {};
    try {
      planData = JSON.parse(payment.external_reference || '{}');
    } catch {
      planData = {};
    }

    const plan = planData.plan || 'Essencial';
    const client_name = planData.client_name || payment.payer?.first_name || '';
    const client_email = planData.client_email || payment.payer?.email || '';
    const plan_price = payment.transaction_amount || 0;

    // Cria SDK com service role para criar o pedido
    const base44 = createClientFromRequest(req);

    // Verifica se já existe pedido com este payment_id (evita duplicatas)
    const existing = await base44.asServiceRole.entities.Order.filter({
      stripe_session_id: String(paymentId),
    });

    if (existing && existing.length > 0) {
      console.log('Order already exists for payment:', paymentId);
      return Response.json({ ok: true });
    }

    // Cria o pedido
    const order = await base44.asServiceRole.entities.Order.create({
      client_name,
      client_email,
      plan,
      plan_price,
      payment_method: 'cartao',
      status: 'pagamento_confirmado',
      stripe_session_id: String(paymentId), // reuso do campo para armazenar MP payment ID
      notes: `Pago via Mercado Pago. ID: ${paymentId}`,
    });

    console.log('Order created:', order.id);

    // Envia e-mail de confirmação ao cliente
    if (client_email) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        from_name: 'Aureon Digital',
        to: client_email,
        subject: `✅ Pagamento Confirmado — Plano ${plan} | Aureon Digital`,
        body: `Olá, ${client_name}!\n\nSeu pagamento foi confirmado com sucesso! 🎉\n\nDetalhes do pedido:\n• Plano: ${plan}\n• Valor: R$ ${plan_price.toLocaleString('pt-BR')}\n• Forma: Cartão via Mercado Pago\n• ID do pagamento: ${paymentId}\n\nJá iniciamos o processo de desenvolvimento do seu projeto. Em breve entraremos em contato.\n\nAcompanhe seu pedido em: https://aureon.digital/meus-pedidos\n\nQualquer dúvida:\nWhatsApp: (99) 98493-0092\nInstagram: @aureon.digital_ofc\n\nObrigado por confiar na Aureon Digital!\n\n— Equipe Aureon Digital`,
      });
    }

    return Response.json({ ok: true, order_id: order.id });
  } catch (error) {
    console.error('mpWebhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});