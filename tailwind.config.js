/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: { base: '#836FFF' },
      textColor: { base: '#836FFF' },
      borderColor: { edu: '#836FFF' },
      colors: {
        customPurple: 'rgb(131, 111, 225)',
        'custom-purple': 'rgb(131, 111, 225)',
      },
    },
    plugins: [],
  },
};
