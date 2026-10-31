# 🔍 Codebase Audit — 3D & Interaction (2026-11-01)

## Project Snapshot

- **Stack:** Next.js 15 + React 19 + TypeScript, raw Three.js 0.187 (no React Three Fiber), GSAP 3, Lenis 1.1, Tailwind 3 + SASS (CSS-var tokens), meshoptimizer
- **Purpose:** Personal portfolio for Nikhil Alakri (Full-Stack & AI Engineer @ CitiusTech)
- **Claimed quality bar:** "100/100 Lighthouse, WCAG AA" — audit shows gaps against that bar

## 3D-Relevant File Inventory

| File | Lines | Role |
|---|---|---|
| `components/ThreeHeroModel.tsx` | 767 | Hero 3D stage: OrbitControls (damped), 4 lighting moods (studio/cyber/neon/clean), wireframe toggle, keyboard shortcuts (Space/W/L/R/F/1/2/arrows), 240-point particle constellation, mouse parallax, scroll influence, IntersectionObserver pause, DPR cap 2 |
| `components/DynamicThreeModel.tsx` | 28 | `next/dynamic` wrapper, `ssr: false`, skeleton fallback |
| `hooks/use3DTilt.ts` | 128 | CSS perspective tilt + glare (disabled on `pointer: coarse`), used by `BentoProjects.tsx` |
| `components/SmoothScroll.tsx` | ~60 | Lenis smooth scroll **desktop-only**; native scroll on touch (<768px or touch points) |
| `components/Hero.tsx` | 160 | 2-col hero: text left, `<DynamicThreeModel/>` right; GSAP entrance, TextScramble, InteractiveTerminal, AnimatedCounter |
| `app/page.tsx` | 23 | Section order: Hero → CompanyMarquee → ServicesPillars → ExperienceTimeline → BentoProjects → ExperienceSkills → FaqSection → Footer |
| `public/3d-models/*.glb` | — | `tripo_pbr…_meshopt.glb` **10.5 MB** + `tripo_rigging…_meshopt.glb` **4.7 MB** (meshopt-compressed only, no Draco/KTX2) |
| Project pages (`odin-eye`, `itpo`, `project-one`) | — | **No 3D usage at all** |

Other interaction components: `CustomCursor.tsx` (314), `InteractiveTerminal.tsx` (262), `InteractiveSpotlight.tsx`, `TextScramble.tsx`, `ScrollReveal.tsx`.

## Strengths (keep these)

1. IntersectionObserver pauses the render loop when off-screen (0% idle CPU)
2. `devicePixelRatio` capped at 2; ACESFilmic tone mapping; SRGB output
3. Lazy `ssr:false` load keeps LCP off the 3D critical path
4. Real keyboard interaction set + visible HUD + key feedback pill (rare, good)
5. Damped OrbitControls with sensible min/max polar & distance clamps
6. Touch users already get native scroll (Lenis desktop-only)

## Confirmed Issues

### 🐛 P0-1: Stale closure — parallax fights OrbitControls
`ThreeHeroModel.tsx` animation loop (line ~516) closes over `isInteracting` state captured at effect-mount. `controls.addEventListener("start"/"end")` updates React state, but the running loop never sees it → `if (!isInteracting …)` lerp keeps applying cursor-target rotation **while the user is dragging**, causing jitter.
**Fix:** mirror interaction into a `useRef` (or a plain mutable object in the effect closure).

### 🐛 P0-2: Mobile scroll hijack risk
OrbitControls sets `touch-action: none` on the canvas. Hero canvas is `h-[420–560px]` — a thumb landing on it can trap vertical page scroll on phones (Lenis is disabled there, so native scroll is the only path).
**Fix:** set `controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }` deliberately, and/or opt into `touch-action: pan-y` + pointerdown-gating; consider rotate-only-on-horizontal-drag.

### 🐛 P0-3: Spin trick has no inertia, fights auto-rotate
`handlePerformSpin` uses a raw `requestAnimationFrame` loop adding `rotation.y += 0.22` per frame — linear, no easing, no interruption handling; races with `autoRotate` and the parallax lerp writing the same property.
**Fix:** GSAP tween on `floatingGroup.rotation` (gsap already installed) with overwrite handling, or damped velocity.

### 🐛 P0-4: No `prefers-reduced-motion` support
Auto-rotate, parallax, bobbing, particle drift always run. Conflicts with the site's own WCAG claim.
**Fix:** `matchMedia('(prefers-reduced-motion: reduce)')` → disable autoRotate/parallax/bob, keep manual controls.

### ⚠️ P3-1: 15.2 MB of GLBs (largest asset on site)
Meshopt-decoded at runtime but geometry/textures uncompressed → slow first 3D paint on mobile/data.
**Fix:** `gltf-transform` Draco + KTX2 (Basis) + texture rescale; target < 3 MB total. Approved by owner (see `decisions.md`). Originals kept.

### ⚠️ Visual & interaction gaps (Phases 1–2)
- No environment map → PBR materials read flat despite 5-light rig
- No post-processing (bloom/vignette), no ground/contact shadow — model floats over a fake CSS radial gradient
- Particles are untextured square points (cheap-looking up close)
- Wireframe toggle replaces shading entirely (no hybrid edges mode)
- No raycasting → zero part-level interaction (hover highlight, click-to-focus)
- Camera is scroll-static — no scroll choreography despite GSAP + Lenis already installed
- Redundant competing rotation systems (parallax lerp + autoRotate + spin all write `floatingGroup.rotation`)

## Metrics Baseline (record before Phase 3)

- GLB total: **15.2 MB** (10.5 + 4.7)
- Particle count: 240 (desktop == mobile)
- DPR cap: 2 (no device tiering)
- Post FX: none
- Lighthouse: unmeasured this session → capture at Phase 3 start
