"use client";

import Link from "next/link";
import { ArrowUpRight, Eye, Palette, TrendingUp, Sparkles, Building, Calculator, Github } from "lucide-react";
import { SITE_URLS } from "@/config/urls";
import ScrollReveal from "@/components/ScrollReveal";
import TextScramble from "@/components/TextScramble";
import use3DTilt from "@/hooks/use3DTilt";

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  path: string;
  isExternal: boolean;
  githubUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

const projects: ProjectItem[] = [
  {
    title: SITE_URLS.projects.odinEye.title,
    category: "Multimodal AI & Reverse Engineering",
    description:
      "The all-seeing ethical AI crawler & full-stack reverse-engineering engine. Respects robots.txt while deconstructing modern web apps into relational database ERDs, REST API contracts, UI tokens, and executive boardroom PDF blueprints using multimodal vision and local ChromaDB RAG.",
    path: SITE_URLS.projects.odinEye.route,
    isExternal: false,
    githubUrl: SITE_URLS.projects.odinEye.github,
    icon: Eye,
    tags: ["Python", "Multimodal AI", "ChromaDB RAG", "System Architecture"],
  },
  {
    title: SITE_URLS.projects.tryy.title,
    category: "Consumer Platform & Growth",
    description:
      "A high-traffic platform where global brands provide free trial samples of products directly to consumers. High-volume user redemption workflows, real-time logistics tracking, and verified engagement.",
    path: SITE_URLS.projects.tryy.liveApp,
    isExternal: true,
    githubUrl: SITE_URLS.projects.tryy.github,
    icon: Sparkles,
    tags: ["Full-Stack", "High Traffic", "React", "Node.js", "Production"],
  },
  {
    title: SITE_URLS.projects.multiLiving.title,
    category: "Real Estate & Real-Time Data",
    description:
      "Dynamic apartment rental web platform engineered for real-time inventory inspection, interactive property walkthroughs, and tenant onboarding with strict unit-testing coverage.",
    path: SITE_URLS.projects.multiLiving.github,
    isExternal: true,
    githubUrl: SITE_URLS.projects.multiLiving.github,
    icon: Building,
    tags: ["React", "Dynamic State", "REST APIs", "Unit Testing"],
  },
  {
    title: SITE_URLS.projects.adityaBirla.title,
    category: "Financial Modeling & Algorithms",
    description:
      "Engineered comprehensive financial calculators for Aditya Birla, including Earning Potential, Child Education, and Retirement projection calculators with instant interactive visual graphing.",
    path: SITE_URLS.projects.adityaBirla.github,
    isExternal: true,
    githubUrl: SITE_URLS.projects.adityaBirla.github,
    icon: Calculator,
    tags: ["Algorithms", "Financial Modeling", "Data Viz", "TypeScript"],
  },
  {
    title: SITE_URLS.projects.uiStore.title,
    category: "Design Systems & Component Library",
    description:
      "A modular collection of reusable frontend components, interactive UI patterns, and clean design tokens engineered for rapid full-stack prototyping, high design fidelity, and seamless developer ergonomics.",
    path: SITE_URLS.projects.uiStore.github,
    isExternal: true,
    githubUrl: SITE_URLS.projects.uiStore.github,
    icon: Palette,
    tags: ["Design Systems", "Tokens", "Lit / Web Components", "CSS"],
  },
  {
    title: SITE_URLS.projects.ipo.title,
    category: "Financial Analytics & Market Listings",
    description:
      "TypeScript-powered full-stack application designed for tracking, analyzing, and visualizing Initial Public Offerings (IPOs), market listings, and structured financial data workflows. Deployed to edge production.",
    path: SITE_URLS.projects.ipo.route,
    isExternal: false,
    githubUrl: SITE_URLS.projects.ipo.github,
    icon: TrendingUp,
    tags: ["TypeScript", "Financial Data", "Full-Stack", "Web App"],
  },
];

function TiltProjectCard({ project }: { project: ProjectItem }) {
  const { ref, style, glareStyle } = use3DTilt<HTMLDivElement>({
    maxTilt: 7,
    perspective: 900,
    scale: 1.02,
    speed: 350,
    glare: true,
    maxGlare: 0.18,
  });

  const Icon = project.icon;

  return (
    <div
      ref={ref}
      style={style}
      className="project-card group relative flex flex-col justify-between p-6 rounded-2xl bg-surface border border-surface-border hover:border-accent hover:bg-surface-elevated transition-colors duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
    >
      {/* Glare specular sheen reflection */}
      <div style={glareStyle} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-accent group-hover:border-accent group-hover:scale-105 transition-all">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
            {project.category}
          </span>
        </div>

        <h3 className="font-primary text-lg sm:text-xl font-bold text-headline mb-2.5 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-bodytext leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-md bg-background/70 border border-surface-border text-bodytext font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-surface-border/60">
          {project.isExternal ? (
            <a
              href={project.path}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:text-headline transition-colors py-1"
            >
              <span>Explore App</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            <Link
              href={project.path}
              className="magnetic inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:text-headline transition-colors py-1"
            >
              <span>
                {project.path === "/itpo"
                  ? "Launch Live App (/itpo)"
                  : `Read Case Study (${project.path})`}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic p-1.5 rounded-lg text-bodytext hover:text-headline hover:bg-surface-elevated transition-colors"
              aria-label={`View ${project.title} GitHub Repository`}
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BentoProjects() {
  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface border border-accent/30 text-accent mb-3">
              <span>Selected Works</span>
            </div>
            <h2 className="font-primary text-2xl sm:text-4xl md:text-5xl font-bold text-headline tracking-tight">
              Featured Systems &amp; Production Apps
            </h2>
          </div>
          <p className="text-bodytext text-sm sm:text-base max-w-md mt-3 md:mt-0 leading-relaxed">
            Enterprise platforms, AI reverse-engineering engines, and consumer web applications shipped to production.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" stagger={0.09} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project) => (
            <TiltProjectCard key={project.title} project={project} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
