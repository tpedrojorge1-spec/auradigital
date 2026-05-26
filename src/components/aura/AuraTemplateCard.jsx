import React from "react";
import { Shuffle, Eye } from "lucide-react";
import { formatViews, getCardBg } from "@/lib/templatesData";

export default function AuraTemplateCard({ template, index, isAdmin = false }) {
  const slug = template.title.toLowerCase().replace(/\s+/g, "-").slice(0, 30);
  const bg = getCardBg(template.id);
  const initials = template.author.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const imgUrl = `https://placehold.co/400x300/${bg.replace("#", "")}/${template.type === "PRO" ? "7c3aed" : "374151"}?text=${encodeURIComponent(template.id)}`;

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 bg-white/20 dark:bg-black/20 group flex flex-col transition-all duration-300"
      style={{
        animationDelay: `${index * 80}ms`,
        animation: "cardEnter 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        boxShadow: undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.08), 0 2px 8px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden cursor-pointer rounded-xl aspect-[4/3]">
        <img
          src={imgUrl}
          alt={template.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] rounded-xl"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

        {/* Admin action overlay */}
        {isAdmin && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {["Edit", "Preview", "Delete"].map((action) => (
              <button key={action} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${action === "Delete" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white/90 hover:bg-white text-neutral-900"}`}>
                {action}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm mt-auto">
        <div className="flex items-center gap-2">
          <p className="text-xs text-black dark:text-white truncate font-medium flex-1">{template.title}</p>
          {template.type === "PRO" && (
            <span
              className="text-[10px] text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded-md font-medium cursor-help flex-shrink-0 transition-colors"
              style={{
                background: "linear-gradient(90deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.18) 40%, rgba(124,58,237,0.08) 80%)",
                backgroundSize: "200% auto",
                animation: "shimmerBadge 2.5s linear infinite",
              }}
              title="Premium Template"
            >
              PRO
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center transition-opacity hover:opacity-80">
            <div className="relative flex shrink-0 overflow-hidden rounded-full h-4 w-4 mr-1.5 bg-violet-200 dark:bg-violet-900">
              <span className="text-[8px] font-medium text-violet-700 dark:text-violet-300 flex items-center justify-center w-full h-full">{initials}</span>
            </div>
            <span className="text-[10px] text-neutral-600 dark:text-neutral-400 truncate max-w-[100px] hidden sm:block">{template.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="remix-btn flex items-center text-[10px] text-neutral-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group/remix">
              <Shuffle className="h-3 w-3 mr-1 transition-transform duration-300 group-hover/remix:rotate-180" />
              {template.remixes}
            </button>
            <span className="hidden sm:block text-[8px] text-neutral-300 dark:text-neutral-700 mx-0.5">•</span>
            <div className="flex items-center text-[10px] text-neutral-500 group/eye">
              <Eye className="h-3 w-3 mr-1 transition-transform duration-200 group-hover/eye:scale-125" />
              {formatViews(template.views)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}