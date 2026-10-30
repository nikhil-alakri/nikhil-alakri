"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Eye, Palette, TrendingUp, Plane, Github } from "lucide-react";

const projects = [
  {
    title: "odin-eye",
    category: "Multimodal AI & Reverse Engineering",
    description:
      "The all-seeing ethical AI crawler & full-stack reverse-engineering engine. Respects robots.txt while deconstructing modern web apps into relational database ERDs, REST API contracts, UI tokens, and executive boardroom PDF blueprints using multimodal vision and local ChromaDB RAG.",
    path: "/odin-eye",
    isExternal: false,
    githubUrl: "https://github.com/nikhil-alakri/odin-eye",
    icon: Eye,
    tags: ["Python", "Multimodal AI", "ChromaDB RAG", "System Architecture"],
  },
  {
    title: "UI-store",
    category: "Frontend Architecture & Design Systems",
    description:
      "A modular collection of reusable frontend components, interactive UI patterns, and clean design tokens engineered for rapid full-stack prototyping, high design fidelity, and seamless developer ergonomics.",
    path: "https://github.com/nikhil-alakri/UI-store",
    isExternal: true,
    githubUrl: "https://github.com/nikhil-alakri/UI-store",
    icon: Palette,
    tags: ["Frontend Architecture", "Design Systems", "CSS", "UI Components"],
  },
  {
    title: "ipo (ITPO)",
    category: "Financial Analytics & Market Listings",
    description:
      "TypeScript-powered full-stack application designed for tracking, analyzing, and visualizing Initial Public Offerings (IPOs), market listings, and structured financial data workflows. Deployed to edge production.",
    path: "/itpo",
    isExternal: true,
    githubUrl: "https://github.com/nikhil-alakri/ipo",
    icon: TrendingUp,
    tags: ["TypeScript", "Financial Data", "Full-Stack", "Web App"],
  },
  {
    title: "flight-search",
    category: "Search Engine & Aggregation",
    description:
      "Responsive flight discovery and itinerary comparison engine handling dynamic route queries, multi-criteria filtering, and real-time fare aggregation across destinations.",
    path: "https://github.com/nikhil-alakri/flight-search",
    isExternal: true,
    githubUrl: "https://github.com/nikhil-alakri/flight-search",
    icon: Plane,
    tags: ["Full-Stack", "Search Engine", "API Integration", "Web UI"],
  },
];

export default function BentoProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 16, opacity: 0.8 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out", clearProps: "all" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-14 sm:py-20 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1.5 sm:mb-2">Portfolio</p>
            <h2 className="font-primary text-2xl sm:text-4xl font-bold text-headline tracking-tight">Featured Projects</h2>
          </div>
          <p className="text-bodytext text-sm max-w-md mt-2 md:mt-0">
            End-to-end applications, AI reverse-engineering engines, and production platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className="project-card group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-surface border border-surface-border hover:border-accent hover:bg-surface-elevated transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-mutedtext">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-primary text-lg sm:text-xl font-bold text-headline mb-2 group-hover:text-accent transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>

                  <p className="text-sm text-bodytext leading-relaxed mb-5 sm:mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-background/60 border border-surface-border text-bodytext font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-surface-border/60">
                    {project.isExternal ? (
                      <a
                        href={project.path}
                        target={project.path.startsWith("http") ? "_blank" : undefined}
                        rel={project.path.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-headline transition-colors py-1"
                      >
                        <span>{project.path.startsWith("/itpo") ? "Launch Live App (/itpo)" : "Explore Project"}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href={project.path}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-headline transition-colors py-1"
                      >
                        <span>Read Case Study ({project.path})</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-mutedtext hover:text-headline hover:bg-surface-elevated transition-colors"
                        title="View GitHub Repository"
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
      </div>
    </section>
  );
}
