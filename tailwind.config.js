/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: '#FF6B35',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          warm: '#FFF7ED',
          'warm-dark': '#FEF3C7',
        },
        severity: {
          mild: '#10B981',
          'mild-bg': '#D1FAE5',
          moderate: '#F59E0B',
          'moderate-bg': '#FEF3C7',
          strong: '#F97316',
          'strong-bg': '#FFEDD5',
          extreme: '#EF4444',
          'extreme-bg': '#FEE2E2',
        },
        medium: {
          tv: '#3B82F6',
          'tv-bg': '#DBEAFE',
          film: '#8B5CF6',
          'film-bg': '#EDE9FE',
          book: '#D97706',
          'book-bg': '#FEF3C7',
          comic: '#EC4899',
          'comic-bg': '#FCE7F3',
          game: '#059669',
          'game-bg': '#D1FAE5',
          animation: '#EA580C',
          'animation-bg': '#FFEDD5',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'wiggle': 'wiggle 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
};
