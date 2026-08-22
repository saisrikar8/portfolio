/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'berkeley-blue': '#003262',
        surface: '#f8f8f8',
        'on-surface': '#1a1a1a',
        'on-surface-variant': '#555555',
        'outline-variant': '#e0e0e0',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
