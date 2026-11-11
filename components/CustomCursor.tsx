"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

type CursorState = "default" | "link" | "text" | "card" | "drag";

const CURSOR_HIDE_CLASS = "custom-cursor-active";

const DOT_SIZE = 6;
const RING_SIZE_DEFAULT = 36;
const RING_SIZE_LINK = 54;
const RING_SIZE_CARD = 76;
const RING_SIZE_DRAG = 72;

const ACCENT = "var(--color-accent, #5eead4)";
const RING_BORDER = "rgba(94, 234, 212, 0.45)";
const ACCENT_FILL = "rgba(94, 234, 212, 0.12)";

const MAGNETIC_OFFSET = 7;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const cursorState = useRef<CursorState>("default");
  const activeMagnetic = useRef<HTMLElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);

  // --- Magnetic effect ---
  const applyMagnetic = useCallback((el: HTMLElement, mx: number, my: number) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mx - cx;
    const dy = my - cy;
    const maxDist = Math.max(rect.width, rect.height);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const strength = Math.max(0, 1 - dist / maxDist);
    gsap.to(el, {
      x: dx * strength * (MAGNETIC_OFFSET / maxDist) * 3,
      y: dy * strength * (MAGNETIC_OFFSET / maxDist) * 3,
      duration: 0.25,
      ease: "power2.out",
    });
  }, []);

  const resetMagnetic = useCallback((el: HTMLElement) => {
    gsap.to(el, { x: 0, y: 0, duration: 0.35, ease: "elastic.out(1, 0.4)" });
  }, []);

  // --- Determine cursor state from target ---
  const getState = useCallback((target: HTMLElement): CursorState => {
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest('[role="button"]')
    ) {
      return "link";
    }
    if (
      target.closest("[data-cursor='drag']") ||
      target.closest(".pillar-carousel-container") ||
      target.closest("[data-3d-stage]")
    ) {
      return "drag";
    }
    if (
      target.closest(".project-card") ||
      target.closest(".spotlight-card") ||
      target.closest(".bento-card")
    ) {
      return "card";
    }
    const tag = target.tagName;
    if (tag === "H1" || tag === "H2" || tag === "H3" || tag === "P" || tag === "INPUT" || tag === "TEXTAREA") {
      return "text";
    }
    return "default";
  }, []);

  // --- Apply visual state to cursor elements ---
  const applyState = useCallback((state: CursorState) => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    label.textContent = "";
    label.style.opacity = "0";

    switch (state) {
      case "drag":
        ring.style.width = `${RING_SIZE_DRAG}px`;
        ring.style.height = `${RING_SIZE_DRAG}px`;
        ring.style.borderColor = ACCENT;
        ring.style.backgroundColor = "rgba(92, 242, 214, 0.16)";
        ring.style.borderRadius = "50%";
        ring.style.borderWidth = "1.5px";
        dot.style.opacity = "0";
        label.textContent = "Drag";
        label.style.opacity = "1";
        break;
      case "link":
        ring.style.width = `${RING_SIZE_LINK}px`;
        ring.style.height = `${RING_SIZE_LINK}px`;
        ring.style.borderColor = ACCENT;
        ring.style.backgroundColor = ACCENT_FILL;
        ring.style.borderRadius = "50%";
        ring.style.borderWidth = "1.5px";
        dot.style.opacity = "1";
        break;
      case "text":
        ring.style.width = "2px";
        ring.style.height = "22px";
        ring.style.borderColor = ACCENT;
        ring.style.backgroundColor = ACCENT;
        ring.style.borderRadius = "1px";
        ring.style.borderWidth = "0px";
        dot.style.opacity = "0";
        break;
      case "card":
        ring.style.width = `${RING_SIZE_CARD}px`;
        ring.style.height = `${RING_SIZE_CARD}px`;
        ring.style.borderColor = ACCENT;
        ring.style.backgroundColor = "rgba(203, 181, 148, 0.12)";
        ring.style.borderRadius = "50%";
        ring.style.borderWidth = "1.5px";
        dot.style.opacity = "0";
        label.textContent = "View";
        label.style.opacity = "1";
        break;
      default:
        ring.style.width = `${RING_SIZE_DEFAULT}px`;
        ring.style.height = `${RING_SIZE_DEFAULT}px`;
        ring.style.borderColor = RING_BORDER;
        ring.style.backgroundColor = "transparent";
        ring.style.borderRadius = "50%";
        ring.style.borderWidth = "1.5px";
        dot.style.opacity = "1";
        break;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || isReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    document.body.classList.add(CURSOR_HIDE_CLASS);

    const styleEl = document.createElement("style");
    styleEl.id = "custom-cursor-style";
    styleEl.textContent = `
      .${CURSOR_HIDE_CLASS},
      .${CURSOR_HIDE_CLASS} a,
      .${CURSOR_HIDE_CLASS} button,
      .${CURSOR_HIDE_CLASS} [role="button"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;
      if (!target) return;

      const newState = getState(target);
      if (newState !== cursorState.current) {
        cursorState.current = newState;
        applyState(newState);
      }

      // Magnetic effect on elements with .magnetic class
      const magneticEl = target.closest(".magnetic") as HTMLElement | null;
      if (magneticEl) {
        if (activeMagnetic.current !== magneticEl) {
          if (activeMagnetic.current) resetMagnetic(activeMagnetic.current);
          activeMagnetic.current = magneticEl;
        }
        applyMagnetic(magneticEl, e.clientX, e.clientY);
      } else if (activeMagnetic.current) {
        resetMagnetic(activeMagnetic.current);
        activeMagnetic.current = null;
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (activeMagnetic.current) {
        resetMagnetic(activeMagnetic.current);
        activeMagnetic.current = null;
      }
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    // Smooth RAF loop
    const DOT_EASE = 0.38;
    const RING_EASE = 0.16;

    const tick = () => {
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * DOT_EASE;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * DOT_EASE;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * RING_EASE;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * RING_EASE;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.body.classList.remove(CURSOR_HIDE_CLASS);
      const existingStyle = document.getElementById("custom-cursor-style");
      if (existingStyle) existingStyle.remove();
      if (activeMagnetic.current) {
        gsap.set(activeMagnetic.current, { x: 0, y: 0 });
        activeMagnetic.current = null;
      }
    };
  }, [getState, applyState, applyMagnetic, resetMagnetic]);

  if (isTouchDevice === null || isTouchDevice) return null;

  return (
    <>
      {/* Inner precision dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: ACCENT,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Outer reactive ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: RING_SIZE_DEFAULT,
          height: RING_SIZE_DEFAULT,
          border: `1.5px solid ${RING_BORDER}`,
          backgroundColor: "transparent",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition:
            "width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s ease, background-color 0.25s ease, border-radius 0.2s ease, border-width 0.2s ease, opacity 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          ref={labelRef}
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-secondary), sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: ACCENT,
            opacity: 0,
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {""}
        </span>
      </div>
    </>
  );
}
