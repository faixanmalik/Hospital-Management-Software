/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        baseColor: '#00c0ab',
        hoverBaseColor: '#02ab98',
        cardColor: '#ffffff',
        bgColor: '#ececec',
        textColor: '#575656',
        textHover: '#f4f4f4',
        deleteColor: '#bd0016',
        hoverDeleteColor: '#ab0215',
        tableHoverColor: '#fafafafa'
      },
    },
    
  },
  plugins: [],
});
