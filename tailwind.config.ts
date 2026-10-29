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
        mutedtext: "var(--color-text-muted)",
        status: "var(--color-status)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "'JetBrains Mono'",
          "'Fira Code'",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
