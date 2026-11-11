# 🤖 AI-EXECUTABLE SPEC — 3D Website Overhaul

**Purpose:** A fresh AI agent session can execute any phase below **cold**, using only this file + `roadmap.json`. No repo re-scan required.
**Maintain:** update this file whenever implementation deviates from the plan.

---

## 1. Repository Context (verified 2026-11-01)

- Next.js 15 App Router, React 19, TS strict. Scripts: `npm run dev|build|lint`.
- Working dir: repo root. Key paths:
  - `components/ThreeHeroModel.tsx` — 767-line hero 3D stage (the main file for Phases 0–2)
  - `components/DynamicThreeModel.tsx` — `next/dynamic` wrapper, `ssr:false`
  - `hooks/use3DTilt.ts` — CSS tilt (BentoProjects)
  - `components/SmoothScroll.tsx` — Lenis, **desktop-only** (native scroll on touch/<768px)
  - `components/Hero.tsx` — renders `<DynamicThreeModel/>` in right column of a 12-col grid (7/5 split)
  - `public/3d-models/tripo_pbr…_meshopt.glb` (10.5MB) + `tripo_rigging…_meshopt.glb` (4.7MB)
  - `config/urls.ts` → `SITE_URLS.models.hero3d` / `.heroRigged`
  - Tailwind tokens are CSS vars: `accent`, `surface`, `surface-border`, `headline`, `bodytext`, `background`, `status`; fonts: `font-primary`, `font-mono`
- Dependencies available (already installed): `three@0.187`, `gsap@3.12` (+ examples via `three/examples/jsm`), `lenis`, `meshoptimizer`, `lucide-react`. **No @react-three/fiber — do not add it (Decision D-001).**
- 3D palette constants in ThreeHeroModel: ivory `0xfff2d8`, seafoam `0x5eead4`, brass `0xcbb594`.

## 2. Global Constraints

1. Keep `ssr: false` loading path intact; never render WebGL server-side.
2. Preserve existing features: model switcher, lighting moods, keyboard shortcuts, IntersectionObserver pause, DPR≤2.
3. All dispose logic must stay leak-free: every new geometry/material/texture created in the init effect gets disposed in cleanup; post-FX composer and its passes disposed too.
4. Respect `prefers-reduced-motion: reduce` for ALL added motion (bloom pulse, choreography, head tracking, particles).
5. No layout shift: canvas container keeps current responsive height classes.
6. TypeScript strict — no `any` leaks; keep component under ~1100 lines (extract helpers to `components/three/` if needed: e.g. `three/particles.ts`, `three/shadows.ts`).
7. `npm run build` must pass after each task; run `npm run lint` before declaring a phase done.

## 3. Phase Specs

### Phase 0 — Foundations
**P0.1 Stale closure fix** — In the init `useEffect`, add `const interactionRef = useRef(false)` (or plain `let isDragging` in effect scope). In `controls` `start`/`end` handlers set both the React state (for HUD) and the ref. Animate loop reads the ref. Remove `isInteracting` from the loop condition.
**P0.2 Touch config** — *(implemented approach)* After `new OrbitControls(...)` — whose `connect()` forces `touch-action: none` — set `controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }` and `renderer.domElement.style.touchAction = "pan-y"`. The browser then claims predominantly-vertical swipes for page scroll (firing `pointercancel`, which OrbitControls handles as a clean gesture end), while horizontal single-finger drags still rotate. No manual axis-gating needed.
**P0.3 GSAP spin** — Replace `handlePerformSpin` body: `gsap.to(floatingGroup.rotation, { y: `+=${Math.PI * 2}`, duration: 1.2, ease: "power2.out", overwrite: "auto" })`. Delete the rAF loop.
**P0.4 Reduced motion** — At effect start: `const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches`. When true: `controls.autoRotate = false`, skip parallax lerp + bobbing, particle drift static (still render). Listen for change events to update live.

**Verify P0:** build ✓; drag-during-parallax no longer jitters; on touch emulator, vertical swipe over canvas scrolls page, horizontal drag rotates; spin interruptible; OS reduce-motion → stage static.

### Phase 1 — Visual Quality
**P1.1 Env map** — import `RoomEnvironment` from `three/examples/jsm/environments/RoomEnvironment.js`; `const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;` Dispose pmrem + env texture in cleanup. Tint via `scene.environmentIntensity` per mood (studio 0.5, cyber 0.7, neon 0.6, clean 0.8).
**P1.2 Contact shadow** — enable `renderer.shadowMap = { enabled: true, type: THREE.PCFSoftShadowMap }`; add circle ground mesh y ≈ -1.4 with `THREE.ShadowMaterial({ opacity: 0.25 })`, `receiveShadow = true`; keyLight becomes shadow caster (mapSize 1024, soft radius). Meshes already set `castShadow` in loader. Position under model, scale to model footprint.
**P1.3 Post FX** — `EffectComposer` + `RenderPass` + `UnrealBloomPass(resolution, strength 0.25, radius 0.4, threshold 0.85)` + cheap vignette via ShaderPass or skip vignette if shader budget tight. Composer renders in loop instead of renderer.render; `composer.setSize` on resize. Skip entirely when deviceTier is low (see P3.2 helper).
**P1.4 Particles** — replace `PointsMaterial` with custom `ShaderMaterial`: vertex passes `aTwinkle` phase; fragment draws soft radial falloff `smoothstep(0.5, 0.0, dist)` × twinkle × opacity; `blending: AdditiveBlending, depthWrite: false, transparent: true`. React to mouse via a uniform `uMouse` (already tracked) and scroll via `uScroll`.
**P1.5 Hybrid wireframe** — on model load, per mesh create `new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 30), new THREE.LineBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.0 }))` added as child; wireframe toggle now animates line opacity 0↔0.35 (GSAP) instead of material swap. Keep legacy material-wireframe only as fallback for meshes with >50k tris (skip edges there).
**P1.6 Backdrop** — large inverted sphere (r=30) `BackSide` with vertical gradient ShaderMaterial (top `#0c2a34` → bottom `#050505`-ish tinted by mood uniforms), or full-screen background plane at far Z. Mood switch lerps uniform colors.

**Verify P1:** reflections visible on metal parts; shadow grounds model; bloom subtle (no white clipping); particles are round glows; wireframe shows glowing edges over shaded model; backdrop shifts with mood; memory cleanup verified via devtools heap after model switch ×3.

### Phase 2 — Interaction Depth
**P2.1 Raycast hover** — pointermove (throttled to rAF) → `raycaster.intersectObjects(modelGroup.children, true)` → first mesh hit: pulse emissive (`gsap.to(mat, { emissiveIntensity })`, base emissive = accent seafoam) + show HTML tooltip positioned at projected screen coords with part name = `mesh.name || parent.name` prettified (or `userData.label`). Clear on miss. Disabled while dragging.
**P2.2 Click-to-focus** — on `click` (not drag: track pointer down/up distance < 5px): save camera pose, `gsap.to(camera.position, { …computePointAt(distance 1.2× part bounding sphere radius), ease: "power3.inOut", duration: 1 })`, `controls.target = part world center`. Esc key + outside-canvas click restore saved pose. While focused: disable autoRotate.
**P2.3 Scroll choreography** — Lenis desktop-only → gate to `window.innerWidth >= 768 && !reduceMotion`. Use ScrollTrigger (registered once) on hero section: scrub timeline mapping scroll progress 0→1 to `floatingGroup.rotation.y += 0.6` and camera y drift 0.8→1.4 + slight dolly-out; kill/recreate on resize. On touch (no Lenis): passive scroll listener with same mapping, lerped.
**P2.4 Head tracking** — when rigged model active: find head bone (traverse for `name.match(/head/i)`); per frame: compute cursor NDC → target yaw/pitch clamped ±0.35/±0.2 rad, lerp bone quaternion. Skip when `reduceMotion` or user is orbiting.
**P2.5 Explore mode** — toggle in HUD (icon: `MousePointerClick`); when on: cursor becomes crosshair, hover/focus armed, part-label legend panel appears listing clickable parts; persists in `localStorage`.

**Verify P2:** hover highlights + tooltip follow part; click focuses, Esc returns exactly; scroll-away animates model and loop is paused when hero out of view; rigged head follows cursor subtly; explore mode togglable & remembered; no interaction conflict during drag (raycast suppressed while dragging).

### Phase 3 — Performance
**P3.1 Compression** — `npx @gltf-transform/cli optimize input.glb output.glb --compress draco --texture-compress ktx2` (plus `--simplify` only if ratio insufficient; `rescale` textures to 2048). Output names keep current URLs stable (overwrite originals; first `cp` to `*.original.glb`). Loaders: add `DRACOLoader` (decoder path `https://www.gstatic.com/draco/versioned/decoders/1.5.7/`) + `KTX2Loader` (transcoder path `https://unpkg.com/three@0.187.0/examples/jsm/libs/basis/`) alongside existing MeshoptDecoder. Detect `KHR_texture_basisu` support; fallback chain: compressed → original.
**P3.2 Device tiering** — helper `getDeviceTier()` (components/three/deviceTier.ts): mobile (coarse pointer or width<768) + cores≤4 → low; cores≤8 → mid; else high. Expose via prop/context into ThreeHeroModel: particles 240/160/90, DPR cap 2/1.75/1.5, postFX on/high+mid only.
**P3.3 Idle preload** — after first model loads, `requestIdleCallback(() => fetch other GLB via GLTFLoader with progress silent)` storing parsed scene in a module-level cache Map keyed by URL; `loadModel` checks cache first (skip setLoading flash).
**P3.4 Baseline** — record Lighthouse mobile scores (perf/LCP/CLS) before & after into `planning/progress/phase-3.md`.

**Verify P3:** both GLBs < 3 MB combined; model switch instant on second load; LCP not regressed; compressed models render identically at stage scale (screenshot compare); low-tier devices show no post FX and capped DPR.

### Phase 4 — Extend (outline)
Extract `<MiniShowcase modelUrl height interactionLevel="ambient">` from the hero (single directional + env light, no controls UI, slow idle rotate, hover-only raycast highlight). Use on `app/odin-eye/page.tsx`, `app/itpo/page.tsx`. Optional 404 (`app/not-found.tsx`) floating model. Reuse device tiering.

## 4. Out of Scope (agreed)
- Migrating to React Three Fiber (D-001)
- Replacing/custom-sourcing new 3D models
- Server-side rendering of WebGL
