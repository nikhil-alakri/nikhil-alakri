"use client";

import { useEffect, useRef } from "react";
import PORTFOLIO_DATA from "@/src/data/portfolio";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, TrendingUp, Award, Zap } from "lucide-react";

// Micro-canvas particle accent behind cards
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];
    for (let i = 0; i < 16; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 234, 212, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}

const STAT_ICONS = [Award, Sparkles, TrendingUp, Zap];

export default function StatsSection() {
  return (
    <section id="stats" className="py-12 sm:py-18 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fadeUp" className="mb-10 sm:mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-mint mb-2">
              Impact Telemetry
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-headline leading-none">
              Engineering <span className="font-serif italic text-mint">Metrics</span>
            </h2>
          </div>
          <p className="text-mutedtext text-xs sm:text-sm font-mono">
            Production benchmarks across healthcare &amp; enterprise platforms
          </p>
        </ScrollReveal>

        {/* 4 Impact Number Cards with 3D Particle Accents */}
        <ScrollReveal
          animation="fadeUp"
          stagger={0.08}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
        >
          {PORTFOLIO_DATA.stats.map((s, idx) => {
            const Icon = STAT_ICONS[idx % STAT_ICONS.length];
            return (
              <div
                key={idx}
                className="group relative p-5 sm:p-7 rounded-2xl bg-surface/25 border border-surface-border/30 hover:border-mint/40 transition-all duration-300 overflow-hidden backdrop-blur-sm"
              >
                {/* 3D Particle Accent Canvas */}
                <ParticleCanvas />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-1.5 rounded-lg text-mint/80">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-mono text-mutedtext">0{idx + 1}</span>
                  </div>

                  <div>
                    <span className="font-display text-4xl sm:text-5xl font-light text-headline group-hover:text-mint transition-colors block mb-2 tracking-tight">
                      <AnimatedCounter value={s.value} duration={1600} delay={idx * 120} />
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-headline/90 block mb-1 leading-snug">
                      {s.label}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-mutedtext block leading-normal font-light">
                      {s.sub}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}

