/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1E40AF',
          700: '#1E3A8A',
          800: '#1E3A8A',
          900: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#FB923C',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Editorial-scholarly homepage palette — additive, doesn't replace primary/secondary.
        // Cream: parchment paper background tones.
        cream: {
          50: '#FCFAF4',
          100: '#FBF7EE',
          200: '#F5EFDF',
          300: '#E8DFCB',
        },
        // Ink: warm deep type colors. Replaces gray-900/700/600/500 on the homepage.
        ink: {
          500: '#5A5345',
          600: '#3A352B',
          700: '#2E2A22',
          900: '#1A1814',
        },
        // Terracotta: primary accent — CTAs, single-token underlines, "wrong" indicator strikes.
        terracotta: {
          50: '#FCEFEA',
          400: '#C2553F',
          500: '#A8472F',
        },
        // Sage: secondary accent — "correct" indicator on Section 3 right panels.
        sage: {
          50: '#EFF2EB',
          300: '#A8B79B',
          500: '#7A9A75',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'var(--font-inter)', 'serif'],
      },
    },
  },
  plugins: [],
};