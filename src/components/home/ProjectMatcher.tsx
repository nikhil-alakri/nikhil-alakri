import { useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Loader2, Sparkles, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { recommendWork, type MatchResponse } from "@/lib/matcher.functions";
import { SKILL_FILTERS, projectsForSkills } from "@/lib/skillMatch";
import { getCaseStudy } from "@/data/caseStudies";
import ConceptPreview from "./ConceptPreview";
import { Button } from "@/components/ui/button";

const PROMPTS = [
  "An accessible healthcare portal with a reusable component library",
  "An AI tool that understands and documents a legacy web app",
  "A fast Next.js site that needs better Core Web Vitals",
];

function ProjectCard({ slug, note, chips }: { slug: string; note: string; chips?: string[] }) {
  const s = getCaseStudy(slug);
  if (!s) return null;
  return (
    <li className="grid overflow-hidden rounded-lg border border-surface-border bg-background sm:grid-cols-[160px_1fr]">
      <div className="h-32 sm:h-full"><ConceptPreview kind={s.preview} /></div>
      <div className="p-4">
        <p className="mono-label">{s.label}</p>
        <Link to="/work/$slug" params={{ slug }} className="inline-flex min-h-11 items-center gap-1 font-display text-lg text-headline hover:underline">{s.title} <ArrowUpRight className="size-4" /></Link>
        <p className="text-sm text-bodytext">{note}</p>
        {chips && <ul className="mt-2 flex flex-wrap gap-1">{chips.map(c => <li key={c} className="rounded bg-sage px-2 py-0.5 text-xs text-headline">{c}</li>)}</ul>}
      </div>
    </li>
  );
}

export default function ProjectMatcher() {
  const run = useServerFn(recommendWork);
  const [need, setNeed] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<MatchResponse | null>(null);
  const skillResults = useMemo(() => projectsForSkills(picked), [picked]);

  const toggle = (label: string) => { setRes(null); setPicked(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label]); };
  const submit = async (e?: FormEvent, text = need) => {
    e?.preventDefault();
    if (text.trim().length < 8 || loading) return;
    setLoading(true); setRes(null);
    try {
      const response = await run({ data: { need: text } });
      setRes(response);
      if (response.ok) window.__lovableEvents?.track?.("project.project_match_completed");
    }
    catch (err) { setRes({ ok: false, error: err instanceof Error ? err.message : "Something went wrong." }); }
    finally { setLoading(false); }
  };

  return (
    <section id="matcher" aria-labelledby="matcher-title" className="site-wrap py-16 md:py-24">
      <p className="mono-label">06 / Find the right fit</p>
      <h2 id="matcher-title" className="mt-3 font-display text-3xl font-normal text-headline md:text-5xl">What are you building?</h2>
      <Button asChild variant="link" className="mt-3 px-0"><Link to="/projects">Explore all GitHub projects <ArrowUpRight /></Link></Button>
      <p className="mt-3 max-w-xl text-sm text-bodytext">Pick the skills you need for an instant match, or describe your project and AI will recommend the most relevant work.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <fieldset>
            <legend className="text-sm font-medium text-headline">1. Pick skills</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILL_FILTERS.map(f => {
                const on = picked.includes(f.label);
                return <button key={f.label} type="button" aria-pressed={on} onClick={() => toggle(f.label)} className={`min-h-11 rounded-md border px-3 text-sm transition-colors ${on ? "border-ink bg-ink text-paper" : "border-surface-border bg-background text-headline hover:bg-sage"}`}>{f.label}</button>;
              })}
              {picked.length > 0 && <button type="button" onClick={() => setPicked([])} className="inline-flex min-h-11 items-center gap-1 px-2 text-sm text-bodytext underline"><X className="size-3" /> Clear</button>}
            </div>
          </fieldset>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <label htmlFor="need" className="text-sm font-medium text-headline">2. Or describe your project</label>
            <textarea id="need" value={need} onChange={e => setNeed(e.target.value)} rows={4} maxLength={800} placeholder="e.g. We need a design system for several clinical apps that passes accessibility audits…" className="w-full rounded-md border border-surface-border bg-background p-4 text-base text-headline placeholder:text-mutedtext" />
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map(p => <button type="button" key={p} onClick={() => { setNeed(p); submit(undefined, p); }} className="min-h-11 rounded-md bg-sage px-3 text-left text-xs text-headline hover:bg-surface-elevated">{p}</button>)}
            </div>
            <button type="submit" disabled={loading || need.trim().length < 8} className="mt-1 inline-flex min-h-12 items-center justify-between gap-6 rounded-md bg-ink px-5 text-sm text-paper disabled:opacity-50 sm:w-60">
              {loading ? <>Matching… <Loader2 className="size-4 animate-spin" /></> : <>Recommend work <Sparkles className="size-4 text-lime" /></>}
            </button>
          </form>
        </div>

        <div aria-live="polite" className="rounded-lg border border-surface-border bg-sage p-5 md:p-6">
          {loading && <p className="text-sm text-bodytext">Reading the portfolio for the best match…</p>}
          {!loading && res && !res.ok && <p role="alert" className="text-sm text-headline">{res.error}</p>}
          {!loading && res?.ok && (
            <div>
              <p className="mono-label">AI recommendation</p>
              <p className="mt-2 text-headline">{res.result.summary}</p>
              <ul className="mt-5 space-y-3">{res.result.projects.map(p => <ProjectCard key={p.slug} slug={p.slug} note={p.reason} />)}</ul>
              {res.result.repos.length > 0 && <>
                <p className="mono-label mt-5">From GitHub</p>
                <ul className="mt-2 space-y-2">{res.result.repos.map(r => (
                  <li key={r.name} className="rounded-lg border border-surface-border bg-background p-4">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-display text-headline hover:underline">{r.name} <ArrowUpRight className="size-4" /></a>
                    {r.language && <span className="ml-2 font-mono text-xs text-bodytext">{r.language}</span>}
                    <p className="text-sm text-bodytext">{r.reason}</p>
                  </li>))}</ul>
              </>}
              <p className="mono-label mt-5">Relevant skills</p>
              <ul className="mt-2 flex flex-wrap gap-2">{res.result.skills.map(s => <li key={s} className="rounded bg-ink px-2 py-1 text-xs text-paper">{s}</li>)}</ul>
              <p className="mt-4 text-xs text-bodytext">Based on {res.result.sources.roles} roles from the resume, the case studies and {res.result.sources.repos} public GitHub repositories.</p>
            </div>
          )}
          {!loading && !res && picked.length > 0 && (
            <div>
              <p className="mono-label">{skillResults.length} matching project{skillResults.length === 1 ? "" : "s"}</p>
              {skillResults.length === 0 && <p className="mt-2 text-sm text-bodytext">No single project covers that mix — try fewer skills or describe your project.</p>}
              <ul className="mt-3 space-y-3">{skillResults.map(r => <ProjectCard key={r.study.slug} slug={r.study.slug} note={r.study.summary} chips={r.hits} />)}</ul>
            </div>
          )}
          {!loading && !res && picked.length === 0 && <p className="text-sm text-bodytext">Matching projects will appear here.</p>}
        </div>
      </div>
    </section>
  );
}
