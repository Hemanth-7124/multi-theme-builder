import type { BrandConfig } from '../../tokens/types'

// Cache for brand configurations
const brandCache = new Map<string, BrandConfig>()

// Cache for available brands
let availableBrandsCache: string[] | null = null

/**
 * Dynamically discover available brands from the brands directory
 */
export const useDiscoverBrands = async (): Promise<string[]> => {
  if (availableBrandsCache) {
    return availableBrandsCache
  }

  try {
    // Always use file system to scan the brands directory
    const fs = await import('node:fs')
    const path = await import('node:path')

    const brandsDir = path.join(process.cwd(), 'brands')

    if (fs.existsSync(brandsDir)) {
      const items = fs.readdirSync(brandsDir, { withFileTypes: true })
      const brandDirs = items
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

      // Filter for directories that contain config.ts
      const validBrands = brandDirs.filter(brand => {
        const configPath = path.join(brandsDir, brand, 'config.ts')
        return fs.existsSync(configPath)
      })

      availableBrandsCache = validBrands
      return validBrands
    }

    // If brands directory doesn't exist, return empty array
    availableBrandsCache = []
    return []
  } catch (error) {
    console.error('Error discovering brands:', error)
    availableBrandsCache = []
    return []
  }
}

/**
 * Load brand configuration dynamically
 */
export const useBrand = async (brandId: string) => {
  // Check cache first
  if (brandCache.has(brandId)) {
    return {
      config: brandCache.get(brandId)!
    }
  }

  try {
    // Try to dynamically import the brand configuration
    const config = await import(`../../brands/${brandId}/config.ts`)
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
 * Get all available brands (async version)
 */
export const useAvailableBrands = async (): Promise<string[]> => {
  return await useDiscoverBrands()
}

/**
 * Check if brand exists (async version)
 */
export const useBrandExists = async (brandId: string): Promise<boolean> => {
  const availableBrands = await useDiscoverBrands()
  return availableBrands.includes(brandId)
}

/**
 * Get brand info for homepage display
 */
export const useBrandInfo = async (brandId: string) => {
  const { config } = await useBrand(brandId)

  return {
    id: config.id,
    name: config.name,
    description: config.description,
    logo: config.logo || `/brands/${brandId}/assets/logo.svg`
  }
}

/**
 * Get all brands with their info for homepage
 */
export const useAllBrandsInfo = async () => {
  const brandIds = await useDiscoverBrands()
  const brandsInfo = await Promise.all(
    brandIds.map(brandId => useBrandInfo(brandId))
  )
  return brandsInfo
}