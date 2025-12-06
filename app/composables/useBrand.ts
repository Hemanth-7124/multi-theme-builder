/**
 * COMPOSABLE RATIONALE:
 *
 * WHY NEEDED:
 * - Shared across 3+ components (pages/[brand].vue, layouts/brand-shell.vue, pages/index.vue)
 * - Complex business logic with caching, validation, and dynamic imports
 * - Performance optimization through configuration caching
 * - Centralized error handling for brand operations
 *
 * PROBLEM SOLVED:
 * - Eliminates code duplication for brand discovery and loading
 * - Provides consistent API for brand-related operations
 * - Handles brand configuration validation and caching at appropriate level
 *
 * REUSABILITY: High - Multiple components need to load and validate brand configs
 */

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
  }

  if (availableBrandsCache && !forceRefresh) {
    return availableBrandsCache
  }

  try {
    // Fetch brands from server API
    const response = await $fetch('/api/brands')

    if (response && response.brands && Array.isArray(response.brands)) {
      availableBrandsCache = response.brands
      return response.brands
    }

    // Fallback to empty array if API returns unexpected format
    console.warn('Unexpected API response format:', response)
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
  // Validate brandId parameter
  if (!brandId || typeof brandId !== 'string') {
    throw new Error('Invalid brand ID provided')
  }

  // Check if brandId looks like a file path (which would be incorrect)
  if (brandId.includes('.svg') || brandId.includes('/') || brandId.includes('\\')) {
    throw new Error(`Invalid brand ID "${brandId}". Brand ID should be a simple identifier, not a file path.`)
  }

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

    // Throw error instead of returning default config
    throw new Error(`Brand "${brandId}" not found. Please create a configuration file at brands/${brandId}/config.ts`);
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
  const brandIds = await useDiscoverBrands(forceRefresh)

  const brandsInfo = await Promise.all(
    brandIds.map(brandId => useBrandInfo(brandId))
  )

  return brandsInfo
}