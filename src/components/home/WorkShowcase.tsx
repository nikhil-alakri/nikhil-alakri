import { useEffect, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/caseStudies";
import ConceptPreview from "./ConceptPreview";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { carouselKeyTarget } from "@/lib/carouselKeys";
import { SITE_URLS } from "@/config/urls";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function WorkShowcase() {
  const [featured, ...rest] = CASE_STUDIES;
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update(); api.on("select", update); api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);

  // Reduced motion: jump instantly between slides instead of animating.
  const go = (i: number) => api?.scrollTo(i, reduced);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button, input, textarea")) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    }
    const target = carouselKeyTarget(e.key, active, rest.length);
    if (target === null) return;
    e.preventDefault(); e.stopPropagation(); go(target);
  };

  return (
    <section id="work" aria-labelledby="work-title" className="site-wrap py-16 md:py-24">
      <p className="mono-label">01 / Selected work</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-title" className="font-display text-3xl font-normal text-headline md:text-5xl">Ideas, engineered into reality.</h2>
        <a href={SITE_URLS.socials.github} target="_blank" rel="noopener noreferrer" className="hit inline-flex items-center gap-1 text-sm text-headline">Explore GitHub <ArrowUpRight className="size-4" /></a>
      </div>

      <article className="mt-10 grid overflow-hidden rounded-lg border border-surface-border bg-sage md:grid-cols-[1.2fr_1fr]">
        <div className="min-h-64"><ConceptPreview kind={featured.preview} large /></div>
        <div className="flex flex-col p-6 md:p-8">
          <p className="mono-label">Featured / {featured.label}</p>
          <h3 className="mt-3 font-display text-3xl text-headline">{featured.title}</h3>
          <p className="mt-3 text-lg font-medium text-headline">{featured.headline}</p>
          <p className="mt-3 text-sm text-bodytext">{featured.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs text-headline">{featured.tags.map(t => <li key={t} className="rounded bg-background px-2 py-1">{t}</li>)}</ul>
          <Link to="/work/$slug" params={{ slug: featured.slug }} className="mt-auto inline-flex min-h-12 items-center gap-2 pt-6 text-sm font-medium text-headline underline-offset-4 hover:underline">Read case study <ArrowUpRight className="size-4" /></Link>
        </div>
      </article>

      <div className="mt-10 flex items-center justify-between gap-4">
        <p className="text-sm text-bodytext" id="carousel-help">Drag, swipe, or use ← → Home End keys.</p>
        <div className="flex gap-2">
          <button onClick={() => go((active - 1 + rest.length) % rest.length)} aria-label="Previous project" className="hit inline-flex items-center justify-center rounded-md border border-surface-border text-headline hover:bg-sage"><ArrowLeft className="size-4" /></button>
          <button onClick={() => go((active + 1) % rest.length)} aria-label="Next project" className="hit inline-flex items-center justify-center rounded-md border border-surface-border text-headline hover:bg-sage"><ArrowRight className="size-4" /></button>
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ align: "start", loop: true, duration: reduced ? 1 : 28 }} onKeyDownCapture={onKey} tabIndex={0} aria-label="More projects" aria-describedby="carousel-help" className="mt-4 rounded-lg">
        <CarouselContent className="-ml-4 cursor-grab active:cursor-grabbing">
          {rest.map((p, i) => (
            <CarouselItem key={p.slug} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${rest.length}: ${p.title}`} className="basis-[88%] pl-4 sm:basis-1/2 lg:basis-1/3">
              <article className="flex h-full flex-col">
                <div className="h-48 overflow-hidden rounded-lg border border-surface-border"><ConceptPreview kind={p.preview} /></div>
                <p className="mono-label mt-4">{p.label}</p>
                <div className="mt-1 flex items-start justify-between gap-3"><h3 className="font-display text-xl text-headline">{p.title}</h3></div>
                <p className="mt-2 text-sm text-bodytext">{p.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs text-headline">{p.tags.map(t => <li key={t} className="rounded bg-sage px-2 py-1">{t}</li>)}</ul>
                <Link to="/work/$slug" params={{ slug: p.slug }} className="mt-auto inline-flex min-h-12 items-center gap-2 pt-3 text-sm font-medium text-headline underline-offset-4 hover:underline" aria-label={`Read the ${p.title} case study`}>Case study <ArrowUpRight className="size-4" /></Link>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-6 flex justify-center gap-1" role="tablist" aria-label="Choose project">
        {rest.map((p, i) => (
          <button key={p.slug} role="tab" aria-selected={i === active} aria-label={p.title} onClick={() => go(i)} className="hit inline-flex items-center justify-center">
            <span className={`block h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-ink" : "w-1.5 bg-olive/40"}`} />
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Showing {rest[active]?.title}, project {active + 1} of {rest.length}</p>
    </section>
  );
}
