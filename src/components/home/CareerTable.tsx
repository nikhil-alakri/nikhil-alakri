import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CAREER } from "@/data/career";

export default function CareerTable() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="experience" aria-labelledby="career-title" className="site-wrap py-16 md:py-24">
      <p className="mono-label">03 / Experience</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h2 id="career-title" className="font-display text-3xl font-normal text-headline md:text-5xl">A career of building better.</h2>
        <p className="mono-label">2018 — Present</p>
      </div>
      <ol className="mt-10 border-t border-surface-border">
        {CAREER.map((r, i) => {
          const expanded = open === r.id;
          return (
            <li key={r.id} className="border-b border-surface-border py-6">
              <div className="grid gap-2 md:grid-cols-[180px_1fr_1.2fr_48px] md:gap-8">
                <p className="font-mono text-xs uppercase text-bodytext">{r.period}{i === 0 && <span className="ml-2 rounded bg-lime px-1.5 py-0.5 text-ink">Now</span>}</p>
                <div>
                  <h3 className="font-display text-lg text-headline">{r.role}</h3>
                  <p className="text-sm text-bodytext">{r.org} · {r.location}</p>
                  {r.tag && <p className="mono-label mt-1">{r.tag}</p>}
                </div>
                <p className="text-sm text-bodytext">{r.summary}</p>
                <button onClick={() => setOpen(expanded ? null : r.id)} aria-expanded={expanded} aria-controls={`role-${r.id}`} aria-label={`${expanded ? "Hide" : "Show"} highlights from ${r.org}`} className="hit inline-flex items-center justify-center self-start rounded-md border border-surface-border text-headline hover:bg-sage">
                  <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
              </div>
              {expanded && (
                <ul id={`role-${r.id}`} className="mt-5 space-y-2 md:ml-[212px]">
                  {r.highlights.map(h => <li key={h} className="flex gap-3 text-sm text-headline"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />{h}</li>)}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
