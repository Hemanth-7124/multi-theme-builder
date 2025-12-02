import { BrandTheme, DesignTokens } from './types'
import { defaultFlattenedTokens, flattenTokens } from './defaults'
import { validateBrandTokens } from './validators'

export class TokenEngine {
  private static instance: TokenEngine
  private currentBrand: string = ''
  private appliedTokens: typeof defaultFlattenedTokens

  static getInstance(): TokenEngine {
    if (!TokenEngine.instance) {
      TokenEngine.instance = new TokenEngine()
    }
    return TokenEngine.instance
  }

  constructor() {
    this.appliedTokens = { ...defaultFlattenedTokens }
  }

  /**
   * Flatten structured brand tokens into CSS variables
   */
  flattenBrandTokens(brandTheme: BrandTheme): typeof defaultFlattenedTokens {
    const flattened: typeof defaultFlattenedTokens = {}

    // Check if tokens exist and have the expected structure
    if (!brandTheme?.tokens) {
      console.warn('BrandTheme.tokens is undefined')
      return flattened
    }

    // Flatten each token category with safety checks
    try {
      if (brandTheme.tokens.colors) {
        Object.entries(brandTheme.tokens.colors).forEach(([key, value]) => {
          flattened[key as keyof typeof defaultFlattenedTokens] = value
        })
      }

      if (brandTheme.tokens.typography) {
        Object.entries(brandTheme.tokens.typography).forEach(([key, value]) => {
          flattened[key as keyof typeof defaultFlattenedTokens] = value
        })
      }

      if (brandTheme.tokens.spacing) {
        Object.entries(brandTheme.tokens.spacing).forEach(([key, value]) => {
          flattened[key as keyof typeof defaultFlattenedTokens] = value
        })
      }

      if (brandTheme.tokens.borderRadius) {
        Object.entries(brandTheme.tokens.borderRadius).forEach(([key, value]) => {
          flattened[key as keyof typeof defaultFlattenedTokens] = value
        })
      }

      if (brandTheme.tokens.shadows) {
        Object.entries(brandTheme.tokens.shadows).forEach(([key, value]) => {
          flattened[key as keyof typeof defaultFlattenedTokens] = value
        })
      }
    } catch (error) {
      console.error('Error flattening brand tokens:', error)
    }

    return flattened
  }

  /**
   * Apply brand tokens as CSS variables
   */
  applyTokens(brandTheme: BrandTheme, brandId: string = ''): void {
    const flattenedTokens = this.flattenBrandTokens(brandTheme)

    // Validate tokens before applying
    if (!validateBrandTokens(flattenedTokens)) {
      console.warn(`Invalid tokens detected for brand "${brandId}". Using defaults.`)
      return
    }

    const root = document.documentElement

    // Apply each token as CSS variable
    Object.entries(flattenedTokens).forEach(([tokenName, tokenValue]) => {
      root.style.setProperty(`--${tokenName}`, tokenValue)
    })

    this.currentBrand = brandId
    this.appliedTokens = flattenedTokens

    console.log(`✅ Tokens applied for brand: ${brandId || 'default'}`, {
      totalTokens: Object.keys(flattenedTokens).length,
      categories: Object.keys(brandTheme.tokens)
    })
  }

  /**
   * Get currently applied tokens
   */
  getCurrentTokens(): typeof defaultFlattenedTokens {
    return { ...this.appliedTokens }
  }

  /**
   * Get current brand
   */
  getCurrentBrand(): string {
    return this.currentBrand
  }

  /**
   * Reset to default tokens
   */
  resetTokens(): void {
    this.appliedTokens = defaultFlattenedTokens
    this.currentBrand = ''

    // Remove all CSS custom properties
    const root = document.documentElement
    Object.keys(this.appliedTokens).forEach(tokenName => {
      root.style.removeProperty(`--${tokenName}`)
    })

    console.log('🔄 Reset to default tokens')
  }

  /**
   * Get token value by name
   */
  getToken(tokenName: keyof typeof defaultFlattenedTokens): string {
    return this.appliedTokens[tokenName] || defaultFlattenedTokens[tokenName]
  }

  /**
   * Generate CSS string from tokens
   */
  generateCSS(tokens: typeof defaultFlattenedTokens): string {
    return Object.entries(tokens)
      .map(([tokenName, tokenValue]) => `  --${tokenName}: ${tokenValue};`)
      .join('\n')
  }

  /**
   * Get CSS custom properties for a token category
   */
  getTokenCategoryCSS(category: keyof BrandTheme['tokens']): string {
    const categoryTokens: Record<string, string> = {}

    Object.entries(this.appliedTokens).forEach(([tokenName, tokenValue]) => {
      if (tokenName.startsWith(category.replace('-', ''))) {
        categoryTokens[tokenName] = tokenValue
      }
    })

    return this.generateCSS(categoryTokens as any)
  }

  /**
   * Merge brand tokens with default tokens
   */
  mergeWithDefaults(brandTokens: Partial<typeof defaultFlattenedTokens>): typeof defaultFlattenedTokens {
    return {
      ...defaultFlattenedTokens,
      ...brandTokens
    }
  }

  /**
   * Apply component-specific tokens
   */
  applyComponentTokens(componentName: string, tokens: Record<string, string>): void {
    const root = document.documentElement

    Object.entries(tokens).forEach(([tokenName, tokenValue]) => {
      root.style.setProperty(`--${componentName}-${tokenName}`, tokenValue)
    })

    console.log(`🎨 Applied ${componentName} component tokens`)
  }
}

// Singleton instance
export const tokenEngine = TokenEngine.getInstance()