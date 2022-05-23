const colors = require("tailwindcss/colors");

module.exports = {
  moide: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
        gray: colors.blueGray,
      },
      transitionProperty: {
        'width': 'width'
      }
    },
  },
  plugins: [],
};
