import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search templates..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 pl-11 pr-4 bg-secondary/60 border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 backdrop-blur-sm transition-all"
      />
    </div>
  );
}