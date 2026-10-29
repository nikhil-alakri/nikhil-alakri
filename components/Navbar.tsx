"use client";

import Link from "next/link";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/85 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-status animate-pulse" />
          <span className="font-semibold text-headline tracking-tight group-hover:text-accent transition-colors">
            nikhilalakri<span className="text-accent">.tech</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-bodytext">
          <a href="#projects" className="hover:text-headline transition-colors">Projects</a>
          <a href="#opensource" className="hover:text-headline transition-colors">Open Source</a>
          <a href="#skills" className="hover:text-headline transition-colors">Stack</a>
          <a href="#contact" className="hover:text-headline transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-accent transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/nikhil-alakri/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-primary text-background hover:bg-accent transition-all"
          >
            Connect
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
