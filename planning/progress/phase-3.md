# Phase 3 — Progress Log

## 2026-11-02 · Asset compression pre-staged (task 3.1, asset half)

**Tool:** `@gltf-transform/cli@4.5.1` via npx (no dependency added to package.json)
**Command:** `optimize <in.glb> <out.glb> --compress draco --texture-compress webp --texture-size 2048`

| Model | Before | After | Reduction |
|---|---|---|---|
| hero-pbr.glb | 10.55 MB | **2.32 MB** | −78% |
| hero-rigged.glb | 4.73 MB | **0.58 MB** | −88% |
| **Total** | **15.28 MB** | **2.85 MB** | **−81%** ✅ under 3 MB target |

**Extensions in output (verified via inspect):** `KHR_draco_mesh_compression`, `EXT_texture_webp`, `KHR_mesh_quantization`.
Runtime implications: only a `DRACOLoader` needs wiring (`decoderPath` gstatic/unpkg). `EXT_texture_webp` is handled natively by GLTFLoader (all modern browsers decode WebP); quantization needs no plugin.

**Deliberate safety choice:** compressed files live in `public/3d-models/compressed/` and are **not referenced by any code yet** — the original GLBs still serve, so the owner's Phase 0 QA session and the live site are unaffected. Originals preserved (never deleted, per D-002).

**KTX2 deferred:** `toktx` (KTX-Software) not installed on this machine, so Basis/Etc1s texture compression was skipped. WebP already achieved the target; KTX2 remains an optional future upgrade (D-006).

## 2026-11-02 · Device tiering helper written (task 3.2, half)

- `components/three/deviceTier.ts` — `getDeviceTier()` (SSR-safe) + `DEVICE_BUDGETS` (particles 240/160/90, DPR 2/1.75/1.5, postFX high+mid per spec P3.2).
- Standalone; unused until wired. `npm run build` verified (12/12 pages).

## Remaining for Phase 3 (blocked on Phase 0 commit + QA pass)

1. Wire `DRACOLoader` into `ThreeHeroModel.tsx` `loadModel` + swap `SITE_URLS.models.*` to compressed paths (`config/urls.ts`)
2. Use `getDeviceBudget()` for particle count / DPR cap / post-FX gate (also feeds Phase 1.3)
3. Idle preload + parsed-scene cache (spec P3.3)
4. Lighthouse mobile baseline before/after (spec P3.4) → record here
