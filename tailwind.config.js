/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s ease-out infinite',
      },
      backgroundColor: {
        "bgNav" : "#0B6477",
        "bgBody" : "#213A57",
        "bgSpace" : "#80ED99",
        "bgCard" : "#0AD1C8",
        "bgTaske" : "#14919B",
        "bgTaskes" : "#45DFB1",
      },
      colors: {
        "bgText" : "#0B6477",
        "darkblue" : "#213A57",
        "bgRemove": "#213A57"
      },
      screens: {
        'phone': { max: '767px' },
        'tall': { 'raw': '(max-height: 900px)' },
      }
    },
  },
  plugins: [],
};
