"use client";

import type Lenis from "lenis";

export interface StationConfig {
  id: string;
  label: string;
  shortLabel: string;
}

export const STATIONS: StationConfig[] = [
  { id: "hero", label: "Hero Overview", shortLabel: "Hero" },
  { id: "pillars", label: "Architectural Pillars", shortLabel: "Pillars" },
  { id: "terminal", label: "Interactive CLI", shortLabel: "Terminal" },
  { id: "career", label: "Career Journey", shortLabel: "Career" },
  { id: "projects", label: "Selected Works", shortLabel: "Projects" },
  { id: "stack", label: "Technical Stack", shortLabel: "Stack" },
  { id: "contact", label: "Let's Connect", shortLabel: "Contact" },
];

let globalLenis: Lenis | null = null;

export function setGlobalLenis(lenis: Lenis | null) {
  globalLenis = lenis;
}

export function getGlobalLenis(): Lenis | null {
  return globalLenis;
}

export function scrollToStation(id: string) {
  if (typeof window === "undefined") return;

  const target = document.getElementById(id);
  if (!target) return;

  if (globalLenis) {
    globalLenis.scrollTo(target, { offset: -30, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

