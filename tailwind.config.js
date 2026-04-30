/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#fbe7ef',
        mauve: '#c08497',
        lilac: '#e9d5ff',
      },
    },
  },
  plugins: [],
}
