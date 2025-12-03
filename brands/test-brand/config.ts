import type { BrandConfig } from '../../tokens/types'

export default {
  id: 'test-brand',
  name: 'Test Brand',
  description: 'A test brand to verify automatic brand discovery',
  logo: '/brands/test-brand/assets/logo.svg',
  favicon: '/brands/test-brand/assets/favicon.ico',

  theme: {
    layout: 'modern',
    assets: {
      logo: '/brands/test-brand/assets/logo.svg',
      favicon: '/brands/test-brand/assets/favicon.ico',
      hero: '/brands/test-brand/assets/hero.webp'
    },
    tokens: {
      colors: {
        // Purple theme for testing
        'color-primary': '#8b5cf6',
        'color-primary-hover': '#7c3aed',
        'color-primary-active': '#6d28d9',
        'color-secondary': '#6b7280',
        'color-secondary-hover': '#4b5563',
        'color-accent': '#ec4899',
        'color-accent-hover': '#db2777',
        'color-background': '#ffffff',
        'color-surface': '#faf5ff',
        'color-surface-hover': '#f3e8ff',
        'color-surface-active': '#e9d5ff',
        'color-text-primary': '#1f2937',
        'color-text-secondary': '#4b5563',
        'color-text-muted': '#9ca3af',
        'color-text-inverse': '#ffffff',
        'color-border': '#e5e7eb',
        'color-border-hover': '#d1d5db',
        'color-error': '#ef4444',
        'color-warning': '#f59e0b',
        'color-success': '#10b981',
        'color-info': '#3b82f6'
      },
      typography: {
        'font-family-sans': 'Inter, system-ui, sans-serif',
        'font-family-serif': 'Georgia, serif',
        'font-family-mono': 'JetBrains Mono, Consolas, monospace',
        'font-size-xs': '0.75rem',
        'font-size-sm': '0.875rem',
        'font-size-base': '1rem',
        'font-size-lg': '1.125rem',
        'font-size-xl': '1.25rem',
        'font-size-2xl': '1.5rem',
        'font-size-3xl': '1.875rem',
        'font-size-4xl': '2.25rem',
        'font-size-5xl': '3rem',
        'font-size-6xl': '3.75rem',
        'font-size-7xl': '4.5rem',
        'font-size-8xl': '6rem',
        'font-weight-light': '300',
        'font-weight-normal': '400',
        'font-weight-medium': '500',
        'font-weight-semibold': '600',
        'font-weight-bold': '700',
        'font-weight-extrabold': '800',
        'line-height-tight': '1.25',
        'line-height-normal': '1.5',
        'line-height-relaxed': '1.75',
        'letter-spacing-tight': '-0.025em',
        'letter-spacing-normal': '0',
        'letter-spacing-wide': '0.025em'
      },
      spacing: {
        'spacing-0': '0',
        'spacing-1': '0.25rem',
        'spacing-2': '0.5rem',
        'spacing-3': '0.75rem',
        'spacing-4': '1rem',
        'spacing-5': '1.25rem',
        'spacing-6': '1.5rem',
        'spacing-7': '1.75rem',
        'spacing-8': '2rem',
        'spacing-9': '2.25rem',
        'spacing-10': '2.5rem',
        'spacing-11': '2.75rem',
        'spacing-12': '3rem',
        'spacing-14': '3.5rem',
        'spacing-16': '4rem',
        'spacing-20': '5rem',
        'spacing-24': '6rem',
        'spacing-28': '7rem',
        'spacing-32': '8rem',
        'spacing-36': '9rem',
        'spacing-40': '10rem',
        'spacing-44': '11rem',
        'spacing-48': '12rem',
        'spacing-52': '13rem',
        'spacing-56': '14rem',
        'spacing-60': '15rem',
        'spacing-64': '16rem',
        'spacing-72': '18rem',
        'spacing-80': '20rem',
        'spacing-96': '24rem'
      },
      borderRadius: {
        'radius-none': '0',
        'radius-xs': '0.125rem',
        'radius-sm': '0.25rem',
        'radius-md': '0.375rem',
        'radius-lg': '0.5rem',
        'radius-xl': '0.75rem',
        'radius-2xl': '1rem',
        'radius-3xl': '1.5rem',
        'radius-full': '9999px'
      },
      shadows: {
        'shadow-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'shadow-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'shadow-none': 'none'
      }
    }
  },
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' }
  ],
  cta: {
    primary: 'Get Started',
    secondary: 'Learn More'
  }
} as BrandConfig