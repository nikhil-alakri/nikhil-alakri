"use client";

import { Github, Linkedin, Mail, ArrowUp, FileDown, Sparkles } from "lucide-react";
import { SITE_URLS } from "@/config/urls";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-14 sm:py-20 border-t border-surface-border bg-surface/50 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Main Connect Card inspired by Reference 1 & 2 */}
        <div className="rounded-3xl bg-surface border border-accent/30 p-6 sm:p-10 mb-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(203,181,148,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-background/80 border border-accent/40 text-accent mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open for Senior Engineering Roles &amp; Consultations</span>
              </div>
              <h2 className="font-primary text-2xl sm:text-4xl md:text-5xl font-bold text-headline mb-3 tracking-tight">
                Let&apos;s build something exceptional.
              </h2>
              <p className="text-bodytext text-sm sm:text-base leading-relaxed">
                Whether you are building enterprise design systems, regulated healthtech platforms, or performance-critical AI applications, feel free to reach out.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={SITE_URLS.resume}
                download="Nikhil_Alakri_Resume_CitiusTech.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface border border-accent/50 text-headline font-semibold hover:bg-surface-elevated hover:border-accent transition-all text-sm"
              >
                <FileDown className="w-4 h-4 text-accent" />
                <span>Download CV</span>
              </a>

              <a
                href={SITE_URLS.contact.mailto}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-background font-semibold hover:bg-accent transition-all text-sm shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>{SITE_URLS.contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Meta Row */}
        <div className="pt-6 sm:pt-8 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bodytext">
          <p>&copy; {new Date().getFullYear()} Nikhil Alakri · Senior Software Engineer. All rights reserved.</p>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href={SITE_URLS.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bodytext hover:text-headline flex items-center gap-1.5 transition-colors py-1"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={SITE_URLS.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bodytext hover:text-headline flex items-center gap-1.5 transition-colors py-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <span className="text-bodytext" aria-hidden="true">&bull;</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-accent transition-colors flex items-center gap-1.5 min-w-[36px] min-h-[36px]"
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
