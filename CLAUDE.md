# Nikhil Alakri Portfolio — Project Rules & Guidelines

> **Project:** `nikhilalakri.tech` — Interactive 3D Developer Portfolio  
> **Target Production:** High-performance, Awwwards-caliber 3D portfolio website.  
> **Primary Rule:** All later phases must strictly comply with the architecture, performance, accessibility, and content guidelines below.

---

## 🏛️ Core Architecture Rules

1. **Persistent Global 3D Background Canvas:**
   - There must be **one persistent `<Canvas>`** fixed behind the page (`fixed inset-0 pointer-events-none z-0`).
   - The DOM content (HTML layout) scrolls above the canvas (`relative z-10`).
   - The 3D canvas **MUST** be dynamically imported with `ssr: false`.
   - **Never block LCP**: Hero typography, role, status badge, and call-to-action buttons must render immediately on first paint before 3D assets or WebGL initialize.

2. **Scroll-Driven 3D Camera & Scene Choreography:**
   - Page scroll drives the camera path through the 3D world (via GSAP ScrollTrigger / Lenis smooth scroll).
   - Only ONE scroll synchronization system controls the camera — never let competing scroll systems fight.

3. **Single Source of Truth for Content:**
   - All text content, career history, project links, metrics, credentials, and social links are data-driven from a single typed file: `src/data/portfolio.ts` (or `data/portfolio.ts`).
   - **No hardcoded copy** inside presentation components.
   - All external URLs, email, and social routes must be centralized.

4. **Design Tokens & Brand Palette:**
   - Design tokens (colors, typography, spacing, elevations) live in CSS variables.
   - The signature **Dark Teal + Mint / Ivory** palette is the brand identity:
     - Background / Canvas: `#113946` (Deep Teal)
     - Surface: `#184655` / `#1f4e5b`
     - Headline / Primary Text: `#FFF2D8` (Warm Ivory)
     - Body Text: `#EAD7BB` (Parchment)
     - Accents: `#cbb594` (Calibrated Brass) & `#5eead4` (Mint / Seafoam Glow)
   - Strict adherence to font tokens: `Space Grotesk` (display/headings) + `Inter` (body/sans) + `JetBrains Mono` (labels/terminal). Minimum label 12px, body 16px.

---

## ⚡ Performance Budget & Constraints

1. **Asset Payloads:**
   - Total GLB payload for hero: **≤ ~3 MB**.
   - Additional models or heavy 3D assets must be lazy-loaded on demand or during idle time (`requestIdleCallback`).
   - Use Draco mesh compression and WebP/KTX2 texture compression for 3D assets.

2. **Frame Rate & Device Tiering:**
   - Target **60 fps** on mid-range laptops and desktops.
   - Target **30+ fps** on mobile devices.
   - **Cap DPR:** `Math.min(window.devicePixelRatio, 1.5)` on mobile devices, `Math.min(window.devicePixelRatio, 2.0)` on desktop.
   - Use `THREE.InstancedMesh` for repeated objects (single draw call).
   - Enable frustum culling and pause render loops when the canvas is off-screen or the tab is hidden (`0% CPU idle`).

---

## ♿ Accessibility & Fallback Standards

1. **Semantic HTML First:**
   - All portfolio content (About, Experience, Projects, Skills, FAQ, Contact) must be fully readable as standard, accessible HTML.
   - 3D is strictly a **progressive enhancement / decorative layer** (`aria-hidden="true"` on the 3D canvas).
   - Provide a working **skip-to-content** link (`<a href="#main-content">Skip to content</a>`).

2. **Graceful Fallbacks:**
   - **`prefers-reduced-motion`**: When enabled, immediately disable auto-rotation, scroll-driven camera flight, particle drift, and bobbing animations; present a calm, static scene or 2D fallback.
   - **Low-end / Mobile detection**: Degrade particle counts, disable post-processing passes (bloom), and maintain full readability.
   - **WebGL Unavailable / Crash**: Render a high-fidelity 2D styled layout with complete content, cards, and CTAs.

3. **Color Contrast & Keyboard Navigation:**
   - Maintain strict **WCAG AA compliance (contrast ratio ≥ 4.5:1)** for all text against backgrounds.
   - All interactive controls (buttons, links, terminal inputs, accordion headers) must be fully keyboard accessible with visible focus rings.

---

## 🛠️ Development & Build Commands

```bash
# Start development server
npm run dev

# Run TypeScript checks and production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

