"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Copy, Check, ExternalLink, Terminal } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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
        
        {/* Availability Badge */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2.5">
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-surface/90 border border-accent/30 text-accent backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-status animate-status-pulse shrink-0" />
            <span>Available for Roles &amp; Collaborations</span>
          </div>
          <span className="hidden sm:inline-flex items-center text-xs text-mutedtext font-medium px-3 py-1 rounded-full bg-surface/50 border border-surface-border">
            📍 Maharashtra, India · Building for the open web
          </span>
        </div>

        {/* Dynamic Name in Primary DynaPuff Font (SSR painted immediately, zero LCP delay) */}
        <h1
          className="hero-title font-primary text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-normal text-headline mb-4 break-words"
          style={{
            opacity: 1,
            visibility: "visible",
          }}
        >
          Nikhil Alakri
        </h1>

        <p className="hero-role text-lg sm:text-2xl font-medium text-accent mb-4 sm:mb-6 flex items-center gap-2.5">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-bodytext shrink-0" />
          <span>Full-Stack &amp; AI Engineer</span>
        </p>

        <p className="hero-bio text-base sm:text-lg text-bodytext max-w-2xl leading-relaxed mb-8 sm:mb-10">
          Specializing in multimodal AI &amp; RAG pipelines, high-craft web applications, and scalable backend APIs. 
          Building in public with TypeScript, Python, Postgres, and Vector DBs — turning ambitious ideas into shipping products.
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

        {/* whoami Terminal Card directly from README */}
        <div className="mt-10 sm:mt-12 rounded-2xl bg-surface/90 border border-surface-border p-4 sm:p-6 shadow-xl backdrop-blur-md overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-mutedtext">whoami.ts</span>
            </div>
            <span className="text-[11px] font-mono text-accent">Engineer Object</span>
          </div>
          <pre className="text-xs sm:text-sm font-mono text-bodytext overflow-x-auto leading-relaxed">
            <code>
              <span className="text-accent">const</span> <span className="text-primary font-semibold">nikhil_alakri</span>: <span className="text-status">Engineer</span> = &#123;{'\n'}
              {'  '}name:         <span className="text-primary">&quot;Nikhil Alakri&quot;</span>,{'\n'}
              {'  '}role:         <span className="text-primary">&quot;Full-Stack &amp; AI Engineer&quot;</span>,{'\n'}
              {'  '}location:     <span className="text-primary">&quot;Maharashtra, India&quot;</span>,{'\n'}
              {'  '}focus:        [<span className="text-secondary">&quot;Multimodal AI &amp; RAG&quot;</span>, <span className="text-secondary">&quot;Full-Stack Web Apps&quot;</span>, <span className="text-secondary">&quot;Scalable APIs&quot;</span>],{'\n'}
              {'  '}databases:    [<span className="text-secondary">&quot;PostgreSQL&quot;</span>, <span className="text-secondary">&quot;Supabase&quot;</span>, <span className="text-secondary">&quot;MongoDB&quot;</span>, <span className="text-secondary">&quot;ChromaDB&quot;</span>, <span className="text-secondary">&quot;Drizzle&quot;</span>],{'\n'}
              {'  '}cloudAndOps:  [<span className="text-secondary">&quot;Google Cloud&quot;</span>, <span className="text-secondary">&quot;Railway&quot;</span>, <span className="text-secondary">&quot;Docker&quot;</span>, <span className="text-secondary">&quot;Vercel&quot;</span>],{'\n'}
              {'  '}mantra:       <span className="text-status font-medium">&quot;Make useful things, then make them delightful 🚀&quot;</span>{'\n'}
              &#125;;
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
