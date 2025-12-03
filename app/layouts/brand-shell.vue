<template>
  <!-- Dynamic layout rendering based on brand configuration -->
  <div>
    <!-- Render the appropriate layout component with fallback -->
    <component
      :is="layoutComponent"
      :brand-config="currentBrandConfig"
    >
      <slot />
    </component>
  </div>
</template>

<script setup lang="ts">
import type { BrandConfig } from '../../tokens/types'
import { useSafeBrandConfig } from '~/composables/useBrandState'

// Import layout components
import ModernLayout from './modern.vue'
import BoldLayout from './bold.vue'
import MinimalLayout from './minimal.vue'

// Get brand config from shared state
const safeBrandConfig = useSafeBrandConfig()

// Create a fallback brand config for when no brand is set
const fallbackBrandConfig: BrandConfig = {
  id: "unknown",
  name: "Unknown Brand",
  description: "Brand configuration not available",
  logo: "/placeholder-logo.svg",
  favicon: "/favicon.ico",
  theme: {
    layout: "modern",
    tokens: {}
  },
  navigation: [],
  cta: {
    primary: "Get Started",
    secondary: "Learn More"
  }
}

// Use current brand config or fallback
const currentBrandConfig = computed(() => safeBrandConfig.value || fallbackBrandConfig)

// Compute which layout component to use based on brand configuration
const layoutComponent = computed(() => {
  if (!currentBrandConfig.value?.theme?.layout) {
    return ModernLayout // fallback to modern
  }

  const layoutType = currentBrandConfig.value.theme.layout

  switch (layoutType) {
    case 'modern':
      return ModernLayout
    case 'bold':
      return BoldLayout
    case 'minimal':
      return MinimalLayout
    default:
      return ModernLayout
  }
})


</script>

<style scoped>
/* Brand shell layout is now a dynamic wrapper - no specific styles needed */
/* Individual layout components handle their own styling */
</style>
