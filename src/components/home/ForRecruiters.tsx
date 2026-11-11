import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAREER } from "@/data/career";
import { QUICK_FACTS, SKILL_GROUPS } from "@/data/recruiter";
import PORTFOLIO_DATA from "@/data/portfolio";

export default function ForRecruiters() {
  return (
    <section id="hire" aria-labelledby="hire-title" className="site-wrap py-16 md:py-24">
      <p className="mono-label">For recruiters</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h2 id="hire-title" className="font-display text-3xl font-normal text-headline md:text-5xl">Hiring? Here's the short version.</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="min-h-12"><a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => window.__lovableEvents?.track?.("project.linkedin_opened")}><Linkedin /> Follow on LinkedIn <ArrowUpRight /></a></Button>
        </div>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <dl className="grid grid-cols-2 gap-4 rounded-lg bg-lime p-6 text-ink lg:grid-cols-1">
          {QUICK_FACTS.map(f => <div key={f.label}><dt className="font-mono text-xs uppercase">{f.label}</dt><dd className="mt-1 font-display text-lg">{f.value}</dd></div>)}
        </dl>
        <div className="rounded-lg border border-surface-border bg-sage p-6 lg:col-span-2">
          <p className="mono-label">Skills</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {SKILL_GROUPS.map(g => (
              <div key={g.title}><h3 className="font-display text-headline">{g.title}</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">{g.items.map(i => <li key={i} className="rounded bg-background px-2 py-1 text-xs text-headline">{i}</li>)}</ul></div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-surface-border p-6 lg:col-span-3">
          <p className="mono-label">Experience at a glance</p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CAREER.map(r => <li key={r.id} className="border-t border-surface-border pt-3"><p className="font-mono text-xs text-bodytext">{r.period}</p><p className="mt-1 font-display text-headline">{r.role}</p><p className="text-sm text-bodytext">{r.org}</p></li>)}
          </ol>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-bodytext"><p>Reach me at <a className="break-all text-headline underline" href={`mailto:${PORTFOLIO_DATA.contact.email}`}>{PORTFOLIO_DATA.contact.email}</a></p><Button asChild variant="link"><Link to="/timeline" onClick={() => window.__lovableEvents?.track?.("project.timeline_opened")}>Full career timeline <ArrowUpRight /></Link></Button></div>
        </div>
      </div>
    </section>
  );
}
