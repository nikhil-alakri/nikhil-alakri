import { useEffect } from "react";
import { soundManager } from "@/lib/audio";

export default function PortfolioAudio() {
  useEffect(() => {
    soundManager.initialize();
    soundManager.autoplayMusic();
    const click = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('button, a, [role="button"]')) soundManager.playClickSound();
    };
    const visibility = () => { if (document.hidden) soundManager.stopMusic(); };
    document.addEventListener("click", click);
    document.addEventListener("visibilitychange", visibility);
    return () => { document.removeEventListener("click", click); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return null;
}
