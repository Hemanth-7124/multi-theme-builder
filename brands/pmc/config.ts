import type { BrandConfig } from '../../tokens/types'

export default {
  id: 'pmc',
  name: 'PMC',
  description: 'Enterprise project management and collaboration suite',
  logo: '/brands/pmc/assets/logo.svg',
  favicon: '/brands/pmc/assets/favicon.ico',
  theme: {
    layout: 'modern',
    assets: {
      logo: '/brands/pmc/assets/logo.svg',
      favicon: '/brands/pmc/assets/favicon.ico',
      hero: '/brands/pmc/assets/hero.webp'
    },
    tokens: {
      colors: {
        // Enterprise purple theme
        'color-primary': '#7c3aed',
        'color-primary-hover': '#6d28d9',
        'color-primary-active': '#5b21b6',
        'color-secondary': '#64748b',
        'color-secondary-hover': '#475569',
        'color-accent': '#ec4899',
        'color-accent-hover': '#db2777',
        'color-background': '#ffffff',
        'color-surface': '#f1f5f9',
        'color-surface-hover': '#e2e8f0',
        'color-surface-active': '#cbd5e1',
        'color-text-primary': '#0f172a',
        'color-text-secondary': '#475569',
        'color-text-muted': '#94a3b8',
        'color-text-inverse': '#ffffff',
        'color-border': '#e2e8f0',
        'color-border-hover': '#cbd5e1',
        'color-error': '#dc2626',
        'color-warning': '#d97706',
        'color-success': '#059669',
        'color-info': '#7c3aed'
      },
      typography: {
       // Navy Modern Typography

'font-family-sans': 'Poppins, system-ui, sans-serif',        // Clean & geometric
'font-family-serif': 'Merriweather, serif',                  // Elegant balance
'font-family-mono': 'Fira Code, monospace',                  // Better coding fonts

// New sizes (slightly larger heading scale)
'font-size-xs': '0.75rem',   // 12px
'font-size-sm': '0.875rem',  // 14px
'font-size-base': '1rem',    // 16px (body)
'font-size-lg': '1.125rem',  // 18px
'font-size-xl': '1.375rem',  // 22px
'font-size-2xl': '1.75rem',  // 28px
'font-size-3xl': '2.125rem', // 34px
'font-size-4xl': '2.75rem',  // 44px
'font-size-5xl': '3.5rem',   // 56px
'font-size-6xl': '4.5rem',   // 72px
'font-size-7xl': '5.5rem',   // 88px

// Font weights with better UI defaults
'font-weight-light': '300',
'font-weight-normal': '400',
'font-weight-medium': '500',
'font-weight-semibold': '600',
'font-weight-bold': '700',
'font-weight-extrabold': '800',

// Improved readability
'line-height-tight': '1.15',
'line-height-normal': '1.45',
'line-height-relaxed': '1.65',

// Cleaner letter spacing
'letter-spacing-tight': '-0.015em',
'letter-spacing-normal': '0em',
'letter-spacing-wide': '0.035em'

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
        'shadow-xs': '0 1px 2px 0 rgba(124, 58, 237, 0.05)',
        'shadow-sm': '0 1px 3px 0 rgba(124, 58, 237, 0.1), 0 1px 2px 0 rgba(124, 58, 237, 0.06)',
        'shadow-md': '0 4px 6px -1px rgba(124, 58, 237, 0.1), 0 2px 4px -1px rgba(124, 58, 237, 0.06)',
        'shadow-lg': '0 10px 15px -3px rgba(124, 58, 237, 0.1), 0 4px 6px -2px rgba(124, 58, 237, 0.05)',
        'shadow-xl': '0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)',
        'shadow-2xl': '0 25px 50px -12px rgba(124, 58, 237, 0.25)',
        'shadow-inner': 'inset 0 2px 4px 0 rgba(124, 58, 237, 0.06)',
        'shadow-none': 'none'
      }
    }
  },
  navigation: [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Enterprise', href: '#enterprise' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' }
  ],
  cta: {
    primary: 'Request Demo',
    secondary: 'Contact Sales'
  }
} as BrandConfig