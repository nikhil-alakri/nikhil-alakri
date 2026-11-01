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

## 2026-11-02 · Phase 3 WIRED + measured (tasks 3.1–3.4 complete)

### Lighthouse (mobile emulation, local prod server, simulated throttling — indicative)
| Metric | BEFORE (hero only, 15 MB GLBs) | AFTER (combined¹) |
|---|---|---|
| Perf score | 57 | 54 |
| LCP | 2.87 s | **17.79 s ⚠️** |
| TBT | 11,523 ms | **822 ms** ✅ |
| CLS | 0.001 | 0.001 |
| Total byte weight | 4.43 MB | 4.43 MB |

¹ **Not a clean A/B** — the other session's uncommitted R3F overhaul shared the tree (owner ruling D-007: both systems coexist).
- **TBT 11.5s → 0.8s**: real Phase 3 win — Draco decodes in workers; the old 15 MB meshopt decode blocked the main thread.
- **LCP 2.87s → 17.79s**: attributed to the other session's in-flight `SceneCanvas` (drei `Environment` preset fetches HDRs from a CDN at render time). Flagged under D-007; needs that session's attention (e.g., self-hosted env map, `loading="eager"` discipline, or replacing preset with local RGBEL).

### Code landed (commit: perf(3d))
- `config/urls.ts`: `models.hero3d/heroRigged` → compressed paths; `*Original` fallback keys
- `ThreeHeroModel.tsx`: `DRACOLoader` (shared lazy singleton, gstatic decoder), compressed→original fallback chain, `gltfSceneCache` (module-level, StrictMode-safe), `scheduleIdlePreload` (rIC + timeout fallback), `THREE.Cache.enabled`, no-dispose-on-switch contract (`userData.heroStagePrepared` guard for transform-once)
- `components/three/deviceTier.ts`: wired — DPR cap (2/1.75/1.5) + particle count (240/160/90) from `getDeviceBudget()`; post-FX gate ready for Phase 1.3
- Build ✅ 14/14 pages (includes both 3D systems)

### Contract changes for Phase 1/2 implementers
- NEVER dispose cached scene geometry on model switch (corrupts `gltfSceneCache`)
- `loadModel` still closes over mount-time `currentModelIndex` — fine (initial load only); Phase 2 must route through a ref if the loop becomes model-aware
- Key-light cursor tracking remains intentionally not reduced-motion-gated
