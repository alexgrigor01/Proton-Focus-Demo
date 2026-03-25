/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pm-bg': '#17141c',
        'pm-bg-dark': '#0d0d12',
        'pm-bg-hover': '#25212c',
        'pm-bg-elevated': '#1e1c26',
        'pm-border': '#343140',
        'pm-purple': '#7c5dff',
        'pm-purple-light': '#8a6eff',
        'pm-purple-muted': 'rgba(115,73,255,0.4)',
        'pm-purple-half': 'rgba(124,93,255,0.5)',
        'pm-text-muted': '#A7A4B5',
        'pm-text-dim': '#A7A4B5',
        'pm-pill': '#403b4c',
        'pm-input': '#292733',
        'pm-sale': '#ff4d81',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
