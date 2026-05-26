import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, Calendar, ChevronDown } from "lucide-react";
import { CATEGORIES, FILTER_TYPES } from "@/lib/templatesData";
import { motion } from "framer-motion";

export default function AuraFilterBar({ search, setSearch, sort, setSort, activeCategory, setActiveCategory, filterType, setFilterType }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center overflow-hidden border-b border-black/5 dark:border-white/5 w-full"
    >
      <div className="flex justify-center w-full mx-0 lg:mx-4">
        <div className="relative inline-block p-2 bg-neutral-50 dark:bg-black/20 w-full">
          {/* Decorative grid lines */}
          <div className="absolute top-0 left-1/2 w-[4000px] -ml-[2000px] border-t border-black/5 dark:border-white/5 pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 w-[4000px] -ml-[2000px] border-b border-black/5 dark:border-white/5 pointer-events-none" />

          <section className="w-full bg-gradient-to-b from-neutral-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl mx-0">
            <div className="mx-auto max-w-[1600px] p-2 md:p-4 lg:p-6 w-full">
              {/* Search + Sort */}
              <div className="flex flex-col sm:flex-row items-center gap-1.5 p-2 bg-white/70 dark:bg-black/30 backdrop-blur-sm rounded-xl border border-black/5 dark:border-white/5 mb-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 transition-colors peer-focus:text-violet-600" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search 51 templates..."
                    className="w-full pl-9 pr-4 py-1.5 bg-neutral-100 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-lg text-sm text-black dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all peer"
                  />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSort("popular")}
                    className={`px-3 py-2 rounded-md text-xs border border-black/5 flex items-center gap-1 transition-all duration-200 ${sort === "popular" ? "bg-neutral-100 dark:bg-white/10 text-black dark:text-white border-black/5 dark:border-white/10" : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5"}`}
                  >
                    <Menu className="h-3 w-3" /> Popular
                  </button>
                  <button
                    onClick={() => setSort("recent")}
                    className={`px-3 py-2 rounded-md text-xs flex items-center gap-1 transition-all duration-200 ${sort === "recent" ? "bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-black/5 dark:border-white/10" : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 border border-black/5"}`}
                  >
                    <Calendar className="h-3 w-3" /> Recent
                  </button>
                </div>
              </div>

              {/* Tags + Dropdown */}
              <div className="flex flex-wrap items-center gap-1.5 justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(isActive ? null : cat)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs border transition-colors ${
                          isActive
                            ? "text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 border-violet-200 dark:border-violet-800"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 border-black/5 dark:border-white/5"
                        }`}
                        style={isActive ? { boxShadow: "0 0 0 3px rgba(124,58,237,0.12)" } : {}}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Filter dropdown */}
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {filterType} <ChevronDown className="h-3 w-3" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-lg z-50 min-w-[160px] overflow-hidden">
                      {FILTER_TYPES.map((f) => (
                        <button
                          key={f}
                          onClick={() => { setFilterType(f); setDropdownOpen(false); }}
                          className={`block w-full text-left px-3 py-2 text-xs transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${filterType === f ? "text-violet-600 dark:text-violet-400 font-medium" : "text-neutral-700 dark:text-neutral-300"}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}