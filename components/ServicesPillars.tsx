"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import PORTFOLIO_DATA, { PillarItem } from "@/src/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import PillarDetailModal from "@/components/PillarDetailModal";
import { getPillarMotif } from "@/components/PillarMotifs";
import { soundManager } from "@/lib/audio";

// Dynamic import for R3F 3D Carousel (ssr: false, zero hydration lag)
const PillarCarousel3D = dynamic(
  () => import("@/components/three/PillarCarousel3D"),
  { ssr: false }
);

export default function ServicesPillars() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    const checkPrefs = () => {
      const isMobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobileOrReduced(isMobile || reducedMotion);
    };
    checkPrefs();
    window.addEventListener("resize", checkPrefs);
    return () => window.removeEventListener("resize", checkPrefs);
  }, []);

  return (
    <section
      id="pillars"
      className="py-16 sm:py-24 border-t border-surface-border relative z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal
          animation="fadeUp"
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14"
        >
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-mint/90 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>01 · Engineering Philosophy</span>
            </div>
            <h2 className="font-display font-light text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-headline leading-[1.05]">
              Architectural <span className="font-serif italic text-mint">Pillars</span>
            </h2>
          </div>
          <p className="text-bodytext/80 text-sm sm:text-base max-w-md mt-4 md:mt-0 leading-relaxed font-light">
            Specialized UI platforms, HIPAA clinical design systems, and multimodal AI accelerators engineered for measurable scale.
          </p>
        </ScrollReveal>

        {/* =========================================================================
            1. DESKTOP / HIGH-END: 3D Tilted Card Carousel in R3F
        ========================================================================= */}
        {!isMobileOrReduced ? (
          <ScrollReveal animation="scaleUp" delay={0.05}>
            <PillarCarousel3D onSelectPillar={(num) => setSelectedPillar(num)} />
          </ScrollReveal>
        ) : (
          /* =========================================================================
              2. ACCESSIBILITY FALLBACK: Mobile / Reduced Motion Horizontal Snap List
          ========================================================================= */
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Architectural Pillars Cards"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 -mx-4 px-4 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent)]"
          >
            {PORTFOLIO_DATA.pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="snap-center shrink-0 w-[84vw] max-w-[340px] p-6 rounded-2xl bg-surface/40 border border-white/[0.08] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-mint px-2.5 py-0.5 rounded-full bg-surface border border-mint/20">
                      Pillar {pillar.num}
                    </span>
                    <div className="p-1.5 rounded-xl bg-surface border border-white/[0.06] text-mint">
                      {getPillarMotif(pillar.num)}
                    </div>
                  </div>

                  <h3 className="font-display font-light text-xl text-headline mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-bodytext leading-relaxed font-light mb-6">
                    {pillar.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-mutedtext">
                    {pillar.deliverables.length} Deliverables
                  </span>

                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setSelectedPillar(pillar.num);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint text-background text-xs font-mono font-medium hover:bg-mint-dark transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pillar Detail Modal (Opens when Explore is clicked) */}
      <PillarDetailModal
        pillarNum={selectedPillar}
        onClose={() => setSelectedPillar(null)}
      />
    </section>
  );
}
