// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef7fd',
          100: '#d9eefb',
          200: '#b9def7',
          300: '#8cc7f1',
          400: '#5aa8e8',
          500: '#2f8fdc',
          600: '#216fb4',
          700: '#1d5a90',
          800: '#1c4b74',
          900: '#1a3f61',
          DEFAULT: '#2f8fdc',
        },
        secondary: { DEFAULT: '#216fb4' },
        accent: { DEFAULT: '#94c4f7' },
        brandWarm: {
          primary: '#E96443',
          secondary: '#904E95',
          accent: '#F5C98B',
        },
        gray: { 750: '#23272f' },
      },
      // === 關鍵修正：使用系統字體堆疊 ===
      fontFamily: {
        // 1. 內文 (Sans): 優先用蘋果黑體、微軟正黑
        sans: [
          '"Hiragino Sans"', 
          '"PingFang TC"', 
          '"Microsoft JhengHei"', 
          '"Noto Sans TC"', 
          'sans-serif',
          ...fontFamily.sans
        ],
        
        // 2. 標題 (Serif - Japandi): 優先用 Mac 冬青明朝、Win 游明朝
        serif: [
          '"Hiragino Mincho ProN"', // Mac 日系高質感宋體
          '"Yu Mincho"',            // Win 內建日系宋體
          '"YuMincho"', 
          '"Times New Roman"', 
          'serif',
          ...fontFamily.serif
        ],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #FCA17D, #F5CBA7)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      keyframes: {
        floatUp: {
          '0%':   { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-150%) scale(0.4)', opacity: '0' },
        },
      },
      animation: {
        'bubble-slow': 'floatUp 12s linear infinite',
        'bubble-medium': 'floatUp 10s linear infinite',
        'bubble-fast': 'floatUp 8s linear infinite',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
};