import type { DesignTokens, FlattenedTokens } from './types'

// Default design tokens - serves as fallback
export const defaultTokens: DesignTokens = {
  colors: {
    'color-primary': '#3b82f6',
    'color-primary-hover': '#2563eb',
    'color-primary-active': '#1d4ed8',
    'color-secondary': '#64748b',
    'color-secondary-hover': '#475569',
    'color-accent': '#10b981',
    'color-accent-hover': '#059669',
    'color-background': '#ffffff',
    'color-surface': '#f8fafc',
    'color-surface-hover': '#f1f5f9',
    'color-surface-active': '#e2e8f0',
    'color-text-primary': '#1e293b',
    'color-text-secondary': '#64748b',
    'color-text-muted': '#94a3b8',
    'color-text-inverse': '#ffffff',
    'color-border': '#e2e8f0',
    'color-border-hover': '#cbd5e1',
    'color-error': '#ef4444',
    'color-warning': '#f59e0b',
    'color-success': '#10b981',
    'color-info': '#3b82f6'
  },
  typography: {
    'font-family-sans': 'Inter, system-ui, sans-serif',
    'font-family-serif': 'Georgia, serif',
    'font-family-mono': 'Consolas, monospace',
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
  },
  spacing: {
    'spacing-0': '0',
    'spacing-1': '0.25rem',
    'spacing-2': '0.5rem',
    'spacing-3': '0.75rem',
    'spacing-4': '1rem',
    'spacing-5': '1.25rem',
    'spacing-6': '1.5rem',
    'spacing-8': '2rem',
    'spacing-10': '2.5rem',
    'spacing-12': '3rem',
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
    'radius-sm': '0.125rem',
    'radius-md': '0.375rem',
    'radius-lg': '0.5rem',
    'radius-xl': '0.75rem',
    'radius-2xl': '1rem',
    'radius-3xl': '1.5rem',
    'radius-full': '9999px',
  },
  shadows: {
    'shadow-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    'shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    'shadow-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    'shadow-none': 'none',
  },
}

// Flatten tokens for CSS variable application
export function flattenTokens(tokens: DesignTokens): FlattenedTokens {
  const flattened: FlattenedTokens = {} as FlattenedTokens

  for (const [category, categoryTokens] of Object.entries(tokens)) {
    for (const [tokenName, tokenValue] of Object.entries(categoryTokens)) {
      const key = tokenName as keyof FlattenedTokens
      flattened[key] = tokenValue
    }
  }

  return flattened
}

// Default flattened tokens
export const defaultFlattenedTokens = flattenTokens(defaultTokens)