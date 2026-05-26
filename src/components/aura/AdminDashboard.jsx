import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Users, Shuffle, Eye, Edit, Trash2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TEMPLATES, CHART_DATA, formatViews } from "@/lib/templatesData";
import AdminKpiCard from "./AdminKpiCard";

const KPIS = [
  { label: "Total Templates", value: 51, delta: "+8%", deltaPositive: true, icon: LayoutGrid, iconColor: "bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400" },
  { label: "Active Users", value: 12400, delta: "+23%", deltaPositive: true, icon: Users, iconColor: "bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400" },
  { label: "Remixes Today", value: 142, delta: "+5%", deltaPositive: true, icon: Shuffle, iconColor: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" },
  { label: "Views (30d)", value: 284000, delta: "-3%", deltaPositive: false, icon: Eye, iconColor: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-lg shadow-sm p-2 text-xs">
      <p className="text-neutral-500 mb-1">Day {label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const recent = TEMPLATES.slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, i) => <AdminKpiCard key={i} {...kpi} />)}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl p-5">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Activity — Last 30 Days</h3>
          <p className="text-xs text-neutral-500">Views + Remixes</p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="views" stroke="#8b5cf6" fill="rgba(139,92,246,0.1)" name="Views" />
            <Area type="monotone" dataKey="remixes" stroke="#10b981" fill="rgba(16,185,129,0.1)" name="Remixes" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Templates Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Recent Templates</h3>
          <button className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-neutral-500 uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800">
                {["Template", "Author", "Views", "Remixes", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.id} className="border-b border-neutral-50 dark:border-neutral-800/50 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50" style={{ background: "transparent" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = ""}
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-12 rounded bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 overflow-hidden">
                        <img src={`https://placehold.co/48x32/f5f3ff/7c3aed?text=${t.id}`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-medium text-neutral-900 dark:text-white truncate max-w-[200px]">{t.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-neutral-500">{t.author}</td>
                  <td className="px-4 py-2.5 text-xs text-neutral-700 dark:text-neutral-300">{formatViews(t.views)}</td>
                  <td className="px-4 py-2.5 text-xs text-neutral-700 dark:text-neutral-300">{t.remixes}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-medium ${
                      t.type === "PRO"
                        ? "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-100 dark:border-violet-900"
                        : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900"
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      {[
                        { icon: Edit, tip: "Edit template", hover: "hover:text-violet-600" },
                        { icon: Eye, tip: "Preview", hover: "hover:text-neutral-700" },
                        { icon: Trash2, tip: "Delete", hover: "hover:text-red-500" },
                      ].map(({ icon: Icon, tip, hover }) => (
                        <div key={tip} className="relative group">
                          <button className={`text-neutral-400 ${hover} transition-colors`}>
                            <Icon className="h-3.5 w-3.5" />
                          </button>
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {tip}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
          <span>Showing 1–10 of 51 templates</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 transition-colors">Prev</button>
            <button className="px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}