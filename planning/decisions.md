# 📜 Decision Log

ADR-style, newest first. Format: **ID · date · decision · why · alternatives rejected**

---

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
