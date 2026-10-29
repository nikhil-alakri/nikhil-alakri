"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Activity, Cpu, Layers } from "lucide-react";

const projects = [
  {
    title: "Odin Eye",
    category: "Featured Observability System",
    description:
      "A distributed observability and telemetry platform designed for real-time performance anomaly detection, sub-second telemetry aggregation, and distributed tracing.",
    path: "/odin-eye",
    isExternal: false,
    icon: Activity,
    tags: ["Go", "OpenTelemetry", "eBPF", "Kafka", "ClickHouse"],
  },
  {
    title: "Project One",
    category: "Cloud Infrastructure",
    description:
      "Resilient, fault-tolerant backend infrastructure engineered to process streaming workflows with automated failover, distributed caching, and zero-downtime deployments.",
    path: "/project-one",
    isExternal: false,
    icon: Cpu,
    tags: ["TypeScript", "Distributed Caching", "Docker", "PostgreSQL", "Redis"],
  },
  {
    title: "ITPO Web Platform",
    category: "Deployed Production App",
    description:
      "Fullstack production application deployed on edge infrastructure. Integrated with dedicated subpath routing via /itpo.",
    path: "/itpo",
    isExternal: true,
    externalUrl: "https://itpo.vercel.app/",
    icon: Layers,
    tags: ["Fullstack", "Next.js", "Edge Deployment", "Vercel"],
  },
];

export default function BentoProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-headline tracking-tight">Major Projects</h2>
          </div>
          <p className="text-bodytext text-sm max-w-md mt-2 md:mt-0">
            Dedicated case studies and production platforms with custom subpath routing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className="project-card group relative flex flex-col justify-between p-6 rounded-2xl bg-surface border border-surface-border hover:border-accent hover:bg-surface-elevated transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-mutedtext">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-headline mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-bodytext leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-background/60 border border-surface-border text-bodytext font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.isExternal ? (
                    <a
                      href={project.path}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-headline transition-colors"
                    >
                      Visit Project ({project.path})
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={project.path}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-headline transition-colors"
                    >
                      Read Case Study ({project.path})
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
