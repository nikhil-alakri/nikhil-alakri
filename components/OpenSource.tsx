"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Github, Star, GitFork, Code2, ArrowUpRight } from "lucide-react";

const repos = [
  {
    name: "odin-eye",
    description: "The all-seeing ethical AI crawler & full-stack reverse-engineering engine with multimodal vision and local ChromaDB RAG.",
    language: "Python",
    langColor: "bg-blue-400",
    tags: ["Multimodal AI", "ChromaDB RAG"],
    link: "https://github.com/nikhil-alakri/odin-eye",
  },
  {
    name: "UI-store",
    description: "Modular collection of reusable frontend components, interactive UI patterns, and clean design tokens.",
    language: "TypeScript",
    langColor: "bg-teal-400",
    tags: ["Design Systems", "UI Components"],
    link: "https://github.com/nikhil-alakri/UI-store",
  },
  {
    name: "ipo",
    description: "TypeScript-powered application for tracking, analyzing, and visualizing Initial Public Offerings (IPOs) and market listings.",
    language: "TypeScript",
    langColor: "bg-accent",
    tags: ["Financial Data", "Full-Stack"],
    link: "https://github.com/nikhil-alakri/ipo",
  },
  {
    name: "flight-search",
    description: "Responsive flight discovery and itinerary comparison engine with dynamic multi-criteria filtering and fare aggregation.",
    language: "Full-Stack",
    langColor: "bg-amber-400",
    tags: ["Search Engine", "Web UI"],
    link: "https://github.com/nikhil-alakri/flight-search",
  },
];

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".repo-card",
        { y: 16, opacity: 0.8 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out", clearProps: "all" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="opensource" ref={sectionRef} className="py-14 sm:py-20 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1.5 sm:mb-2">Community</p>
            <h2 className="font-primary text-2xl sm:text-4xl font-bold text-headline tracking-tight">Open Source Work</h2>
          </div>
          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent hover:text-headline mt-3 sm:mt-0 transition-colors py-1"
          >
            <Github className="w-4 h-4 shrink-0" />
            <span>Explore all repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card group p-5 sm:p-6 rounded-2xl bg-surface border border-surface-border hover:border-accent hover:bg-surface-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-mutedtext group-hover:text-accent transition-colors shrink-0" />
                    <span className="font-semibold text-headline group-hover:text-accent font-mono text-sm transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-mutedtext group-hover:text-headline transition-colors shrink-0" />
                </div>

                <p className="text-sm text-bodytext leading-relaxed mb-5 sm:mb-6">
                  {repo.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-mutedtext pt-3 border-t border-surface-border/60">
                <span className="flex items-center gap-1.5 font-mono">
                  <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${repo.langColor}`} />
                  {repo.language}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {repo.tags.map((t) => (
                    <span key={t} className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-surface-elevated text-accent border border-surface-border font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
