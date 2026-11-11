import { CASE_STUDIES } from "@/data/caseStudies";
import profile from "@/assets/nikhil-alakri-repository.png.asset.json";
import odin from "@/assets/odin-eye-repository.png.asset.json";
import ui from "@/assets/UI-store-repository.png.asset.json";
import ipo from "@/assets/ipo-repository.png.asset.json";
import flights from "@/assets/flight-search-repository.png.asset.json";

export type Repo = { name: string; description: string; language: string | null; topics: string[]; url: string; homepage: string | null; updated: string; fork: boolean; archived: boolean };
const previews: Record<string, string> = { "nikhil-alakri": profile.url, "odin-eye": odin.url, "ui-store": ui.url, ipo: ipo.url, "flight-search": flights.url };

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