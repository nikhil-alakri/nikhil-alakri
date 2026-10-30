import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{scss,css}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: {
          DEFAULT: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
          hover: "var(--color-surface-elevated)",
          border: "var(--color-border)",
          "border-hover": "var(--color-border-hover)",
        },
        primary: {
          DEFAULT: "var(--color-text-primary)",
          hover: "var(--color-accent)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-text-primary)",
        },
        headline: "var(--color-text-primary)",
        bodytext: "var(--color-text-secondary)",
        secondary: "var(--color-text-secondary)",
        mutedtext: "var(--color-text-muted)",
        status: "var(--color-status)",
      },
      fontFamily: {
        primary: [
          "var(--font-primary)",
          "'DynaPuff'",
          "cursive",
          "sans-serif",
        ],
        secondary: [
          "var(--font-secondary)",
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        display: [
          "var(--font-primary)",
          "'DynaPuff'",
          "cursive",
          "sans-serif",
        ],
        sans: [
          "var(--font-secondary)",
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
