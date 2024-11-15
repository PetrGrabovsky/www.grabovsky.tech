import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './shared/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'body-background': '#141414',
      },
    },
  },
  plugins: [],
} satisfies Config;
