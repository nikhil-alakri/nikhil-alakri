# Phase 0 — Implementation Record (2026-11-01)

**Implemented by:** subagent `engineering-frontend-developer` (session `ses_e6bc2007fffeEqWDYkViu7TTX7`)
**File touched:** `components/ThreeHeroModel.tsx` only (+123/−23)
**Verified:** `npm run build` ✅ (12/12 static pages, strict TS). `npm run lint` N/A — ESLint not installed in this repo (`next build`'s type-check covers types). Visual QA pending owner.

---

## What changed (per task)

### P0.1 — Stale closure (drag jitter)
- `isInteractingRef` mirrors OrbitControls `start`/`end`; animate loop reads the ref, React state kept only for the HUD indicator.
- Loop condition is now `!isInteractingRef.current && !isSpinActiveRef.current && !reducedMotionRef.current`.

### P0.2 — Mobile scroll fix
- `controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }` + `renderer.domElement.style.touchAction = "pan-y"` set **after** `new OrbitControls(...)` (its `connect()` forces `touch-action: none` — verified at `node_modules/three/.../OrbitControls.js:507`).
- three@0.187 handles `pointercancel → _onPointerUp` cleanly (line 500), so a browser-claimed vertical swipe ends the gesture cleanly. Horizontal drag rotates; vertical swipe scrolls; two-finger pinch dollies.

### P0.3 — GSAP spin
- rAF loop deleted; `gsap.to(group.rotation, { y: "+=2π", duration: 1.2, ease: "power2.out", overwrite: "auto" })` with `isSpinActiveRef` claimed **before** the tween's first tick (closes sub-frame race).
- `onComplete` folds `rotation.y -= 2π` → parallax lerp resumes from exact pre-spin angle.
- Tween killed in: arrow nudges (`stopSpinTween()` helper), `handleResetCamera`, unmount cleanup.

### P0.4 — Reduced motion
- `matchMedia("(prefers-reduced-motion: reduce)")` read into `reducedMotionRef`, live via `change` listener (removed in cleanup).
- Gates: autoRotate (initial setup + updater effect + per-frame write), bobbing (keeps only scroll offset), particle drift, parallax lerp, spin (no-op). Rendering always continues.

## 🔎 Found during work: a 4th stale closure
The loop's per-frame `controls.autoRotate = autoRotate` always read mount-time state (`true`) — it silently re-enabled auto-rotate every frame after a Space/HUD toggle. Fixed via `autoRotateRef` synced in the `[autoRotate]` effect. Without this, P0.4's "autoRotate stays false" was unachievable.

## Handoff notes for Phase 1 / 2 (from implementing agent)
1. `loadModel(currentModelIndex)` inside the init effect also closes over mount-time state — fine today (initial load only), but route through a ref if Phase 2 makes the loop model-aware.
2. Competing writers of `floatingGroup.rotation` still exist **by design** (parallax lerp, arrow nudges, spin). Any Phase 2 system that owns `rotation.y` (scroll choreography, head tracking) must treat `isSpinActiveRef` as an ownership flag, same as the parallax gate.
3. Key-light cursor tracking is intentionally NOT reduced-motion-gated (lighting highlight, not self-motion) — 3-line gate if QA finds it too much.
4. `reactStrictMode: true` double-mounts in dev; cleanup additions keep that path leak-free.
5. A live reduced-motion flip mid-spin lets the in-flight 1.2s tween finish (user-triggered, negligible).

---

## ⚠️ Parallel-work collision (resolving)

While Phase 0 ran, a **second agent session** committed:
- `4e4ff59` 04:35 — `docs/3D_ORGANIC_WORLD_PLAN.md` (master plan)
- `6a8e977` 04:38 — `components/three/` (`OrganicWorldCanvas` 226L, `ProceduralAssets` 442L, `DynamicOrganicWorld` lazy wrapper) + `<DynamicOrganicWorld/>` mounted **globally** in `app/layout.tsx` + touched `.gitignore`, `hooks/use3DTilt.ts` — and swept this workspace's `planning/*.md` files into its commit.

Their plan: page-wide organic world (portal ring + orbs → laptop plinth → career pedestals → monolith footer) with **scroll-driven camera** as their Phase 3 milestone (all their milestone checkboxes still unchecked — implementation is partial, likely hero-world only so far). Last file activity 04:39; idle ≥23 min as of 05:02.

### Overlap analysis vs this roadmap
| This roadmap | Other session | Verdict |
|---|---|---|
| 1.6 In-canvas backdrop | OrganicWorld is the page-wide backdrop | **1.6 now redundant — drop/retarget** |
| 2.3 Scroll choreography (hero model reacts on scroll) | Their "Phase 3: bind camera to Lenis scroll progress" | **Coordinate** — two scroll systems on one page = jitter risk; pick one owner |
| 1.1–1.5 Env map, shadow, bloom, particles, wireframe (hero stage) | Ambient world has own fog/lights | **Complementary** — separate canvases, can coexist |
| 2.1/2.2/2.4/2.5 Raycast hover, click-focus, head tracking, explore mode | Not covered by them | **Uniquely ours** |
| 3 Performance (GLB compress, tiering) | Their plan mentions "50MB+ meshes" concern; they use procedural (no GLB) | **Complementary** |

### ✅ Resolved — 2026-11-02 (D-005: unified, both worlds kept)
- OrganicWorld stays as page-wide backdrop; Phase 1.6 cancelled; task 2.3 cancelled (OrganicWorld scroll-camera owns page scroll); task 1.7 added (hero-vs-background hierarchy check).
- Owner chose to **QA Phase 0 in the browser before any commit** — working tree keeps the Phase 0 diff uncommitted until QA passes.

### 🧪 Owner QA checklist for Phase 0 (`npm run dev`)
1. **Desktop drag:** grab and rotate the hero model — no jitter; cursor-parallax resumes smoothly on release
2. **Spin:** press `F` / double-click — one eased 360°; pressing arrow keys mid-spin stops it cleanly; `R` resets mid-spin without fighting
3. **Space toggle:** rotation stops and **stays** stopped (this was silently broken before)
4. **Mobile/touch emulator:** vertical swipe over the hero canvas scrolls the page; horizontal drag rotates the model
5. **Reduced motion:** OS setting on → stage static but fully controllable; spin no-ops
6. **Two-layer check:** hero model still reads clearly with the OrganicWorld background behind it (informs task 1.7)
