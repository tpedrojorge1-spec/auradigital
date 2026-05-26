import React from "react";
import { ChevronUp, Twitter, Github } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";

const FOOTER_COLS = [
  { title: "PRODUCT", links: ["Create", "Templates", "Components", "Assets", "Pricing", "Changelog"] },
  { title: "RESOURCES", links: ["Introduction", "How to Prompt", "How to Edit", "SEO Settings", "Sell Templates", "Affiliates", "FAQ"] },
  { title: "COMPANY", links: ["About", "Blog", "Careers", "Press"] },
  { title: "LEGAL", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
];

export default function AuraFooter() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-100 dark:border-neutral-800 py-12 md:py-16 m-4 rounded-2xl relative">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute top-8 right-8 bg-neutral-100 dark:bg-neutral-900 rounded-xl p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
      >
        <ChevronUp className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
      </button>

      <div className="container px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12 gap-8">
          {/* Left */}
          <div className="max-w-xs">
            <img src={LOGO_URL} alt="Aura" className="h-16 w-16 rounded-2xl object-cover mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI landing page builder that creates stunning designs in seconds. No design skills needed. Export to HTML & Figma. Trusted by 177,000+ users worldwide.
            </p>
          </div>

          {/* Cols */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-thin mb-3 text-[10px] text-neutral-500 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors relative group">
                        {l}
                        <span className="absolute bottom-[-1px] left-0 w-0 group-hover:w-full h-[1px] bg-foreground transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-8" />
        <div className="flex justify-between items-center pt-6">
          <p className="text-xs text-muted-foreground">© 2025 Aura NOT 3. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}