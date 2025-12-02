import type { BrandConfig } from '../../tokens/types'

// Cache for brand configurations
const brandCache = new Map<string, BrandConfig>()

/**
 * Load brand configuration
 */
export const useBrand = async (brandId: string) => {
  // Check cache first
  if (brandCache.has(brandId)) {
    return {
      config: brandCache.get(brandId)!
    }
  }

  try {
    // Use explicit imports for known brands
    let config

    switch (brandId) {
      case 'chitti':
        config = await import('../../brands/chitti/config.ts')
        break
      case 'uptor':
        config = await import('../../brands/uptor/config.ts')
        break
      case 'pmc':
        config = await import('../../brands/pmc/config.ts')
        break
      default:
        throw new Error(`Unknown brand: ${brandId}`)
    }

    const brandConfig = config.default as BrandConfig

    // Cache the configuration
    brandCache.set(brandId, brandConfig)

    return {
      config: brandConfig
    }
  } catch (error) {
    console.error(`Failed to load brand configuration for "${brandId}":`, error)

    // Return a default configuration
    const defaultConfig: BrandConfig = {
      id: brandId,
      name: brandId.charAt(0).toUpperCase() + brandId.slice(1),
      description: 'Brand configuration not found',
      logo: '/placeholder-logo.svg',
      favicon: '/favicon.ico',
      theme: {
        layout: 'default',
        tokens: {}
      },
      navigation: [],
      cta: {
        primary: 'Get Started',
        secondary: 'Learn More'
      }
    }

    return {
      config: defaultConfig
    }
  }
}

/**
 * Get all available brands
 */
export const useAvailableBrands = () => {
  return ['chitti', 'uptor', 'pmc']
}

/**
 * Check if brand exists
 */
export const useBrandExists = (brandId: string): boolean => {
  return useAvailableBrands().includes(brandId)
}