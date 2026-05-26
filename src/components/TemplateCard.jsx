import React from "react";
import { motion } from "framer-motion";

export default function TemplateCard({ template, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary/40 border border-border/30 mb-3">
        <img
          src={template.image}
          alt={template.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge */}
        {template.badge && (
          <div className="absolute top-3 right-3">
            <span className={`
              px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase
              ${template.badge === "PRO" 
                ? "bg-primary/90 text-primary-foreground backdrop-blur-sm" 
                : "bg-foreground/90 text-background backdrop-blur-sm"
              }
            `}>
              {template.badge}
            </span>
          </div>
        )}

        {/* React badge */}
        {template.isReact && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 backdrop-blur-sm">
              React
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-sm font-medium text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {template.title}
      </h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-secondary overflow-hidden flex-shrink-0">
            {template.authorAvatar ? (
              <img src={template.authorAvatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-muted-foreground">
                {template.author?.[0]}
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">{template.author}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {template.hasRemix && (
            <span className="text-[10px] text-primary/80 font-medium">Remix</span>
          )}
          <span className="text-[10px]">•</span>
          <span className="text-[10px]">{template.remixes}</span>
        </div>
      </div>
    </motion.div>
  );
}