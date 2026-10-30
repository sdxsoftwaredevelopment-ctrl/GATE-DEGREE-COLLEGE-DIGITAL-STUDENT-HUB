/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d8efff',
          200: '#b8e4ff',
          300: '#7dd1ff',
          400: '#41b8ff',
          500: '#1a9ae8',
          600: '#1177b9',
          700: '#165f94',
          800: '#1b4e78',
          900: '#1b4464',
        },
      },
      boxShadow: {
        soft: '0 18px 38px rgba(12, 37, 63, 0.12)',
      },
    },
  },
  plugins: [],
};
