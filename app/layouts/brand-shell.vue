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

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from '#imports'
import type { BrandConfig } from '../../tokens/types'

// Import layout components
import ModernLayout from './modern.vue'
import BoldLayout from './bold.vue'
import ClassicLayout from './classic.vue'
import MinimalLayout from './minimal.vue'

export default defineComponent({
  name: 'BrandLayoutAdapter',

  components: {
    ModernLayout,
    BoldLayout,
    ClassicLayout,
    MinimalLayout
  },

  data() {
    return {
      brandData: null as BrandConfig | null,
      fallbackBrandConfig: {
        id: 'unknown',
        name: 'Unknown Brand',
        description: 'Brand configuration not available',
        logo: '/placeholder-logo.svg',
        favicon: '/favicon.ico',
        theme: {
          layout: 'modern',
          tokens: {}
        },
        navigation: [],
        cta: {
          primary: 'Get Started',
          secondary: 'Learn More'
        }
      } as BrandConfig
    }
  },

  computed: {
    brandSlug(): string {
      const route = useRoute()
      return (route.params.brand as string) ?? ''
    },

    currentBrandConfig(): BrandConfig {
      return this.brandData || this.fallbackBrandConfig
    },

    layoutComponent() {
      const layoutType = this.currentBrandConfig?.theme?.layout || 'modern'

      switch (layoutType) {
        case 'modern':
          return ModernLayout
        case 'bold':
          return BoldLayout
        case 'classic':
          return ClassicLayout
        case 'minimal':
          return MinimalLayout
        default:
          console.warn(`Unknown layout type: ${layoutType}, falling back to modern`)
          return ModernLayout
      }
    }
  },

  async serverPrefetch() {
    await this.fetchBrandConfig()
  },

  async mounted() {
    if (!this.brandData) {
      await this.fetchBrandConfig()
    }
  },

  methods: {
    async fetchBrandConfig() {
      if (!this.brandSlug) return

      const { useBrand } = await import('~/composables/useBrand')
      const { config } = await useBrand(this.brandSlug)
      this.brandData = config
    }
  }
})
</script>

<style scoped>
/* Brand shell layout is now a dynamic wrapper - no specific styles needed */
/* Individual layout components handle their own styling */
</style>