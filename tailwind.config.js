/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#6366f1',
          dark: '#a855f7',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        panel: '#171717',
      },
      fontFamily: {
        brak: ['Brakle', 'system-ui', 'sans-serif'],
        sans: ['Onest', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        brutal: '6px 6px 0px 0px rgba(99,102,241,0.3)',
        'brutal-white': '6px 6px 0px 0px rgba(255,255,255,0.15)',
        'brutal-indigo': '4px 4px 0px 0px rgba(99,102,241,0.4)',
        'brutal-black': '6px 6px 0px 0px rgba(0,0,0,1)',
        'brutal-indigo-solid': '6px 6px 0px 0px rgba(79,70,229,1)',
        'brutal-green': '6px 6px 0px 0px rgba(22,101,52,0.4)',
        'brutal-pink': '6px 6px 0px 0px rgba(190,24,93,0.4)',
      },
      animation: {
        wave: 'wave 2.5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
