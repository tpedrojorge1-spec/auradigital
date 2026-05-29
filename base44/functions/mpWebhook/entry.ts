import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  console.log('MP Webhook method:', req.method);

  // HEAD: só valida que a URL existe
  if (req.method === 'HEAD') {
    return new Response(null, { status: 200 });
  }

  try {
    const accessToken = Deno.env.get('MP_ACCESS_TOKEN');

    // Lê query params (IPN envia GET com ?topic=payment&id=xxx)
    const url = new URL(req.url);
    const queryId = url.searchParams.get('id');
    const queryTopic = url.searchParams.get('topic') || url.searchParams.get('type');

    // Lê body (Webhook envia POST com JSON)
    let body = {};
    if (req.method === 'POST') {
      const contentType = req.headers.get('content-type') || '';
      const rawText = await req.text();
      console.log('MP raw body:', rawText, '| Content-Type:', contentType);
      if (contentType.includes('application/json')) {
        try { body = JSON.parse(rawText); } catch { body = {}; }
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        body = Object.fromEntries(new URLSearchParams(rawText).entries());
      } else {
        try { body = JSON.parse(rawText); } catch { body = {}; }
      }
    }

    console.log('MP body:', JSON.stringify(body), '| query topic:', queryTopic, '| query id:', queryId);

    const notificationType = body.type || queryTopic;
    const paymentId = body.data?.id || body.id || queryId;

    console.log('Type:', notificationType, '| PaymentId:', paymentId);

    // Aceita "payment" ou "merchant_order" com topic "payment"
    if (notificationType !== 'payment' && queryTopic !== 'payment') {
      return Response.json({ ok: true });
    }

    if (!paymentId) {
      return Response.json({ ok: true });
    }

    // Busca detalhes do pagamento na API do MP
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const payment = await mpRes.json();
    console.log('MP Payment status:', payment.status);

    if (payment.status !== 'approved') {
      return Response.json({ ok: true });
    }

    // Extrai dados do external_reference
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

    const base44 = createClientFromRequest(req);

    // Verifica duplicata
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
      stripe_session_id: String(paymentId),
      notes: `Pago via Mercado Pago. ID: ${paymentId}`,
    });

    console.log('Order created:', order.id);

    // Envia e-mail de confirmação
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