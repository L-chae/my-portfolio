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
        /**
         * Page / Surface
         * 전체 사이트는 차가운 블루 화이트 기반.
         * 카드와 섹션이 과하게 떠 보이지 않도록 surface 단계를 분리.
         */
        base: "#F8FBFF",

        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F3F8FF",
          muted: "#EAF2FC",
          elevated: "#FFFFFF",
          glass: "rgba(255, 255, 255, 0.82)",
        },

        /**
         * Text / Dark Surface
         * 포트폴리오 전체의 기준 텍스트 컬러.
         * navy는 CTA, AI 영역, 강조 배경에 사용.
         */
        navy: {
          DEFAULT: "#07111F",
          soft: "#0F1E33",
          subtle: "#172A46",
          muted: "#223656",
        },

        ink: {
          DEFAULT: "#334155",
          muted: "#64748B",
          faint: "#94A3B8",
          disabled: "#CBD5E1",
        },

        /**
         * Border
         * 카드/배지/구분선에 사용.
         */
        line: {
          DEFAULT: "#DDE7F3",
          soft: "rgba(221, 231, 243, 0.72)",
          muted: "#E6EEF8",
          dark: "rgba(255, 255, 255, 0.14)",
        },

        /**
         * Brand
         * 주요 CTA, 링크, eyebrow, active 상태.
         * 기존 #2563EB는 유지하되 보조색을 더 부드럽게 정리.
         */
        brand: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          active: "#1E40AF",
          soft: "#DBEAFE",
          pale: "#EFF6FF",
          ring: "rgba(37, 99, 235, 0.18)",
        },

        /**
         * Accent
         * AI, Sparkles, 보조 강조, 특별한 badge에만 사용.
         * brand와 경쟁하지 않도록 pale/soft 단계 확보.
         */
        accent: {
          DEFAULT: "#8B5CF6",
          hover: "#7C3AED",
          soft: "#EDE9FE",
          pale: "#F5F3FF",
          ring: "rgba(139, 92, 246, 0.18)",
        },

        /**
         * Semantic
         * 프로젝트 상태, 검증 결과, 경고성 안내에 사용.
         */
        success: {
          DEFAULT: "#16A34A",
          soft: "#DCFCE7",
          pale: "#F0FDF4",
        },

        warning: {
          DEFAULT: "#D97706",
          soft: "#FEF3C7",
          pale: "#FFFBEB",
        },

        danger: {
          DEFAULT: "#DC2626",
          soft: "#FEE2E2",
          pale: "#FEF2F2",
        },
      },

      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.045)",
        soft: "0 8px 28px rgba(15, 23, 42, 0.055)",
        brand: "0 8px 20px rgba(37, 99, 235, 0.22)",
        glow: "0 0 0 1px rgba(221, 231, 243, 0.72), 0 18px 50px rgba(15, 23, 42, 0.06)",
        accent: "0 12px 32px rgba(139, 92, 246, 0.16)",
      },

      fontFamily: {
        sans: ["var(--font-pretendard)", "Inter", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-pretendard)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },

      fontSize: {
        label: [
          "0.6875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0.18em",
            fontWeight: "700",
          },
        ],
      },

      spacing: {
        "section-y": "8rem",
      },

      borderRadius: {
        card: "1.5rem",
        panel: "1.25rem",
        pill: "999px",
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