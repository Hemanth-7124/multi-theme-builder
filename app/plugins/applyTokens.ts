import { tokenEngine } from '../../tokens/engine'
import type { FlattenedTokens } from '../../tokens/types'

/**
 * Client-side function to apply tokens immediately
 */
export function applyTokens(tokens: FlattenedTokens, brandId: string = ''): void {
  if (process.client) {
    tokenEngine.applyTokens(tokens, brandId)
  }
}

/**
 * Generate CSS variables string for SSR
 */
export function generateCSSVariables(tokens: FlattenedTokens): string {
  return tokenEngine.generateCSS(tokens)
}

/**
 * Apply brand-specific theme with fallback to defaults
 */
export function applyBrandTheme(
  brandTokens: Partial<FlattenedTokens>,
  brandId: string
): void {
  const mergedTokens = tokenEngine.mergeWithDefaults(brandTokens)
  applyTokens(mergedTokens, brandId)
}

/**
 * Apply brand theme from BrandTheme structure
 */
export function applyBrandThemeFromConfig(
  brandTheme: any,
  brandId: string
): void {
  if (process.client && brandTheme?.tokens) {
    tokenEngine.applyTokens(brandTheme, brandId)
  }
}

/**
 * Get computed CSS variable value
 */
export function getCSSVariable(variableName: string, element: HTMLElement = document.documentElement): string {
  return getComputedStyle(element).getPropertyValue(variableName).trim()
}

/**
 * Check if tokens are already applied
 */
export function areTokensApplied(brandId: string): boolean {
  return tokenEngine.getCurrentBrand() === brandId
}

export default defineNuxtPlugin(() => {
  // Plugin initialization if needed
  return {
    provide: {
      tokenUtils: {
        applyTokens,
        generateCSSVariables,
        applyBrandTheme,
        applyBrandThemeFromConfig,
        getCSSVariable,
        areTokensApplied
      }
    }
  }
})