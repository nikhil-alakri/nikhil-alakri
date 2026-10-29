"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Star, GitFork, Code2, ArrowUpRight } from "lucide-react";

const repos = [
  {
    name: "cloud-telemetry-agent",
    description: "Lightweight daemon for streaming eBPF network metrics and kernel tracing events directly to collector nodes.",
    language: "Go",
    langColor: "bg-cyan-400",
    stars: 38,
    forks: 6,
    link: "https://github.com/nikhil-alakri",
  },
  {
    name: "resilient-task-queue",
    description: "Distributed task orchestrator with guaranteed at-least-once delivery, backoff retry queues, and dead-letter topics.",
    language: "TypeScript",
    langColor: "bg-blue-400",
    stars: 52,
    forks: 11,
    link: "https://github.com/nikhil-alakri",
  },
  {
    name: "dev-cli-toolkit",
    description: "Productivity CLI utility suite for automating local microservice orchestrations, env switching, and git sanity checks.",
    language: "Rust",
    langColor: "bg-amber-400",
    stars: 24,
    forks: 4,
    link: "https://github.com/nikhil-alakri",
  },
  {
    name: "ui-animation-primitives",
    description: "Collection of reusable, accessible micro-interaction hooks and GSAP scroll trigger recipes for modern web apps.",
    language: "TypeScript",
    langColor: "bg-blue-400",
    stars: 45,
    forks: 9,
    link: "https://github.com/nikhil-alakri",
  },
];

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".repo-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="opensource" ref={sectionRef} className="py-20 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Community</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Open Source Work</h2>
          </div>
          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white mt-4 sm:mt-0 transition-colors"
          >
            <Github className="w-4 h-4" />
            Explore all repositories on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card group p-6 rounded-2xl bg-surface border border-surface-border card-hover-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="font-semibold text-white group-hover:text-primary transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-5 text-xs text-slate-400 pt-3 border-t border-surface-border/60">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

