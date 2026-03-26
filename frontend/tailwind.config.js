/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Scan all source files for Tailwind utility classes
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Custom UI color palette
        primary: "#1F2937",
        blueBorder: "#3B82F6",
        pageGray: "#F3F4F6",
      },
      fontFamily: {
        // Primary brand typeface
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
