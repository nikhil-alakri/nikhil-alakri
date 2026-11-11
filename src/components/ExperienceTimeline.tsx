import { useState } from "react";
import { ArrowUpRight, ChevronDown, MapPin, Check } from "lucide-react";
import PORTFOLIO_DATA from "@/data/portfolio";
import { Button } from "@/components/ui/button";

const initials = ["CT", "AS", "HL", "ML", "CD"];
export default function ExperienceTimeline() {
  const [active, setActive] = useState<string | null>("citiustech");
  return (
    <section id="career" className="portfolio-section">
      <span id="experience" className="sr-only" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p className="section-eyebrow">03 / The journey</p><h2 className="section-title">Experience that<br /><span className="font-serif italic text-amber">builds perspective.</span></h2></div><Button asChild variant="ghost" className="text-mint hover:bg-surface"><a href={PORTFOLIO_DATA.personal.resumeUrl} download>Full résumé <ArrowUpRight /></a></Button></div>
        <div className="career-list">
          {PORTFOLIO_DATA.experience.map((item, index) => {
            const expanded = active === item.id;
            return <article key={item.id} className="career-row grid gap-4 border-t border-surface-border py-7 md:grid-cols-[180px_1fr] md:gap-10">
              <div className="flex items-center gap-3 md:flex-col md:items-start"><span className={`career-node size-2 rounded-full ${index === 0 ? "bg-mint" : "bg-mutedtext"}`} /><p className="font-mono text-xs text-mutedtext">{item.year}</p>{index === 0 && <span className="text-xs text-mint">Current role</span>}</div>
              <div className="min-w-0">
                <div className="flex items-start gap-4"><span className={`flex size-11 shrink-0 items-center justify-center rounded-lg border border-surface-border font-display text-sm ${index === 0 ? "bg-mint text-background" : "bg-surface text-amber"}`}>{initials[index]}</span><div className="min-w-0 flex-1"><h3 className="font-display text-lg text-headline sm:text-2xl">{item.role}</h3><p className="mt-1 text-sm text-mint">{item.company}</p></div><Button variant="ghost" size="icon" onClick={() => setActive(expanded ? null : item.id)} aria-expanded={expanded} aria-controls={`role-${item.id}`} aria-label={`${expanded ? "Collapse" : "Expand"} ${item.company}`} className="shrink-0 text-bodytext hover:bg-surface"><ChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""}`} /></Button></div>
                <p className="mt-4 text-sm leading-relaxed text-bodytext">{item.tagline}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"><span className="inline-flex items-center gap-1.5 text-mutedtext"><MapPin className="size-3" />{item.location}</span><span className="text-amber">{item.metrics}</span></div>
                {expanded && <div id={`role-${item.id}`} className="mt-6 animate-fade-in"><ul className="space-y-3">{item.achievements.map(achievement => <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-bodytext"><Check className="mt-1 size-4 shrink-0 text-mint" /><span>{achievement}</span></li>)}</ul><div className="mt-5 flex flex-wrap gap-2">{item.techStack.map(tech => <span key={tech} className="rounded border border-surface-border bg-surface px-2.5 py-1 text-xs text-mutedtext">{tech}</span>)}</div></div>}
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
