import React from "react";
import { motion } from "framer-motion";

const VIOLET_SHADES = [
  { name: "50", hex: "#f5f3ff" }, { name: "100", hex: "#ede9fe" }, { name: "200", hex: "#ddd6fe" },
  { name: "300", hex: "#c4b5fd" }, { name: "400", hex: "#a78bfa" }, { name: "500", hex: "#8b5cf6" },
  { name: "600", hex: "#7c3aed" }, { name: "700", hex: "#6d28d9" }, { name: "800", hex: "#5b21b6" },
  { name: "900", hex: "#4c1d95" }, { name: "950", hex: "#2e1065" },
];

const RADII = ["rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full"];
const SHADOWS = ["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"];
const DURATIONS = ["100ms","150ms","200ms","300ms","400ms","500ms","700ms","1000ms"];
const EASINGS = ["ease-linear","ease-in","ease-out","ease-in-out","cubic-bezier(0.16,1,0.3,1)"];

export default function AdminDesignSystem() {
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-10">

      {/* Colors */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Colors — Violet</h2>
        <div className="border-t border-neutral-100 dark:border-neutral-800 mb-6" />
        <div className="flex flex-wrap gap-3">
          {VIOLET_SHADES.map((s) => (
            <div key={s.name} className="text-center">
              <div className="h-12 w-12 rounded-xl border border-neutral-200 dark:border-neutral-700 mb-1.5" style={{ background: s.hex }} />
              <p className="text-[10px] text-neutral-500">{s.name}</p>
              <p className="text-[9px] text-neutral-400">{s.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Typography</h2>
        <div className="border-t border-neutral-100 dark:border-neutral-800 mb-6" />
        <div className="space-y-3 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl p-5">
          {[["text-3xl font-bold","Heading 1 — Bold"],["text-2xl font-semibold","Heading 2 — Semibold"],["text-xl font-medium","Heading 3 — Medium"],["text-base","Body — Regular"],["text-sm text-neutral-500","Small — Muted"],["text-xs tracking-wider uppercase text-neutral-400","Caption — Uppercase"]].map(([cls, label]) => (
            <div key={label} className="flex items-baseline gap-4">
              <span className="text-[10px] text-neutral-400 w-40 flex-shrink-0 font-mono">.{cls.split(" ")[0]}</span>
              <span className={cls}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Border Radius</h2>
        <div className="border-t border-neutral-100 dark:border-neutral-800 mb-6" />
        <div className="flex flex-wrap gap-4">
          {RADII.map((r) => (
            <div key={r} className="text-center">
              <div className={`h-12 w-12 bg-violet-100 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-900 ${r} mb-1.5`} />
              <p className="text-[10px] text-neutral-500">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Shadows</h2>
        <div className="border-t border-neutral-100 dark:border-neutral-800 mb-6" />
        <div className="flex flex-wrap gap-6">
          {SHADOWS.map((s) => (
            <div key={s} className="text-center">
              <div className={`h-12 w-16 bg-white dark:bg-neutral-800 rounded-xl ${s} mb-2`} />
              <p className="text-[10px] text-neutral-500">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Components</h2>
        <div className="border-t border-neutral-100 dark:border-neutral-800 mb-6" />
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl p-5 space-y-5">
          {/* Buttons */}
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-3">Buttons</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-xl transition-colors">Primary</button>
              <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm rounded-xl transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700">Secondary</button>
              <button className="px-4 py-2 text-neutral-600 dark:text-neutral-400 text-sm rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">Ghost</button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-xl transition-colors">Destructive</button>
            </div>
          </div>
          {/* Badges */}
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-3">Badges</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-md border bg-emerald-50 text-emerald-700 border-emerald-100 font-medium">FREE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md border bg-violet-50 text-violet-700 border-violet-100 font-medium">PRO</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md border bg-sky-50 text-sky-700 border-sky-100 font-medium">ACTIVE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md border bg-neutral-100 text-neutral-600 border-neutral-200 font-medium">INACTIVE</span>
            </div>
          </div>
          {/* Inputs */}
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-3">Inputs</p>
            <div className="space-y-2 max-w-sm">
              <input className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500/30" placeholder="Normal input" />
              <input className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-red-300 rounded-xl focus:outline-none" placeholder="Error state" />
              <input className="w-full px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl opacity-50 cursor-not-allowed" placeholder="Disabled" disabled />
            </div>
          </div>
        </div>
      </section>

      {/* Motion */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Motion</h2>
        <div className="border-t border-neutral-100 dark:border-neutral-800 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl p-4">
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-3">Durations</p>
            <div className="space-y-1">
              {DURATIONS.map((d) => (
                <div key={d} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-violet-600 w-16">{d}</span>
                  <div className="flex-1 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(parseInt(d) / 1000) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl p-4">
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-3">Easings</p>
            <div className="space-y-2">
              {EASINGS.map((e) => (
                <p key={e} className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 px-2 py-1 rounded">{e}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}