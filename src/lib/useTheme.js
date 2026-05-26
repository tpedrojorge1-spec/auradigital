import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("aura-theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // system
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      isDark ? root.classList.add("dark") : root.classList.remove("dark");
    }
    localStorage.setItem("aura-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}