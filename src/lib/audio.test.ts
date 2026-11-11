import { describe, it, expect, vi, afterEach } from "vitest";
import { SoundManager } from "./audio";

afterEach(() => { localStorage.clear(); vi.restoreAllMocks(); });
describe("Opt-in portfolio audio", () => {
  it("keeps click sounds muted by default", () => {
    const manager = new SoundManager(); manager.initialize();
    expect(manager.getMuted()).toBe(true);
  });
  it("keeps music paused even when click sounds were enabled", () => {
    localStorage.setItem("portfolio-sound-muted", "false");
    const manager = new SoundManager(); manager.initialize();
    expect(manager.getMusicEnabled()).toBe(false);
    expect(manager.getMuted()).toBe(false);
  });
  it("allows enabling and muting click sounds independently of music", () => {
    const manager = new SoundManager(); manager.initialize();
    expect(manager.toggleMute()).toBe(false);
    expect(manager.getMusicEnabled()).toBe(false);
    expect(manager.toggleMute()).toBe(true);
  });
});
