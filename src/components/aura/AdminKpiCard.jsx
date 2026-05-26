import React, { useEffect, useRef, useState } from "react";

export default function AdminKpiCard({ label, value, delta, deltaPositive, icon: Icon, iconColor }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const numericValue = typeof value === "number" ? value : parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const start = performance.now();
        const update = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setDisplayed(Math.floor(ease * numericValue));
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  const formattedDisplay = () => {
    if (typeof value === "string" && value.includes("k")) {
      return displayed >= 1000 ? (displayed / 1000).toFixed(1) + "k" : displayed.toString();
    }
    return displayed.toLocaleString();
  };

  return (
    <div ref={ref} className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl p-5">
      <div className="flex justify-between items-start">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wide">{label}</p>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-neutral-900 dark:text-white mt-2">{formattedDisplay()}</p>
      <p className={`text-xs mt-1 ${deltaPositive ? "text-emerald-600" : "text-red-500"}`}>
        {deltaPositive ? "▲" : "▼"} {delta} <span className="text-neutral-400">vs. last month</span>
      </p>
    </div>
  );
}