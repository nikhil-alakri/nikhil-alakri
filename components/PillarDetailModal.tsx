"use client";

import React, { useEffect, useRef } from "react";
import { X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import PORTFOLIO_DATA, { PillarItem } from "@/src/data/portfolio";
import { soundManager } from "@/lib/audio";

interface PillarDetailModalProps {
  pillarNum: string | null;
  onClose: () => void;
}

export default function PillarDetailModal({ pillarNum, onClose }: PillarDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const pillar = PORTFOLIO_DATA.pillars.find((p) => p.num === pillarNum);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundManager.playClickSound();
        onClose();
      }
    };
    if (pillarNum) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [pillarNum, onClose]);

  if (!pillar) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pillar-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundManager.playClickSound();
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-3xl bg-surface/95 border border-mint/40 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(92,242,214,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-surface-border/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-mint px-3 py-1 rounded-full bg-surface border border-mint/30 uppercase tracking-widest">
              Pillar {pillar.num} · Architecture
            </span>
            <span className="text-xs font-mono text-mutedtext hidden sm:inline">
              Production Playbook
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-2 rounded-full border border-surface-border text-mutedtext hover:text-headline hover:border-mint transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Core Philosophy */}
        <h2
          id="pillar-modal-title"
          className="font-display font-light text-2xl sm:text-4xl text-headline tracking-[-0.03em] leading-tight mb-4"
        >
          {pillar.title}
        </h2>

        <p className="text-sm sm:text-base text-bodytext leading-relaxed font-light mb-8">
          {pillar.summary}
        </p>

        {/* Deliverables & Highlights Grid */}
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-mint mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Key Engineering Deliverables &amp; Standards</span>
          </p>

          <ul className="space-y-3">
            {pillar.deliverables.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface/50 border border-white/[0.06] hover:border-mint/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-headline/90 font-light leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border/60">
          <span className="text-xs font-mono text-mutedtext">
            Enterprise Grade · Zero Technical Debt
          </span>

          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-mint text-background text-xs sm:text-sm font-medium hover:bg-mint-dark transition-all shadow-md shadow-mint/10"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
