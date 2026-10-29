"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-12 sm:py-16 border-t border-surface-border bg-surface/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-headline mb-2">Let&apos;s build something exceptional.</h3>
            <p className="text-bodytext text-sm max-w-md">
              Whether you have an inquiry, open-source project collaboration, or engineering role, feel free to reach out.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="mailto:nikhilalakri@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-background font-semibold hover:bg-accent transition-all text-sm flex-1 sm:flex-initial"
            >
              <Mail className="w-4 h-4" />
              <span>nikhilalakri@gmail.com</span>
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-3 rounded-xl bg-surface border border-surface-border text-mutedtext hover:text-headline hover:border-accent transition-colors flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mutedtext">
          <p>&copy; {new Date().getFullYear()} Nikhil Alakri. All rights reserved.</p>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="https://github.com/nikhil-alakri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-headline flex items-center gap-1.5 transition-colors py-1"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-alakri/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-headline flex items-center gap-1.5 transition-colors py-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <span className="text-mutedtext/40">&bull;</span>
            <span className="text-bodytext">Nikhil Alakri</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
