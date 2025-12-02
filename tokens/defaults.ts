import { DesignTokens, FlattenedTokens } from './types'

// Default design tokens - serves as fallback
export const defaultTokens: DesignTokens = {
  colors: {
    'color-primary': '#3b82f6',
    'color-secondary': '#64748b',
    'color-accent': '#10b981',
    'color-background': '#ffffff',
    'color-surface': '#f8fafc',
    'color-text-primary': '#1e293b',
    'color-text-secondary': '#64748b',
    'color-text-muted': '#94a3b8',
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
  },
  borderRadius: {
    'radius-none': '0',
    'radius-sm': '0.125rem',
    'radius-md': '0.375rem',
    'radius-lg': '0.5rem',
    'radius-xl': '0.75rem',
    'radius-2xl': '1rem',
    'radius-full': '9999px',
  },
  shadows: {
    'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    'shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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