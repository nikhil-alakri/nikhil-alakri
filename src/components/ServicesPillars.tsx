import { useState } from "react";
import { ArrowUpRight, Layers, Sparkles, Gauge, Network } from "lucide-react";
import PORTFOLIO_DATA from "@/data/portfolio";
import PillarDetailModal from "@/components/PillarDetailModal";
import { Button } from "@/components/ui/button";

const icons = [Layers, Sparkles, Gauge, Network];
const titles = ["Design systems that scale.", "Intelligence, applied.", "Every millisecond matters.", "Built for the bigger picture."];
export default function ServicesPillars() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section id="pillars" className="portfolio-section expertise-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="section-eyebrow">02 / What I bring</p><h2 className="section-title">Engineering meets<br /><span className="font-serif italic text-amber">craft.</span></h2></div><p className="max-w-xs text-sm text-bodytext">Deep technical thinking. A sharp eye for detail. Systems that work beautifully together.</p></div>
        <div className="grid gap-4 md:grid-cols-5">
          {PORTFOLIO_DATA.pillars.map((pillar, index) => {
            const Icon = icons[index] ?? Layers;
            return <article key={pillar.num} className={`expertise-tile flex flex-col justify-between rounded-lg border border-surface-border p-6 sm:p-8 ${index === 0 || index === 3 ? "md:col-span-3" : "md:col-span-2"} ${index === 1 ? "expertise-contrast" : "bg-surface"}`}>
              <div><div className="mb-8 flex items-center justify-between"><Icon className="size-7 text-mint" /><span className="text-xs text-mutedtext">/{pillar.num}</span></div><h3 className="max-w-md font-display text-2xl font-medium leading-tight sm:text-3xl">{titles[index]}</h3><p className="mt-4 max-w-lg text-sm leading-relaxed text-bodytext">{pillar.summary}</p></div>
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-surface-border pt-4"><span className="text-xs text-mutedtext">{index === 0 ? "Lit · React · WCAG AA" : index === 1 ? "Python · RAG · Multimodal" : index === 2 ? "Core Web Vitals · Lighthouse" : "APIs · Cloud · Architecture"}</span><Button variant="ghost" size="icon" onClick={() => setSelected(pillar.num)} aria-label={`Explore ${pillar.title}`} className="shrink-0 text-mint hover:bg-surface-elevated"><ArrowUpRight /></Button></div>
            </article>;
          })}
        </div>
      </div>
      <PillarDetailModal pillarNum={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
