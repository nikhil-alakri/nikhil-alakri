import { createFileRoute, Link } from "@tanstack/react-router";
import { CAREER } from "@/data/career";
import { SKILL_GROUPS } from "@/data/recruiter";
import PORTFOLIO_DATA from "@/data/portfolio";

export const Route = createFileRoute("/timeline")({
  head: () => ({ meta: [
    { title: "Frontend Developer Resume Timeline — Nikhil Alakri, Maharashtra" },
    { name: "description", content: "Career timeline for Nikhil Alakri, a frontend developer in Maharashtra: React, TypeScript, design systems, roles, dates and skills." },
    { property: "og:title", content: "Frontend Developer Career Timeline — Nikhil Alakri" },
    { property: "og:description", content: "Recruiter-ready roles, dates, highlights and skills from Nikhil Alakri's career." },
    { property: "og:url", content: "/timeline" },
    { property: "og:type", content: "profile" },
    { name: "twitter:card", content: "summary" },
  ], links: [{ rel: "canonical", href: "/timeline" }] }),
  component: Timeline,
});

function Timeline() {
  return (
    <main className="print-page mx-auto max-w-3xl px-6 py-10 text-headline">
      <div className="no-print mb-8 flex flex-wrap gap-3">
        <Link to="/" hash="hire" className="inline-flex min-h-12 items-center rounded-md border border-surface-border px-5 text-sm">Back to portfolio</Link>
      </div>
      <header className="border-b border-surface-border pb-4">
        <h1 className="font-display text-3xl">Nikhil Alakri</h1>
        <p className="text-bodytext">Senior Software Engineer · {PORTFOLIO_DATA.contact.email} · github.com/nikhil-alakri · <a className="underline" href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/nikhil-alakri</a></p>
      </header>
      <ol className="mt-6 space-y-6">
        {CAREER.map(r => (
          <li key={r.id} className="avoid-break">
            <div className="flex flex-wrap justify-between gap-2"><h2 className="font-display text-lg">{r.role} — {r.org}</h2><p className="font-mono text-xs text-bodytext">{r.period} · {r.location}</p></div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{r.highlights.map(h => <li key={h}>{h}</li>)}</ul>
          </li>
        ))}
      </ol>
      <section className="avoid-break mt-8 border-t border-surface-border pt-4">
        <h2 className="font-display text-lg">Skills</h2>
        {SKILL_GROUPS.map(g => <p key={g.title} className="mt-1 text-sm"><strong>{g.title}:</strong> {g.items.join(", ")}</p>)}
      </section>
    </main>
  );
}
