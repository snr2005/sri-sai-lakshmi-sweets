/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cream: 'var(--color-cream)',
        'cream-dark': 'var(--color-cream-dark)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'gold-pale': 'var(--color-gold-pale)',
        'brown-deep': 'var(--color-brown-deep)',
        'brown-mid': 'var(--color-brown-mid)',
        'brown-light': 'var(--color-brown-light)',
        saffron: 'var(--color-saffron)',
        'saffron-pale': 'var(--color-saffron-pale)',
        'beige-card': 'var(--color-beige-card)',
        'choco-footer': 'var(--color-choco-footer)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        accent: 'var(--font-accent)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
        gold: 'var(--shadow-gold)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      animation: {
        'float-gold': 'floatGold 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        floatGold: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: 0.2 },
          '50%': { transform: 'translateY(-20px) scale(1.2)', opacity: 0.8 },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(45, 122, 58, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(45, 122, 58, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(45, 122, 58, 0)' },
        }
      }
    },
  },
  plugins: [],
}
