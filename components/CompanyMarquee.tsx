"use client";

import { Shield, Sparkles, Building2, Terminal, Code2, Globe } from "lucide-react";

const companies = [
  { name: "CitiusTech Healthcare", role: "Senior Software Engineer", icon: Building2 },
  { name: "Adventum Student Living", role: "SDE-2 (UniAcco)", icon: Globe },
  { name: "The House of Abhinandan Lodha", role: "Senior Executive Tech", icon: Building2 },
  { name: "MultiLiving Technologies", role: "Software Engineer", icon: Building2 },
  { name: "Cloudesign Solutions", role: "SDE-1", icon: Building2 },
];

const technologies = [
  { name: "Lit Components", spec: "Design Systems", icon: Code2 },
  { name: "React & Next.js 15", spec: "High-Craft Web Apps", icon: Globe },
  { name: "TypeScript", spec: "Typed Robustness", icon: Terminal },
  { name: "WCAG AA & i18n", spec: "Accessibility Standard", icon: Shield },
  { name: "Three.js & PBR", spec: "Interactive 3D", icon: Sparkles },
  { name: "Python & RAG", spec: "Multimodal AI", icon: Terminal },
  { name: "Lighthouse 100/100", spec: "Core Web Vitals", icon: Sparkles },
];

export default function CompanyMarquee() {
  const combined = [...companies, ...technologies];

  return (
    <div className="w-full py-8 sm:py-10 border-y border-surface-border bg-surface/30 backdrop-blur-sm overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-status animate-status-pulse inline-block" />
          Enterprise Engineering &amp; Production Stack
        </p>
        <span className="text-[11px] font-mono text-bodytext hidden sm:inline-block">
          7+ Years Proven Impact
        </span>
      </div>

      <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee gap-3 sm:gap-4 shrink-0 py-1">
          {combined.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`m1-${idx}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface/80 border border-surface-border hover:border-accent hover:bg-surface-elevated transition-all shrink-0"
              >
                <div className="p-1 rounded-md bg-surface-elevated text-accent">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-semibold text-headline whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-bodytext whitespace-nowrap">
                    {"role" in item ? item.role : item.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex animate-marquee gap-3 sm:gap-4 shrink-0 py-1" aria-hidden="true">
          {combined.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`m2-${idx}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface/80 border border-surface-border hover:border-accent hover:bg-surface-elevated transition-all shrink-0"
              >
                <div className="p-1 rounded-md bg-surface-elevated text-accent">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-semibold text-headline whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-bodytext whitespace-nowrap">
                    {"role" in item ? item.role : item.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
