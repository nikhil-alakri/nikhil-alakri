import { useEffect, useState } from "react";
import { Music2, Pause, Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/audio";
import { Button } from "@/components/ui/button";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);
  const [music, setMusic] = useState(false);
  useEffect(() => {
    soundManager.initialize();
    const update = () => { setMuted(soundManager.getMuted()); setMusic(soundManager.getMusicEnabled()); };
    update(); window.addEventListener("portfolio:sound-toggle", update);
    return () => window.removeEventListener("portfolio:sound-toggle", update);
  }, []);
  return <div className="flex items-center gap-1">
    <Button variant="ghost" size="icon" onClick={() => soundManager.toggleMute()} aria-label={muted ? "Enable click sounds" : "Mute click sounds"} aria-pressed={!muted} title={muted ? "Enable click sounds" : "Mute click sounds"} className="text-bodytext hover:bg-surface hover:text-mint">{muted ? <VolumeX /> : <Volume2 className="text-mint" />}</Button>
    <Button variant="ghost" size="icon" onClick={() => soundManager.toggleMusic()} aria-label={music ? "Pause background music" : "Play background music"} aria-pressed={music} title={music ? "Pause background music" : "Play background music"} className="text-bodytext hover:bg-surface hover:text-mint">{music ? <Pause className="text-mint" /> : <Music2 />}</Button>
  </div>;
}
