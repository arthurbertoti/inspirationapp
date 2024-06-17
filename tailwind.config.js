/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/(tabs)/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#FFD700",
        background: "#F4F4F9",
        textPrimary: "#333333",
        textSecondary: "#666666",
        border: "#CCCCCC",
      },
    },
  },
  plugins: [],
}