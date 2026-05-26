import React from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/60">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span className="font-semibold text-foreground tracking-tight hidden sm:block">Aura</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["CREATE", "TEMPLATES", "COMPONENTS", "ASSETS", "SKILLS", "LEARN", "PRICING"].map((item) => (
            <span
              key={item}
              className="text-[11px] font-medium tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
              <div className="w-4 h-4 rounded-full border border-muted-foreground/40" />
            </button>
          </div>
          <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            SIGN IN
          </span>
        </div>
      </div>
    </nav>
  );
}