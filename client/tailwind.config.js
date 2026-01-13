/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E1E1E", // Deep Dark Grey
        secondary: "#2E2E2E", // Lighter grey for cards
        accent: "#FD6F00", // Vibrant Orange
        textMain: "#FFFFFF",
        textSecondary: "#BDBDBD",
      },
    },
  },
  plugins: [],
}
