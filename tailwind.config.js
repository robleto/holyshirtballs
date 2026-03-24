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
          coral:     '#F55D35',   // Refined: deeper, more editorial coral (was #FF6B35 — too orange-crayola)
          'coral-hover': '#D94A22', // Hover state for primary coral
          'coral-light': '#FEF0EB', // Tinted surface: warm coral wash
          'coral-mid':   '#FDDDD3', // Slightly richer coral tint for borders/accents
          purple:    '#6D28D9',   // Kept violet-purple (slightly deeper than before)
          cyan:      '#06B6D4',   // Retained
          // Surface layers — warm paper tone, not pure white
          parchment:  '#FFFCF9',  // Page body background (warm near-white)
          cream:      '#FFF8F4',  // Hero / section warmth
          'warm-50':  '#FFF4EE',  // Lightest warm tint — card hover surface
          warm:       '#FEF0E7',  // Standard warm tint
          'warm-100': '#FDE8D8',  // Stronger warm tint — borders, dividers
        },
        severity: {
          mild:         '#059669', // Slightly deeper for contrast on warm bg
          'mild-bg':    '#ECFDF5',
          'mild-border':'#A7F3D0',
          moderate:     '#D97706',
          'moderate-bg':'#FFFBEB',
          'moderate-border': '#FCD34D',
          strong:       '#EA580C',
          'strong-bg':  '#FFF7ED',
          'strong-border': '#FDBA74',
          extreme:      '#DC2626',
          'extreme-bg': '#FEF2F2',
          'extreme-border': '#FCA5A5',
        },
        medium: {
          tv:              '#2563EB',
          'tv-bg':         '#EFF6FF',
          'tv-border':     '#BFDBFE',
          film:            '#7C3AED',
          'film-bg':       '#F5F3FF',
          'film-border':   '#DDD6FE',
          book:            '#B45309',
          'book-bg':       '#FFFBEB',
          'book-border':   '#FDE68A',
          comic:           '#DB2777',
          'comic-bg':      '#FDF2F8',
          'comic-border':  '#FBCFE8',
          game:            '#047857',
          'game-bg':       '#ECFDF5',
          'game-border':   '#A7F3D0',
          animation:       '#C2410C',
          'animation-bg':  '#FFF7ED',
          'animation-border': '#FDBA74',
        },
        // Neutral scale anchored to warm rather than cool gray
        ink: {
          900: '#1A1210',  // Near-black with warmth — replaces gray-900
          800: '#2D2420',  // Body text
          700: '#4A3F3A',  // Secondary text (replaces gray-700)
          600: '#6B5E58',  // Muted text (replaces gray-600)
          500: '#8C807A',  // Placeholder / caption
          400: '#B0A49E',  // Disabled / decorative
          300: '#D4CCC8',  // Dividers
          200: '#E8E2DE',  // Subtle borders
          100: '#F2EDEA',  // Surface variant
          50:  '#FAF7F5',  // Whisper background
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Display scale — slightly more compressed tracking on large sizes
        'display-xl': ['5rem',    { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['3rem',    { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        // Label — tighter uppercase labels
        'label-xs': ['0.625rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '700' }],
        'label-sm': ['0.75rem',  { lineHeight: '1', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderRadius: {
        // Unified radius scale — everything 'card' or above uses xl/2xl
        DEFAULT: '0.5rem',   // 8px — buttons, inputs, small elements
        lg:      '0.75rem',  // 12px
        xl:      '1rem',     // 16px
        '2xl':   '1.25rem',  // 20px — cards, panels
        '3xl':   '1.5rem',   // 24px — hero pills, CTA blocks
        full:    '9999px',   // badges
      },
      boxShadow: {
        // Named shadows — warm-tinted, not cool gray
        'card':      '0 1px 3px rgba(26, 18, 16, 0.06), 0 1px 2px rgba(26, 18, 16, 0.04)',
        'card-hover':'0 8px 24px rgba(26, 18, 16, 0.10), 0 2px 6px rgba(26, 18, 16, 0.06)',
        'card-featured': '0 0 0 2px rgba(245, 93, 53, 0.18), 0 4px 16px rgba(245, 93, 53, 0.08)',
        'inset-sm':  'inset 0 1px 2px rgba(26, 18, 16, 0.05)',
        'filter':    '0 1px 4px rgba(26, 18, 16, 0.06)',
      },
      animation: {
        'fade-in':  'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'wiggle':   'wiggle 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%':      { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
};
