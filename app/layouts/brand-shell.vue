<template>
  <!-- Dynamic layout rendering based on brand configuration -->
  <div>
    <!-- Show loading state while brand config is loading -->
    <div v-if="!safeBrandConfig?.id" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <div class="mx-auto mb-4 w-12 h-12 rounded-full border-b-2 animate-spin border-blue-600"></div>
        <p class="text-gray-600">Loading brand...</p>
      </div>
    </div>

    <!-- Render the appropriate layout component -->
    <component
      v-else
      :is="layoutComponent"
      :brand-config="safeBrandConfig"
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

// Compute which layout component to use based on brand configuration
const layoutComponent = computed(() => {
  if (!safeBrandConfig.value?.theme?.layout) {
    console.warn('No layout specified in brand config, using default')
    return ModernLayout // fallback to modern
  }

  const layoutType = safeBrandConfig.value.theme.layout
  console.log(`🎯 Brand "${safeBrandConfig.value.id}" using layout "${layoutType}"`)

  switch (layoutType) {
    case 'modern':
      return ModernLayout
    case 'bold':
      return BoldLayout
    case 'minimal':
      return MinimalLayout
    default:
      console.warn(`Unknown layout "${layoutType}", falling back to modern`)
      return ModernLayout
  }
})

// Debug: Log the brand config value and layout selection
watchEffect(() => {
  if (safeBrandConfig.value) {
    console.log('BrandShell Layout - safeBrandConfig:', safeBrandConfig.value)
    console.log('BrandShell Layout - layoutComponent:', layoutComponent.value?.__name || 'Unknown')
  }
})
</script>

<style scoped>
/* Brand shell layout is now a dynamic wrapper - no specific styles needed */
/* Individual layout components handle their own styling */
</style>