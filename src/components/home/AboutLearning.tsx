import ProfileAvatar from "@/components/ProfileAvatar";
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-sage">
      <div className="site-wrap grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mono-label">04 / Beyond the work</p>
          <div className="mt-6 flex items-center gap-4">
            <ProfileAvatar alt="Nikhil Alakri" size={64} loading="lazy" className="size-16 rounded-full object-cover" />
            <div><p className="font-medium text-headline">Nikhil Alakri</p><p className="text-sm text-bodytext">Engineer. Builder. Curious by nature.</p></div>
          </div>
          <h2 id="about-title" className="mt-8 font-display text-3xl font-normal text-headline md:text-4xl">"Make useful things, then make them delightful."</h2>
          <p className="mt-4 max-w-md text-sm text-bodytext">I'm an engineer based in Badlapur, India. I care about the details that make software feel effortless: accessible interactions, clean foundations, and performance you can feel.</p>
          <p className="mono-label mt-4">Offline: flute / cinema / photo editing / web design</p>
        </div>
        <dl className="space-y-6 self-end">
          <div><dt className="mono-label">Foundations</dt>
            <dd className="mt-2 font-medium text-headline">Bachelor of Engineering · Computer</dd><dd className="text-sm text-bodytext">PVPP College of Engineering · 2015–2018</dd>
            <dd className="mt-3 font-medium text-headline">Diploma · Computer</dd><dd className="text-sm text-bodytext">Dr. N.Y. Tasgaonkar Polytechnic · 2012–2015</dd></div>
          <div><dt className="mono-label">Human languages</dt><dd className="mt-2 text-headline">English · Hindi · Marathi</dd></div>
        </dl>
      </div>
    </section>
  );
}

export function Learning() {
  const items = [
    { t: "AI Tools Workshop", m: "Be10x · February 2026", d: "Exploring practical AI tools and workflows." },
    { t: "JavaScript Unit Testing — The Practical Guide", m: "Udemy · Course issued August 2024", d: "Testing foundations for dependable JavaScript." },
  ];
  return (
    <section aria-labelledby="learning-title" className="site-wrap py-16 md:py-24">
      <p className="mono-label">05 / Continuous learning</p>
      <h2 id="learning-title" className="mt-3 font-display text-3xl font-normal text-headline md:text-5xl">Always sharpening the craft.</h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map(i => <li key={i.t} className="rounded-lg bg-sage p-6"><h3 className="font-medium text-headline">{i.t}</h3><p className="mt-1 text-sm text-bodytext">{i.m}</p><p className="mt-3 text-sm text-bodytext">{i.d}</p></li>)}
      </ul>
    </section>
  );
}
