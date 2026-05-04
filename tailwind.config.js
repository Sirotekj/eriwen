//import { Metamorphous } from 'next/font/google';
//import type { Config } from 'tailwindcss';

const config = {
  content: ['./app/**/*.{ts,tsx,css}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        georgia: ['var(--font-georgia)'],
        cinzel: ['var(--font-cinzel)'],
        metamorphous: ['var(--font-metamorphous)'],
        greatVibes: ['var(--font-great-vibes)'],
      },
    },
  },
  plugins: [],
};
export default config;
