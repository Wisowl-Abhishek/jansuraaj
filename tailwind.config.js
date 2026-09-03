/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        /* WisOwl brand palette — mirrors @theme block in src/index.css */
        "brand-indigo":   "#1800ad", /* Primary — backgrounds, bars, panels  */
        "brand-violet":   "#2a10c7", /* Hover states, gradient endpoints       */
        "brand-slate":    "#1400a0", /* Muted — pattern overlays, grid lines   */
        "brand-navy":     "#0d1136", /* Dark bg — cinematic backgrounds        */
        "brand-midnight": "#03051a", /* Ultra-dark — with vignette             */
        "brand-gold":     "#ffde59", /* Accent 1 — CTA highlights, arrows      */
        "brand-amber":    "#febd59", /* Accent 2 — badges, starburst, stars    */
      },
      keyframes: {
        'bounce-interval': {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.2, 0, 0.8, 1)' },
          '50%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0, 0, 1, 1)' },
        },
      },
      animation: {
        'bounce-interval': 'bounce-interval 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
