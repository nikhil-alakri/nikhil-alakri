"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Trophy, X } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  opacity: number;
  shape: "rect" | "circle";
}

const COLORS = [
  "#5eead4", // Mint
  "#2dd4bf", // Teal
  "#cbb594", // Brass
  "#ffffff", // White
  "#34d399", // Emerald
  "#a5f3fc", // Cyan
  "#fbbf24", // Solar Gold
];

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const konamiIndex = useRef(0);
  const particles = useRef<Particle[]>([]);
  const animId = useRef<number>(0);

  const triggerCelebration = useCallback((source: string) => {
    setIsActive(true);
    setToastMessage(`🎉 Achievement Unlocked: ${source}! Robot celebration activated.`);
    soundManager.playSuccessSound();

    // Trigger robot celebration spin
    window.dispatchEvent(
      new CustomEvent("portfolio:robot-react", { detail: { type: "celebrate" } })
    );

    // Spawn 140 celebratory particles
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newParticles: Particle[] = [];

    for (let i = 0; i < 140; i++) {
      // Explode from bottom center / screen edges
      const startX = width * 0.5 + (Math.random() - 0.5) * 200;
      const startY = height * 0.65;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
      const speed = 12 + Math.random() * 18;

      newParticles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 6 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.3,
        opacity: 1,
        shape: Math.random() > 0.4 ? "rect" : "circle",
      });
    }

    particles.current = newParticles;

    // Auto dismiss toast after 4s
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  // Listen for Konami sequence and custom confetti event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Ignore if typing inside terminal input or text field
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      if (e.key === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_CODE.length) {
          triggerCelebration("Konami Code Executed");
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = 0;
      }
    };

    const handleCustomConfetti = (e: Event) => {
      const customEvent = e as CustomEvent<{ source?: string }>;
      triggerCelebration(customEvent.detail?.source || "Easter Egg Triggered");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("portfolio:confetti", handleCustomConfetti);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("portfolio:confetti", handleCustomConfetti);
    };
  }, [triggerCelebration]);

  // Render loop for confetti particles
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const list = particles.current;
      let aliveCount = 0;

      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        if (p.opacity <= 0.01) continue;
        aliveCount++;

        // Physics: Gravity & drag
        p.vy += 0.38;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.opacity -= 0.007;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (aliveCount > 0) {
        animId.current = requestAnimationFrame(render);
      } else {
        setIsActive(false);
      }
    };

    animId.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId.current);
  }, [isActive]);

  return (
    <>
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[120]"
          aria-hidden="true"
        />
      )}

      {/* Celebratory Achievement Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-6 z-[130] flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-elevated border border-mint text-headline shadow-2xl shadow-mint/20 text-xs sm:text-sm font-medium animate-fade-in"
        >
          <div className="p-1.5 rounded-lg bg-mint text-background">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-mint font-display flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Secret Unlocked
            </div>
            <div className="text-bodytext text-xs">{toastMessage}</div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 rounded-md text-mutedtext hover:text-headline ml-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}

