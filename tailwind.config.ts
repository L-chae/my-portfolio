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
        // 디지털 정원 메인 모노톤 및 포인트 컬러
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8f9ff',  // slate-50 대체
          border: '#f1f5f9', // slate-100 대체
        },
        brand: {
          primary: '#2563eb', // blue-600
          accent: '#06b6d4',  // cyan-500
          blob1: '#d8b4fe',
          blob2: '#67e8f9',
          blob3: '#bfdbfe',
        }
      },
      fontFamily: {
        // 로컬/웹 폰트 변수 매핑
        sans: ['var(--font-pretendard)', 'Inter', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // 섹션 라벨 등 반복 사용되는 특수 타이포그래피 규격화
        'label': ['0.6875rem', { letterSpacing: '0.2em', fontWeight: '700' }], // 11px
      },
      spacing: {
        // 섹션 간 통일된 여백 강제
        'section-y': '8rem', // 128px
      },
      animation: {
        // Hero 섹션의 Fluid Blob 애니메이션 전역화
        'fluid-1': 'fluid-1 12s infinite ease-in-out',
        'fluid-2': 'fluid-2 15s infinite ease-in-out reverse',
        'fluid-3': 'fluid-3 14s infinite ease-in-out',
      },
      keyframes: {
        'fluid-1': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate3d(5vw, -5vh, 0) rotate(180deg) scale(1.1)' },
        },
        'fluid-2': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate3d(-5vw, 5vh, 0) rotate(-180deg) scale(1.2)' },
        },
        'fluid-3': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate3d(5vw, 5vh, 0) rotate(90deg) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;