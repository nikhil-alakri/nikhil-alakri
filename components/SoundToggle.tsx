"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/audio";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(soundManager.getMuted());

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isMuted: boolean }>;
      setIsMuted(customEvent.detail.isMuted);
    };

    window.addEventListener("portfolio:sound-toggle", handleToggle);
    return () => window.removeEventListener("portfolio:sound-toggle", handleToggle);
  }, []);

  const handleClick = () => {
    const nextState = soundManager.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isMuted ? "Unmute subtle audio effects" : "Mute audio effects"}
      title={isMuted ? "Audio: Muted (Click to enable subtle hover ticks)" : "Audio: Active"}
      className="magnetic inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface/70 border border-surface-border hover:border-mint/50 text-bodytext hover:text-headline text-xs font-mono transition-colors min-h-[34px] cursor-pointer"
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-mutedtext" />
          <span className="text-[11px] hidden sm:inline text-mutedtext">Muted</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-mint animate-pulse" />
          <span className="text-[11px] hidden sm:inline text-mint font-semibold">Sound On</span>
        </>
      )}
    </button>
  );
}

