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
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-sky-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Available for New Engineering Roles & Collaborations</span>
        </div>

        <h1 className="hero-title text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-4">
          Nikhil Alakri
        </h1>

        <p className="hero-role text-xl sm:text-2xl font-medium text-primary mb-6 flex items-center gap-3">
          <Terminal className="w-6 h-6 text-accent" />
          Software Engineer & Open Source Builder
        </p>

        <p className="hero-bio text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
          Specializing in scalable distributed systems, high-throughput cloud infrastructure,
          and intuitive developer tooling. Passionate about architecting resilient services, 
          open-source software, and crafting high-performance digital experiences.
        </p>

        <div className="hero-actions flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-slate-950 font-semibold hover:bg-primary-hover shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5"
          >
            Explore Projects
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-surface-border text-slate-200 font-medium hover:bg-surface-hover hover:border-slate-500 transition-all"
            title="Click to copy email"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>nikhilalakri@gmail.com</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-surface-border text-slate-300 hover:text-white hover:border-slate-500 transition-all"
          >
            GitHub
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
