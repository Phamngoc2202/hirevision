/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2563eb',
        'primary-purple': '#7c3aed',
        'background-dark': '#0f172a',
        'card-dark': '#111827',
        'text-white': '#f8fafc',
        'secondary-text': '#94a3b8',
        'accent-glow': '#60a5fa',
      },
      fontFamily: {
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(96, 165, 250, 0.22), 0 24px 80px rgba(37, 99, 235, 0.24)',
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.24), transparent 42%), radial-gradient(circle at top right, rgba(124, 58, 237, 0.22), transparent 36%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(18px, -30px, 0) scale(1.06)' },
          '66%': { transform: 'translate3d(-16px, 14px, 0) scale(0.96)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 15s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
