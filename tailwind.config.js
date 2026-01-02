/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Noto Sans Thai', 'sans-serif',],
      },
      borderRadius: {
        'box': '0.8rem'
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
      mytheme: {
        "primary": "#FF8B8B",
        "secondary": "#6272a4",
        "accent": "#bd93f9",
        "neutral": "#44475a",
        "base-100": "#282a36",
        "info": "#8be9fd",
        "success": "#50fa7b",
        "warning": "#f1fa8c",
        "error": "#ff5555",
      }, 
    }, "light"]
  },
}