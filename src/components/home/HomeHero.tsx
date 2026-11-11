import { ArrowUpRight } from "lucide-react";
import heroWorkspace from "@/assets/hero-workspace.jpg";

export default function HomeHero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="ink-section relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      {/* Full-screen background image with parallax drift */}
      <div className="absolute inset-0" aria-hidden>
        <img
          data-parallax="120"
          src={heroWorkspace}
          alt=""
          width={1920}
          height={1088}
          fetchPriority="high"
          className="h-full w-full object-cover will-change-transform"
        />
        {/* Ink scrim for text legibility, strongest at the bottom where the headline sits */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/90" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 to-transparent" />
      </div>

      <div className="site-wrap relative flex flex-1 flex-col pb-10 pt-10 md:pb-14 md:pt-14">
        <div data-hero-layer="0.6" className="flex justify-between gap-4">
          <p className="mono-label">Nikhil Alakri / Senior Software Engineer</p>
          <p className="mono-label hidden sm:block">Based in India ↗</p>
        </div>

        <div data-hero-layer="0.4" className="mt-auto max-w-3xl pt-16 md:pt-24">
          <h1 id="hero-title" className="font-display text-4xl font-normal leading-[1.06] text-paper sm:text-6xl xl:text-7xl">
            Thoughtful interfaces.<br />Powerful systems.
          </h1>
          <p className="mt-6 text-base font-medium text-paper">Hi, I'm Nikhil. Senior Software Engineer at CitiusTech.</p>
          <p className="mt-2 max-w-xl text-base text-paper/80">
            Frontend, design systems &amp; applied AI. I build accessible interfaces, scalable web platforms, and reliable software with a focus on quality.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="inline-flex min-h-12 items-center justify-between gap-6 rounded-md bg-lime px-5 text-sm font-medium text-ink transition-colors hover:bg-paper">
              Explore my work <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div data-hero-layer="0.1" className="mt-10 flex justify-between border-t border-paper/25 pt-4">
          <p className="mono-label">Design systems / Web platforms / AI engineering</p>
          <a href="#proof" className="mono-label hidden hover:text-paper sm:block">Scroll to explore ↓</a>
        </div>
      </div>
    </section>
  );
}
