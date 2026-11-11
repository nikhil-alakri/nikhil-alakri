"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Copy, Check, FileDown, Eye, ArrowUpRight } from "lucide-react";
import PORTFOLIO_DATA from "@/src/data/portfolio";
import { soundManager } from "@/lib/audio";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { y: 10, opacity: 0.85 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    soundManager.playClickSound();
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCtaHover = () => {
    soundManager.playHoverSound();
    window.dispatchEvent(
      new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
    );
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-8 sm:pt-14 pb-12 sm:pb-16 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col justify-between">
        
        {/* Top / Main Hero Row: Left Typography Statement, Right 3D Spatial Void */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
          {/* Left Column: Big Statement Sentence (Editorial Light Grotesk + Italic Serif Accent) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Tiny Monospace Availability Coordinate */}
            <div className="hero-fade mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-mint/90">
                {PORTFOLIO_DATA.personal.availability}
              </span>
            </div>

            {/* Big Statement Sentence */}
            <h1 className="hero-fade font-display font-light text-4xl sm:text-6xl lg:text-7xl xl:text-[4.75rem] tracking-[-0.04em] leading-[1.04] text-headline mb-6">
              I build <span className="font-serif italic text-mint">high-performance</span> interfaces and AI systems for healthcare and the web.
            </h1>

            {/* Tiny Uppercase Tags Line */}
            <p className="hero-fade text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-mutedtext mb-8 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="text-headline/90 font-medium">Healthcare UI</span>
              <span className="text-white/20">/</span>
              <span className="text-headline/90 font-medium">AI Accelerators</span>
              <span className="text-white/20">/</span>
              <span className="text-headline/90 font-medium">Performance</span>
              <span className="text-white/20">/</span>
              <span className="text-headline/90 font-medium">Full-Stack</span>
            </p>

            {/* Minimal Essential Actions */}
            <div className="hero-fade flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#pillars"
                onMouseEnter={handleCtaHover}
                className="magnetic inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-mint text-background font-medium hover:bg-mint-dark transition-all text-sm tracking-tight will-change-transform shadow-md shadow-mint/10"
              >
                <span>Explore Playbook</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                download="Nikhil-Alakri-Resume.pdf"
                onMouseEnter={handleCtaHover}
                className="magnetic inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-surface/40 border border-white/[0.08] hover:border-mint/50 text-headline font-normal transition-colors text-sm tracking-tight will-change-transform"
                title="Download Official Resume PDF"
              >
                <FileDown className="w-4 h-4 text-mint" />
                <span>Download CV</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="magnetic inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/[0.08] text-mutedtext hover:text-headline hover:border-mint/40 transition-colors text-xs font-mono will-change-transform"
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-mint" />
                    <span className="text-mint font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-mint" />
                    <span>{PORTFOLIO_DATA.contact.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: 3D Spatial Framing (Transparent stage, robot sits here cleanly) */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[420px] lg:h-[500px] flex items-center justify-center pointer-events-none">
            {/* Zero DOM clutter, robot renders natively in background canvas */}
          </div>
        </div>

        {/* Bottom Bar: Quiet Metric Numbers (No bulky boxes) + Thin Scroll Indicator */}
        <div className="hero-fade pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Quiet Metrics Numbers Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 max-w-2xl">
            {PORTFOLIO_DATA.stats.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-headline tracking-[-0.03em]">
                  {s.value}
                </span>
                <span className="text-[11px] font-mono text-mutedtext uppercase tracking-wider mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Thin Scroll Indicator Bottom-Right/Left */}
          <a
            href="#pillars"
            className="group inline-flex items-center gap-3 text-xs font-mono text-mutedtext hover:text-mint transition-colors tracking-widest uppercase cursor-pointer py-1"
            aria-label="Scroll to Architectural Pillars"
          >
            <span>Scroll</span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-mint/20 via-mint to-mint rounded-full group-hover:h-8 transition-all" />
            <ArrowDown className="w-3.5 h-3.5 text-mint group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
