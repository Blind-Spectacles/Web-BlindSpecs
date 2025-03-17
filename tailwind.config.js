/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121212", // Dark background
        secondary: "#1F1F1F", // Darker contrast
        accent: "#00C1D4", // Neon blue for highlights
      },
    },
  },
  plugins: [],
};
