import React from "react";
import { LayoutDashboard, PanelTop, Users, BarChart2, Tag, Star, Inbox, Settings, Palette, Zap } from "lucide-react";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    label: "MAIN",
    items: [
      { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { key: "templates", icon: PanelTop, label: "Templates" },
      { key: "users", icon: Users, label: "Users" },
      { key: "analytics", icon: BarChart2, label: "Analytics" },
    ],
  },
  {
    label: "CONTENT",
    items: [
      { key: "categories", icon: Tag, label: "Categories" },
      { key: "featured", icon: Star, label: "Featured" },
      { key: "submissions", icon: Inbox, label: "Submissions" },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { key: "settings", icon: Settings, label: "Settings" },
      { key: "design-system", icon: Palette, label: "Design System" },
    ],
  },
];

export default function AdminSidebar({ activePage, setActivePage }) {
  return (
    <motion.aside
      initial={{ x: -260, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 bottom-0 w-[260px] bg-white dark:bg-neutral-950 border-r border-neutral-100 dark:border-neutral-800 p-4 z-30 overflow-y-auto"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 py-3 mb-6">
        <div className="bg-violet-600 text-white p-2 rounded-xl">
          <Zap className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-neutral-900 dark:text-white">Aura NOT 5</span>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.label} className="mb-6">
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider px-2 mb-2">{section.label}</p>
          {section.items.map(({ key, icon: Icon, label }) => {
            const isActive = activePage === key;
            return (
              <button
                key={key}
                onClick={() => setActivePage(key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 relative mb-0.5 text-left ${
                  isActive
                    ? "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 border border-violet-100 dark:border-violet-900 font-medium"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-violet-600 rounded-r-full" />
                )}
                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-violet-600 dark:text-violet-400" : ""}`} />
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </motion.aside>
  );
}