"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

function parseValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} {
  const match = value.match(/^([^\d]*?)([\d]+(?:\.\d+)?)(.*?)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: value };
  }
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  value,
  className,
  duration = 1800,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const rafId = useRef<number>(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { prefix, number: target, suffix } = parseValue(value);

  // Initialize with full real value for SEO and SSR
  const [displayText, setDisplayText] = useState(value);

  const animate = useCallback(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(value);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.round(eased * target);

      if (progress < 1) {
        setDisplayText(`${prefix}${current}${suffix}`);
        rafId.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(value);
      }
    };

    setDisplayText(`${prefix}0${suffix}`);
    rafId.current = requestAnimationFrame(tick);
  }, [duration, target, prefix, suffix, value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          if (delay > 0) {
            timeoutId.current = setTimeout(animate, delay);
          } else {
            animate();
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [animate, delay]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={value}
    >
      {displayText}
    </span>
  );
}
