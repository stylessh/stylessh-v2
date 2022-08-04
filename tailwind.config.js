/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Roboto Mono", "sans-serif"],
    },

    extend: {},
  },
  plugins: [],
};
