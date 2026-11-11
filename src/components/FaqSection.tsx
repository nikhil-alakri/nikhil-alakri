
import { FileDown, Eye, Mail, ArrowUpRight } from "lucide-react";
import PORTFOLIO_DATA from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const handleOpenResume = () => {
    window.dispatchEvent(new CustomEvent("portfolio:open-resume"));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-surface-border relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-10 sm:mb-14">
          <div className="text-xs font-mono tracking-widest uppercase text-mint/80 mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span>06 · Inquiries &amp; Perspectives</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-headline tracking-[-0.04em] leading-[1.08] mb-4">
            Frequently Asked <span className="font-serif italic text-amber">Questions</span>
          </h2>
          <p className="text-mutedtext text-sm sm:text-base max-w-lg mx-auto">
            Insights into my architectural philosophy, performance standards, resume access, and availability.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp">
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="space-y-3.5"
          >
            {PORTFOLIO_DATA.faq.map((faq, idx) => {
              const isResumeQuestion =
                faq.question.toLowerCase().includes("resume") ||
                faq.question.toLowerCase().includes("cv");

              return (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${idx}`}
                  className="overflow-hidden rounded-2xl border border-white/[0.06] bg-surface/20 backdrop-blur-md transition-colors data-[state=open]:border-mint/40 data-[state=open]:bg-surface/40"
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="space-y-4 border-t border-surface-border/40 text-sm leading-relaxed text-bodytext sm:text-base">
                    <p>{faq.answer}</p>

                    {isResumeQuestion && (
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleOpenResume}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-mint px-4 py-2 text-xs font-semibold text-background shadow-sm transition-colors hover:bg-mint-dark"
                        >
                          <Eye className="size-3.5" />
                          <span>Open Resume Viewer</span>
                        </button>

                        <a
                          href={PORTFOLIO_DATA.personal.resumeUrl}
                          download="Nikhil-Alakri-Resume.pdf"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-mint/40 bg-surface px-4 py-2 text-xs font-semibold text-headline transition-colors hover:border-mint hover:bg-surface-elevated"
                        >
                          <FileDown className="size-3.5 text-mint" />
                          <span>Download PDF (118 KB)</span>
                        </a>

                        <a
                          href={PORTFOLIO_DATA.contact.mailto}
                          className="inline-flex items-center gap-1 font-mono text-xs text-mint hover:underline"
                        >
                          <Mail className="size-3.5" />
                          <span>{PORTFOLIO_DATA.contact.email}</span>
                          <ArrowUpRight className="size-3" />
                        </a>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
