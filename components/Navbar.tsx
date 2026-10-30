"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { SITE_URLS } from "@/config/urls";

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar completely on clean embedded routes like /itpo
  if (pathname === "/itpo" || pathname?.startsWith("/itpo/")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/85 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={SITE_URLS.nav.home} className="flex items-center gap-2.5 group py-1">
          <div className="relative shrink-0">
            <img
              src="/favicon.png"
              alt=""
              aria-hidden="true"
              width={26}
              height={26}
              className="w-6 h-6 rounded-lg object-contain border border-surface-border group-hover:border-accent transition-colors"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-status border border-background animate-status-pulse" />
          </div>
          <span className="font-primary font-bold text-headline tracking-wide group-hover:text-accent transition-colors text-base sm:text-lg">
            Nikhil Alakri
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-bodytext">
          <a href={SITE_URLS.nav.projects} className="hover:text-headline transition-colors">Projects</a>
          <a href={SITE_URLS.nav.openSource} className="hover:text-headline transition-colors">Open Source</a>
          <a href={SITE_URLS.nav.skills} className="hover:text-headline transition-colors">Stack</a>
          <a href={SITE_URLS.nav.contact} className="hover:text-headline transition-colors">Contact</a>
        </nav>

        {/* Action icons & Mobile connect */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SITE_URLS.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 sm:p-2.5 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-accent transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={SITE_URLS.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 sm:p-2.5 rounded-xl bg-surface border border-surface-border text-bodytext hover:text-headline hover:border-accent transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={SITE_URLS.nav.contact}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 sm:px-3.5 py-2 rounded-xl bg-primary text-background hover:bg-accent transition-all min-h-[38px]"
          >
            Connect
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
