"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink, Github, CheckCircle2, Terminal, Shield, Sparkles, Layers, ArrowUpRight } from "lucide-react";

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: string;
  oneLiner: string;
  problem: string;
  approach: string;
  architecture: {
    stack: string[];
    decisions: string[];
  };
  results: {
    metrics: string[];
    summary: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
}

export const CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  "odin-eye": {
    id: "odin-eye",
    title: "odin-eye",
    category: "Multimodal AI & Reverse Engineering",
    oneLiner: "Autonomous ethical AI crawler & full-stack reverse-engineering engine powered by ChromaDB RAG.",
    problem:
      "Enterprise systems and legacy web applications often lack accurate documentation, schema diagrams, or up-to-date API contracts. Engineering teams spend weeks manually tracing network payloads and UI hierarchies.",
    approach:
      "Engineered an autonomous agent that crawls web frontends under strict robots.txt compliance, captures UI hierarchies with multimodal vision models, indexes payloads in a local ChromaDB vector store, and synthesizes complete relational ERDs and OpenAPI specs.",
    architecture: {
      stack: ["Python", "Multimodal Vision", "ChromaDB Vector RAG", "Playwright", "FastAPI"],
      decisions: [
        "Local vector database embedding to avoid cloud data leakage of proprietary payloads",
        "Deterministic heuristic parsing paired with vision validation for 99.4% element recognition",
        "Automated PDF executive blueprint generator using ReportLab",
      ],
    },
    results: {
      metrics: [
        "100% automated schema extraction across complex SPAs",
        "Zero-cloud dependency with local privacy guarantees",
        "Over 80 hours saved per architectural audit",
      ],
      summary: "Deconstructs production SPAs into relational database ERDs, REST contracts, and executive blueprints in minutes.",
    },
    githubUrl: "https://github.com",
    tags: ["Python", "Multimodal AI", "ChromaDB RAG", "System Architecture"],
  },
  "tryy": {
    id: "tryy",
    title: "Tryy (tryy.in)",
    category: "Consumer Platform & Growth",
    oneLiner: "High-traffic consumer product trial platform with real-time logistics and fraud-resistant redemption.",
    problem:
      "Consumer trial sample distribution suffers from inventory hoarding, duplicate redemption bots, and erratic order spikes that crash standard e-commerce carts.",
    approach:
      "Built a high-throughput trial redemption platform utilizing Redis-backed idempotency locks, verified user KYC flows, and direct logistics carrier API webhooks.",
    architecture: {
      stack: ["React", "Node.js", "Redis", "PostgreSQL", "Tailwind CSS"],
      decisions: [
        "Distributed lock pattern in Redis to prevent double redemption during high-volume flash drops",
        "Partitioned PostgreSQL tables for high-velocity order audit trails",
        "Sub-second carrier tracking webhooks feeding real-time delivery statuses to consumers",
      ],
    },
    results: {
      metrics: [
        "99.98% platform uptime across high-concurrency sample drops",
        "50,000+ consumer orders processed with zero double-redemptions",
        "Sub-150ms average API response time under peak load",
      ],
      summary: "Scaled consumer product redemption from zero to tens of thousands of verified deliveries nationwide.",
    },
    liveUrl: "https://tryy.in",
    githubUrl: "https://github.com",
    tags: ["Full-Stack", "High Traffic", "React", "Node.js", "Production"],
  },
  "citiustech-ui": {
    id: "citiustech-ui",
    title: "Healthcare UI Component Platform",
    category: "Clinical Design Systems",
    oneLiner: "Framework-agnostic Lit web component library delivering WCAG AA accessibility for regulated healthtech.",
    problem:
      "Distributed clinical applications across multiple hospital networks lacked visual consistency, failed stringent accessibility audits, and suffered from slow sprint release cycles due to fragmented codebases.",
    approach:
      "Architected a centralized component platform with Lit web components and React wrappers. Standardized tokens for color, typography, elevation, and RTL/LTR internationalization with strict Definition of Done (DoD).",
    architecture: {
      stack: ["Lit 3.0", "TypeScript", "React Wrappers", "Vitest", "Storybook", "Sharp", "WCAG AA"],
      decisions: [
        "Framework-agnostic Web Components using Shadow DOM to eliminate CSS collisions across legacy portals",
        "Automated image & asset optimization pipelines with Sharp, boosting Lighthouse scores",
        "Zero-regression Vitest and visual regression suites embedded into CI/CD pipelines",
      ],
    },
    results: {
      metrics: [
        "100/100 Lighthouse Accessibility & Performance compliance",
        "40% reduction in UI bug tickets across clinical apps",
        "2x faster sprint delivery for new healthtech screens",
      ],
      summary: "Adopted as the foundational UI layer across enterprise healthcare teams, ensuring HIPAA & WCAG AA readiness.",
    },
    tags: ["Lit", "TypeScript", "React", "Design Systems", "WCAG AA", "Healthcare"],
  },
  "itpo": {
    id: "itpo",
    title: "ipo (ITPO)",
    category: "Financial Analytics & Market Listings",
    oneLiner: "TypeScript edge application for real-time tracking, subscription analysis, and valuation of IPOs.",
    problem:
      "Retail investors face scattered, delayed IPO metrics across disparate financial portals without automated valuation metrics or peer benchmarking.",
    approach:
      "Engineered a dedicated full-stack edge application that aggregates live IPO listing data, computes subscription oversubcription rates, and renders comparative performance graphs.",
    architecture: {
      stack: ["Next.js 15 App Router", "TypeScript", "Vercel Edge", "Tailwind CSS"],
      decisions: [
        "Edge computing runtime for instant sub-80ms global TTFB",
        "Static generation with revalidation for fresh financial analytics",
        "Accessible, high-contrast data visualizations for subscription ratios",
      ],
    },
    results: {
      metrics: [
        "Sub-100ms global response time via Vercel Edge",
        "100% type safety across financial API payloads",
        "Zero layout shifts during real-time data updates",
      ],
      summary: "Empowers retail investors with immediate algorithmic insights and listing valuation trends.",
    },
    liveUrl: "/itpo",
    githubUrl: "https://github.com",
    tags: ["Next.js", "Edge Runtime", "Financial Data", "TypeScript"],
  },
  "multiliving": {
    id: "multiliving",
    title: "MultiLiving Rental Platform",
    category: "Real Estate & Real-Time Data",
    oneLiner: "Interactive apartment rental portal with real-time inventory checking and digital tenant onboarding.",
    problem:
      "Tenants faced manual phone verification and inaccurate property availability listings in rapid urban rental markets.",
    approach:
      "Constructed a reactive single-page portal with real-time apartment inventory synchronization and automated lease submission.",
    architecture: {
      stack: ["React", "JavaScript", "Node.js", "REST APIs", "Unit Testing"],
      decisions: [
        "Optimistic UI updates for instant filter response times across hundreds of apartment listings",
        "Strict unit-testing coverage across property booking workflows",
      ],
    },
    results: {
      metrics: [
        "Eliminated inventory booking collisions",
        "30% reduction in client onboarding turnaround time",
      ],
      summary: "Delivered a reliable digital walkthrough and tenant registration workflow for high-density apartments.",
    },
    githubUrl: "https://github.com",
    tags: ["React", "Real-Time Data", "REST APIs", "Unit Testing"],
  },
  "aditya-birla": {
    id: "aditya-birla",
    title: "Aditya Birla Financial Calculators",
    category: "Financial Modeling & Algorithms",
    oneLiner: "High-precision financial projection and actuarial modeling engines with interactive visual graphing.",
    problem:
      "Policyholders struggled to visualize long-term compounding returns, retirement planning horizons, and child education costs.",
    approach:
      "Engineered dynamic client-side financial calculators implementing compound actuarial formulas with instant SVG visual projection curves.",
    architecture: {
      stack: ["TypeScript", "SVG Data Viz", "Actuarial Algorithms", "Responsive Web"],
      decisions: [
        "Zero external charting libraries to preserve minimum first-load bundle size",
        "Actuarial unit testing ensuring mathematical parity with enterprise spreadsheets",
      ],
    },
    results: {
      metrics: [
        "100% mathematical parity with certified actuarial tables",
        "Zero-latency calculation updates as user drags slider inputs",
      ],
      summary: "Adopted by thousands of policyholders for accurate financial horizon planning.",
    },
    githubUrl: "https://github.com",
    tags: ["Algorithms", "Financial Modeling", "Data Viz", "TypeScript"],
  },
};

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
}

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const study = projectId ? CASE_STUDIES[projectId] : null;

  useEffect(() => {
    if (!study) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set URL hash for deep-linking
    window.history.replaceState(null, "", `#project-${study.id}`);

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.history.replaceState(null, "", window.location.pathname);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-background/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface/95 border border-mint/40 shadow-2xl p-6 sm:p-9 text-headline backdrop-blur-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-surface-elevated border border-surface-border text-mutedtext hover:text-headline hover:border-mint transition-colors"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-mint px-3 py-1 rounded-full bg-surface-elevated border border-mint/20">
            {study.category}
          </span>
          <span className="text-xs font-mono text-mutedtext">Case Study Deep-Dive</span>
        </div>

        {/* Title & One-Liner */}
        <h2 id="case-study-title" className="font-display text-2xl sm:text-4xl font-bold text-headline mb-3 tracking-tight">
          {study.title}
        </h2>
        <p className="text-base sm:text-lg text-bodytext leading-relaxed mb-6 font-sans border-b border-surface-border pb-6">
          {study.oneLiner}
        </p>

        {/* 4 Case Study Pillars */}
        <div className="space-y-6">
          {/* 1. Problem & Challenge */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-mint font-semibold flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4" />
              <span>01. The Problem &amp; System Bottleneck</span>
            </h3>
            <p className="text-sm text-bodytext leading-relaxed font-sans bg-surface/60 p-4 rounded-xl border border-surface-border">
              {study.problem}
            </p>
          </div>

          {/* 2. Engineering Approach */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-mint font-semibold flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4" />
              <span>02. Architectural Solution &amp; Approach</span>
            </h3>
            <p className="text-sm text-bodytext leading-relaxed font-sans bg-surface/60 p-4 rounded-xl border border-surface-border">
              {study.approach}
            </p>
          </div>

          {/* 3. Key Decisions & Stack */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-mint font-semibold flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4" />
              <span>03. Core Architectural Decisions</span>
            </h3>
            <ul className="space-y-2 bg-surface/60 p-4 rounded-xl border border-surface-border mb-3">
              {study.architecture.decisions.map((dec, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-bodytext">
                  <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {study.architecture.stack.map((s) => (
                <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface-elevated border border-surface-border text-headline">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Production Results & Metrics */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-mint font-semibold flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>04. Verified Production Impact</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {study.results.metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-surface border border-mint/20 text-center">
                  <p className="text-xs font-semibold text-headline leading-snug">{m}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-mutedtext italic font-mono">
              Result: {study.results.summary}
            </p>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t border-surface-border">
          <div className="flex items-center gap-3">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target={study.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mint text-background text-sm font-semibold hover:bg-mint-dark transition-all shadow-lg shadow-mint/10"
              >
                <span>Launch Live Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-headline text-sm font-medium hover:border-mint transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-mint" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-mutedtext hover:text-headline transition-colors"
          >
            Press ESC or click outside to close
          </button>
        </div>
      </div>
    </div>
  );
}

