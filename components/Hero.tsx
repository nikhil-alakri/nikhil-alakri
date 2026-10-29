"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Copy, Check, ExternalLink, Terminal, Sparkles } from "lucide-react";

const displayFonts = [
  { name: "DynaPuff", className: "font-dynapuff" },
  { name: "Shrikhand", className: "font-shrikhand" },
  { name: "Gluten", className: "font-gluten" },
  { name: "Modak", className: "font-modak" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [activeFont, setActiveFont] = useState(displayFonts[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hardware-accelerated micro-movement without any opacity suppression
      // Ensures above-the-fold content paints instantly for 100% Core Web Vitals & sub-1.5s LCP.
      gsap.fromTo(
        ".hero-actions",
        { y: 6 },
        { y: 0, duration: 0.4, ease: "power2.out", clearProps: "all" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nikhilalakri@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={containerRef} className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Availability Badge & Font Preview Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-surface/90 border border-accent/30 text-accent backdrop-blur-md self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-status animate-status-pulse shrink-0" />
            <span>Available for Roles & Collaborations</span>
          </div>

          {/* Interactive Font Preview Tester (Responsive horizontal pill) */}
          <div className="hero-font-picker inline-flex items-center gap-1 p-1 rounded-xl bg-surface/85 border border-surface-border text-xs self-start sm:self-auto overflow-x-auto max-w-full">
            <span className="flex items-center gap-1 px-2 text-[11px] font-mono text-mutedtext shrink-0">
              <Sparkles className="w-3 h-3 text-accent" />
              Font:
            </span>
            <div className="flex items-center gap-1">
              {displayFonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setActiveFont(font)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                    activeFont.name === font.name
                      ? "bg-accent text-background font-bold shadow-sm"
                      : "text-bodytext hover:text-headline hover:bg-surface-elevated"
                  }`}
                  style={{ fontFamily: `'${font.name}', cursive, sans-serif` }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Name in Selected Display Font (SSR painted immediately, zero LCP delay) */}
        <h1
          className={`hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-normal text-headline mb-4 transition-all duration-300 break-words ${activeFont.className}`}
          style={{
            letterSpacing: activeFont.name === "Modak" ? "0.02em" : "normal",
            opacity: 1,
            visibility: "visible",
          }}
        >
          Nikhil Alakri
        </h1>

        <p className="hero-role text-lg sm:text-2xl font-medium text-accent mb-4 sm:mb-6 flex items-center gap-2.5">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-bodytext shrink-0" />
          <span>Software Engineer & Open Source Builder</span>
        </p>

        <p className="hero-bio text-base sm:text-lg text-bodytext max-w-2xl leading-relaxed mb-8 sm:mb-10">
          Specializing in scalable distributed systems, high-throughput cloud infrastructure,
          and intuitive developer tooling. Passionate about architecting resilient services, 
          open-source software, and crafting high-performance digital experiences.
        </p>

        {/* Action Buttons: Responsive stack on mobile, row on desktop */}
        <div className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-background font-semibold hover:bg-accent transition-all shadow-md shadow-black/20 text-center"
          >
            Explore Projects
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-surface border border-surface-border text-headline font-medium hover:bg-surface-elevated hover:border-accent transition-all text-center"
            title="Click to copy email"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-status" />
                <span className="text-status">Copied to clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-accent" />
                <span className="truncate">nikhilalakri@gmail.com</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-accent transition-all text-center"
          >
            GitHub
            <ExternalLink className="w-4 h-4 text-accent" />
          </a>
        </div>
      </div>
    </section>
  );
}
