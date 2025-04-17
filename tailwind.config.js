/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#22B8CF",
          dark: "#0E7C94",
        },
        accent: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
        },
        highlight: "#FCD34D",
        surface: "#F9FAFB",
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans TC"', "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 4px 10px rgba(0,0,0,0.05)",
        "card-hover": "0 6px 16px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
