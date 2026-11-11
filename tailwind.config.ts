import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{scss,css}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
          hover: "var(--color-accent-hover)",
        },
        mint: {
          DEFAULT: "#5eead4",
          light: "#99f6e4",
          dark: "#2dd4bf",
        },
        headline: "var(--color-text-primary)",
        bodytext: "var(--color-text-secondary)",
        secondary: "var(--color-text-secondary)",
        mutedtext: "var(--color-text-muted)",
        status: "var(--color-status)",
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
          "'Inter Tight'",
          "'Inter'",
          "-apple-system",
          "sans-serif",
        ],
        primary: [
          "var(--font-primary)",
          "'Inter Tight'",
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
