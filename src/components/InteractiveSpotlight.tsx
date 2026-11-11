
import { useEffect } from "react";

/**
 * InteractiveSpotlight adds dynamic hardware-accelerated cursor coordinate tracking
 * to cards with the class `spotlight-card`. As the user moves their mouse over cards,
 * CSS variables `--mouse-x` and `--mouse-y` update in real time, creating an elegant
 * interactive radial border and surface glow.
 */
export default function InteractiveSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(".project-card, .repo-card, .spotlight-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

