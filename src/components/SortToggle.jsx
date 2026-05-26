import React from "react";
import { LayoutGrid, Clock } from "lucide-react";

export default function SortToggle({ active, onChange }) {
  return (
    <div className="flex items-center bg-secondary/60 border border-border/30 rounded-lg overflow-hidden">
      <button
        onClick={() => onChange("popular")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
          active === "popular"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Popular
      </button>
      <button
        onClick={() => onChange("recent")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
          active === "recent"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Clock className="w-3.5 h-3.5" />
        Recent
      </button>
    </div>
  );
}