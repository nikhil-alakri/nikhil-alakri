import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, getCaseStudy } from "@/data/caseStudies";
import ConceptPreview from "@/components/home/ConceptPreview";
import Contact from "@/components/home/Contact";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} case study | Nikhil Alakri` : "Case study | Nikhil Alakri";
    const description = loaderData?.summary ?? "A case study from Nikhil Alakri's portfolio.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const s = Route.useLoaderData();
  const idx = CASE_STUDIES.findIndex(c => c.slug === s.slug);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];
  return (
    <>
      <main id="main-content">
        <article>
          <header className="site-wrap pb-10 pt-8 md:pt-12">
            <Link to="/" hash="work" className="hit inline-flex items-center gap-2 text-sm text-bodytext hover:text-headline"><ArrowLeft className="size-4" /> All work</Link>
            <p className="mono-label mt-8">Case study / {s.label}</p>
            <h1 className="mt-3 font-display text-4xl font-normal leading-tight text-headline md:text-6xl">{s.title}</h1>
            <p className="mt-4 max-w-2xl text-xl text-headline">{s.headline}</p>
            <p className="mt-3 max-w-2xl text-bodytext">{s.summary}</p>
            <dl className="mt-8 grid gap-6 border-t border-surface-border pt-6 sm:grid-cols-3">
              <div><dt className="mono-label">Role</dt><dd className="mt-1 text-headline">{s.role.title}</dd></div>
              <div><dt className="mono-label">When</dt><dd className="mt-1 text-headline">{s.period}</dd></div>
              <div><dt className="mono-label">Where</dt><dd className="mt-1 text-headline">{s.organisation}</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              {s.liveUrl && <a href={s.liveUrl} target={s.liveUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-ink px-5 text-sm text-paper">View live <ArrowUpRight className="size-4 text-lime" /></a>}
              {s.repoUrl && <a href={s.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-surface-border px-5 text-sm text-headline">Repository <ArrowUpRight className="size-4" /></a>}
            </div>
          </header>
          <div className="site-wrap"><div className="h-64 overflow-hidden rounded-lg border border-surface-border md:h-80"><ConceptPreview kind={s.preview} large /></div><p className="mt-2 text-xs text-mutedtext">Illustrative concept, not a product screenshot.</p></div>

          <section aria-labelledby="goals" className="site-wrap grid gap-6 py-14 md:grid-cols-[220px_1fr]">
            <h2 id="goals" className="font-display text-2xl font-normal text-headline">Goals</h2>
            <ol className="space-y-4">{s.goals.map((g, i) => <li key={g} className="flex gap-4 border-b border-surface-border pb-4"><span className="font-mono text-xs text-mint">0{i + 1}</span><span className="text-headline">{g}</span></li>)}</ol>
          </section>
          <section aria-labelledby="role" className="bg-sage"><div className="site-wrap grid gap-6 py-14 md:grid-cols-[220px_1fr]">
            <h2 id="role" className="font-display text-2xl font-normal text-headline">My role</h2>
            <div><p className="text-lg text-headline">{s.role.title}</p><ul className="mt-4 space-y-2">{s.role.points.map(p => <li key={p} className="text-bodytext">— {p}</li>)}</ul>
              <ul className="mt-6 flex flex-wrap gap-2">{s.skills.map(k => <li key={k} className="rounded bg-background px-2 py-1 text-xs text-headline">{k}</li>)}</ul></div>
          </div></section>
          <section aria-labelledby="process" className="site-wrap grid gap-6 py-14 md:grid-cols-[220px_1fr]">
            <h2 id="process" className="font-display text-2xl font-normal text-headline">Process</h2>
            <ol className="grid gap-4 sm:grid-cols-2">{s.process.map((p, i) => <li key={p.step} className="rounded-lg border border-surface-border p-5"><p className="font-mono text-xs text-mint">Step 0{i + 1}</p><h3 className="mt-2 font-display text-lg text-headline">{p.step}</h3><p className="mt-2 text-sm text-bodytext">{p.detail}</p></li>)}</ol>
          </section>
          <section aria-labelledby="outcomes" className="ink-section"><div className="site-wrap grid gap-6 py-14 md:grid-cols-[220px_1fr]">
            <h2 id="outcomes" className="font-display text-2xl font-normal">Outcomes</h2>
            <div><dl className="grid gap-8 sm:grid-cols-3">{s.outcomes.map(o => <div key={o.label}><dt className="sr-only">{o.label}</dt><dd className="font-display text-4xl text-lime">{o.value}</dd><dd className="mt-1 text-sm text-bodytext">{o.label}</dd></div>)}</dl>
              <p className="mt-10 max-w-2xl border-l-2 border-lime pl-4 text-headline">{s.retrospective}</p></div>
          </div></section>
          <nav aria-label="Next case study" className="site-wrap py-12">
            <Link to="/work/$slug" params={{ slug: next.slug }} className="flex min-h-12 items-center justify-between border-y border-surface-border py-6"><span><span className="mono-label block">Next case study</span><span className="font-display text-2xl text-headline">{next.title}</span></span><ArrowUpRight className="size-5 text-headline" /></Link>
          </nav>
        </article>
      </main>
      <Contact />
    </>
  );
}
