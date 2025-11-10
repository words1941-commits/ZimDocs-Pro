/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00c2d6',
        secondary: '#0ea5a0',
        glass: 'rgba(255,255,255,0.06)',
      },
      boxShadow: {
        'neon': '0 4px 30px rgba(0,194,214,0.3)',
      },
      backdropBlur: {
        '2xl': '30px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
}
