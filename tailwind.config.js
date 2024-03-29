/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["IBM Plex Mono", "sans-serif"],
    },

    extend: {},
  },

  whitelist: ["hover:-translate-y-1"],

  plugins: [],
};
