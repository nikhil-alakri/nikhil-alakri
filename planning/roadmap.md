# 🛣️ 3D Overhaul Roadmap

> Human view. Machine view: [`roadmap.json`](./roadmap.json). Exact steps: [`3d-overhaul.spec.md`](./3d-overhaul.spec.md).
> Sequence is deliberate: fix first → look expensive → interact deeply → go fast → spread.

---

## Phase 0 — Fix Foundations 🧱 · ~1 session · lead: `engineering-frontend-developer`

| # | Task | File(s) |
|---|---|---|
| 0.1 | Replace `isInteracting` state read in animate loop with a ref (fix drag jitter) | `ThreeHeroModel.tsx` |
| 0.2 | Explicit touch gesture config + `pan-y` fallback so hero never traps page scroll | `ThreeHeroModel.tsx` |
| 0.3 | Replace rAF spin with GSAP tween (`overwrite: "auto"`, power2.out) | `ThreeHeroModel.tsx` |
| 0.4 | `prefers-reduced-motion`: kill autoRotate/parallax/bob when set | `ThreeHeroModel.tsx` |

**Acceptance:** drag feels smooth end-to-end; one-finger vertical scroll works over canvas on touch; spin is eased & interruptible; reduced-motion users get a static-but-controllable stage. `npm run build` green.

---

## Phase 1 — Visual Quality ✨ · ~1–2 sessions · lead: `engineering-frontend-developer`

| # | Task | Detail |
|---|---|---|
| 1.1 | Environment map | `RoomEnvironment` + `PMREMGenerator` → real PBR reflections, scene.environment |
| 1.2 | Contact shadow | renderer.shadowMap + soft `ShadowMaterial` ground disc (or radial-texture plane) under model |
| 1.3 | Post-processing | `EffectComposer` + subtle `UnrealBloomPass` + vignette; **skipped on deviceTier low** |
| 1.4 | Particle shader | Custom `ShaderMaterial` points: soft circular glow sprite, per-point twinkle, mouse/scroll reactivity |
| 1.5 | Hybrid wireframe | Shaded mesh + `EdgesGeometry` LineSegments overlay (glow accent), instead of material swap |
| 1.6 | In-canvas backdrop | Palette-synced gradient plane / large soft sphere so lighting moods affect the whole frame |

**Acceptance:** model no longer floats in a void; lighting moods visibly change the full frame; no bloom blowout on light parts; mobile-low tier renders without post FX.

---

## Phase 2 — Interaction Depth 🖱️ · ~2 sessions · lead: `engineering-frontend-developer`

| # | Task | Detail |
|---|---|---|
| 2.1 | Raycast hover | Pointer → Raycaster → highlight hovered mesh (emissive pulse) + tooltip with part name (from `userData`/node names) |
| 2.2 | Click-to-focus | GSAP camera dolly to part + controls retarget; Esc / outside click → restore saved pose |
| 2.3 | Scroll choreography | Lenis + GSAP ScrollTrigger: model yaw/camera drift tied to hero scroll-out; paused after hero leaves viewport (already have IntersectionObserver) |
| 2.4 | Head tracking | Rigged model: head bone/bone-group lookAt cursor, clamped angles (only when rigged model active) |
| 2.5 | Explore mode | Toggle that arms hover/focus + part-label HUD; off by default so scroll stays clean |

**Acceptance:** hovering parts highlights + names them; click focuses and returns; scroll moves the model cinematically without fighting OrbitControls; all new motion respects reduced-motion.

---

## Phase 3 — Performance ⚡ · ~1 session · lead: `engineering-devops-automator` (+ `engineering-sre` verify)

| # | Task | Detail |
|---|---|---|
| 3.1 | GLB compression | `gltf-transform` Draco (geometry) + KTX2/Basis (textures) + texture rescale 2k; **originals kept as `*.original.glb`** |
| 3.2 | Device tiering | `navigator.hardwareConcurrency` + `matchMedia(pointer)` → tier low/mid/high: particle count, DPR cap (1.5 low), post-FX skip |
| 3.3 | Idle preload | `requestIdleCallback` warm-load of compressed GLBs; reuse loaded cache on model switch (no double fetch) |
| 3.4 | Baseline capture | Lighthouse (mobile+desktop) before/after; record in `progress/phase-3.md` |

**Target:** GLB total **15.2 MB → < 3 MB**; no visible quality loss at stage scale. ✅ Owner-approved (decisions.md #2).

---

## Phase 4 — Extend Beyond Hero 🚀 · optional · lead: `engineering-frontend-developer`

| # | Task | Detail |
|---|---|---|
| 4.1 | `<MiniShowcase>` | Reusable lightweight 3D component (single light, one GLB, no controls UI) for project pages |
| 4.2 | Project pages | odin-eye / itpo get a MiniShowcase; `project-one` if it stays |
| 4.3 | 404 easter egg | Spinning/floating model on `not-found.tsx` (optional, cheap reuse) |

---

## Dependency Graph

```
Phase 0 ──► Phase 1 ──► Phase 2
   │                        
   └──► Phase 3 (independent of 1/2 — can run anytime)
Phase 4 (after 2, reuses interaction patterns)
```

Recommended order: **0 → 1 → 2 → 3**, but 3 can slot anywhere after 0.
