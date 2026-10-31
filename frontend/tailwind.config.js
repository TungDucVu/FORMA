/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#090D0B',
          card: '#121814',
          cardHover: '#162019',
          border: 'rgba(34, 197, 94, 0.15)',
          green: '#22C55E',
          greenDark: '#16A34A',
          greenMuted: 'rgba(34, 197, 94, 0.15)',
        }
      },
      boxShadow: {
        'glow-green': '0 0 25px -4px rgba(34, 197, 94, 0.35)',
      }
    },
  },
  plugins: [],
};
