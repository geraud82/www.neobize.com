/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#0F172A', // bleu nuit
        'light': '#FFFFFF',    // blanc
        'dark-gray': '#1E293B', // gris foncé
        'primary': '#E50914',  // rouge vif
        'secondary': '#475569', // gris secondaire
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      backgroundColor: {
        'light': '#FFFFFF',
        'midnight': '#0F172A',
        'dark-gray': '#1E293B',
        'primary': '#E50914',
        'secondary': '#475569',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
  },
  plugins: [],
}
