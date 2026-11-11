
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
    <div className="w-full py-7 sm:py-9 border-y border-surface-border bg-surface/20 backdrop-blur-md overflow-hidden select-none relative z-10 group/marquee">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-mint/90 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-mint inline-block" />
          Enterprise Engineering &amp; Production Stack
        </p>
        <span className="text-[11px] font-mono text-mutedtext hidden sm:inline-block">
          7+ Years Proven Impact · Hover to Slow
        </span>
      </div>

      <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex animate-marquee group-hover/marquee:[animation-duration:90s] gap-3 sm:gap-4 shrink-0 py-1 transition-all duration-500">
          {combined.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`m1-${idx}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface/30 border border-white/[0.06] hover:border-mint/30 hover:bg-surface/50 transition-all duration-200 shrink-0 cursor-default"
              >
                <div className="p-1 rounded-lg bg-surface/60 text-mint border border-white/[0.05]">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-medium text-headline whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-mutedtext whitespace-nowrap">
                    {"role" in item ? item.role : item.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex animate-marquee group-hover/marquee:[animation-duration:90s] gap-3 sm:gap-4 shrink-0 py-1 transition-all duration-500" aria-hidden="true">
          {combined.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`m2-${idx}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface/30 border border-white/[0.06] hover:border-mint/30 hover:bg-surface/50 transition-all duration-200 shrink-0 cursor-default"
              >
                <div className="p-1 rounded-lg bg-surface/60 text-mint border border-white/[0.05]">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-medium text-headline whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-mutedtext whitespace-nowrap">
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
