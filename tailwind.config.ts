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
        background: "#06080f",
        surface: {
          DEFAULT: "#0d121f",
          elevated: "#141c2e",
          hover: "#19243b",
          border: "rgba(255, 255, 255, 0.08)",
        },
        primary: {
          DEFAULT: "#38bdf8",
          hover: "#0ea5e9",
        },
        accent: {
          DEFAULT: "#818cf8",
          hover: "#6366f1",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
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
