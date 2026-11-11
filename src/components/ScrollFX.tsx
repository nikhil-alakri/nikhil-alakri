import { useEffect, useRef } from "react";

/** Scroll-driven progress and hero parallax. Section titles remain stationary. */
export default function ScrollFX() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-layer]"));
    const hero = document.getElementById("hero");
    let raf = 0;
    const tick = () => {
      const vh = innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      const hh = hero?.offsetHeight ?? vh;
      const y = Math.min(scrollY, hh);
      // Hero layer parallax is desktop-only: on narrow screens the hero is
      // taller than the viewport and differential speeds make layers collide.
      if (innerWidth >= 768) {
        for (const l of layers) {
          const k = Number(l.dataset["heroLayer"]);
          l.style.transform = `translate3d(0, ${y * k}px, 0)`;
          l.style.opacity = String(Math.max(0, 1 - (y / hh) * (0.4 + k * 1.2)));
        }
      } else {
        for (const l of layers) { l.style.transform = ""; l.style.opacity = ""; }
      }
      for (const m of media) {
        const parent = m.parentElement;
        if (!parent) continue;
        const r = parent.getBoundingClientRect();
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        m.style.transform = `translateY(${p * Number(m.dataset["parallax"] || 80)}px) scale(1.18)`;
      }
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    tick(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); layers.forEach(h => { h.style.transform = ""; h.style.opacity = ""; }); };
  }, []);
  return <div aria-hidden ref={bar} className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 origin-left scale-x-0 bg-lime" />;
}
