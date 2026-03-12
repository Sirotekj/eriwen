import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,css}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        georgia: ['var(--font-georgia)'],
        cinzel: ['var(--font-cinzel)'],
        greatVibes: ['var(--font-great-vibes)'],
      },
    },
  },
  plugins: [],
};
export default config;
