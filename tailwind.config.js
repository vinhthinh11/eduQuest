/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: { base: '#836FFF' },
      textColor: { base: '#836FFF' },
      borderColor: { edu: '#836FFF' },
      colors: {
        'text-default': 'rgb(131, 0, 0)',
        customPurple: 'rgb(131, 111, 225)',
        customPurpleLight: '#7355fd',
        'custom-purple': 'rgb(131, 111, 225)',
      },
    },
    plugins: [],
  },
};
