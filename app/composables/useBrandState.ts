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
 * Computed property to get current brand config (no defaults)
 */
export const useSafeBrandConfig = () => {
  console.log('useSafeBrandConfig called', brandState.value);
  return computed(() => brandState.value)
}
