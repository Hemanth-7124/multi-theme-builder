import { tokenEngine } from '../../tokens/engine'
import type { BrandTheme } from '../../tokens/types'

export const useTokens = () => {
  /**
   * Apply brand theme tokens to the document
   */
  const applyBrandTheme = (brandTheme: BrandTheme, brandId?: string) => {
    if (process.client) {
      tokenEngine.applyTokens(brandTheme, brandId)
    }
  }

  /**
   * Get current applied tokens
   */
  const getCurrentTokens = () => {
    return tokenEngine.getCurrentTokens()
  }

  /**
   * Get specific token value
   */
  const getToken = (tokenName: string) => {
    return tokenEngine.getToken(tokenName as any)
  }

  /**
   * Generate CSS variables string for a token category
   */
  const getTokenCategoryCSS = (category: keyof BrandTheme['tokens']) => {
    return tokenEngine.getTokenCategoryCSS(category)
  }

  /**
   * Generate all CSS variables string
   */
  const generateCSS = () => {
    const currentTokens = tokenEngine.getCurrentTokens()
    return tokenEngine.generateCSS(currentTokens)
  }

  /**
   * Apply component-specific tokens
   */
  const applyComponentTokens = (componentName: string, tokens: Record<string, string>) => {
    if (process.client) {
      tokenEngine.applyComponentTokens(componentName, tokens)
    }
  }

  /**
   * Reset to default tokens
   */
  const resetTokens = () => {
    if (process.client) {
      tokenEngine.resetTokens()
    }
  }

  /**
   * Get current brand
   */
  const getCurrentBrand = () => {
    return tokenEngine.getCurrentBrand()
  }

  return {
    applyBrandTheme,
    getCurrentTokens,
    getToken,
    getTokenCategoryCSS,
    generateCSS,
    applyComponentTokens,
    resetTokens,
    getCurrentBrand
  }
}