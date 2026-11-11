import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import PORTFOLIO_DATA from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import workspace from "@/assets/workspace.jpg";

export default function Hero() {
  return (
    <section id="hero" className="portfolio-hero relative overflow-hidden">
      <img src={workspace} alt="A contemporary engineering workspace with dashboard displays" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-right" fetchPriority="high" />
      <div className="hero-shade absolute inset-0" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-between px-5 py-9 sm:px-8 sm:py-14">
        <div className="flex items-center justify-between gap-4 text-xs text-bodytext">
          <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-mint" /> Available for opportunities</span>
          <span className="hidden sm:block">Maharashtra, India ↗</span>
        </div>
        <div className="max-w-2xl py-10 sm:py-14">
          <p className="mb-4 text-sm text-mint">Senior Software Engineer</p>
          <h1 className="font-display text-5xl font-medium leading-[1.05] text-headline sm:text-7xl lg:text-8xl">Nikhil<br /><span className="font-serif italic font-normal text-amber">Alakri.</span></h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-bodytext sm:text-lg">Thoughtful interfaces.<br />Resilient systems. Real-world impact.</p>
          <p className="mt-3 max-w-md text-sm text-bodytext">Healthcare design systems, high-performance web platforms &amp; multimodal AI.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="h-11 bg-mint text-background hover:bg-mint-dark"><a href="#projects">Selected work <ArrowUpRight /></a></Button>
            <Button asChild variant="outline" className="h-11 border-surface-border bg-background/50 text-headline hover:bg-surface"><a href={PORTFOLIO_DATA.personal.resumeUrl} download><FileDown /> Download CV</a></Button>
          </div>
        </div>
        <div className="flex items-end justify-between border-t border-surface-border pt-5">
          <p className="max-w-56 text-xs text-bodytext">7+ years turning complex challenges into considered digital experiences.</p>
          <a href="#projects" aria-label="View selected work" className="flex size-10 items-center justify-center rounded-full border border-surface-border text-mint"><ArrowDown className="size-4" /></a>
        </div>
      </div>
    </section>
  );
}
