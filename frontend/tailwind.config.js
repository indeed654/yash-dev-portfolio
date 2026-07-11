/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#f8fafc',
        cyan: '#06b6d4',
        violet: '#7c3aed',
        lime: '#84cc16',
      },
      boxShadow: {
        glow: '0 24px 90px rgba(14, 165, 233, 0.22)',
        glass: '0 18px 60px rgba(15, 23, 42, 0.12)',
      },
      fontSize: {
        hero: 'clamp(2.75rem, 8vw, 7.2rem)',
      },
      keyframes: {
        grid: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(48px)' },
        },
      },
      animation: {
        grid: 'grid 14s linear infinite',
      },
    },
  },
  plugins: [],
}
