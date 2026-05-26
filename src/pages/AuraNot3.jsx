import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AuraHeader from "../components/aura/AuraHeader";
import AuraFilterBar from "../components/aura/AuraFilterBar";
import AuraTemplateCard from "../components/aura/AuraTemplateCard";
import AuraFooter from "../components/aura/AuraFooter";
import { TEMPLATES } from "@/lib/templatesData";

// Card entry animation keyframes injected once
const CARD_STYLE = `
@keyframes cardEnter {
  from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes shimmerBadge {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
body::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.04) 0%, transparent 70%);
}
`;

export default function AuraNot3() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterType, setFilterType] = useState("All");

  const filtered = useMemo(() => {
    let list = [...TEMPLATES];
    if (search) list = list.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.author.toLowerCase().includes(search.toLowerCase()));
    if (filterType === "Free Templates") list = list.filter(t => t.type === "FREE");
    if (filterType === "Pro Templates") list = list.filter(t => t.type === "PRO");
    if (filterType === "Paid Templates") list = list.filter(t => t.type === "PRO");
    if (sort === "popular") list = list.sort((a, b) => b.views - a.views);
    return list;
  }, [search, sort, filterType, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <style>{CARD_STYLE}</style>
      <AuraHeader />

      <main className="flex-grow w-full mt-24">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <AuraFilterBar
            search={search} setSearch={setSearch}
            sort={sort} setSort={setSort}
            activeCategory={activeCategory} setActiveCategory={setActiveCategory}
            filterType={filterType} setFilterType={setFilterType}
          />

          {/* Grid */}
          <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-3 md:gap-4 w-full">
              {filtered.map((t, i) => (
                <AuraTemplateCard key={t.id} template={t} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-neutral-400">
                <p className="text-sm">No templates found</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <AuraFooter />
    </div>
  );
}