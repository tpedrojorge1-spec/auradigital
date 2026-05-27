import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Search, ChevronDown, ChevronUp, Clock, CheckCircle2, Hammer, Eye, XCircle, CreditCard, ArrowLeft, AlertCircle } from "lucide-react";
import PurpleRaysBackground from "../components/PurpleRaysBackground";
import Navbar from "../components/Navbar";

const STATUS_CONFIG = {
  aguardando_pagamento: {
    label: "Aguardando Pagamento",
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/30",
    dot: "bg-yellow-400",
  },
  pagamento_confirmado: {
    label: "Pagamento Confirmado",
    icon: CreditCard,
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/30",
    dot: "bg-sky-400",
  },
  em_desenvolvimento: {
    label: "Em Desenvolvimento",
    icon: Hammer,
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
    dot: "bg-purple-400",
  },
  revisao: {
    label: "Revisão",
    icon: Eye,
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/30",
    dot: "bg-orange-400",
  },
  concluido: {
    label: "Concluído",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/30",
    dot: "bg-green-400",
  },
  cancelado: {
    label: "Cancelado",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    dot: "bg-red-400",
  },
  // fallback para pedidos antigos com status legado
  pendente: {
    label: "Aguardando Pagamento",
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/30",
    dot: "bg-yellow-400",
  },
  pago: {
    label: "Pagamento Confirmado",
    icon: CreditCard,
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/30",
    dot: "bg-sky-400",
  },
};

const PLAN_BADGE = {
  Essencial: "bg-purple-900/40 text-purple-300 border-purple-700/40",
  Profissional: "bg-sky-900/40 text-sky-300 border-sky-700/40",
  Premium: "bg-amber-900/40 text-amber-300 border-amber-700/40",
};

const STEPS = ["aguardando_pagamento", "pagamento_confirmado", "em_desenvolvimento", "revisao", "concluido"];

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.aguardando_pagamento;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-inter font-medium ${cfg.bg} ${cfg.color}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function ProgressBar({ status }) {
  if (status === "cancelado") return (
    <div className="flex items-center gap-2 mt-2">
      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
      <span className="font-inter text-xs text-red-400">Pedido cancelado</span>
    </div>
  );
  const idx = STEPS.indexOf(status === "pendente" ? "aguardando_pagamento" : status === "pago" ? "pagamento_confirmado" : status);
  const current = Math.max(idx, 0);
  return (
    <div className="mt-3">
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => {
          const cfg = STATUS_CONFIG[s];
          const done = i <= current;
          const active = i === current;
          return (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${done ? `${cfg.dot} border-transparent` : "bg-transparent border-white/20"}`}>
                  {done && <div className="w-2 h-2 rounded-full bg-white/80" />}
                </div>
                <span className={`text-[9px] font-inter mt-1 text-center leading-tight max-w-[52px] ${active ? cfg.color : done ? "text-white/40" : "text-white/20"}`}>
                  {cfg.label.split(" ")[0]}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mb-4 mx-0.5 rounded-full transition-all ${i < current ? "bg-purple-500/60" : "bg-white/10"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-professional rounded-2xl border border-purple-800/30 overflow-hidden"
    >
      {/* Card Header */}
      <div
        className="flex items-start justify-between gap-4 p-5 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`font-inter text-xs px-2 py-0.5 rounded-md border font-semibold ${PLAN_BADGE[order.plan] || PLAN_BADGE.Essencial}`}>
              {order.plan}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <p className="font-cinzel text-white font-semibold text-sm truncate">{order.client_name}</p>
          <p className="font-inter text-white/40 text-xs mt-0.5">
            {new Date(order.created_date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            {" · "}
            <span className="text-purple-300 font-semibold">R$ {(order.plan_price || 0).toLocaleString("pt-BR")}</span>
            {" · "}
            <span className="uppercase">{order.payment_method}</span>
          </p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-3">
        <ProgressBar status={order.status} />
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-purple-800/20"
          >
            <div className="p-5 space-y-4">
              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "E-mail", value: order.client_email },
                  { label: "Telefone", value: order.client_phone || "—" },
                  { label: "Forma de pagamento", value: order.payment_method?.toUpperCase() },
                  { label: "Valor", value: `R$ ${(order.plan_price || 0).toLocaleString("pt-BR")}` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-inter text-[10px] text-white/30 uppercase tracking-wider">{item.label}</p>
                    <p className="font-inter text-white/70 text-xs mt-0.5 break-all">{item.value}</p>
                  </div>
                ))}
              </div>

              {order.notes && (
                <div>
                  <p className="font-inter text-[10px] text-white/30 uppercase tracking-wider mb-1">Observações</p>
                  <p className="font-inter text-white/60 text-xs leading-relaxed bg-white/5 rounded-xl p-3 border border-purple-800/20">{order.notes}</p>
                </div>
              )}

              {/* Updates / timeline */}
              {order.updates?.length > 0 && (
                <div>
                  <p className="font-inter text-[10px] text-white/30 uppercase tracking-wider mb-2">Atualizações</p>
                  <div className="space-y-2">
                    {order.updates.map((u, i) => (
                      <div key={i} className="flex gap-3 text-xs font-inter">
                        <div className="flex flex-col items-center pt-1">
                          <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                          {i < order.updates.length - 1 && <div className="w-px flex-1 bg-purple-800/40 mt-1" />}
                        </div>
                        <div className="pb-3">
                          <p className="text-white/60 leading-relaxed">{u.message}</p>
                          {u.date && <p className="text-white/25 text-[10px] mt-0.5">{new Date(u.date).toLocaleDateString("pt-BR")}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MeusPedidos() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Digite um e-mail válido");
      return;
    }
    setError("");
    setLoading(true);
    const results = await base44.entities.Order.filter({ client_email: email.trim().toLowerCase() }, "-created_date");
    setOrders(results);
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <PurpleRaysBackground />
      <div className="relative z-10">
        <Navbar />

        <main className="max-w-2xl mx-auto px-4 pt-32 pb-20">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-3">Área do Cliente</span>
            <h1 className="font-cinzel font-bold text-3xl md:text-4xl text-white mb-3">
              Meus <span className="text-shimmer">Pedidos</span>
            </h1>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-4" />
            <p className="font-inter text-white/40 text-sm">
              Informe o e-mail utilizado na contratação para consultar seus pedidos.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="flex gap-3 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="seu@email.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary-aura px-6 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wider flex-shrink-0"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
              ) : "Buscar"}
            </button>
          </motion.form>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs mb-4 font-inter">
              <AlertCircle className="w-3.5 h-3.5" />{error}
            </div>
          )}

          {/* Results */}
          <AnimatePresence>
            {searched && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {orders.length > 0 ? (
                  <>
                    <p className="font-inter text-white/30 text-xs">
                      {orders.length} pedido{orders.length !== 1 ? "s" : ""} encontrado{orders.length !== 1 ? "s" : ""}
                    </p>
                    {orders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-purple-800/30 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6 text-white/20" />
                    </div>
                    <p className="font-cinzel text-white/40 text-base">Nenhum pedido encontrado</p>
                    <p className="font-inter text-white/25 text-xs mt-2">Verifique o e-mail informado ou entre em contato.</p>
                    <a
                      href="https://wa.me/5599984930092"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-xs font-inter text-green-400 hover:text-green-300 transition-colors"
                    >
                      Falar no WhatsApp →
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to home */}
          <div className="mt-10 text-center">
            <a href="/" className="inline-flex items-center gap-2 font-inter text-white/25 text-xs hover:text-white/50 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}