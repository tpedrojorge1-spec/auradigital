import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Users, Package, CheckCircle, Clock, XCircle, ArrowLeft, TrendingUp } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PurpleRaysBackground from "../components/PurpleRaysBackground";

const ADMIN_PASSWORD = "ADMIM2026";

const STATUS_STYLES = {
  pendente: { color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-700/30", icon: Clock },
  pago: { color: "text-green-400", bg: "bg-green-900/20 border-green-700/30", icon: CheckCircle },
  cancelado: { color: "text-red-400", bg: "bg-red-900/20 border-red-700/30", icon: XCircle },
};

const PLAN_STYLES = {
  Essencial: "text-purple-300 bg-purple-900/20 border-purple-700/30",
  Profissional: "text-violet-300 bg-violet-900/20 border-violet-700/30",
  Premium: "text-indigo-300 bg-indigo-900/20 border-indigo-700/30",
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      loadOrders();
    } else {
      setError("Senha incorreta. Tente novamente.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Order.list("-created_date", 100);
      setOrders(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (id, status) => {
    await base44.entities.Order.update(id, { status });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const totalRevenue = orders.filter((o) => o.status === "pago").reduce((a, o) => a + (o.plan_price || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "pendente").length;
  const paidCount = orders.filter((o) => o.status === "pago").length;

  if (!authed) {
    return (
      <div className="min-h-screen bg-black relative flex items-center justify-center px-4">
        <PurpleRaysBackground />
        <div className="relative z-10 w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0514] border border-purple-700/40 rounded-3xl p-8 shadow-2xl shadow-purple-900/40"
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/40 border border-purple-600/30 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="font-cinzel font-bold text-white text-2xl tracking-wide">Área Admin</h1>
              <p className="font-inter text-white/40 text-sm mt-2">Aureon Digital — Acesso Restrito</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Senha de administrador"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-inter text-red-400 text-xs text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm"
              >
                Entrar
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="font-inter text-white/30 text-xs hover:text-white/60 transition-colors flex items-center justify-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Voltar ao site
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <PurpleRaysBackground />
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-purple-900/30 bg-black/60 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-900/50 border border-purple-600/30 flex items-center justify-center">
                <Lock className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h1 className="font-cinzel font-bold text-white text-sm tracking-widest">PAINEL ADMIN</h1>
                <p className="font-inter text-white/30 text-[10px]">Aureon Digital</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadOrders}
                className="font-inter text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                Atualizar
              </button>
              <a
                href="/"
                className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Site
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total de Pedidos", value: orders.length, icon: Package, color: "text-purple-400" },
              { label: "Pedidos Pagos", value: paidCount, icon: CheckCircle, color: "text-green-400" },
              { label: "Aguardando", value: pendingCount, icon: Clock, color: "text-yellow-400" },
              { label: "Receita Confirmada", value: `R$ ${totalRevenue.toLocaleString("pt-BR")}`, icon: TrendingUp, color: "text-indigo-400" },
            ].map((s, i) => (
              <div key={i} className="card-professional rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className={`font-cinzel font-bold text-2xl ${s.color} mb-1`}>{s.value}</div>
                <div className="font-inter text-white/40 text-xs tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-cinzel text-white/50 text-sm tracking-wider">Filtrar:</span>
            {["all", "pendente", "pago", "cancelado"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-inter tracking-wider transition-all capitalize ${
                  filter === f
                    ? "bg-purple-700 text-white"
                    : "bg-white/5 text-white/40 border border-white/10 hover:border-purple-700/40"
                }`}
              >
                {f === "all" ? "Todos" : f}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 card-professional rounded-2xl">
              <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="font-cinzel text-white/40 text-base">Nenhum pedido encontrado</p>
              <p className="font-inter text-white/20 text-sm mt-2">Os pedidos dos clientes aparecerão aqui</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((order, i) => {
                const StatusIcon = STATUS_STYLES[order.status]?.icon || Clock;
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card-professional rounded-2xl p-5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Client Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-full bg-purple-900/50 border border-purple-700/40 flex items-center justify-center font-cinzel font-bold text-purple-300 text-sm flex-shrink-0">
                            {order.client_name?.[0]}
                          </div>
                          <div>
                            <p className="font-cinzel font-semibold text-white text-sm">{order.client_name}</p>
                            <p className="font-inter text-white/40 text-xs">{order.client_email}</p>
                          </div>
                        </div>
                        {order.client_phone && (
                          <p className="font-inter text-white/30 text-xs ml-12">📱 {order.client_phone}</p>
                        )}
                        {order.notes && (
                          <p className="font-inter text-white/30 text-xs ml-12 mt-1 italic">"{order.notes}"</p>
                        )}
                      </div>

                      {/* Plan */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`font-cinzel text-xs font-bold px-3 py-1 rounded-full border ${PLAN_STYLES[order.plan] || "text-white/50 bg-white/5 border-white/10"}`}>
                          {order.plan}
                        </span>
                        <span className="font-cinzel font-bold text-white text-lg">
                          R$ {order.plan_price?.toLocaleString("pt-BR")}
                        </span>
                        <span className="font-inter text-white/30 text-xs uppercase tracking-wider">
                          {order.payment_method}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold font-inter ${STATUS_STYLES[order.status]?.bg} ${STATUS_STYLES[order.status]?.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {order.status}
                        </span>

                        {/* Status Actions */}
                        <div className="flex gap-2">
                          {order.status !== "pago" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "pago")}
                              className="text-[10px] font-inter px-2 py-1 rounded-lg bg-green-900/30 text-green-400 border border-green-700/30 hover:bg-green-900/50 transition-colors"
                            >
                              ✓ Pago
                            </button>
                          )}
                          {order.status !== "cancelado" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "cancelado")}
                              className="text-[10px] font-inter px-2 py-1 rounded-lg bg-red-900/30 text-red-400 border border-red-700/30 hover:bg-red-900/50 transition-colors"
                            >
                              ✕ Cancelar
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="text-right">
                        <p className="font-inter text-white/25 text-[10px]">
                          {new Date(order.created_date).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="font-inter text-white/20 text-[9px]">
                          {new Date(order.created_date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}