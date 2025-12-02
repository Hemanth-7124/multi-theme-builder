import type { BrandConfig } from '../../tokens/types'

// Global reactive brand state
const brandState = ref<BrandConfig | null>(null)

/**
 * Set the current brand configuration
 */
export const setBrandState = (config: BrandConfig | null) => {
  brandState.value = config
}

/**
 * Get the current brand configuration
 */
export const useBrandState = () => {
  return brandState
}

/**
 * Computed property to get safe brand config with defaults
 */
export const useSafeBrandConfig = () => {
  return computed(() => {
    return brandState.value || {
      id: 'unknown',
      name: 'Brand',
      logo: '/placeholder-logo.svg',
      favicon: '/favicon.ico',
      theme: {
        layout: 'default',
        tokens: {}
      },
      navigation: [],
      cta: { primary: 'Get Started', secondary: 'Learn More' }
    }
  })
}