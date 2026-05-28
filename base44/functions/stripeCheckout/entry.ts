import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const PRICE_MAP = {
  Essencial: 'price_1TbtAeQ4ZkqYsPClcqc1WKPJ',
  Profissional: 'price_1TbtAeQ4ZkqYsPCllASE9I4a',
  Premium: 'price_1TbtAeQ4ZkqYsPClhgg1UgG5',
};

Deno.serve(async (req) => {
  try {
    const { plan, client_name, client_email, success_url, cancel_url } = await req.json();

    if (!plan || !PRICE_MAP[plan]) {
      return Response.json({ error: 'Plano inválido' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: PRICE_MAP[plan], quantity: 1 }],
      customer_email: client_email || undefined,
      success_url: success_url || 'https://app.base44.com',
      cancel_url: cancel_url || 'https://app.base44.com',
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        plan,
        client_name: client_name || '',
        client_email: client_email || '',
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});