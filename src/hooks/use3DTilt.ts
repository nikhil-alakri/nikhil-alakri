
import { useRef, useEffect, useState, CSSProperties } from "react";

interface TiltOptions {
  maxTilt?: number; // max tilt rotation (deg)
  perspective?: number; // transform perspective (px)
  scale?: number; // scale on hover
  speed?: number; // transition speed in ms
  glare?: boolean;
  maxGlare?: number; // 0 to 1
}

export function use3DTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const {
    maxTilt = 8,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    glare = true,
    maxGlare = 0.15,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    transformStyle: "preserve-3d",
  });

  const [glareStyle, setGlareStyle] = useState<CSSProperties>({
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    borderRadius: "inherit",
    zIndex: 2,
    transition: `opacity ${speed}ms ease`,
    background: "radial-gradient(circle at 50% 50%, rgba(242, 183, 95, 0.25), transparent 70%)",
  });

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Disable tilt on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        // Calculate rotation (-1 to +1)
        const percentX = (x / width - 0.5) * 2;
        const percentY = (y / height - 0.5) * 2;

        const rotateX = -percentY * maxTilt;
        const rotateY = percentX * maxTilt;

        setStyle({
          transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transition: "transform 100ms ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        });

        if (glare) {
          const glareX = (x / width) * 100;
          const glareY = (y / height) * 100;
          setGlareStyle({
            opacity: maxGlare,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: 2,
            transition: "opacity 150ms ease-out",
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(242, 183, 95, 0.35) 0%, transparent 60%)`,
          });
        }
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      setStyle({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        transformStyle: "preserve-3d",
      });

      if (glare) {
        setGlareStyle((prev) => ({
          ...prev,
          opacity: 0,
          transition: `opacity ${speed}ms ease`,
        }));
      }
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed, glare, maxGlare]);

  return { ref: elementRef, style, glareStyle };
}

export default use3DTilt;

