import { FlattenedTokens, ColorTokens, TypographyTokens } from './types'

// Token validation patterns - more permissive for flexibility
const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d+,\s*\d+,\s*\d+\)$|^rgba\(\d+,\s*\d+,\s*\d+,\s*[01]?\.?\d*\)$|^[a-zA-Z]+$|^transparent$|^currentcolor$/
const fontSizeRegex = /^[0-9]+(\.[0-9]+)?(rem|em|px|%|vh|vw|vmin|vmax)$/
const spacingRegex = /^0$|^[0-9]+(\.[0-9]+)?(rem|em|px|vh|vw|%)$/
const fontFamilyRegex = /^[a-zA-Z\s,\-'"`]+$/
const radiusRegex = /^0$|^[0-9]+(\.[0-9]+)?(rem|em|px|%)$/
const shadowRegex = /^none$|^[a-z0-9\s,.#()-]+$/i

export class TokenValidator {
  static validateColor(value: string, tokenName: string): boolean {
    if (!colorRegex.test(value)) {
      console.warn(`Invalid color format for ${tokenName}: ${value}`)
      return false
    }
    return true
  }

  static validateFontSize(value: string, tokenName: string): boolean {
    if (!fontSizeRegex.test(value)) {
      console.warn(`Invalid font size format for ${tokenName}: ${value}`)
      return false
    }
    return true
  }

  static validateSpacing(value: string, tokenName: string): boolean {
    if (!spacingRegex.test(value)) {
      console.warn(`Invalid spacing format for ${tokenName}: ${value}`)
      return false
    }
    return true
  }

  static validateFontFamily(value: string, tokenName: string): boolean {
    if (!fontFamilyRegex.test(value)) {
      console.warn(`Invalid font family format for ${tokenName}: ${value}`)
      return false
    }
    return true
  }

  static validateBorderRadius(value: string, tokenName: string): boolean {
    if (!radiusRegex.test(value) && value !== '9999px') {
      console.warn(`Invalid border radius format for ${tokenName}: ${value}`)
      return false
    }
    return true
  }

  static validateShadow(value: string, tokenName: string): boolean {
    // Allow 'none' as a valid shadow value
    if (value === 'none') {
      return true
    }

    // For other shadow values, check if they contain common shadow components
    if (value.includes('px') || value.includes('rem') || value.includes('em') ||
        value.includes('rgba') || value.includes('rgb') || value.includes('inset')) {
      return true
    }

    console.warn(`Invalid shadow format for ${tokenName}: ${value}`)
    return false
  }

  static validateTokens(tokens: FlattenedTokens): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    for (const [tokenName, tokenValue] of Object.entries(tokens)) {
      // Color tokens
      if (tokenName.startsWith('color-')) {
        if (!this.validateColor(tokenValue, tokenName)) {
          errors.push(`${tokenName}: ${tokenValue}`)
        }
      }
      // Font size tokens
      else if (tokenName.startsWith('font-size-')) {
        if (!this.validateFontSize(tokenValue, tokenName)) {
          errors.push(`${tokenName}: ${tokenValue}`)
        }
      }
      // Font family tokens
      else if (tokenName.startsWith('font-family-')) {
        if (!this.validateFontFamily(tokenValue, tokenName)) {
          errors.push(`${tokenName}: ${tokenValue}`)
        }
      }
      // Spacing tokens
      else if (tokenName.startsWith('spacing-')) {
        if (!this.validateSpacing(tokenValue, tokenName)) {
          errors.push(`${tokenName}: ${tokenValue}`)
        }
      }
      // Border radius tokens
      else if (tokenName.startsWith('radius-')) {
        if (!this.validateBorderRadius(tokenValue, tokenName)) {
          errors.push(`${tokenName}: ${tokenValue}`)
        }
      }
      // Shadow tokens
      else if (tokenName.startsWith('shadow-')) {
        if (!this.validateShadow(tokenValue, tokenName)) {
          errors.push(`${tokenName}: ${tokenValue}`)
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// Validation helper function
export function validateBrandTokens(tokens: FlattenedTokens): boolean {
  const validation = TokenValidator.validateTokens(tokens)

  if (!validation.valid) {
    console.error('Token validation failed:', validation.errors)
    return false
  }

  return true
}