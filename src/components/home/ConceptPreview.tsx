import type { PreviewKind } from "@/data/caseStudies";

// Illustrative interface concepts — not product screenshots.
export default function ConceptPreview({ kind, large = false }: { kind: PreviewKind; large?: boolean }) {
  const box = "rounded border border-surface-border bg-background px-3 py-2 text-xs text-headline";
  if (kind === "blueprint") return (
    <div className="ink-card flex h-full flex-col gap-3 bg-ink p-5 font-mono text-[11px] text-paper" aria-hidden="true">
      <div className="flex justify-between text-lime"><span>ODIN-EYE / SYSTEM BLUEPRINT</span><span className="text-paper/60">CONCEPT PREVIEW</span></div>
      <div className="flex items-center justify-between rounded border border-paper/15 bg-ink-soft px-3 py-2"><span>Modern web application</span><span className="text-paper/60">HTTPS →</span></div>
      <div className="grid grid-cols-3 gap-2">
        {[["01 / CRAWL", "Ethical discovery"], ["02 / UNDERSTAND", "Vision + RAG"], ["03 / MAP", "System intelligence"]].map(([a, b]) => (
          <div key={a} className="rounded border border-paper/15 bg-ink-soft p-2"><div className="text-lime">{a}</div><div className="mt-1 font-sans text-xs">{b}</div></div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">{["Database ERDs", "API contracts", "Design tokens"].map(t => <span key={t} className="rounded border border-paper/15 px-2 py-1">{t}</span>)}</div>
      {large && <div className="mt-auto text-paper/50">robots.txt respected · rate limits by default</div>}
    </div>
  );
  if (kind === "tokens") return (
    <div className="flex h-full flex-col gap-3 bg-sage p-5" aria-hidden="true">
      <span className="mono-label">Concept preview</span>
      <div className="flex items-center gap-3"><span className="font-display text-4xl text-headline">Aa</span><span className="font-mono text-[10px] text-bodytext">TYPE / SPACE / COLOR<br /><span className="font-sans text-xs text-headline">Built to compose.</span></span></div>
      <div className="mt-auto flex gap-2"><span className="rounded bg-ink px-3 py-2 text-xs text-paper">Get started ↗</span><span className={box}>Explore →</span></div>
    </div>
  );
  if (kind === "market") return (
    <div className="flex h-full flex-col gap-2 bg-sage p-5" aria-hidden="true">
      <div className="flex justify-between"><span className="mono-label">Concept preview</span><span className="font-mono text-[10px] text-bodytext">IPO</span></div>
      <span className="font-display text-sm text-headline">Market watch</span>
      <div className={`${box} flex justify-between`}><span>Upcoming listings</span><span className="text-bodytext">Explore →</span></div>
      <div className={`${box} flex justify-between`}><span>Market overview</span><span className="text-bodytext">View all →</span></div>
    </div>
  );
  if (kind === "trial") return (
    <div className="flex h-full flex-col gap-2 bg-sage p-5" aria-hidden="true">
      <span className="mono-label">Concept preview</span>
      <span className="font-display text-sm text-headline">Free trial drop</span>
      <div className={`${box} flex justify-between`}><span>Redeem sample</span><span className="text-mint">Verified ✓</span></div>
      <div className={`${box} flex justify-between`}><span>Out for delivery</span><span className="text-bodytext">Track →</span></div>
    </div>
  );
  if (kind === "rental") return (
    <div className="flex h-full flex-col gap-2 bg-sage p-5" aria-hidden="true">
      <span className="mono-label">Concept preview</span>
      <div className="flex items-center gap-3 font-display text-2xl text-headline">2 BHK <span className="text-bodytext">·</span> Live</div>
      <div className={`${box} flex justify-between`}><span>12 homes available now</span><span className="text-bodytext">Filter ↗</span></div>
      <span className="font-mono text-[10px] text-bodytext">DISCOVER · VISIT · MOVE IN</span>
    </div>
  );
  if (kind === "flight") return (
    <div className="flex h-full flex-col gap-2 bg-sage p-5" aria-hidden="true">
      <span className="mono-label">Concept preview</span>
      <div className="flex items-center gap-4 font-display text-2xl text-headline">BOM <span className="text-bodytext">→</span> DEL</div>
      <div className={`${box} flex justify-between`}><span>Find your next journey</span><span className="text-bodytext">Search ↗</span></div>
      <span className="font-mono text-[10px] text-bodytext">DISCOVER · COMPARE · GO</span>
    </div>
  );
  if (kind === "clinical") return (
    <div className="flex h-full flex-col gap-2 bg-sage p-5" aria-hidden="true">
      <div className="flex justify-between"><span className="mono-label">Concept preview</span><span className="font-mono text-[10px] text-bodytext">WCAG AA</span></div>
      <span className="font-display text-sm text-headline">Patient summary</span>
      <div className={`${box} flex justify-between`}><span>Vitals · stable</span><span className="text-mint">●</span></div>
      <div className="flex gap-2"><span className="rounded bg-ink px-3 py-2 text-xs text-paper">Review</span><span className={box}>عربي · RTL</span></div>
    </div>
  );
  return (
    <div className="flex h-full flex-col gap-2 bg-sage p-5" aria-hidden="true">
      <span className="mono-label">Concept preview</span>
      <span className="font-display text-sm text-headline">Retirement horizon</span>
      <svg viewBox="0 0 200 60" className="h-14 w-full"><path d="M0 55 C60 50 110 35 200 5" fill="none" stroke="var(--site-ink)" strokeWidth="2" /><path d="M0 55 C60 52 120 45 200 30" fill="none" stroke="var(--site-olive)" strokeDasharray="4 4" strokeWidth="1.5" /></svg>
      <div className={`${box} flex justify-between`}><span>Monthly saving</span><span>₹15,000</span></div>
    </div>
  );
}
