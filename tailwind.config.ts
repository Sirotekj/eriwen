import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,css}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        garamond: ["var(--font-eb-garamond)"],
        cinzel: ["var(--font-cinzel)"],
        luxurious: ["var(--font-luxurious-script)"],
      },
    },
  },
  plugins: [],
};
export default config;
