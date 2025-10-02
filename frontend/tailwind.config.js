/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Scan all JavaScript/JSX files inside the 'src' directory and its subdirectories
    "./src/**/*.{js,jsx,ts,tsx}",

    // Specifically include the pages and components directories
    // (This is redundant if the above line is included, but serves as a clear confirmation)
    "./src/pages/**/*.{js,jsx}", 
    "./src/components/**/*.{js,jsx}", 

    // Include the main application file
    "./src/App.js",

    // If your main HTML file is outside of src, include it as well (typical for create-react-app or similar setups)
    // "./public/index.html", 
  ],
  theme: {
    extend: {
      colors: {
        // CRITICAL: Custom colors for the UI elements
        primary: "#1F2937", // The black color for the Analyse button
        blueBorder: "#3B82F6",
        pageGray: "#F3F4F6",
      },
      fontFamily: {
        // Custom font definition
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}