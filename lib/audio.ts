// ==============================================================================
// 🔊 TASTEFUL SYNTHESIZED MICRO-INTERACTION AUDIO (Web Audio API)
// ------------------------------------------------------------------------------
// Zero external mp3/wav files! Generates subtle, organic micro-blips procedurally.
// Ships MUTED by default with a user-facing toggle.
// ==============================================================================

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio-sound-muted");
      // Default to MUTED (true) unless user explicitly unmuted
      this.isMuted = stored === null ? true : stored === "true";
    }
  }

  private initContext() {
    if (this.ctx || typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
      this.isInitialized = true;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-sound-muted", String(this.isMuted));
      window.dispatchEvent(new CustomEvent("portfolio:sound-toggle", { detail: { isMuted: this.isMuted } }));
    }
    if (!this.isMuted) {
      this.playSuccessSound();
    }
    return this.isMuted;
  }

  // Subtle 15ms high-frequency tick for hover
  public playHoverSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.015);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.015);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Soft muted 30ms blip for button clicks
  public playClickSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.035);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Pleasant double-chime for terminal execution or hire easter egg
  public playSuccessSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [
        { freq: 587.33, delay: 0 },    // D5
        { freq: 880.0, delay: 0.09 },   // A5
        { freq: 1174.66, delay: 0.18 }, // D6
      ].forEach(({ freq, delay }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.05, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.14);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.14);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundManager = new SoundManager();

