/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hp-primair': '#FF385C',
        'hp-secundair': '#25315A',
        'hp-tertiar': '#4C6EF5',
        'hp-text': '#444444',
        'hp-border': '#e9ecf1',
        'hp-button-text': '#475a6b',
        'hp-bg-primair': '#FFEBEE',
      },
    },
  },
  plugins: [],
}
