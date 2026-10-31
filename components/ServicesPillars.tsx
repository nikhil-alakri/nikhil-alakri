"use client";

import { Palette, Sparkles, Gauge, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "Healthcare & Enterprise Design Systems",
    icon: Palette,
    summary:
      "Architecting reusable Lit and React component libraries delivering core interface elements across regulated clinical and enterprise applications.",
    deliverables: [
      "Lit & React (TSX) Component Libraries",
      "Rigorous Definition of Done (DoD) & WCAG AA Standards",
      "Multi-theme Design Tokens & i18n (LTR/RTL) Support",
      "End-to-end versioning, Storybook & Vitest audits",
    ],
  },
  {
    num: "02",
    title: "Multimodal AI & Agentic Accelerators",
    icon: Sparkles,
    summary:
      "Designing specialized technical accelerators and AI pipelines to validate feasibility, automate complex data extraction, and drive presales velocity.",
    deliverables: [
      "Autonomous Reverse-Engineering Engine (odin-eye)",
      "Agentic SQL Parsers & Dynamic Query Synthesis",
      "Medical Imaging Chat POCs with drag-and-drop validation",
      "Local ChromaDB Vector RAG & Contextual Patient 360",
    ],
  },
  {
    num: "03",
    title: "Web Performance & Lighthouse 100/100",
    icon: Gauge,
    summary:
      "Relentless Core Web Vitals optimization, asset compression pipelines, and zero-CLS architecture delivering measurable speedups in production.",
    deliverables: [
      "Automated image optimization pipelines with Sharp & Jimp",
      "20% improvement in page load speed on high-traffic portals",
      "100/100 Lighthouse Performance & Accessibility compliance",
      "Sub-1.5s Largest Contentful Paint (LCP) engineering",
    ],
  },
  {
    num: "04",
    title: "Full-Stack Architecture & Cloud APIs",
    icon: Layers,
    summary:
      "Building resilient web applications, distributed backend services, and scalable database schemas from initial RFC to edge deployment.",
    deliverables: [
      "Next.js 15 App Router & Server Component Architecture",
      "PostgreSQL, Supabase, MongoDB, and Redis caching",
      "Typed OpenAPI / REST contracts with zero schema drift",
      "Dockerized microservices & automated CI/CD pipelines",
    ],
  },
];

export default function ServicesPillars() {
  return (
    <section id="pillars" className="py-16 sm:py-24 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface border border-accent/30 text-accent mb-3">
              <span>Engineering Capabilities</span>
            </div>
            <h2 className="font-primary text-2xl sm:text-4xl md:text-5xl font-bold text-headline tracking-tight">
              Architectural Pillars &amp; Specializations
            </h2>
          </div>
          <p className="text-bodytext text-sm sm:text-base max-w-md mt-3 md:mt-0 leading-relaxed">
            Delivering high-craft UI platforms, HIPAA/clinical design systems, and AI accelerators engineered for performance.
          </p>
        </div>

        {/* 4-Card Bento Grid inspired by Reference 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-surface border border-surface-border hover:border-accent hover:bg-surface-elevated transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-surface-elevated border border-surface-border text-accent group-hover:border-accent transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-sm font-bold text-accent">
                        {pillar.num}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-surface border border-surface-border text-bodytext group-hover:text-headline group-hover:border-accent transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-primary text-xl sm:text-2xl font-bold text-headline mb-3 group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base text-bodytext leading-relaxed mb-6">
                    {pillar.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border/60">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold block mb-3">
                    Core Engineering Highlights:
                  </span>
                  <ul className="space-y-2">
                    {pillar.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-bodytext">
                        <CheckCircle2 className="w-4 h-4 text-status shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
