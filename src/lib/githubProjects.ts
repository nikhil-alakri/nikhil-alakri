import { CASE_STUDIES } from "@/data/caseStudies";

export type Repo = { name: string; description: string; language: string | null; topics: string[]; url: string; homepage: string | null; updated: string; fork: boolean; archived: boolean };
const previews: Record<string, string> = {
  "nikhil-alakri": "https://opengraph.githubassets.com/1/nikhil-alakri/nikhil-alakri",
  "odin-eye": "https://opengraph.githubassets.com/1/nikhil-alakri/odin-eye",
  "ui-store": "https://opengraph.githubassets.com/1/nikhil-alakri/UI-store",
  ipo: "https://opengraph.githubassets.com/1/nikhil-alakri/ipo",
  "flight-search": "https://opengraph.githubassets.com/1/nikhil-alakri/flight-search",
};

export function safeWebUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; }
}

export function projectFromRepo(repo: Repo) {
  const study = CASE_STUDIES.find(s => s.repoUrl?.toLowerCase() === repo.url.toLowerCase());
  return {
    ...repo,
    description: repo.description || study?.summary || (repo.name === "nikhil-alakri" ? "GitHub profile repository for Nikhil Alakri, with a published portfolio link." : `${repo.name} — public ${repo.language ?? "source code"} repository.`),
    homepage: safeWebUrl(repo.homepage),
    skills: [...new Set([...(repo.language ? [repo.language] : []), ...repo.topics, ...(study?.skills ?? [])])],
    image: previews[repo.name.toLowerCase()] ?? null,
    slug: study?.slug ?? null,
  };
}