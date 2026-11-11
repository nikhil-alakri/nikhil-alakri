"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Server, Globe, Database, Cloud, Terminal, Grid, Orbit, Layers, CheckCircle2 } from "lucide-react";
import PORTFOLIO_DATA from "@/src/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import type { SkillNodeData } from "@/components/three/SkillConstellation";

// Dynamic import 3D Constellation (ssr: false)
const SkillConstellation3D = dynamic(
  () => import("@/components/three/SkillConstellation"),
  { ssr: false }
);

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "AI & Vector Engineering": Sparkles,
  "Full-Stack & Backend APIs": Server,
  "Databases & ORMs": Database,
  "Cloud & Infrastructure": Cloud,
  "Frontend & Design Systems": Globe,
  "Developer Tooling & Automation": Terminal,
};

export default function ExperienceSkills() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [hoveredNode, setHoveredNode] = useState<SkillNodeData | null>(null);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    const checkPref = () => {
      const isMobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isMobile || reducedMotion) {
        setIsMobileOrReduced(true);
        setViewMode("grid");
      }
    };
    checkPref();
    window.addEventListener("resize", checkPref);
    return () => window.removeEventListener("resize", checkPref);
  }, []);

  const categories = PORTFOLIO_DATA.skills;
  const filterList = [
    { id: "all", label: "All Domains" },
    ...categories.map((c) => ({ id: c.title, label: c.title })),
  ];

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.title === activeFilter);

  return (
    <section id="stack" className="py-16 sm:py-24 border-t border-surface-border relative z-10">
      <span id="skills" className="sr-only" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-mint/80 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>05 · Technical Ecosystem</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-headline tracking-[-0.04em] leading-[1.08]">
              Technical Constellation &amp; <span className="font-serif italic text-mint">Domains</span>
            </h2>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 mt-4 md:mt-0 p-1 rounded-full bg-surface/30 border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => setViewMode("3d")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                viewMode === "3d"
                  ? "bg-mint text-background font-semibold shadow-sm"
                  : "text-mutedtext hover:text-headline"
              }`}
              title="Interactive 3D Constellation"
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Orbit</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                viewMode === "grid"
                  ? "bg-mint text-background font-semibold shadow-sm"
                  : "text-mutedtext hover:text-headline"
              }`}
              title="Accessible Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filterList.map((f) => {
            const isSelected = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 backdrop-blur-sm ${
                  isSelected
                    ? "bg-mint text-background font-medium shadow-sm border border-mint"
                    : "bg-surface/30 border border-white/[0.08] text-bodytext hover:text-headline hover:border-mint/40"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3D Skill Constellation View
        ========================================================================= */}
        {viewMode === "3d" ? (
          <div className="space-y-4">
            <SkillConstellation3D
              activeFilter={activeFilter}
              onHoverNode={(node) => setHoveredNode(node)}
            />

            {/* Live Hover Detail Card */}
            <div className="min-h-[64px] p-4 rounded-2xl bg-surface/30 border border-white/[0.08] backdrop-blur-md flex items-center justify-between">
              {hoveredNode ? (
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-[0_0_8px_rgba(94,234,212,0.8)]"
                    style={{ backgroundColor: hoveredNode.color }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-headline text-sm sm:text-base">
                        {hoveredNode.name}
                      </span>
                      <span className="font-mono text-[11px] text-mint px-2 py-0.5 rounded bg-surface border border-mint/20">
                        {hoveredNode.category}
                      </span>
                    </div>
                    <p className="text-xs text-mutedtext mt-0.5 font-sans">
                      {hoveredNode.detail}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-mutedtext">
                  <Sparkles className="w-4 h-4 text-mint animate-pulse" />
                  <span>Hover or tap any floating node in 3D orbit to view architectural usage details.</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* =========================================================================
             Plain Accessible Grid Fallback (Mobile & Reduced-Motion)
          ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.title] || Layers;
              return (
                <div
                  key={cat.title}
                  className="p-6 rounded-2xl bg-surface/85 border border-surface-border hover:border-mint/60 transition-all backdrop-blur-md shadow-lg group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-mint group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-headline text-base sm:text-lg group-hover:text-mint transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-headline group-hover:border-mint/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
