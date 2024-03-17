/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: { base: '#836FFF' },
      textColor: { base: '#836FFF' },
      borderColor: { edu: '#836FFF' },
    },
    plugins: [],
  },
};
