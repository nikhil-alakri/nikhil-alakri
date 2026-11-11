// Browser-only, opt-in audio. No audio context is created before a user gesture.
export class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted = true;
  private musicEnabled = false;
  private musicTimer: ReturnType<typeof setInterval> | null = null;
  private musicGain: GainNode | null = null;
  private initialized = false;
  private chordIndex = 0;

  public initialize() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
    try { this.isMuted = localStorage.getItem("portfolio-sound-muted") !== "false"; } catch { /* private browsing */ }
    // Music always starts paused; never restore autoplay from storage.
  }
  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx?.state === "suspended") void this.ctx.resume().catch(() => {});
  }
  public getMuted() { return this.isMuted; }
  public getMusicEnabled() { return this.musicEnabled; }
  private notify() {
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("portfolio:sound-toggle", { detail: { isMuted: this.isMuted, musicEnabled: this.musicEnabled } }));
  }
  public toggleMute() {
    this.initialize();
    this.isMuted = !this.isMuted;
    try { localStorage.setItem("portfolio-sound-muted", String(this.isMuted)); } catch { /* private browsing */ }
    if (!this.isMuted) this.playSuccessSound();
    this.notify();
    return this.isMuted;
  }
  private autoplayAttempted = false;
  // Browsers block audio before a user gesture, so true autoplay is impossible:
  // start immediately when allowed, otherwise on the first tap/keypress anywhere.
  public autoplayMusic() {
    if (this.autoplayAttempted || typeof window === "undefined") return;
    this.autoplayAttempted = true;
    let pref: string | null = null;
    try { pref = localStorage.getItem("portfolio-music"); } catch { /* private browsing */ }
    if (pref === "off") return; // visitor explicitly paused the music before
    this.initContext();
    const tryStart = () => { if (!this.musicEnabled) this.toggleMusic(); };
    if (this.ctx && this.ctx.state === "running") { tryStart(); return; }
    const onGesture = () => { cleanup(); tryStart(); };
    const cleanup = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    void this.ctx?.resume().then(tryStart).catch(() => {});
  }
  public toggleMusic() {
    if (this.musicEnabled) { this.stopMusic(true); return false; }
    this.initContext();
    if (!this.ctx) return false;
    try { localStorage.setItem("portfolio-music", "on"); } catch { /* private browsing */ }
    this.musicEnabled = true;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.13;
    this.musicGain.connect(this.ctx.destination);
    // Mobile browsers keep the context suspended until a gesture resumes it;
    // only start scheduling once it is actually running, otherwise music silently never plays.
    const start = () => {
      if (!this.musicEnabled || !this.ctx || this.ctx.state !== "running") return;
      this.scheduleChord();
      this.musicTimer = setInterval(() => this.scheduleChord(), 6000);
    };
    if (this.ctx.state === "running") start();
    else void this.ctx.resume().then(start).catch(() => this.stopMusic());
    this.notify();
    return true;
  }
  public stopMusic(userInitiated = false) {
    if (userInitiated) {
      try { localStorage.setItem("portfolio-music", "off"); } catch { /* private browsing */ }
    }
    if (this.musicTimer) clearInterval(this.musicTimer);
    this.musicTimer = null;
    const gain = this.musicGain;
    if (gain && this.ctx) {
      gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      setTimeout(() => gain.disconnect(), 600);
    }
    this.musicGain = null;
    this.musicEnabled = false;
    this.notify();
  }
  // Original ambient progression: soft sine pads and sparse bell-like notes.
  private scheduleChord() {
    const ctx = this.ctx;
    const output = this.musicGain;
    if (!ctx || !output || !this.musicEnabled) return;
    const chords = [[146.83, 220, 293.66, 369.99], [130.81, 196, 261.63, 329.63], [164.81, 246.94, 329.63, 392], [110, 164.81, 220, 293.66]];
    const chord = chords[this.chordIndex % chords.length];
    this.chordIndex++;
    chord.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const envelope = ctx.createGain();
      const now = ctx.currentTime;
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      envelope.gain.setValueAtTime(0, now);
      envelope.gain.linearRampToValueAtTime(0.12, now + 1.5 + index * 0.15);
      envelope.gain.linearRampToValueAtTime(0, now + 6.5);
      oscillator.connect(envelope); envelope.connect(output);
      oscillator.start(now); oscillator.stop(now + 6.6);
      oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
    });
    this.tone(chord[2] * 2, 0.055, 1.8, output, 2.2);
    this.tone(chord[3] * 2, 0.04, 1.5, output, 4.1);
  }
  private tone(frequency: number, volume: number, duration: number, destination?: AudioNode, delay = 0) {
    const ctx = this.ctx;
    if (!ctx) return;
    const oscillator = ctx.createOscillator(); const envelope = ctx.createGain();
    const start = ctx.currentTime + delay;
    oscillator.type = "sine"; oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(volume, start);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(envelope); envelope.connect(destination ?? ctx.destination);
    oscillator.start(start); oscillator.stop(start + duration);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
  }
  public playHoverSound() { /* Hover remains silent to avoid noisy browsing. */ }
  public playClickSound() {
    if (this.isMuted) return;
    this.initContext(); this.tone(620, 0.035, 0.045);
  }
  public playSuccessSound() {
    if (this.isMuted) return;
    this.initContext(); this.tone(587.33, 0.035, 0.15); this.tone(880, 0.025, 0.18, undefined, 0.09);
  }
}
export const soundManager = new SoundManager();
