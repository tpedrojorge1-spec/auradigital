import React from "react";

const categories = [
  "SaaS", "Portfolio", "E-commerce", "Services", "Food", "Real Estate", "Health", "Paid Templates"
];

export default function CategoryPills({ active, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
            ${active === cat 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/30"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}