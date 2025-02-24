import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // Ya cubre todas las carpetas necesarias
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
