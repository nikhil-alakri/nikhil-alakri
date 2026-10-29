"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Copy, Check, ExternalLink, Terminal } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.7 })
        .from(".hero-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-role", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".hero-bio", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nikhilalakri@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={containerRef} className="relative pt-24 pb-20 overflow-hidden">
      {/* Background ambient warm/teal glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-b from-accent/15 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-accent/30 text-accent mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-status animate-ping" />
          <span>Available for New Engineering Roles & Collaborations</span>
        </div>

        <h1 className="hero-title text-5xl sm:text-7xl font-extrabold tracking-tight text-headline mb-4">
          Nikhil Alakri
        </h1>

        <p className="hero-role text-xl sm:text-2xl font-medium text-accent mb-6 flex items-center gap-3">
          <Terminal className="w-6 h-6 text-bodytext" />
          Software Engineer & Open Source Builder
        </p>

        <p className="hero-bio text-lg text-bodytext max-w-2xl leading-relaxed mb-10">
          Specializing in scalable distributed systems, high-throughput cloud infrastructure,
          and intuitive developer tooling. Passionate about architecting resilient services, 
          open-source software, and crafting high-performance digital experiences.
        </p>

        <div className="hero-actions flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-semibold hover:bg-accent transition-all hover:-translate-y-0.5 shadow-lg shadow-black/20"
          >
            Explore Projects
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-surface-border text-headline font-medium hover:bg-surface-elevated hover:border-accent transition-all"
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
                <span>nikhilalakri@gmail.com</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-accent transition-all"
          >
            GitHub
            <ExternalLink className="w-4 h-4 text-accent" />
          </a>
        </div>
      </div>
    </section>
  );
}
