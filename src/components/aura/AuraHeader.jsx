import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import { Link } from "react-router-dom";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";

const NAV_LINKS = ["CREATE","TEMPLATES","COMPONENTS","ASSETS","SKILLS","DESIGN.MD","LEARN","PRICING"];

export default function AuraHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeOptions = [
    { key: "light", icon: Sun },
    { key: "system", icon: Monitor },
    { key: "dark", icon: Moon },
  ];

  const sliderPos = { light: "translate-x-[1px]", system: "translate-x-[25px]", dark: "translate-x-[49px]" };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${
      scrolled ? "py-1.5 shadow-md" : "py-1 sm:py-2 lg:py-4"
    } px-0 sm:px-2 lg:px-12 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-neutral-100 dark:border-neutral-800`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/aura" className="flex items-center gap-2 group">
          <img
            src={LOGO_URL}
            alt="Aura"
            className="h-10 w-10 p-1 rounded-xl object-cover transition-all duration-200 group-hover:ring-2 group-hover:ring-violet-500/20 group-hover:ring-offset-2"
          />
          <span className="font-semibold text-sm hidden sm:block text-neutral-900 dark:text-white">Aura NOT 3</span>
        </Link>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 px-4 py-2 rounded-md relative group">
              {l}
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-violet-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="hidden xl:flex relative h-6 w-auto bg-neutral-50 dark:bg-neutral-900 px-0.5 py-1 rounded-full border border-neutral-200/50 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors">
            <div className={`absolute h-[20px] w-6 top-[1px] rounded-full bg-white dark:bg-neutral-700 shadow-sm transition-all duration-200 ease-in-out ${sliderPos[theme]}`} />
            {themeOptions.map(({ key, icon: Icon }) => (
              <button key={key} onClick={() => setTheme(key)} className="relative z-10 h-4 w-6 rounded-full flex items-center justify-center transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
                <Icon className="h-3 w-3" />
              </button>
            ))}
          </div>
          <button className="rounded-xl h-10 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-300">
            SIGN IN
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-100 dark:border-neutral-800 px-6 py-4 space-y-2">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" onClick={() => setMobileOpen(false)}
              className="block text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white py-2 border-b border-neutral-100 dark:border-neutral-800">
              {l}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            {themeOptions.map(({ key, icon: Icon }) => (
              <button key={key} onClick={() => setTheme(key)}
                className={`p-2 rounded-lg transition-colors ${theme === key ? "bg-violet-100 dark:bg-violet-950/50 text-violet-600" : "text-neutral-500 hover:text-neutral-900"}`}>
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}