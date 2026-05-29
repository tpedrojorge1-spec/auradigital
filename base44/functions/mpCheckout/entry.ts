import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PLAN_PRICES = {
  Essencial: 900,
  Profissional: 1300,
  Premium: 1800,
};

Deno.serve(async (req) => {
  try {
    const { plan, client_name, client_email, success_url, cancel_url } = await req.json();

    if (!plan || !PLAN_PRICES[plan]) {
      return Response.json({ error: 'Plano inválido' }, { status: 400 });
    }

    const accessToken = Deno.env.get('MP_ACCESS_TOKEN');
    if (!accessToken) {
      return Response.json({ error: 'MP_ACCESS_TOKEN não configurado' }, { status: 500 });
    }

    const preference = {
      items: [
        {
          title: `Plano ${plan} — Aureon Digital`,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: PLAN_PRICES[plan],
        },
      ],
      payer: {
        name: client_name || '',
        email: client_email || '',
      },
      back_urls: {
        success: success_url || 'https://aureon.digital/meus-pedidos',
        failure: cancel_url || 'https://aureon.digital',
        pending: success_url || 'https://aureon.digital/meus-pedidos',
      },
      auto_return: 'approved',
      external_reference: JSON.stringify({
        plan,
        client_name: client_name || '',
        client_email: client_email || '',
      }),
      statement_descriptor: 'AUREON DIGITAL',
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MP API error:', JSON.stringify(data));
      return Response.json({ error: data.message || 'Erro ao criar preferência' }, { status: 500 });
    }

    return Response.json({ url: data.init_point });
  } catch (error) {
    console.error('mpCheckout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});