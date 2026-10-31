"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { SITE_URLS } from "@/config/urls";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is your primary engineering focus and specialization?",
    answer:
      "I am a Senior Software Engineer with 7+ years of experience specializing in healthcare design systems, high-performance UI platforms, and multimodal AI accelerators. I architect token-driven component libraries using Lit and TypeScript, standardize WCAG AA accessibility, and build high-throughput full-stack applications with React, Next.js, and Python.",
  },
  {
    question: "How do you achieve 100/100 Lighthouse and Core Web Vitals scores?",
    answer:
      "Performance is engineered into the system architecture from day one. I implement automated asset optimization pipelines (using Sharp and Jimp), eliminate render-blocking dependencies, utilize Next.js Server Components with streaming, ensure zero Cumulative Layout Shift (CLS), and maintain sub-1.5s Largest Contentful Paint (LCP) benchmarks.",
  },
  {
    question: "What experience do you have with AI, Vector RAG, and Reverse Engineering?",
    answer:
      "I engineered 'odin-eye', an autonomous reverse-engineering engine combining multimodal vision models with local ChromaDB RAG to deconstruct production web applications into relational ERDs, OpenAPI contracts, and design tokens. At CitiusTech, I also spearheaded Agentic SQL Parsers and specialized medical imaging chat POCs to accelerate feasibility validation.",
  },
  {
    question: "What roles and collaboration opportunities are you open to?",
    answer:
      "I am available for Senior Software Engineer, Lead Design Systems Architect, and Full-Stack AI Engineer positions, as well as select architectural consulting for organizations building high-fidelity web platforms or regulated clinical systems.",
  },
  {
    question: "Where can I view or download your complete official resume?",
    answer:
      `You can download my complete CV directly from this website via the header or footer CTA (${SITE_URLS.resume}), or reach out directly at ${SITE_URLS.contact.email}.`,
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface border border-accent/30 text-accent mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Questions &amp; Answers</span>
          </div>
          <h2 className="font-primary text-2xl sm:text-4xl md:text-5xl font-bold text-headline tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-bodytext text-sm sm:text-base max-w-lg mx-auto">
            Insights into my architectural philosophy, performance standards, and availability.
          </p>
        </div>

        {/* Accordion List inspired by Reference 3 */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-surface-elevated border-accent shadow-md"
                    : "bg-surface border-surface-border hover:border-accent/60"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-primary text-base sm:text-lg font-bold text-headline">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-xl bg-surface border border-surface-border text-accent shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-90 bg-accent text-background" : ""
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-bodytext leading-relaxed border-t border-surface-border/40 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

