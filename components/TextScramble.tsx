"use client";

import { useEffect, useRef, useState, useCallback, ElementType } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  trigger?: "mount" | "inView";
  duration?: number;
  characterSet?: string;
  delay?: number;
}

const DEFAULT_CHAR_SET = "!<>-_\\/[]{}—=+*^?#________";
const CYCLE_INTERVAL = 30;

function getRandomChar(charSet: string): string {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

export default function TextScramble({
  text,
  className,
  as: Tag = "span",
  trigger = "inView",
  duration = 1000,
  characterSet = DEFAULT_CHAR_SET,
  delay = 0,
}: TextScrambleProps) {
  // Always initialize with original text to guarantee zero hydration mismatch and zero LCP penalty
  const [displayText, setDisplayText] = useState<string>(text);

  const resolvedRef = useRef<boolean[]>(new Array(text.length).fill(false));
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const hasStartedRef = useRef(false);

  const startAnimation = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    const resolveTimes = text.split("").map((_, i) => {
      const baseTime = (i / text.length) * duration;
      const jitter = (Math.random() - 0.5) * 0.3 * duration;
      return Math.max(0, Math.min(duration, baseTime + jitter));
    });

    const resolved = new Array(text.length).fill(false);
    resolvedRef.current = resolved;

    const startTime = performance.now();

    // Start with scramble
    setDisplayText(
      text
        .split("")
        .map((ch) => (ch === " " ? " " : getRandomChar(characterSet)))
        .join("")
    );

    // Cycle scramble characters at fixed intervals
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " " || resolved[i]) return ch;
            return getRandomChar(characterSet);
          })
          .join("")
      );
    }, CYCLE_INTERVAL);

    // Use rAF to check which characters should resolve
    const tick = (now: number) => {
      const elapsed = now - startTime;

      let allResolved = true;
      for (let i = 0; i < text.length; i++) {
        if (!resolved[i] && elapsed >= resolveTimes[i]) {
          resolved[i] = true;
        }
        if (!resolved[i]) allResolved = false;
      }

      if (allResolved) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text);
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text, duration, characterSet]);

  // Mount trigger
  useEffect(() => {
    if (trigger !== "mount") return;

    const timeout = setTimeout(startAnimation, delay);
    return () => clearTimeout(timeout);
  }, [trigger, delay, startAnimation]);

  // InView trigger via IntersectionObserver
  useEffect(() => {
    if (trigger !== "inView") return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            if (delay > 0) {
              setTimeout(startAnimation, delay);
            } else {
              startAnimation();
            }
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, delay, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const Component = Tag as ElementType;

  return (
    <Component
      ref={containerRef}
      className={className}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </Component>
  );
}
