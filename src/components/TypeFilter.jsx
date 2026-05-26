import React, { useState } from "react";
import { ChevronDown, Grid3X3 } from "lucide-react";

const types = [
  "All", "Free Templates", "Pro Templates", "Paid Templates", 
  "Featured Creators", "Community", "Upcoming", "Web", "Mobile", "Animation"
];

export default function TypeFilter({ active, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Grid3X3 className="w-3.5 h-3.5" />
        <span>{active}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-50 w-48 py-1 bg-card border border-border rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => { onSelect(type); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                  active === type 
                    ? "text-primary bg-accent/40" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}