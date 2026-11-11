// ==============================================================================
// 🎨 ACCENT COLOR & THEME MANAGER (Terminal & UI Synced)
// ------------------------------------------------------------------------------
// Updates CSS variables on :root AND synchronizes 3D WebGL scene lights together.
// ==============================================================================

export interface ThemePreset {
  id: string;
  name: string;
  accent: string;
  accentHover: string;
  description: string;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  mint: {
    id: "mint",
    name: "Oceanic Mint (Default)",
    accent: "#36AB9B",
    accentHover: "#2B8C7F",
    description: "Signature dark teal with high-contrast mint (#36AB9B)",
  },
  emerald: {
    id: "emerald",
    name: "Forest Sage & Emerald",
    accent: "#F2B75F",
    accentHover: "#10b981",
    description: "Organic clay & stone aesthetic inspired by organic surrealism (#F2B75F)",
  },
  cyan: {
    id: "cyan",
    name: "Cyber Oceanic Cyan",
    accent: "#38bdf8",
    accentHover: "#0ea5e9",
    description: "Deep oceanic navy with vibrant cyan highlight (#38bdf8)",
  },
  gold: {
    id: "gold",
    name: "Solar Brass & Gold",
    accent: "#fbbf24",
    accentHover: "#f59e0b",
    description: "Architectural warm stone with brushed brass accent (#fbbf24)",
  },
  violet: {
    id: "violet",
    name: "Neon Midnight Violet",
    accent: "#a78bfa",
    accentHover: "#8b5cf6",
    description: "Obsidian dark background with electric violet glow (#a78bfa)",
  },
};

export function applyTheme(themeId: string): ThemePreset | null {
  const preset = THEME_PRESETS[themeId.toLowerCase()];
  if (!preset || typeof window === "undefined") return null;

  const root = document.documentElement;
  root.style.setProperty("--site-accent", preset.accent);
  root.style.setProperty("--site-mint", preset.accent);
  root.style.setProperty("--site-accent-hover", preset.accentHover);
  root.style.setProperty("--site-border-hover", `${preset.accent}70`);
  root.setAttribute("data-accent", preset.id);

  try {
    localStorage.setItem("portfolio-theme", preset.id);
  } catch {
    // LocalStorage fallback
  }

  window.dispatchEvent(
    new CustomEvent("portfolio:theme-change", {
      detail: { theme: preset.id, accentHex: preset.accent },
    })
  );

  return preset;
}

export function getCurrentTheme(): string {
  if (typeof window === "undefined") return "mint";
  try {
    return localStorage.getItem("portfolio-theme") || "mint";
  } catch {
    return "mint";
  }
}

