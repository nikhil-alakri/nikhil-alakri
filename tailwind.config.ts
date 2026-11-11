import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--site-bg)",
        surface: {
          DEFAULT: "var(--site-surface)",
          elevated: "var(--site-surface-elevated)",
          hover: "var(--site-surface-elevated)",
          border: "var(--site-border)",
          "border-hover": "var(--site-border-hover)",
        },
        primary: {
          DEFAULT: "var(--site-text-primary)",
          hover: "var(--site-accent)",
        },
        accent: {
          DEFAULT: "var(--site-accent)",
          hover: "var(--site-accent-hover)",
        },
        mint: {
          DEFAULT: "var(--site-mint)",
          light: "#D5F578",
          dark: "#18221C",
        },
        amber: {
          DEFAULT: "#3F5F1C",
          light: "#D5F578",
          dark: "#18221C",
        },
        ink: { DEFAULT: "var(--site-ink)", soft: "var(--site-ink-soft)" },
        paper: "var(--site-paper)",
        sage: "var(--site-sage)",
        lime: "var(--site-lime)",
        olive: "var(--site-olive)",
        headline: "var(--site-text-primary)",
        bodytext: "var(--site-text-secondary)",
        secondary: "var(--site-text-secondary)",
        mutedtext: "var(--site-text-muted)",
        status: "var(--site-status)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.28s ease-out",
        "accordion-up": "accordion-up 0.22s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "'Space Grotesk'",
          "'Inter'",
          "-apple-system",
          "sans-serif",
        ],
        primary: [
          "var(--font-primary)",
          "'Space Grotesk'",
          "'Inter'",
          "-apple-system",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "'Instrument Serif'",
          "'Playfair Display'",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        secondary: [
          "var(--font-secondary)",
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "'JetBrains Mono'",
          "ui-monospace",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
