import React, { useState } from "react";
import PurpleRaysBackground from "../components/PurpleRaysBackground";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryPills from "../components/CategoryPills";
import TemplateCard from "../components/TemplateCard";
import TypeFilter from "../components/TypeFilter";
import SortToggle from "../components/SortToggle";

const TEMPLATES = [
  {
    title: "Novi SaaS Social Automation Platform Template",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Sourasith Phomhome",
    hasRemix: true,
    remixes: "1.0K",
  },
  {
    title: "Elara Footwear Atelier E-commerce Template",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    badge: "PRO",
    isReact: true,
    author: "Aksonvady Phomhome",
    hasRemix: true,
    remixes: "588",
  },
  {
    title: "AI Interior Design Studio Homepage Template",
    image: "https://images.unsplash.com/photo-1618556450994-a163528e1d0e?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Sam",
    hasRemix: true,
    remixes: "1.1K",
  },
  {
    title: "ARES Protocol Interplanetary Expedition Template",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Meng Para",
    hasRemix: true,
    remixes: "476",
  },
  {
    title: "Pulsedesk SaaS Landing Page Template",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Sourasith Phomhome",
    hasRemix: true,
    remixes: "1.2K",
  },
  {
    title: "Cognix Brain Training Platform Template",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    isReact: true,
    author: "Aksonvady Phomhome",
    hasRemix: false,
    remixes: "725",
  },
  {
    title: "Auric AI Fintech Landing Page Template",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Meng Para",
    hasRemix: true,
    remixes: "782",
  },
  {
    title: "Aurel Luxury Hospitality Landing Page Template",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Meng Para",
    hasRemix: true,
    remixes: "672",
  },
  {
    title: "Mira SaaS Landing Page Template",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    badge: "$39",
    author: "Sourasith Phomhome",
    hasRemix: false,
    remixes: "639",
  },
  {
    title: "Luxury Furniture Landing Page Template",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    badge: "PRO",
    isReact: true,
    author: "Meng Para",
    hasRemix: true,
    remixes: "929",
  },
  {
    title: "Echelon High-End Event Agency Template",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Sam",
    hasRemix: true,
    remixes: "671",
  },
  {
    title: "SonicLink Audio Synchrony SaaS Template",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    badge: "$39",
    author: "Aksonvady Phomhome",
    hasRemix: false,
    remixes: "801",
  },
  {
    title: "VISTA Luxury Real Estate Landing Template",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    badge: "PRO",
    isReact: true,
    author: "Aksonvady Phomhome",
    hasRemix: false,
    remixes: "707",
  },
  {
    title: "NovaStudio Creative Agency Template",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    badge: "PRO",
    author: "Sourany Phomhome",
    hasRemix: true,
    remixes: "727",
  },
  {
    title: "Nebula Web3 React Landing Page Template",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    badge: "PRO",
    isReact: true,
    author: "Meng Para",
    hasRemix: true,
    remixes: "1.0K",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filtered = TEMPLATES.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen relative">
      <PurpleRaysBackground />
      <div className="relative z-10">
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Search + Sort */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <SortToggle active={sortBy} onChange={setSortBy} />
          </div>

          {/* Categories + Type Filter */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <CategoryPills active={activeCategory} onSelect={(c) => setActiveCategory(c === activeCategory ? "" : c)} />
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-muted-foreground hidden lg:block">Mine</span>
              <TypeFilter active={typeFilter} onSelect={setTypeFilter} />
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((template, i) => (
              <TemplateCard key={i} template={template} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">No templates found</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border/30 mt-16">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="col-span-2 md:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mb-4">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                  AI landing page builder that creates stunning designs in seconds. No design skills needed.
                </p>
              </div>
              {[
                { title: "PRODUCT", items: ["Create", "Templates", "Components", "Assets", "Pricing"] },
                { title: "RESOURCES", items: ["Introduction", "How to Prompt", "How to Edit", "SEO Settings"] },
                { title: "TOOLS", items: ["Mobbin", "Screen Studio", "Courses", "UI Kit"] },
                { title: "CONNECT", items: ["Privacy", "Terms", "Support", "LinkedIn"] },
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="text-[10px] font-semibold tracking-widest text-muted-foreground mb-4">{section.title}</h4>
                  <ul className="space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item}>
                        <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}