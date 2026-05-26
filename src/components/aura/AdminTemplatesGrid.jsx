import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { TEMPLATES, CATEGORIES } from "@/lib/templatesData";
import AuraTemplateCard from "./AuraTemplateCard";

export default function AdminTemplatesGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = TEMPLATES.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.author.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {/* Action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">{filtered.length} templates</span>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
          </div>
          <button className="flex items-center gap-1 bg-violet-600 hover:bg-violet-700 text-white text-xs px-4 py-2 rounded-xl transition-colors flex-shrink-0">
            <Plus className="h-3 w-3" /> Add Template
          </button>
        </div>
      </div>

      {/* Category tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className={`px-2.5 py-1.5 rounded-xl text-xs border transition-colors ${
                isActive
                  ? "text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30"
                  : "text-neutral-600 dark:text-neutral-400 border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-3 md:gap-4 w-full">
        {filtered.map((t, i) => (
          <AuraTemplateCard key={t.id} template={t} index={i} isAdmin />
        ))}
      </div>
    </motion.div>
  );
}