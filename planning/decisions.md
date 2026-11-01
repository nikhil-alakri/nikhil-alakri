# 📜 Decision Log

ADR-style, newest first. Format: **ID · date · decision · why · alternatives rejected**

---

## D-003 · 2026-11-01 · Phase 0 implemented with 4 justified deviations
- **Decision:** Accept the implementing agent's deviations beyond the spec letter: (a) added `autoRotateRef` — the render loop's per-frame `controls.autoRotate = autoRotate` was a *fourth* stale closure that silently re-enabled auto-rotate after Space/HUD toggle, and would have violated P0.4; (b) P0.2 via `touch-action: pan-y` set after OrbitControls `connect()` (which forces `touch-action: none` at `OrbitControls.js:507` in three@0.187) + explicit `touches` map, instead of pointer-axis gating; (c) spin `onComplete` folds `rotation.y -= 2π` so the parallax lerp resumes from the pre-spin angle instead of dragging backwards ~2.5s; (d) active spin tween killed in `handleResetCamera`, arrow nudges, and unmount cleanup.
- **Why:** Each closes a real conflict the spec text missed; verified against installed three source and build.

## D-006 · 2026-11-02 · Phase-3 compression = Draco + WebP (KTX2 deferred); isolated `compressed/` folder
- **Decision:** Re-encoded both GLBs with `@gltf-transform/cli optimize --compress draco --texture-compress webp --texture-size 2048` → 15.28 MB → **2.85 MB (−81%)**, output to `public/3d-models/compressed/` with meaningful names (`hero-pbr.glb`, `hero-rigged.glb`). KTX2/Basis skipped — `toktx` not installed; WebP already beat the 3 MB target. Compressed files are **not yet referenced by code** — originals keep serving until the loader wiring lands after Phase 0 commit/QA.
- **Why:** Zero risk to the QA session and live URLs; no new runtime plugin needed beyond `DRACOLoader` (`EXT_texture_webp` is natively handled by GLTFLoader in all modern browsers); no dependency added to package.json (npx one-off).
- **Rejected:** KTX2 now (needs `toktx` install; marginal gain after WebP); overwriting originals in place (breaks current loader → would break QA); committing yet (owner QA hold active).

## D-005 · 2026-11-02 · Unified plan: keep both 3D worlds (owner decision)
- **Decision:** The OrganicWorld (other session, `components/three/` + `docs/3D_ORGANIC_WORLD_PLAN.md`) stays as the page-wide visual layer. Consequences for this roadmap: **Phase 1.6 cancelled** (backdrop now exists); **task 2.3 cancelled** — page-wide scroll choreography is owned by the OrganicWorld scroll-camera path (their Phase 3 milestone), so this repo must have exactly ONE page scroll system; **task 1.7 added** — visual-hierarchy check so the hero model pops against the new background layer (depth/fog/lighting contract). `planning/` remains the single tracker; their doc is the visual-direction source.
- **Why:** Their world is ambient/decorative and already committed; my roadmap's unique value (raycast interaction, click-focus, head tracking, hero polish, GLB compression) is complementary. Two scroll systems would fight.
- **Also:** Phase 0 commit **held** — owner QA in the browser first.

## D-004 · 2026-11-01 · Parallel agent session detected — plans must reconcile (OPEN)
- **Observation:** A second session committed `docs/3D_ORGANIC_WORLD_PLAN.md` + `components/three/` (portal ring, 50 orbs, plinths, floating laptop, monolith; `<DynamicOrganicWorld/>` mounted globally in `app/layout.tsx`) at 04:35–04:38, and also committed this workspace's `planning/*.md` files.
- **Impact:** Overlaps roadmap **Phase 1.6 (in-canvas backdrop)** — now redundant, since a page-wide organic world exists. `use3DTilt.ts` and `.gitignore` were also touched by that session.
- **Status:** ⬜ Open — owner to decide: keep OrganicWorld as the visual layer (drop Phase 1.6, retarget Phase 1 to hero-model-only polish + post FX) vs. remove/dim it. Phase 2 interactions remain complementary either way. **Do not start Phase 1 before resolving.**

## D-002 · 2026-11-01 · Recompress both GLB files (Draco + KTX2)
- **Decision:** Re-encode `public/3d-models/*.glb` with `gltf-transform` (Draco geometry + KTX2/Basis textures), keeping originals as `*.original.glb`.
- **Why:** 15.2 MB total is the site's largest asset; direct LCP/mobile win. Owner explicitly approved.
- **Rejected:** Keeping meshopt-only (already insufficient — geometry/textures uncompressed); dropping the rigged model (still useful for head-tracking interaction).

## D-001 · 2026-11-01 · Stay on raw Three.js — do not adopt React Three Fiber
- **Decision:** Keep the hand-rolled Three.js architecture in `ThreeHeroModel.tsx`; layer fixes/features on top.
- **Why:** Existing 767-line component already implements load/dispose/controls/pause correctly; an R3F migration is high-churn with zero user-visible payoff for a single hero scene. Zero new dependencies needed for Phases 0–2 (GSAP + three examples already installed).
- **Rejected:** Migrating to `@react-three/fiber` + drei (better ergonomics, but rewrite risk and bundle additions); drei-only `<ContactShadows>` (would drag drei in for one feature — hand-roll instead).

## D-000 · 2026-11-01 · Create `planning/` workspace with paired .md/.json formats
- **Decision:** Persist all audit/roadmap/spec knowledge as human markdown + AI JSON + one AI-executable spec file.
- **Why:** Owner wants to review and steer between sessions; agents need cold-start context without re-scanning the repo.
- **Rejected:** Single mega-doc (hard to keep in sync); external Notion (not in repo, not agent-readable).
