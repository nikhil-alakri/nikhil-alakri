"use client";

import { useState } from "react";
import { ChevronDown, Building2, MapPin, Calendar, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  tagline: string;
  achievements: string[];
  techStack: string[];
  metrics?: string;
}

const timeline: ExperienceItem[] = [
  {
    id: "citiustech",
    year: "2024 — Present",
    role: "Senior Software Engineer",
    company: "CitiusTech Healthcare Technology",
    location: "Airoli, India",
    tagline: "Leading clinical UI platform architectures, Lit web components, and Agentic AI accelerators.",
    metrics: "HIPAA Compliant · WCAG AA",
    achievements: [
      "Architected a reusable UI component library using Lit and TypeScript, delivering core interface elements used across multiple regulated clinical applications.",
      "Standardized a rigorous Definition of Done (DoD) incorporating WCAG accessibility, i18n (LTR/RTL), and design tokens to ensure high-fidelity delivery.",
      "Boosted application performance and SEO by engineering automated image optimization pipelines with Sharp and Jimp, resulting in measurably improved Lighthouse scores.",
      "Spearheaded technical accelerators including Agentic SQL Parsers and Patient 360 dashboards to validate feasibility and accelerate presales velocity.",
      "Designed a specialized medical imaging chat POC featuring drag-and-drop validation, clinical study sidebars, and contextual history.",
    ],
    techStack: ["Lit", "TypeScript", "React", "Sharp", "Jimp", "Vitest", "Storybook", "WCAG AA", "i18n"],
  },
  {
    id: "adventum",
    year: "2022 — 2024",
    role: "SDE-2",
    company: "Adventum Student Living",
    location: "Lower Parel, Mumbai",
    tagline: "Engineered scalable web applications for UniAcco, UniScholars, and UniCreds.",
    metrics: "+20% Load Speed · 80% Roadmap",
    achievements: [
      "Optimized websites for Core Web Vitals using Next.js, built-in image optimization, and global CDN, driving a 20% improvement in page load speed.",
      "Modernized legacy JavaScript codebase with Next.js, reducing bug resolution time by 20%.",
      "Shortened agent interaction times, allowing the operations team to handle 15% more calls per day.",
      "Successfully implemented features covering 80% of the long-term product roadmap in high-concurrency environments.",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Vite", "Core Web Vitals", "Lighthouse"],
  },
  {
    id: "lodha",
    year: "2021 — 2022",
    role: "Senior Executive - Technology",
    company: "The House of Abhinandan Lodha",
    location: "Lower Parel, Mumbai",
    tagline: "Led architectural strategy and deployment frameworks for luxury digital real-estate experiences.",
    metrics: "Architecture & Scale",
    achievements: [
      "Collaborated with business teams to architect and deliver high-converting digital product experiences.",
      "Led full project setup with modern architecture patterns, deployment strategies, and CI/CD pipelines.",
      "Managed development pods and code quality standards with focused unit testing and performance tuning.",
    ],
    techStack: ["React", "TypeScript", "Node.js", "Docker", "AWS", "Architecture Design"],
  },
  {
    id: "multiliving",
    year: "2020 — 2021",
    role: "Software Engineer",
    company: "MultiLiving Technologies",
    location: "Lower Parel, Mumbai",
    tagline: "Engineered real-time dynamic flat rental platforms and core mobile computing systems.",
    metrics: "Real-Time Systems",
    achievements: [
      "Built the core framework for a dynamic flat rental portal allowing users to check real-time apartment availability and specifications.",
      "Collaborated with business units to design application systems enhancing mobile computing capabilities.",
      "Consistently delivered unit-tested systems within client-prescribed launch timeframes.",
    ],
    techStack: ["JavaScript", "React", "Node.js", "REST APIs", "Unit Testing"],
  },
  {
    id: "cloudesign",
    year: "2018 — 2020",
    role: "SDE-I",
    company: "Cloudesign Technology Solutions",
    location: "Vikhroli, Mumbai",
    tagline: "Delivered scalable full-stack web solutions and agile client deliverables.",
    metrics: "7+ Yrs Total Exp",
    achievements: [
      "Collaborated with Product Managers and QA engineers to develop clear technical specifications and resolve complex edge cases.",
      "Improved system throughput and user experience by making proactive adjustments and addressing performance bottlenecks.",
    ],
    techStack: ["JavaScript", "HTML5/SCSS", "Python", "MySQL", "Git"],
  },
];

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string>("citiustech");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface border border-accent/30 text-accent mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Career Journey</span>
            </div>
            <h2 className="font-primary text-2xl sm:text-4xl md:text-5xl font-bold text-headline tracking-tight">
              A Yearly Snapshot of Engineering Growth
            </h2>
          </div>
          <p className="text-bodytext text-sm sm:text-base max-w-md mt-3 md:mt-0 leading-relaxed">
            7+ years architecting enterprise design systems, healthtech platforms, and performance-critical web applications.
          </p>
        </ScrollReveal>

        {/* Interactive Timeline List inspired by Reference 2 */}
        <ScrollReveal animation="fadeUp" stagger={0.08} className="space-y-4">
          {timeline.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "bg-surface-elevated border-accent shadow-xl"
                    : "bg-surface border-surface-border hover:border-accent/60 hover:bg-surface-elevated/70"
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs sm:text-sm font-bold text-accent px-2.5 py-1 rounded-lg bg-surface border border-surface-border shrink-0">
                      0{index + 1}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-primary text-lg sm:text-xl font-bold text-headline">
                          {item.role}
                        </h3>
                        <span className="text-accent font-medium text-sm">@ {item.company}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-bodytext line-clamp-1">
                        {item.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-border/40">
                    {item.metrics && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-background/80 text-accent border border-surface-border">
                        <Award className="w-3 h-3 text-status" />
                        {item.metrics}
                      </span>
                    )}
                    <span className="font-mono text-xs sm:text-sm font-semibold text-headline">
                      {item.year}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg bg-surface border border-surface-border text-bodytext transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-accent border-accent" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-surface-border/60">
                    <div className="flex items-center gap-4 text-xs font-mono text-bodytext mb-4">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-accent" />
                        {item.company}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {item.location}
                      </span>
                    </div>

                    <div className="mb-5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2.5">
                        Key Responsibilities &amp; Outcomes:
                      </h4>
                      <ul className="space-y-2">
                        {item.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-bodytext leading-relaxed">
                            <span className="text-accent mt-0.5">&bull;</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
                        Technologies &amp; Standards:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-background/80 text-bodytext border border-surface-border font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}

