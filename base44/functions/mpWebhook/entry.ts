import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  console.log('MP Webhook recebido | method:', req.method);

  if (req.method === 'HEAD' || req.method === 'GET') {
    return new Response(null, { status: 200 });
  }

  try {
    const accessToken = Deno.env.get('MP_ACCESS_TOKEN');
    if (!accessToken) {
      console.error('MP_ACCESS_TOKEN não configurado');
      return Response.json({ error: 'MP_ACCESS_TOKEN não configurado' }, { status: 500 });
    }

    const url = new URL(req.url);
    const queryId = url.searchParams.get('id');
    const queryTopic = url.searchParams.get('topic') || url.searchParams.get('type');

    let body = {};
    const rawText = await req.text();
    console.log('Raw body:', rawText);
    console.log('Query topic:', queryTopic, '| Query id:', queryId);

    if (rawText) {
      const contentType = req.headers.get('content-type') || '';
      if (contentType.includes('application/x-www-form-urlencoded')) {
        body = Object.fromEntries(new URLSearchParams(rawText).entries());
      } else {
        try { body = JSON.parse(rawText); } catch { body = {}; }
      }
    }

    const notificationType = body.type || body.action || queryTopic;
    const paymentId = body.data?.id || body.id || queryId;

    console.log('Notification type:', notificationType, '| Payment ID:', paymentId);

    // Aceita notificações de pagamento
    if (notificationType !== 'payment' && queryTopic !== 'payment' && !String(notificationType || '').includes('payment')) {
      console.log('Tipo ignorado:', notificationType);
      return Response.json({ ok: true });
    }

    if (!paymentId) {
      console.log('Sem paymentId, ignorando');
      return Response.json({ ok: true });
    }

    // Busca detalhes do pagamento na API do MP
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const payment = await mpRes.json();
    console.log('Payment status:', payment.status, '| amount:', payment.transaction_amount);

    if (payment.status !== 'approved') {
      console.log('Pagamento não aprovado, status:', payment.status);
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
    const plan_price = planData.plan_price || payment.transaction_amount || 0;

    console.log('Dados do pedido - plan:', plan, '| email:', client_email, '| valor:', plan_price);

    const base44 = createClientFromRequest(req);

    // Verifica duplicata pelo paymentId
    const existing = await base44.asServiceRole.entities.Order.filter({
      stripe_session_id: String(paymentId),
    });

    if (existing && existing.length > 0) {
      console.log('Pedido já existe para payment:', paymentId);
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
      notes: `Pago via Mercado Pago (Produção). ID: ${paymentId}`,
    });

    console.log('Pedido criado com sucesso! ID:', order.id);

    // Envia e-mail de confirmação ao cliente
    if (client_email) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        from_name: 'Aureon Digital',
        to: client_email,
        subject: `✅ Pagamento Confirmado — Plano ${plan} | Aureon Digital`,
        body: `Olá, ${client_name}!\n\nSeu pagamento foi confirmado com sucesso! 🎉\n\nDetalhes do pedido:\n• Plano: ${plan}\n• Valor: R$ ${Number(plan_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n• Forma: Cartão via Mercado Pago\n• ID do pagamento: ${paymentId}\n\nJá iniciamos o processo de desenvolvimento do seu projeto. Em breve entraremos em contato.\n\nAcompanhe seu pedido em: https://aureon.digital/meus-pedidos\n\nQualquer dúvida:\nWhatsApp: (99) 98493-0092\nInstagram: @aureon.digital_ofc\n\nObrigado por confiar na Aureon Digital!\n\n— Equipe Aureon Digital`,
      });
      console.log('E-mail de confirmação enviado para:', client_email);
    }

    return Response.json({ ok: true, order_id: order.id });

  } catch (error) {
    console.error('mpWebhook error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});