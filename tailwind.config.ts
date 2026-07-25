import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        label: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.2em', fontWeight: '500' }],
        hero: ['clamp(2.5rem, 10vw, 5.625rem)', { lineHeight: '1.1', letterSpacing: '0.08em' }],
        headline: ['clamp(2rem, 8vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '0.05em' }],
        section: ['clamp(1.75rem, 6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '0.05em' }],
        title: ['clamp(1.25rem, 4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '0.03em' }],
        'body-lg': ['clamp(1.25rem, 2.5vw, 1.625rem)', { lineHeight: '1.6' }],
        body: ['clamp(1.125rem, 2vw, 1.375rem)', { lineHeight: '1.6' }],
        caption: ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.2em' }],
      },
      spacing: {
        'section-sm': '4rem',
        'section-md': '7rem',
        'section-lg': '10rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'curtain-reveal': {
          from: { clipPath: 'inset(100% 0 0 0)' },
          to: { clipPath: 'inset(0 0 0 0)' },
        },
        'luxury-fade-up': {
          from: { opacity: '0', transform: 'translateY(60px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-settle': {
          from: { transform: 'scale(1.15)' },
          to: { transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        curtain: 'curtain-reveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'luxury-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-settle': 'scale-settle 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
