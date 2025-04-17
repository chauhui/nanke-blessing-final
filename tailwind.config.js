/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B705C',
        secondary: '#A5A58D',
        accent: '#CB997E',
        base: '#FFE8D6',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
