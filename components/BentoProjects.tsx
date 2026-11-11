"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Github, Sparkles, Layers, BookOpen, ExternalLink } from "lucide-react";
import PORTFOLIO_DATA from "@/src/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectModal, { CASE_STUDIES } from "@/components/ProjectModal";

export default function BentoProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = PORTFOLIO_DATA.projects;
  const total = projects.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectId) return; // Modal open, don't interfere
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, selectedProjectId]);

  // Deep-link check on mount (e.g. #project-odin-eye)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#project-")) {
      const id = hash.replace("#project-", "");
      if (CASE_STUDIES[id]) {
        setSelectedProjectId(id);
      }
    }
  }, []);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStartX.current;
    if (diff > 45) {
      handlePrev();
    } else if (diff < -45) {
      handleNext();
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-surface-border relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-mint/80 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>04 · Selected Works</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-headline tracking-[-0.04em] leading-[1.08]">
              Featured Systems &amp; <span className="font-serif italic text-mint">Creations</span>
            </h2>
          </div>
          <p className="text-mutedtext text-sm sm:text-base max-w-md mt-3 md:mt-0 leading-relaxed font-sans">
            Enterprise platforms, AI reverse-engineering engines, and high-concurrency production applications arranged in 3D depth.
          </p>
        </ScrollReveal>

        {/* 3D Coverflow Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center py-6 select-none cursor-grab active:cursor-grabbing [perspective:1400px]"
        >
          {projects.map((proj, idx) => {
            // Distance from active index (-2, -1, 0, 1, 2, etc.)
            let offset = idx - activeIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // 3D Coverflow Transforms
            const rotateY = offset * -24;
            const translateZ = -Math.abs(offset) * 120;
            const translateX = offset * 260; // spacing in px
            const scale = 1 - Math.abs(offset) * 0.12;
            const opacity = isActive ? 1 : Math.max(0.3, 0.75 - Math.abs(offset) * 0.25);
            const zIndex = 20 - Math.abs(offset);

            const caseStudy = CASE_STUDIES[proj.id] || null;
            const oneLiner = caseStudy?.oneLiner || proj.description;

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
                className={`absolute w-[90vw] sm:w-[480px] lg:w-[540px] rounded-3xl border transition-all duration-500 ease-out p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between ${
                  isActive
                    ? "bg-surface/65 border-mint/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-default"
                    : "bg-surface/25 border-white/[0.08] hover:border-mint/30 cursor-pointer"
                }`}
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-mint px-2.5 py-0.5 rounded-full bg-surface/50 border border-mint/20 uppercase tracking-wider">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-mutedtext">
                      0{idx + 1} / 0{total}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-headline mb-3 tracking-tight">
                    {proj.title}
                  </h3>

                  {/* Outcome statement */}
                  <p className="text-sm sm:text-base text-bodytext leading-relaxed mb-6 font-sans">
                    {oneLiner}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface border border-surface-border text-headline"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-surface-border/60">
                    <div className="flex items-center gap-2">
                      {/* Case Study Modal Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(proj.id);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-mint text-background text-xs sm:text-sm font-semibold hover:bg-mint-dark transition-all shadow-md shadow-mint/10"
                        title="Open Architectural Case Study"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Case Study</span>
                      </button>

                      {/* Live Link */}
                      {proj.path && (
                        <a
                          href={proj.path}
                          target={proj.path.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-headline text-xs sm:text-sm font-medium hover:border-mint transition-colors"
                          title="Launch App / Page"
                        >
                          <span>{proj.path.startsWith("http") ? "Live App" : "Explore"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-mint" />
                        </a>
                      )}
                    </div>

                    {/* GitHub Link */}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-xl bg-surface border border-surface-border text-mutedtext hover:text-headline hover:border-mint transition-colors"
                        aria-label={`View ${proj.title} on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coverflow Navigation Bar */}
        <div className="flex items-center justify-between mt-6 max-w-sm mx-auto px-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-surface-elevated border border-surface-border text-headline hover:border-mint hover:text-mint transition-colors"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-6 h-2 bg-mint shadow-[0_0_8px_rgba(94,234,212,0.8)]"
                    : "w-2 h-2 bg-mutedtext/40 hover:bg-mutedtext"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-surface-elevated border border-surface-border text-headline hover:border-mint hover:text-mint transition-colors"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Full-Screen Case Study Modal */}
        <ProjectModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      </div>
    </section>
  );
}
