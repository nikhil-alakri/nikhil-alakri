const PILLARS = [
  { n: "01", title: "Interface engineering", text: "Accessible, high-performance experiences that work for the people using them.", stack: "React / Next.js / Lit / Angular / TypeScript / HTML5 / SCSS" },
  { n: "02", title: "Design systems", text: "Reusable foundations for consistency across complex, regulated products.", stack: "WCAG / Design tokens / Storybook / i18n (LTR / RTL) / Vitest" },
  { n: "03", title: "Full-stack & applied AI", text: "From scalable APIs to intelligent tools that turn complexity into clarity.", stack: "Python / Node.js / PostgreSQL / Multimodal AI / ChromaDB / RAG" },
];

export default function Toolkit() {
  return (
    <section id="expertise" aria-labelledby="toolkit-title" className="ink-section">
      <div className="site-wrap py-16 md:py-24">
        <p className="mono-label">02 / Engineering toolkit</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h2 id="toolkit-title" className="font-display text-3xl font-normal md:text-5xl">Built on strong foundations.</h2>
          <p className="text-sm text-bodytext">The right tools. The right level of detail.</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {PILLARS.map(p => (
            <article key={p.n}>
              <p className="font-mono text-xs text-lime">{p.n}</p>
              <h3 className="mt-3 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-bodytext">{p.text}</p>
              <p className="mt-4 rounded bg-ink-soft p-3 text-xs text-paper/90">{p.stack}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
