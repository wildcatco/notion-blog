/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGray: {
          light: '#2e3039',
          base: '#eeeeee',
          dark: '#1f2028',
        },
      },
    },
  },
  darkMode: 'class',
};
