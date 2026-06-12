import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#F7FBFF",
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F1F7FF",
          muted: "#EAF2FC",
        },
        navy: {
          DEFAULT: "#07111F",
          soft: "#0F1E33",
          subtle: "#172A46",
        },
        ink: {
          DEFAULT: "#334155",
          muted: "#64748B",
          faint: "#94A3B8",
        },
        line: {
          DEFAULT: "#DDE7F3",
          soft: "rgba(221, 231, 243, 0.7)",
          dark: "rgba(255, 255, 255, 0.12)",
        },
        brand: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          soft: "#DBEAFE",
        },
        accent: {
          DEFAULT: "#A78BFA",
          soft: "#EDE9FE",
          pale: "#F5F3FF",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.045)",
        soft: "0 8px 28px rgba(15, 23, 42, 0.055)",
        brand: "0 8px 20px rgba(37, 99, 235, 0.22)",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Inter", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        label: ["0.6875rem", { letterSpacing: "0.2em", fontWeight: "700" }],
      },
      spacing: {
        "section-y": "8rem",
      },
      animation: {
        "fluid-1": "fluid-1 12s infinite ease-in-out",
        "fluid-2": "fluid-2 15s infinite ease-in-out reverse",
        "fluid-3": "fluid-3 14s infinite ease-in-out",
      },
      keyframes: {
        "fluid-1": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
          },
          "50%": {
            transform: "translate3d(5vw, -5vh, 0) rotate(180deg) scale(1.1)",
          },
        },
        "fluid-2": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
          },
          "50%": {
            transform: "translate3d(-5vw, 5vh, 0) rotate(-180deg) scale(1.2)",
          },
        },
        "fluid-3": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
          },
          "50%": {
            transform: "translate3d(5vw, 5vh, 0) rotate(90deg) scale(0.9)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
