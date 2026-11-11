"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "clipReveal";
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

type AnimationFrom = gsap.TweenVars;

const ANIMATION_FROM: Record<string, AnimationFrom> = {
  fadeUp: { y: 35, opacity: 0 },
  fadeLeft: { x: -45, opacity: 0 },
  fadeRight: { x: 45, opacity: 0 },
  scaleUp: { scale: 0.94, opacity: 0 },
  clipReveal: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
};

const ANIMATION_TO: Record<string, gsap.TweenVars> = {
  fadeUp: { y: 0, opacity: 1 },
  fadeLeft: { x: 0, opacity: 1 },
  fadeRight: { x: 0, opacity: 1 },
  scaleUp: { scale: 1, opacity: 1 },
  clipReveal: { clipPath: "inset(0% 0 0 0)", opacity: 1 },
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.7,
  stagger,
  threshold,
  once = true,
  className,
}: ScrollRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getStartString = useCallback((): string => {
    if (threshold !== undefined) {
      const pct = Math.round((1 - threshold) * 100);
      return `top ${pct}%`;
    }
    return "top 88%";
  }, [threshold]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      return;
    }

    const fromVars = ANIMATION_FROM[animation] || ANIMATION_FROM.fadeUp;
    const toVars = ANIMATION_TO[animation] || ANIMATION_TO.fadeUp;
    const useStagger = stagger !== undefined && stagger > 0;

    const ctx = gsap.context(() => {
      const targets = useStagger ? Array.from(el.children) : el;

      gsap.fromTo(targets, fromVars, {
        ...toVars,
        duration,
        delay,
        ease: "power2.out",
        stagger: useStagger ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start: getStartString(),
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
        onComplete() {
          gsap.set(targets, { clearProps: "transform,opacity,clipPath,willChange" });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, threshold, once, getStartString]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
