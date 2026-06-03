import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 💡 이 줄이 누락되면 스타일이 적용되지 않습니다.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;