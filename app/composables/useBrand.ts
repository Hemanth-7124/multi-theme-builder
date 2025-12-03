import type { BrandConfig } from '../../tokens/types'

// Cache for brand configurations
const brandCache = new Map<string, BrandConfig>()

// Cache for available brands
let availableBrandsCache: string[] | null = null

/**
 * Dynamically discover available brands from the server API
 */
export const useDiscoverBrands = async (forceRefresh: boolean = false): Promise<string[]> => {
  // If forceRefresh is true, clear the cache
  if (forceRefresh) {
    availableBrandsCache = null
    console.log('🔄 Force refresh: Cleared brands cache')
  }

  if (availableBrandsCache && !forceRefresh) {
    console.log('📋 Using cached brands:', availableBrandsCache)
    return availableBrandsCache
  }

  try {
    console.log('🔍 Fetching brands from server API...')
    // Fetch brands from server API
    const response = await $fetch('/api/brands')
    console.log('📡 API Response received:', response)

    if (response && response.brands && Array.isArray(response.brands)) {
      availableBrandsCache = response.brands
      console.log('✅ Discovered brands from API:', response.brands)
      return response.brands
    }

    // Fallback to empty array if API returns unexpected format
    console.warn('⚠️ Unexpected API response format:', response)
    availableBrandsCache = []
    return []
  } catch (error) {
    console.error('❌ Error discovering brands:', error)
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
export const useAllBrandsInfo = async (forceRefresh: boolean = false) => {
  console.log('📊 Getting all brands info, forceRefresh:', forceRefresh)
  const brandIds = await useDiscoverBrands(forceRefresh)
  console.log('📊 Brand IDs to process:', brandIds)

  const brandsInfo = await Promise.all(
    brandIds.map(brandId => useBrandInfo(brandId))
  )

  console.log('📊 Final brands info:', brandsInfo)
  return brandsInfo
}