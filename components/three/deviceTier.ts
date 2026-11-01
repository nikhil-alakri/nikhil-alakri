/**
 * Device tiering for the 3D stages (spec: planning/3d-overhaul.spec.md — P3.2).
 *
 * Returns a rendering budget so low-end devices skip expensive features
 * (post FX, high DPR, dense particles) while high-end devices get the full
 * experience. Unused until wired into ThreeHeroModel / future MiniShowcase.
 */

export type DeviceTier = "low" | "mid" | "high";

export interface DeviceBudget {
  /** Particle count for the hero constellation */
  particles: number;
  /** Upper bound for renderer.setPixelRatio */
  dprCap: number;
  /** Whether EffectComposer / UnrealBloom may run */
  postFX: boolean;
}

export const DEVICE_BUDGETS: Record<DeviceTier, DeviceBudget> = {
  // Order matters: index [low, mid, high]
  low: { particles: 90, dprCap: 1.5, postFX: false },
  mid: { particles: 160, dprCap: 1.75, postFX: true },
  high: { particles: 240, dprCap: 2, postFX: true },
};

/**
 * Classify the current device. SSR-safe (returns "high" on the server; the
 * calling component only consumes the value inside client effects).
 *
 * Heuristic per spec:
 *  - narrow viewport or coarse pointer (touch) signals constrained devices
 *  - navigator.hardwareConcurrency signals raw CPU budget (unknown → assume 4)
 */
export function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "high";

  const cores =
    typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency > 0
      ? navigator.hardwareConcurrency
      : 4;
  const isTouch =
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;
  const isNarrow = window.innerWidth < 768;
  const isConstrainedForm = isTouch || isNarrow;

  if (isConstrainedForm && cores <= 4) return "low";
  if (isConstrainedForm) return "mid"; // capable phones/tablets cap at mid
  if (cores <= 4) return "low"; // modest desktops get the same mercy
  if (cores <= 8) return "mid";
  return "high";
}

/** Convenience: budget for the current device in one call. */
export function getDeviceBudget(): DeviceBudget {
  return DEVICE_BUDGETS[getDeviceTier()];
}

export default getDeviceTier;
