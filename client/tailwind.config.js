/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0c", // Near black
        secondary: "#16161a", // Deep grey-blue
        accent: "#7c3aed", // Vibrant Purple (Neon feel)
        neonCyan: "#06b6d4",
        textMain: "#f8fafc",
        textSecondary: "#94a3b8",
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
      },
    },
  },
  plugins: [],
}
