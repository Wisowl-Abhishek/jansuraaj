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
        /* Jan Suraaj brand palette — mirrors @theme block in src/index.css */
        "brand-indigo":   "#1a1a1a", /* Primary — backgrounds, bars, panels  */
        "brand-violet":   "#2b2b2b", /* Hover states, gradient endpoints       */
        "brand-slate":    "#242424", /* Muted — pattern overlays, grid lines   */
        "brand-navy":     "#171717", /* Dark bg — cinematic backgrounds        */
        "brand-midnight": "#0a0a0a", /* Ultra-dark — with vignette             */
        "brand-gold":     "#fdd34e", /* Accent 1 — CTA highlights, arrows      */
        "brand-amber":    "#e8bd42", /* Accent 2 — hover states, badges, stars */
        "brand-cream":    "#fdf2d3", /* Accent 3 — light surfaces, sections    */
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
