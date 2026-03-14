/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          DEFAULT: '#ec4899',
          500: '#ec4899',
          600: '#db2777',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          500: '#8b5cf6',
        }
      },
    },
  },
  plugins: [],
}
