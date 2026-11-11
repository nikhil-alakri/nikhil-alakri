const PROOF = [
  { value: "Since 2018", label: "Building for the web", sub: "Across healthcare, proptech & education" },
  { value: "20%", label: "Faster page loads", sub: "Core Web Vitals improvements at Adventum" },
  { value: "15%", label: "More calls per day", sub: "Through more efficient agent workflows" },
];

// Calm, static proof points in place of the old scrolling marquee.
export default function ProofRibbon() {
  return (
    <section id="proof" aria-label="Career highlights" className="bg-sage">
      <dl className="site-wrap grid gap-8 py-10 sm:grid-cols-3 md:py-12">
        {PROOF.map(p => (
          <div key={p.value} className="border-l-2 border-ink pl-4 sm:border-l-0 sm:pl-0">
            <dt className="sr-only">{p.label}</dt>
            <dd className="font-display text-3xl text-headline md:text-4xl">{p.value}</dd>
            <dd className="mono-label mt-2">{p.label}</dd>
            <dd className="mt-1 text-sm text-bodytext">{p.sub}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
