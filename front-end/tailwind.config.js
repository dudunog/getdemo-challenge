/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        standard: "#646cff",
      },
      gray: {
        500: "#f3f4f6",
        600: "#e5e7eb",
      }
    },
  },
  plugins: [],
}

