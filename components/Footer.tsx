"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  FileDown,
  Sparkles,
  Copy,
  Check,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import PORTFOLIO_DATA from "@/src/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import { soundManager } from "@/lib/audio";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const scrollToTop = () => {
    soundManager.playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    soundManager.playClickSound();
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleOpenResume = () => {
    soundManager.playClickSound();
    window.dispatchEvent(new CustomEvent("portfolio:open-resume"));
  };

  const handleCtaHover = () => {
    soundManager.playHoverSound();
    window.dispatchEvent(
      new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
    );
  };

  return (
    <footer id="contact" className="py-16 sm:py-24 border-t border-surface-border bg-surface/40 backdrop-blur-md relative">
      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-surface-elevated border border-mint/60 text-headline shadow-2xl shadow-mint/20 text-xs sm:text-sm font-medium transition-all duration-300 ${
          showToast
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <span className="p-1 rounded-lg bg-mint text-background">
          <Check className="w-3.5 h-3.5" />
        </span>
        <span>Email copied to clipboard ({PORTFOLIO_DATA.contact.email})</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main Connect / Recruiter Conversion Card */}
        <ScrollReveal
          animation="scaleUp"
          className="rounded-3xl bg-surface/30 border border-white/[0.08] p-6 sm:p-10 md:p-12 mb-14 relative overflow-hidden backdrop-blur-md"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(94,234,212,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(203,181,148,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            {/* Left Column: Headline & Value Proposition */}
            <div className="max-w-xl">
              <div className="text-xs font-mono tracking-widest uppercase text-mint/80 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                <span>{PORTFOLIO_DATA.personal.availability}</span>
              </div>

              <h2 className="font-display font-light text-3xl sm:text-5xl md:text-6xl text-headline mb-4 tracking-[-0.04em] leading-[1.08]">
                Let&apos;s build something <span className="font-serif italic text-mint">exceptional</span>.
              </h2>

              <p className="text-mutedtext text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Whether you need enterprise design systems architected with Lit &amp; TypeScript, regulated healthcare UI platforms with 100% WCAG AA compliance, or multimodal AI accelerators, I&apos;m ready to contribute.
              </p>

              {/* Direct Email Pill with Copy Action */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-surface-border hover:border-mint text-headline text-xs sm:text-sm font-mono transition-all group"
                  title="Click to copy email address"
                >
                  <Mail className="w-4 h-4 text-mint" />
                  <span>{PORTFOLIO_DATA.contact.email}</span>
                  <span className="p-1 rounded-md bg-surface border border-surface-border text-mutedtext group-hover:text-mint transition-colors">
                    {copied ? <Check className="w-3 h-3 text-mint" /> : <Copy className="w-3 h-3" />}
                  </span>
                </button>

                <a
                  href={PORTFOLIO_DATA.contact.mailto}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-mint text-xs sm:text-sm transition-colors"
                >
                  <span>Open Mail Client</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-mint" />
                </a>
              </div>
            </div>

            {/* Right Column: High-Conversion CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 justify-center">
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                download="Nikhil-Alakri-Resume.pdf"
                onMouseEnter={handleCtaHover}
                className="magnetic inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-mint text-background font-semibold hover:bg-mint-dark transition-all text-sm shadow-lg shadow-mint/20 will-change-transform text-center"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>

              <button
                type="button"
                onMouseEnter={handleCtaHover}
                onClick={handleOpenResume}
                className="magnetic inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface border border-mint/40 text-headline font-semibold hover:bg-surface-elevated hover:border-mint transition-colors text-sm will-change-transform text-center cursor-pointer"
              >
                <Eye className="w-4 h-4 text-mint" />
                <span>View Resume In-Page</span>
              </button>

              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href={PORTFOLIO_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-mint transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-mint transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer Meta Row */}
        <div className="pt-6 sm:pt-8 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bodytext">
          <p>
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name} · {PORTFOLIO_DATA.personal.role}.
          </p>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bodytext hover:text-headline flex items-center gap-1.5 transition-colors py-1"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bodytext hover:text-headline flex items-center gap-1.5 transition-colors py-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <span className="text-surface-border" aria-hidden="true">
              &bull;
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="magnetic p-2 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-mint transition-colors flex items-center gap-1.5 min-w-[36px] min-h-[36px] cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
