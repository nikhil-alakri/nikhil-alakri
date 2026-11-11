import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";

// Skill filters visitors can pick; each maps to terms found in case-study skills.
export const SKILL_FILTERS: { label: string; terms: string[] }[] = [
  { label: "Design systems", terms: ["design system", "design tokens", "web components", "lit"] },
  { label: "Accessibility", terms: ["wcag", "accessibility", "i18n"] },
  { label: "Healthcare", terms: ["healthcare", "hipaa"] },
  { label: "React & Next.js", terms: ["react", "next.js"] },
  { label: "TypeScript", terms: ["typescript"] },
  { label: "AI & RAG", terms: ["ai", "rag", "vision", "chromadb"] },
  { label: "Python", terms: ["python", "fastapi"] },
  { label: "Data & finance", terms: ["financial", "data visualisation", "algorithms"] },
  { label: "Full-stack & APIs", terms: ["full-stack", "node.js", "rest apis", "api integration"] },
  { label: "Testing", terms: ["vitest", "unit testing", "storybook"] },
];

const matches = (skill: string, term: string) => {
  const s = skill.toLowerCase();
  return term.length <= 3 ? s.split(/[^a-z0-9.]+/).includes(term) : s.includes(term);
};

/** Projects ranked by how many selected skill filters they match; projects matching none are dropped. */
export function projectsForSkills(selected: string[], studies: CaseStudy[] = CASE_STUDIES) {
  const filters = SKILL_FILTERS.filter(f => selected.includes(f.label));
  if (!filters.length) return [];
  return studies
    .map(study => {
      const hits = filters.filter(f => study.skills.some(sk => f.terms.some(t => matches(sk, t))));
      return { study, hits: hits.map(h => h.label) };
    })
    .filter(r => r.hits.length > 0)
    .sort((a, b) => b.hits.length - a.hits.length);
}
