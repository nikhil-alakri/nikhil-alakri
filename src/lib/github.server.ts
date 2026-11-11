// One public catalogue powers the projects page and AI recommendations.
import type { Repo } from "./githubProjects";
let cache: { at: number; repos: Repo[] } | null = null;

export async function getRepositoryCatalogue(): Promise<{ repos: Repo[]; stale: boolean; error: string | null }> {
  if (cache && Date.now() - cache.at < 10 * 60_000) return { repos: cache.repos, stale: false, error: null };
  try {
    const repos: Repo[] = [];
    for (let page = 1; ; page++) {
    const res = await fetch(`https://api.github.com/users/nikhil-alakri/repos?per_page=100&sort=updated&page=${page}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "nikhil-portfolio" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) { const body = await res.text(); console.error("GitHub repos failed", res.status, body); throw new Error(`GitHub [${res.status}]: ${body}`); }
    const raw = (await res.json()) as Array<Record<string, unknown>>;
    repos.push(...raw.map(r => ({
      name: String(r["name"]), description: String(r["description"] ?? ""), language: (r["language"] as string) ?? null,
      topics: (r["topics"] as string[]) ?? [], url: String(r["html_url"]), homepage: (r["homepage"] as string) || null, updated: String(r["pushed_at"] ?? "").slice(0, 10), fork: Boolean(r["fork"]), archived: Boolean(r["archived"]),
    })));
    if (raw.length < 100) break;
    }
    cache = { at: Date.now(), repos };
    return { repos, stale: false, error: null };
  } catch (e) { console.error("GitHub repos error", e); return { repos: cache?.repos ?? [], stale: true, error: e instanceof Error ? e.message : "GitHub is unavailable." }; }
}

export async function getRepos(): Promise<Repo[]> { return (await getRepositoryCatalogue()).repos; }
