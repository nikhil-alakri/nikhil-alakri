"use client";

import { useState, useRef, useEffect } from "react";
import { Building2, MapPin, Calendar, Award, CheckCircle2, ChevronRight, Briefcase } from "lucide-react";
import PORTFOLIO_DATA, { ExperienceItem } from "@/src/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal";

export default function ExperienceTimeline() {
  const [activeId, setActiveId] = useState<string>("citiustech");
  const timelineRef = useRef<HTMLDivElement>(null);

  // Dispatch active role change for 3D scene reactivity
  const handleSelectRole = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio:role-change", { detail: { roleId: id } }));
    }
  };

  return (
    <section id="career" className="py-16 sm:py-24 border-t border-surface-border relative z-10">
      <span id="experience" className="sr-only" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal
          animation="fadeUp"
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16"
        >
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-mint/80 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>03 · Career Journey</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-headline tracking-[-0.04em] leading-[1.08]">
              Chronology of Engineering <span className="font-serif italic text-mint">Growth</span>
            </h2>
          </div>
          <p className="text-mutedtext text-sm sm:text-base max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
            7+ years architecting enterprise design systems, healthtech platforms, and high-concurrency production systems.
          </p>
        </ScrollReveal>

        {/* =========================================================================
            1. MOBILE: Horizontal Swipeable Timeline (with snap)
        ========================================================================= */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 -mx-4 px-4 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent)]">
            {PORTFOLIO_DATA.experience.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectRole(item.id)}
                  className={`snap-center shrink-0 w-[84vw] max-w-[340px] p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                    isActive
                      ? "bg-surface/60 border-mint/40 shadow-lg shadow-black/20"
                      : "bg-surface/30 border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-mint px-2.5 py-0.5 rounded-full bg-surface border border-mint/20">
                      {item.year}
                    </span>
                    {item.metrics && (
                      <span className="text-[10px] font-mono text-bodytext px-2 py-0.5 rounded bg-surface/80 border border-surface-border">
                        {item.metrics}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold text-headline mb-0.5">
                    {item.role}
                  </h3>
                  <p className="text-xs font-semibold text-mint flex items-center gap-1 mb-2">
                    <Building2 className="w-3 h-3" />
                    <span>{item.company}</span>
                  </p>
                  <p className="text-xs text-bodytext leading-relaxed mb-4">
                    {item.tagline}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-4">
                    {item.achievements.slice(0, 2).map((ach, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-bodytext leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-surface-border text-mutedtext"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] font-mono text-mutedtext mt-1">
            ← Swipe to explore career trajectory →
          </p>
        </div>

        {/* =========================================================================
            2. DESKTOP: Vertical Interactive Timeline with Glowing Axis Line
        ========================================================================= */}
        <div ref={timelineRef} className="hidden md:block relative pl-10 lg:pl-12">
          {/* Glowing Vertical Axis Line */}
          <div
            className="absolute left-3.5 top-3 bottom-8 w-[1px] bg-gradient-to-b from-mint via-mint/40 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-6 max-w-3xl">
            {PORTFOLIO_DATA.experience.map((item, idx) => {
              const isActive = activeId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectRole(item.id)}
                  className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
                    isActive
                      ? "bg-surface/60 border-mint/40 shadow-xl shadow-black/20"
                      : "bg-surface/25 border-white/[0.08] hover:border-mint/30 hover:bg-surface/40"
                  }`}
                >
                  {/* Timeline Glowing Node on Axis */}
                  <div
                    className={`absolute -left-[35px] lg:-left-[43px] top-6 w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "bg-mint border-white shadow-[0_0_12px_rgba(92,242,214,0.8)] scale-110"
                        : "bg-background border-mint/40 group-hover:border-mint group-hover:scale-105"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? "bg-background" : "bg-mint"
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    {/* Header Row */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-mint px-2.5 py-0.5 rounded-full bg-surface/50 border border-mint/20">
                          {item.year}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-light text-headline group-hover:text-mint transition-colors tracking-tight">
                          {item.role}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.metrics && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-mint px-3 py-1 rounded-full bg-surface border border-surface-border">
                            <Award className="w-3.5 h-3.5" />
                            <span>{item.metrics}</span>
                          </span>
                        )}
                        <span className="text-xs font-mono text-mutedtext flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Company Tagline */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-headline mb-2">
                      <Building2 className="w-4 h-4 text-mint" />
                      <span>{item.company}</span>
                    </div>
                    <p className="text-sm text-bodytext mb-4 leading-relaxed font-sans">
                      {item.tagline}
                    </p>

                    {/* Expandable Responsibilities & Technical Highlights */}
                    <div className="pt-3 border-t border-surface-border/60">
                      <ul className="space-y-2 mb-4">
                        {(isActive ? item.achievements : item.achievements.slice(0, 2)).map(
                          (ach, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-bodytext leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          )
                        )}
                      </ul>

                      {/* Expand prompt when inactive */}
                      {!isActive && item.achievements.length > 2 && (
                        <p className="text-xs font-mono text-mint hover:underline mb-3">
                          + {item.achievements.length - 2} more architectural contributions (click to expand)
                        </p>
                      )}

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-mutedtext mr-1">Stack:</span>
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface border border-surface-border text-headline group-hover:border-mint/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
