import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import PORTFOLIO_DATA from "@/data/portfolio";
import ProjectModal, { CASE_STUDIES } from "@/components/ProjectModal";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import aiImage from "@/assets/project-ai.jpg";
import platformImage from "@/assets/project-platform.jpg";
import financeImage from "@/assets/project-finance.jpg";
import workspace from "@/assets/workspace.jpg";

const visuals: Record<string, { image: string; alt: string; summary: string }> = {
  "odin-eye": { image: aiImage, alt: "Conceptual interface architecture diagrams and analysis", summary: "From complex applications to clear architectural blueprints." },
  tryy: { image: platformImage, alt: "Editorial product-trial collection", summary: "Connecting global brands with curious consumers at scale." },
  multiliving: { image: workspace, alt: "Contemporary interior representing digital property experiences", summary: "Real-time rental discovery and seamless tenant onboarding." },
  "aditya-birla": { image: financeImage, alt: "Financial planning charts and calculator", summary: "Making long-term financial decisions easier to understand." },
  "ui-store": { image: aiImage, alt: "Interface patterns and component diagrams", summary: "Reusable components. Consistent experiences. Faster delivery." },
  itpo: { image: financeImage, alt: "Market analytics charts", summary: "A clearer view of IPO listings and financial market data." },
};

export default function BentoProjects() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update(); api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);
  useEffect(() => {
    const id = window.location.hash.replace("#project-", "");
    if (CASE_STUDIES[id]) setSelected(id);
  }, []);
  return (
    <section id="projects" className="portfolio-section overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div><p className="section-eyebrow">01 / Selected work</p><h2 className="section-title">Built with purpose.<br /><span className="font-serif italic text-amber">Made for impact.</span></h2></div>
          <p className="max-w-xs text-sm text-mutedtext">A selection of platforms, products, and systems — from first principles to production.</p>
        </div>
        <Carousel opts={{ align: "start", loop: true }} setApi={setApi} aria-label="Selected projects" className="project-carousel">
          <CarouselContent className="-ml-5 cursor-grab active:cursor-grabbing">
            {PORTFOLIO_DATA.projects.map((project, index) => {
              const visual = visuals[project.id];
              if (!visual) return null;
              const validPath = project.path !== "https://github.com/nikhil-alakri";
              return (
                <CarouselItem key={project.id} className="basis-[92%] pl-5 md:basis-[70%] lg:basis-[62%]">
                  <article className="group h-full overflow-hidden rounded-lg border border-surface-border bg-surface">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={visual.image} alt={visual.alt} loading="lazy" width={1536} height={1024} draggable={false} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none" />
                      <span className="absolute left-4 top-4 rounded bg-background/90 px-3 py-1.5 text-xs text-headline">{String(index + 1).padStart(2, "0")} / {project.id === "odin-eye" ? "AI & Architecture" : project.category.split(" & ")[0]}</span>
                    </div>
                    <div className="p-5 sm:p-7">
                      <div className="flex items-start justify-between gap-4"><h3 className="font-display text-2xl text-headline sm:text-3xl">{project.title}</h3><ArrowUpRight className="size-5 shrink-0 text-mint" /></div>
                      <p className="mt-3 min-h-12 text-sm text-bodytext">{visual.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-mutedtext">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
                      <div className="mt-6 flex flex-wrap gap-3 border-t border-surface-border pt-4">
                        <Button onClick={() => setSelected(project.id)} variant="ghost" className="px-0 text-mint hover:bg-transparent hover:text-amber"><BookOpen /> Case study</Button>
                        {validPath && <Button asChild variant="ghost" className="text-headline hover:bg-surface-elevated"><a href={project.path} target={project.isExternal ? "_blank" : undefined} rel={project.isExternal ? "noopener noreferrer" : undefined}>{project.isExternal ? "Visit website" : "Explore project"}<ArrowUpRight /></a></Button>}
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-mutedtext" aria-live="polite">{String(active + 1).padStart(2, "0")} <span className="mx-2 text-mint">/</span> 06</span>
            <div className="flex gap-2"><Button variant="outline" size="icon" onClick={() => api?.scrollPrev()} aria-label="Previous project" className="border-surface-border bg-surface text-headline hover:bg-surface-elevated"><ArrowLeft /></Button><Button variant="outline" size="icon" onClick={() => api?.scrollNext()} aria-label="Next project" className="border-surface-border bg-surface text-headline hover:bg-surface-elevated"><ArrowRight /></Button></div>
          </div>
        </Carousel>
      </div>
      <ProjectModal projectId={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
