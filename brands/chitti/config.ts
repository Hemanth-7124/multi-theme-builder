import type { BrandConfig } from '../../tokens/types'

export default {
  id: 'chitti',
  name: 'Chitti',
  description: 'Modern AI-powered platform for intelligent automation',
  logo: '/brands/chitti/assets/logo.svg',
  favicon: '/brands/chitti/assets/favicon.ico',

  theme: {
    layout: 'modern',
    assets: {
      logo: '/brands/chitti/assets/logo.svg',
      favicon: '/brands/chitti/assets/favicon.ico',
      hero: '/brands/chitti/assets/hero.webp'
    },
    tokens: {
      colors: {
      // Navy Blue Flow theme

'color-primary': '#0a1a4f',          // Deep Navy
'color-primary-hover': '#102764',    // Slightly brighter navy
'color-primary-active': '#19357a',   // More active state

'color-secondary': '#1e3a8a',        // Royal Navy
'color-secondary-hover': '#2749a0',

'color-accent': '#3a7bd5',           // Modern accent blue
'color-accent-hover': '#2e6ac1',

'color-background': '#f7f9fc',       // Very light bluish white
'color-surface': '#eff3f9',
'color-surface-hover': '#e2e8f0',
'color-surface-active': '#cbd5e1',

'color-text-primary': '#0c1b30',     // Navy text
'color-text-secondary': '#3b4a61',
'color-text-muted': '#98a3b5',
'color-text-inverse': '#ffffff',

'color-border': '#d1d7e2',
'color-border-hover': '#b9c2d3',

'color-error': '#ef4444',
'color-warning': '#f59e0b',
'color-success': '#10b981',
'color-info': '#2563eb'

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
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ],
  cta: {
    primary: 'Start Free Trial',
    secondary: 'View Demo'
  }
} as BrandConfig