"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Copy, Check, FileDown, Terminal } from "lucide-react";
import { SITE_URLS } from "@/config/urls";
import DynamicThreeModel from "@/components/DynamicThreeModel";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TextScramble from "@/components/TextScramble";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "+7 Yrs", label: "Enterprise Experience", sub: "Clinical & FinTech UI" },
  { value: "100/100", label: "Lighthouse Certified", sub: "WCAG AA Compliant" },
  { value: "+20%", label: "Speed Improvement", sub: "Core Web Vitals Boost" },
  { value: "80%", label: "Roadmap Shipped", sub: "High-Velocity Delivery" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle entrance for action buttons without opacity suppression (zero LCP delay)
      gsap.fromTo(
        ".hero-actions",
        { y: 8 },
        { y: 0, duration: 0.4, ease: "power2.out", clearProps: "all" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_URLS.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={containerRef} className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Availability Badge Row */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2.5">
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-surface/90 border border-accent/30 text-accent backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-status animate-status-pulse shrink-0" />
            <span>Available for Roles &amp; High-Impact Collaborations</span>
          </div>
          <span className="inline-flex items-center text-xs text-bodytext font-medium px-3 py-1 rounded-full bg-surface/70 border border-surface-border">
            📍 Maharashtra, India · Senior Software Engineer
          </span>
        </div>

        {/* 2-Column Hero Grid (Text Left, Three.js 3D Viewport Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
          
          {/* Left Column (Editorial Identity & Typography) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1
              className="hero-title font-primary text-4xl sm:text-6xl md:text-7xl font-bold leading-none tracking-normal text-headline mb-4"
              style={{ opacity: 1, visibility: "visible" }}
            >
              Nikhil Alakri
            </h1>

            <p className="hero-role text-lg sm:text-2xl font-medium text-accent mb-4 flex items-center gap-2.5">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-bodytext shrink-0" />
              <TextScramble
                text="Senior Software Engineer @ CitiusTech"
                trigger="inView"
                duration={1200}
                className="font-medium"
              />
            </p>

            <p className="hero-bio text-base sm:text-lg text-bodytext max-w-xl leading-relaxed mb-6 sm:mb-8">
              7+ years architecting enterprise design systems, high-performance UI platforms, and multimodal AI accelerators. 
              Specializing in <span className="text-headline font-semibold">Lit &amp; React component libraries</span>, 
              strict <span className="text-headline font-semibold">WCAG AA accessibility</span>, and sub-second 
              Core Web Vitals in regulated environments.
            </p>

            {/* Action Buttons with magnetic physics */}
            <div className="hero-actions flex flex-wrap items-center gap-3">
              <a
                href={SITE_URLS.nav.projects}
                className="magnetic inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-semibold hover:bg-accent transition-colors shadow-md shadow-black/20 text-center text-sm will-change-transform"
              >
                Explore Projects
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={SITE_URLS.resume}
                download="Nikhil_Alakri_Resume_CitiusTech.pdf"
                className="magnetic inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface border border-accent/40 text-headline font-semibold hover:bg-surface-elevated hover:border-accent transition-colors text-center text-sm will-change-transform"
                title="Download Official Resume PDF"
              >
                <FileDown className="w-4 h-4 text-accent" />
                <span>Download CV</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="magnetic inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface border border-surface-border text-headline font-medium hover:bg-surface-elevated hover:border-accent transition-colors text-center text-sm will-change-transform"
                title="Click to copy email"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-status" />
                    <span className="text-status text-xs sm:text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-accent" />
                    <span className="text-xs sm:text-sm truncate">{SITE_URLS.contact.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column (Three.js 3D Interactive Stage) */}
          <div className="lg:col-span-5 relative" data-3d-stage="true">
            <DynamicThreeModel />
          </div>
        </div>

        {/* Impact Numbers Grid with Animated Counters and Scroll Stagger */}
        <ScrollReveal animation="fadeUp" stagger={0.08} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-border hover:border-accent transition-all group spotlight-card"
            >
              <span className="font-primary text-2xl sm:text-3xl md:text-4xl font-bold text-headline group-hover:text-accent transition-colors block mb-1">
                <AnimatedCounter value={s.value} duration={1600} delay={idx * 120} />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-headline block">
                {s.label}
              </span>
              <span className="text-[11px] font-mono text-bodytext block">
                {s.sub}
              </span>
            </div>
          ))}
        </ScrollReveal>

        {/* Interactive CLI Terminal (whoami.ts) */}
        <ScrollReveal animation="scaleUp" delay={0.1}>
          <InteractiveTerminal />
        </ScrollReveal>
      </div>
    </section>
  );
}
