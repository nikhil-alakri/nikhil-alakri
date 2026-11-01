# 🗺️ 3D Website Overhaul — Planning Workspace

Everything about the 3D interaction upgrade for **nikhilalakri.tech** lives here.
Each topic exists in **two formats**:

| Format | File | Audience |
|---|---|---|
| Human-readable | `*.md` | Nikhil — read to understand context & decide next moves |
| AI-readable | `*.json` + `*.spec.md` | AI agents — load to execute work without re-scanning the repo |

---

## 📁 File Map

| File | What it contains | Read it when… |
|---|---|---|
| [`audit.md`](./audit.md) | Full codebase audit: inventory, strengths, 6 confirmed issues | You want to know *why* we're changing things |
| [`roadmap.md`](./roadmap.md) | Phases 0–4 with tasks, effort, acceptance criteria | You want to pick what's next |
| [`decisions.md`](./decisions.md) | Decision log (ADR-style, newest on top) | You want to know *what was decided and why* |
| [`3d-overhaul.spec.md`](./3d-overhaul.spec.md) | **AI-executable spec** — exact implementation steps per phase, constraints, verification | Handing work to any AI agent (fresh session safe) |
| [`audit.json`](./audit.json) | Machine-readable audit (issues, files, metrics) | AI context loading |
| [`roadmap.json`](./roadmap.json) | Machine-readable roadmap: tasks, status, dependencies, agent assignments | AI checking *what's done / what's next* |

---

## 🚦 Current Status (mirror of `roadmap.json`)

| Phase | Name | Status |
|---|---|---|
| 0 | Fix foundations (bugs, mobile, a11y) | ✅ Code done + build green — **on hold for your browser QA** (commit deferred) |
| 1 | Visual quality (env map, post FX, shadows, particles) | ⬜ Retargeted per D-005 — 1.6 dropped, 1.7 hierarchy check added |
| 2 | Interaction depth (raycast hover, click-focus, head tracking) | ⬜ Not started — 2.3 moved to OrganicWorld camera path (D-005) |
| 3 | Performance (GLB compression 15 MB → ~3 MB) | ✅ **Done** — 2.85 MB (−81%), wired + measured (`progress/phase-3.md`) |
| 4 | Extend 3D beyond hero (project pages, 404) | ⬜ Not started |

---

## 🤖 Agent Assignments

This workspace can be executed with the installed subagents:

| Phase | Lead agent | Why |
|---|---|---|
| 0, 1, 2 | `engineering-frontend-developer` | React/Three.js/GSAP implementation |
| 3 | `engineering-devops-automator` | Asset pipeline (gltf-transform), build, CI |
| 3 (verification) | `engineering-sre` | Lighthouse gates, perf budgets |
| Any (recon) | `explore` | Fast codebase re-scans without burning main context |

**Workflow per phase:**
1. Read `roadmap.json` → find next task with `status: "todo"` and no unresolved dependencies
2. Read the matching section in `3d-overhaul.spec.md`
3. Implement → verify (see spec's Verification block)
4. Update `roadmap.json` status → `done`, add a line to `decisions.md` if a choice was made
5. Optional: write `progress/phase-N.md` notes if anything unexpected was learned

---

## 📌 Conventions

- Statuses: `todo` → `in_progress` → `review` → `done` (or `blocked` with reason)
- Never edit the two `*.json` files by hand if you're human — ask the AI to update them, so they stay valid JSON
- Original GLB files are never deleted; compressed copies land beside them
- Site palette (from `ThreeHeroModel.tsx` + CSS vars): ivory `#fff2d8`, seafoam `#5eead4`, brass `#cbb594`, tokens via Tailwind classes (`accent`, `surface`, `headline`, `bodytext`)
