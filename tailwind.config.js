/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/(tabs)/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'main-blue': {
          '50': '#f2fafd',
          '100': '#e5f3f9',
          '200': '#c5e8f2',
          '300': '#9fdaea',
          '400': '#58bfd8',
          '500': '#32a7c5',
          '600': '#2289a7',
          '700': '#1d6d87',
          '800': '#1c5c70',
          '900': '#1c4d5e',
          '950': '#13323e',
        },
      }
    },
  },
  plugins: [],
}