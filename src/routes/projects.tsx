import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, Github, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listGithubProjects } from "@/lib/github.functions";
import { getShareCover } from "@/lib/share.functions";
import Contact from "@/components/home/Contact";

const projectsQuery = queryOptions({ queryKey: ["public-github-projects"], queryFn: () => listGithubProjects(), staleTime: 60_000 });
export const Route = createFileRoute("/projects")({
  loader: async ({ context }) => {
    const [catalogue, cover] = await Promise.all([context.queryClient.ensureQueryData(projectsQuery), getShareCover()]);
    return { ...cover, count: catalogue.repos.length };
  },
  head: () => ({
    meta: [
      { title: "GitHub Projects — Nikhil Alakri | Frontend Developer, Maharashtra" },
      { name: "description", content: "Explore Nikhil Alakri's public GitHub projects: frontend interfaces, reusable UI components and AI developer tools, with repository links and published demos." },
      { property: "og:title", content: "GitHub Projects — Nikhil Alakri" },
      { property: "og:description", content: "Public repositories, project descriptions, skills and available live demos from a frontend developer in Maharashtra." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ], links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data, refetch, isFetching } = useSuspenseQuery(projectsQuery);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"all" | "demo">("all");
  const visible = useMemo(() => data.repos.filter(r => (mode === "all" || r.homepage) && `${r.name} ${r.description} ${r.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [data.repos, search, mode]);
  return <>
    <main id="main-content">
      <header className="site-wrap pb-10 pt-8 md:pt-14">
        <Button asChild variant="link" className="px-0"><Link to="/" hash="matcher"><ArrowLeft /> Back to project matcher</Link></Button>
        <p className="mono-label mt-8">Public GitHub / {data.repos.length} repositories</p>
        <h1 className="mt-3 font-display text-4xl font-normal text-headline md:text-6xl">Projects, out in the open.</h1>
        <p className="mt-4 max-w-2xl text-bodytext">Frontend interfaces, reusable components and AI tools — from my public GitHub repositories.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="min-h-12"><a href="https://github.com/nikhil-alakri" target="_blank" rel="noopener noreferrer"><Github /> Follow on GitHub <ArrowUpRight /></a></Button>
          <Button asChild variant="outline" className="min-h-12"><Link to="/" hash="matcher">Find a project for your needs <ArrowUpRight /></Link></Button>
        </div>
      </header>
      <section aria-label="GitHub projects" className="site-wrap pb-16 md:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-surface-border py-5">
          <label className="flex min-h-12 w-full items-center gap-3 rounded-md border border-surface-border bg-background px-4 sm:max-w-sm"><Search className="size-4 shrink-0" /><span className="sr-only">Search GitHub projects</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects or skills" className="min-w-0 flex-1 bg-transparent text-base text-headline outline-none" /></label>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant={mode === "all" ? "default" : "outline"} aria-pressed={mode === "all"} onClick={() => setMode("all")} className="min-h-11">All projects</Button>
            <Button variant={mode === "demo" ? "default" : "outline"} aria-pressed={mode === "demo"} onClick={() => setMode("demo")} className="min-h-11">With live demos</Button>
            <Button variant="ghost" size="icon" title="Refresh GitHub projects" aria-label="Refresh GitHub projects" disabled={isFetching} onClick={() => refetch()} className="size-11"><RefreshCw className={isFetching ? "animate-spin" : ""} /></Button>
          </div>
        </div>
        {data.error && <p role="alert" className="mt-5 text-sm text-bodytext">{data.stale && data.repos.length ? "Showing the last available GitHub projects." : "GitHub projects couldn't be loaded."} Try refreshing in a moment. <details className="mt-2"><summary>Error details</summary><p className="mt-2 break-words">{data.error}</p></details></p>}
        <p aria-live="polite" className="mono-label mt-6">{visible.length} project{visible.length === 1 ? "" : "s"}</p>
        <ul className="mt-5 grid gap-6 md:grid-cols-2">
          {visible.map(r => <li key={r.url} className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-surface-border bg-background">
            <div className="aspect-[2/1] overflow-hidden border-b border-surface-border bg-sage">
              {r.image ? <img src={r.image} alt={`${r.name} GitHub repository preview`} loading="lazy" width={1200} height={600} className="h-full w-full object-contain" /> : <div className="flex h-full items-center justify-center"><Github className="size-16 text-bodytext" aria-hidden="true" /></div>}
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <p className="mono-label">{r.language ?? "Public repository"}{r.fork ? " / Fork" : ""}{r.archived ? " / Archived" : ""}</p>
              <h2 className="mt-3 break-words font-display text-2xl text-headline">{r.name}</h2>
              <p className="mt-3 text-sm text-bodytext">{r.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{r.skills.slice(0, 6).map(s => <li key={s} className="rounded bg-sage px-2 py-1 text-xs text-headline">{s}</li>)}</ul>
              <p className="mt-4 text-xs text-mutedtext">Last code update: {r.updated || "Not available"}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <Button asChild variant="outline" className="min-h-11"><a href={r.url} target="_blank" rel="noopener noreferrer"><Github /> Repository <ArrowUpRight /></a></Button>
                {r.homepage && <Button asChild className="min-h-11"><a href={r.homepage} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight /></a></Button>}
                {r.slug && <Button asChild variant="link" className="min-h-11"><Link to="/work/$slug" params={{ slug: r.slug }}>Case study <ArrowUpRight /></Link></Button>}
              </div>
              {!r.homepage && <p className="mt-3 text-xs text-mutedtext">No published demo listed on GitHub.</p>}
            </div>
          </li>)}
        </ul>
        {!visible.length && !data.error && <div className="py-16"><h2 className="font-display text-2xl text-headline">No matching projects.</h2><Button variant="link" className="mt-3 px-0" onClick={() => { setSearch(""); setMode("all"); }}>Show all projects <ArrowUpRight /></Button></div>}
      </section>
    </main>
    <Contact />
  </>;
}