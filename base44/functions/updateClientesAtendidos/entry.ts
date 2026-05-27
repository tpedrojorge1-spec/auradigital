import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PAID_STATUSES = ["pagamento_confirmado", "pago", "em_desenvolvimento", "revisao", "concluido"];
const STAT_KEY = "clientes_atendidos";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const payload = await req.json().catch(() => ({}));
    const { event, data, old_data } = payload;

    const newStatus = data?.status;
    const oldStatus = old_data?.status;

    const wasAlreadyPaid = PAID_STATUSES.includes(oldStatus);
    const isNowPaid = PAID_STATUSES.includes(newStatus);
    const isNowCancelled = newStatus === "cancelado";

    let delta = 0;

    if (event?.type === "create") {
      // Novo pedido já criado como pago (raro, mas possível)
      if (isNowPaid) delta = 1;
    } else if (event?.type === "update") {
      if (!wasAlreadyPaid && isNowPaid) {
        // Pagamento confirmado pela primeira vez
        delta = 1;
      } else if (wasAlreadyPaid && isNowCancelled) {
        // Pedido pago foi cancelado — reduz contador
        delta = -1;
      }
    }

    if (delta === 0) {
      return Response.json({ ok: true, message: "Nenhuma alteração no contador" });
    }

    // Busca registro atual de stats
    const stats = await base44.asServiceRole.entities.Stats.filter({ key: STAT_KEY });

    if (stats.length === 0) {
      // Cria do zero
      await base44.asServiceRole.entities.Stats.create({ key: STAT_KEY, value: Math.max(0, delta) });
    } else {
      const current = stats[0];
      const newValue = Math.max(0, (current.value || 0) + delta);
      await base44.asServiceRole.entities.Stats.update(current.id, { value: newValue });
    }

    return Response.json({ ok: true, delta, message: `Contador atualizado em ${delta}` });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});