/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
      gridTemplateColumns: {
        'gallery': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      backgroundImage: {
        'stripe-pattern': 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 2px, transparent 2px, transparent 8px)',
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      rotate: {
        '12': '12deg',
        '45': '45deg',
      },
      spacing: {
        '1/3': '33.333333%',
        '1/4': '25%',
      },
      writing: {
        'vertical': 'vertical-rl'
      },
      textShadow: {
        'glow': '0 0 8px rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
}