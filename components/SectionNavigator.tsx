"use client";

import { useEffect, useState } from "react";
import { STATIONS, scrollToStation } from "@/lib/scrollStation";

export default function SectionNavigator() {
  const [activeStation, setActiveStation] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = STATIONS.length - 1; i >= 0; i--) {
        const station = STATIONS[i];
        const el = document.getElementById(station.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveStation(station.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed right-3.5 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3.5 select-none"
      aria-label="Page section navigator"
    >
      <div className="flex flex-col items-center gap-2.5 p-2 rounded-full bg-surface/30 border border-white/[0.08] backdrop-blur-md">
        {STATIONS.map((station) => {
          const isActive = activeStation === station.id;

          return (
            <button
              key={station.id}
              onClick={() => scrollToStation(station.id)}
              className="group relative flex items-center justify-center p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              aria-label={`Jump to ${station.label}`}
              title={station.label}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-surface-elevated/95 border border-surface-border text-[11px] font-mono font-medium text-headline whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none shadow-lg">
                {station.shortLabel}
              </span>

              {/* Dot indicator */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-mint shadow-[0_0_10px_rgba(94,234,212,0.85)] scale-110"
                    : "w-2 h-2 bg-mutedtext/50 group-hover:bg-headline group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
