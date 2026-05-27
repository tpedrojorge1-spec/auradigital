import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Eye, EyeOff, ArrowLeft, Package, CheckCircle, Clock, XCircle,
  TrendingUp, RotateCcw, Trash2, BarChart2, Settings, RefreshCw,
  Hammer, CreditCard, AlertCircle, ChevronDown
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { base44 } from "@/api/base44Client";
import PurpleRaysBackground from "../components/PurpleRaysBackground";

const ADMIN_PASSWORD = "ADMIM2026";
const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

const ALL_STATUSES = [
  { key: "aguardando_pagamento", label: "Aguardando Pagamento", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-700/30" },
  { key: "pagamento_confirmado", label: "Pagamento Confirmado", icon: CreditCard, color: "text-sky-400", bg: "bg-sky-900/20 border-sky-700/30" },
  { key: "em_desenvolvimento", label: "Em Desenvolvimento", icon: Hammer, color: "text-purple-400", bg: "bg-purple-900/20 border-purple-700/30" },
  { key: "revisao", label: "Revisão", icon: Eye, color: "text-orange-400", bg: "bg-orange-900/20 border-orange-700/30" },
  { key: "concluido", label: "Concluído", icon: CheckCircle, color: "text-green-400", bg: "bg-green-900/20 border-green-700/30" },
  { key: "cancelado", label: "Cancelado", icon: XCircle, color: "text-red-400", bg: "bg-red-900/20 border-red-700/30" },
  // legado
  { key: "pendente", label: "Aguardando Pagamento", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-700/30" },
  { key: "pago", label: "Pagamento Confirmado", icon: CreditCard, color: "text-sky-400", bg: "bg-sky-900/20 border-sky-700/30" },
];
const STATUS_MAP = Object.fromEntries(ALL_STATUSES.map((s) => [s.key, s]));

const PLAN_STYLES = {
  Essencial: "text-purple-300 bg-purple-900/20 border-purple-700/30",
  Profissional: "text-violet-300 bg-violet-900/20 border-violet-700/30",
  Premium: "text-amber-300 bg-amber-900/20 border-amber-700/30",
};

const TABS = [
  { key: "orders", label: "Pedidos", icon: Package },
  { key: "trash", label: "Lixeira", icon: Trash2 },
  { key: "finance", label: "Financeiro", icon: BarChart2 },
];

// ─── Helpers ────────────────────────────────────────────────────
function isPaidStatus(s) { return s === "pago" || s === "pagamento_confirmado"; }
function isCancelledStatus(s) { return s === "cancelado"; }

function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.aguardando_pagamento;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-inter font-semibold ${cfg.bg} ${cfg.color}`}>
      <Icon className="w-3 h-3" />{cfg.label}
    </span>
  );
}

// ─── Order Card ──────────────────────────────────────────────────
function OrderCard({ order, onStatusChange, onSoftDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const changeStatus = async (newStatus) => {
    setUpdating(true);
    setStatusOpen(false);
    await onStatusChange(order.id, newStatus);
    setUpdating(false);
  };

  const activeStatuses = ALL_STATUSES.filter(s => !["pendente","pago"].includes(s.key));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-professional rounded-2xl border border-purple-800/25 overflow-hidden"
    >
      <div className="flex items-start gap-4 p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-700/40 flex items-center justify-center font-cinzel font-bold text-purple-300 text-sm flex-shrink-0 mt-0.5">
          {order.client_name?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="font-cinzel font-semibold text-white text-sm">{order.client_name}</p>
            <span className={`font-inter text-[10px] font-bold px-2 py-0.5 rounded-md border ${PLAN_STYLES[order.plan] || "text-white/40 border-white/10"}`}>{order.plan}</span>
          </div>
          <p className="font-inter text-white/40 text-xs">{order.client_email}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <StatusBadge status={order.status} />
            <span className="font-cinzel font-bold text-white text-sm">R$ {(order.plan_price || 0).toLocaleString("pt-BR")}</span>
            <span className="font-inter text-white/25 text-[10px]">{new Date(order.created_date).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/30 flex-shrink-0 mt-1 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-purple-800/20 overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Info */}
              <div className="grid grid-cols-2 gap-3 text-xs font-inter">
                {[
                  ["Telefone", order.client_phone || "—"],
                  ["Pagamento", order.payment_method?.toUpperCase()],
                  ["Data", new Date(order.created_date).toLocaleString("pt-BR")],
                  ["ID", order.id?.slice(0, 8) + "..."],
                ].map(([l, v]) => (
                  <div key={l}>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider">{l}</p>
                    <p className="text-white/60 mt-0.5 break-all">{v}</p>
                  </div>
                ))}
              </div>
              {order.notes && (
                <div className="bg-white/5 border border-purple-800/20 rounded-xl p-3 font-inter text-white/50 text-xs italic">"{order.notes}"</div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-1">
                {/* Status dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setStatusOpen(!statusOpen); }}
                    disabled={updating}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-900/30 border border-purple-700/40 text-purple-300 text-xs font-inter hover:bg-purple-900/50 transition-colors"
                  >
                    {updating ? <span className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" /> : <Settings className="w-3 h-3" />}
                    Alterar status
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {statusOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-0 top-full mt-1 z-50 bg-[#0d0720] border border-purple-700/40 rounded-xl shadow-xl overflow-hidden min-w-[200px]"
                      >
                        {activeStatuses.map((s) => (
                          <button
                            key={s.key}
                            onClick={() => changeStatus(s.key)}
                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-inter hover:bg-white/5 transition-colors text-left ${s.color} ${order.status === s.key ? "bg-white/5" : ""}`}
                          >
                            <s.icon className="w-3 h-3" />{s.label}
                            {order.status === s.key && <span className="ml-auto text-[9px] opacity-60">atual</span>}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!isCancelledStatus(order.status) && (
                  <button
                    onClick={(e) => { e.stopPropagation(); changeStatus("cancelado"); }}
                    className="px-3 py-2 rounded-xl bg-red-900/20 border border-red-700/30 text-red-400 text-xs font-inter hover:bg-red-900/40 transition-colors flex items-center gap-1.5"
                  >
                    <XCircle className="w-3 h-3" /> Cancelar
                  </button>
                )}

                {isCancelledStatus(order.status) && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onSoftDelete(order.id); }}
                    className="px-3 py-2 rounded-xl bg-red-900/30 border border-red-600/40 text-red-300 text-xs font-inter hover:bg-red-900/50 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3 h-3" /> Mover para lixeira
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Trash Tab ───────────────────────────────────────────────────
function TrashTab({ trash, onRestore, onPermanentDelete }) {
  if (trash.length === 0) {
    return (
      <div className="text-center py-20 card-professional rounded-2xl">
        <Trash2 className="w-10 h-10 text-white/10 mx-auto mb-3" />
        <p className="font-cinzel text-white/30 text-sm">Lixeira vazia</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {trash.map((order) => (
        <div key={order.id} className="card-professional rounded-2xl p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-red-900/30 border border-red-700/30 flex items-center justify-center font-cinzel font-bold text-red-300 text-sm flex-shrink-0">
            {order.client_name?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-cinzel text-white/60 text-sm font-semibold">{order.client_name}</p>
            <p className="font-inter text-white/30 text-xs">{order.plan} · R$ {(order.plan_price || 0).toLocaleString("pt-BR")}</p>
            <p className="font-inter text-white/20 text-[10px] mt-0.5">{new Date(order.created_date).toLocaleDateString("pt-BR")}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onRestore(order.id)}
              className="px-3 py-2 rounded-xl bg-purple-900/30 border border-purple-700/40 text-purple-300 text-xs font-inter hover:bg-purple-900/50 transition-colors flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3" /> Restaurar
            </button>
            <button onClick={() => onPermanentDelete(order.id)}
              className="px-3 py-2 rounded-xl bg-red-900/20 border border-red-700/30 text-red-400 text-xs font-inter hover:bg-red-900/40 transition-colors flex items-center gap-1.5">
              <Trash2 className="w-3 h-3" /> Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Finance Tab ─────────────────────────────────────────────────
function FinanceTab({ orders }) {
  const currentYear = 2026;
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  // Build monthly data from orders
  const chartData = useMemo(() => {
    return MONTHS.map((m, i) => {
      const month = i + 1;
      const monthOrders = orders.filter((o) => {
        const d = new Date(o.created_date);
        return d.getFullYear() === currentYear && d.getMonth() + 1 === month;
      });
      const revenue = monthOrders.filter((o) => isPaidStatus(o.status)).reduce((a, o) => a + (o.plan_price || 0), 0);
      const conversions = monthOrders.filter((o) => isPaidStatus(o.status)).length;
      const cancellations = monthOrders.filter((o) => isCancelledStatus(o.status)).length;
      return {
        name: m,
        month,
        "Receita (R$)": revenue,
        Pedidos: monthOrders.length,
        Conversões: conversions,
        Cancelamentos: cancellations,
        isCurrent: month === currentMonth,
        isFuture: month > currentMonth,
      };
    });
  }, [orders]);

  // Current month KPIs
  const currentData = chartData[currentMonth - 1] || {};
  const totalYear = chartData.reduce((a, d) => a + d["Receita (R$)"], 0);
  const totalOrders = chartData.reduce((a, d) => a + d.Pedidos, 0);
  const totalConversions = chartData.reduce((a, d) => a + d.Conversões, 0);
  const totalCancellations = chartData.reduce((a, d) => a + d.Cancelamentos, 0);
  const convRate = totalOrders > 0 ? ((totalConversions / totalOrders) * 100).toFixed(1) : "0.0";

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-[#0d0720] border border-purple-700/40 rounded-xl p-3 text-xs font-inter shadow-xl">
        <p className="text-white/60 mb-2 font-semibold">{label} / {currentYear}</p>
        {payload.map((p, i) => (
          <p key={i} className="mb-0.5" style={{ color: p.color }}>
            {p.name}: {p.name.includes("R$") ? `R$ ${p.value.toLocaleString("pt-BR")}` : p.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Year KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Receita Anual", value: `R$ ${totalYear.toLocaleString("pt-BR")}`, color: "text-green-400", icon: TrendingUp },
          { label: "Total Pedidos", value: totalOrders, color: "text-purple-400", icon: Package },
          { label: "Taxa Conversão", value: `${convRate}%`, color: "text-sky-400", icon: CheckCircle },
          { label: "Cancelamentos", value: totalCancellations, color: "text-red-400", icon: XCircle },
        ].map((k) => (
          <div key={k.label} className="card-professional rounded-2xl p-4">
            <k.icon className={`w-5 h-5 ${k.color} mb-2`} />
            <p className={`font-cinzel font-bold text-xl ${k.color}`}>{k.value}</p>
            <p className="font-inter text-white/30 text-[10px] uppercase tracking-wider mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Current month highlight */}
      <div className="card-professional rounded-2xl p-5 border border-purple-700/30">
        <p className="font-inter text-xs text-white/40 uppercase tracking-wider mb-3">📅 {MONTHS[currentMonth - 1]} {currentYear} — Mês Atual</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Receita", value: `R$ ${(currentData["Receita (R$)"] || 0).toLocaleString("pt-BR")}`, color: "text-green-400" },
            { label: "Pedidos", value: currentData.Pedidos || 0, color: "text-purple-400" },
            { label: "Conversões", value: currentData.Conversões || 0, color: "text-sky-400" },
            { label: "Cancelamentos", value: currentData.Cancelamentos || 0, color: "text-red-400" },
          ].map((k) => (
            <div key={k.label}>
              <p className={`font-cinzel font-bold text-lg ${k.color}`}>{k.value}</p>
              <p className="font-inter text-white/30 text-[10px] uppercase tracking-wider">{k.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Chart - Revenue */}
      <div className="card-professional rounded-2xl p-5">
        <p className="font-cinzel text-white font-semibold text-sm mb-1">Receita Mensal — {currentYear}</p>
        <p className="font-inter text-white/30 text-xs mb-4">Barras mais claras = meses futuros (sem dados)</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.08)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Inter" }} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Inter" }}
              tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Receita (R$)" radius={[4, 4, 0, 0]}
              fill="rgba(168,85,247,0.7)"
              className="transition-all"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Annual Chart - Pedidos / Conversões / Cancelamentos */}
      <div className="card-professional rounded-2xl p-5">
        <p className="font-cinzel text-white font-semibold text-sm mb-4">Pedidos · Conversões · Cancelamentos — {currentYear}</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.08)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 10, color: "#9ca3af", paddingTop: 8 }} />
            <Bar dataKey="Pedidos" fill="rgba(139,92,246,0.6)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Conversões" fill="rgba(52,211,153,0.6)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Cancelamentos" fill="rgba(248,113,113,0.6)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Historical table */}
      <div className="card-professional rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-purple-800/20">
          <p className="font-cinzel text-white font-semibold text-sm">Histórico Mensal {currentYear}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-inter">
            <thead>
              <tr className="border-b border-purple-800/20 text-white/30 uppercase tracking-wider text-[10px]">
                {["Mês","Receita","Pedidos","Conversões","Cancelamentos","Taxa Conv."].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, i) => {
                const rate = row.Pedidos > 0 ? ((row.Conversões / row.Pedidos) * 100).toFixed(0) : "—";
                return (
                  <tr key={i}
                    className={`border-b border-purple-800/10 transition-colors hover:bg-white/2 ${row.isCurrent ? "bg-purple-900/10" : ""} ${row.isFuture ? "opacity-40" : ""}`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="text-white/70 font-medium">{row.name}</span>
                      {row.isCurrent && <span className="ml-2 text-[9px] text-purple-400 bg-purple-900/30 px-1.5 py-0.5 rounded">atual</span>}
                    </td>
                    <td className="px-4 py-2.5 text-green-400 font-semibold">
                      {row["Receita (R$)"] > 0 ? `R$ ${row["Receita (R$)"].toLocaleString("pt-BR")}` : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-white/50">{row.Pedidos || "—"}</td>
                    <td className="px-4 py-2.5 text-sky-400">{row.Conversões || "—"}</td>
                    <td className="px-4 py-2.5 text-red-400">{row.Cancelamentos || "—"}</td>
                    <td className="px-4 py-2.5 text-white/40">{row.Pedidos > 0 ? `${rate}%` : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      loadOrders();
    } else {
      setLoginError("Senha incorreta.");
      setTimeout(() => setLoginError(""), 3000);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    const data = await base44.entities.Order.list("-created_date", 200);
    setOrders(data.filter((o) => !o._trashed));
    setTrash(data.filter((o) => o._trashed));
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    await base44.entities.Order.update(id, { status });
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  const handleSoftDelete = async (id) => {
    await base44.entities.Order.update(id, { _trashed: true });
    const moved = orders.find((o) => o.id === id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
    if (moved) setTrash((prev) => [{ ...moved, _trashed: true }, ...prev]);
  };

  const handleRestore = async (id) => {
    await base44.entities.Order.update(id, { _trashed: false });
    const moved = trash.find((o) => o.id === id);
    setTrash((prev) => prev.filter((o) => o.id !== id));
    if (moved) setOrders((prev) => [{ ...moved, _trashed: false }, ...prev]);
  };

  const handlePermanentDelete = async (id) => {
    await base44.entities.Order.delete(id);
    setTrash((prev) => prev.filter((o) => o.id !== id));
  };

  const filteredOrders = statusFilter === "all" ? orders : orders.filter((o) => {
    if (statusFilter === "pagamento_confirmado") return isPaidStatus(o.status);
    if (statusFilter === "aguardando_pagamento") return o.status === "aguardando_pagamento" || o.status === "pendente";
    return o.status === statusFilter;
  });

  // Stats
  const paidOrders = orders.filter((o) => isPaidStatus(o.status));
  const totalRevenue = paidOrders.reduce((a, o) => a + (o.plan_price || 0), 0);

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
                <input type={showPass ? "text" : "password"} placeholder="Senha de administrador"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && <p className="font-inter text-red-400 text-xs text-center">{loginError}</p>}
              <button type="submit" className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm">Entrar</button>
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
        <div className="border-b border-purple-900/30 bg-black/70 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-900/50 border border-purple-600/30 flex items-center justify-center">
                <Lock className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h1 className="font-cinzel font-bold text-white text-sm tracking-widest">PAINEL ADMIN</h1>
                <p className="font-inter text-white/30 text-[10px]">Aureon Digital</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1">
              {TABS.map((t) => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-inter font-medium transition-all ${tab === t.key ? "bg-purple-700 text-white" : "text-white/40 hover:text-white/70"}`}>
                  <t.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">{t.label}</span>
                  {t.key === "trash" && trash.length > 0 && (
                    <span className="bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{trash.length}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={loadOrders}
                className="font-inter text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> <span className="hidden sm:block">Atualizar</span>
              </button>
              <a href="/" className="font-inter text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> <span className="hidden sm:block">Site</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* ORDERS TAB */}
          {tab === "orders" && (
            <div>
              {/* Quick KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Total", value: orders.length, icon: Package, color: "text-purple-400" },
                  { label: "Pagos", value: paidOrders.length, icon: CheckCircle, color: "text-green-400" },
                  { label: "Aguardando", value: orders.filter(o => o.status === "aguardando_pagamento" || o.status === "pendente").length, icon: Clock, color: "text-yellow-400" },
                  { label: "Receita", value: `R$ ${totalRevenue.toLocaleString("pt-BR")}`, icon: TrendingUp, color: "text-sky-400" },
                ].map((k) => (
                  <div key={k.label} className="card-professional rounded-2xl p-4">
                    <k.icon className={`w-5 h-5 ${k.color} mb-2`} />
                    <p className={`font-cinzel font-bold text-xl ${k.color}`}>{k.value}</p>
                    <p className="font-inter text-white/30 text-[10px] uppercase tracking-wider mt-1">{k.label}</p>
                  </div>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { key: "all", label: "Todos" },
                  { key: "aguardando_pagamento", label: "Aguardando" },
                  { key: "pagamento_confirmado", label: "Pagos" },
                  { key: "em_desenvolvimento", label: "Em Dev." },
                  { key: "revisao", label: "Revisão" },
                  { key: "concluido", label: "Concluídos" },
                  { key: "cancelado", label: "Cancelados" },
                ].map((f) => (
                  <button key={f.key} onClick={() => setStatusFilter(f.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-inter transition-all ${statusFilter === f.key ? "bg-purple-700 text-white" : "bg-white/5 text-white/40 border border-white/10 hover:border-purple-700/40"}`}>
                    {f.label}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-20 card-professional rounded-2xl">
                  <Package className="w-10 h-10 text-white/10 mx-auto mb-3" />
                  <p className="font-cinzel text-white/30 text-sm">Nenhum pedido encontrado</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order}
                      onStatusChange={handleStatusChange}
                      onSoftDelete={handleSoftDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TRASH TAB */}
          {tab === "trash" && (
            <TrashTab
              trash={trash}
              onRestore={handleRestore}
              onPermanentDelete={handlePermanentDelete}
            />
          )}

          {/* FINANCE TAB */}
          {tab === "finance" && <FinanceTab orders={orders} />}
        </div>
      </div>
    </div>
  );
}