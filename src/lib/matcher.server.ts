import { createOpenAI } from "@ai-sdk/openai";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod/v4";
import { CASE_STUDIES } from "@/data/caseStudies";
import { CAREER } from "@/data/career";
import { getRepos } from "./github.server";
import { projectFromRepo } from "./githubProjects";

const RUN_ID = "X-Lovable-AIG-Run-ID";
const schema = z.object({
  summary: z.string(),
  projects: z.array(z.object({ slug: z.string(), reason: z.string() })),
  repos: z.array(z.object({ name: z.string(), reason: z.string() })),
  skills: z.array(z.string()),
});
export type MatchResult = { summary: string; projects: { slug: string; title: string; reason: string }[]; repos: { name: string; url: string; language: string | null; reason: string }[]; skills: string[]; sources: { repos: number; roles: number } };

export class MatcherError extends Error { constructor(message: string, public status: number) { super(message); } }

export async function recommend(need: string): Promise<MatchResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new MatcherError("The recommender isn't configured yet.", 500);
  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID) ?? undefined;
      if (res.status === 402) throw new MatcherError("The recommender is out of AI credits right now. Please try again later.", 402);
      if (res.status === 429) throw new MatcherError("Lots of visitors right now — please try again in a minute.", 429);
      return res;
    },
  });
  const catalogue = CASE_STUDIES.map(c => ({ slug: c.slug, title: c.title, label: c.label, summary: c.summary, skills: c.skills, goals: c.goals }));
  const repos = await getRepos();
  const career = CAREER.map(r => ({ role: r.role, org: r.org, period: r.period, highlights: r.highlights }));
  const repoList = repos.map(projectFromRepo).map(r => ({ name: r.name, description: r.description, language: r.language, skills: r.skills, topics: r.topics, updated: r.updated, fork: r.fork, archived: r.archived }));
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions: `You recommend work from Nikhil Alakri's portfolio to a visitor. Use ONLY the three sources below — his resume, his case studies and his public GitHub repositories. Never invent projects, employers, metrics or skills.
Return 1-3 case studies (exact slugs, most relevant first) and 0-3 GitHub repositories (exact names) that genuinely fit; each with a one-sentence reason addressed to the visitor that cites concrete evidence from the sources.
Return 4-6 short skill names that appear in the sources and fit the need. Summary: 2 sentences, warm and specific, third person about Nikhil, referencing his real roles.
RESUME: ${JSON.stringify(career)}
CASE STUDIES: ${JSON.stringify(catalogue)}
GITHUB REPOS: ${JSON.stringify(repoList)}`,
    prompt: need,
    output: Output.object({ schema }),
    maxRetries: 0,
    providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] } },
  });
  try {
    const out = await result.output;
    const projects = out.projects
      .map(p => ({ ...p, title: CASE_STUDIES.find(c => c.slug === p.slug)?.title }))
      .filter((p): p is { slug: string; reason: string; title: string } => !!p.title)
      .slice(0, 3);
    const skills = out.skills.length ? out.skills : [...new Set(projects.flatMap(p => CASE_STUDIES.find(c => c.slug === p.slug)?.skills ?? []))];
    const pickedRepos = out.repos.flatMap(r => { const m = repos.find(x => x.name.toLowerCase() === r.name.toLowerCase()); return m ? [{ name: m.name, url: m.url, language: m.language, reason: r.reason }] : []; }).slice(0, 3);
    return { summary: out.summary, projects, repos: pickedRepos, skills: skills.slice(0, 6), sources: { repos: repos.length, roles: CAREER.length } };
  } catch (e) {
    if (e instanceof MatcherError) throw e;
    if (NoObjectGeneratedError.isInstance(e)) throw new MatcherError("Couldn't form a recommendation. Try describing your need a little differently.", 422);
    console.error("matcher failed", e);
    throw new MatcherError("The recommender is unavailable right now.", 502);
  }
}
