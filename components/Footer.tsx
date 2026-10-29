"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-16 border-t border-surface-border bg-surface/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Let&apos;s build something exceptional.</h3>
            <p className="text-slate-400 text-sm max-w-md">
              Whether you have an inquiry, open-source project collaboration, or engineering role, feel free to reach out.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:nikhilalakri@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-slate-950 font-semibold hover:bg-primary-hover transition-all text-sm"
            >
              <Mail className="w-4 h-4" />
              nikhilalakri@gmail.com
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2.5 rounded-xl bg-surface border border-surface-border text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nikhil Alakri. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nikhil-alakri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-alakri/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-400">nikhilalakri.tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

