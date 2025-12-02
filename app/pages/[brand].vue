<template>
  <div class="brand-page">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <div class="mx-auto mb-4 w-12 h-12 rounded-full border-b-2 animate-spin border-primary"></div>
        <p class="text-text-secondary">Loading brand...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <h1 class="mb-4 text-2xl font-bold text-red-600">Brand Not Found</h1>
        <p class="mb-6 text-text-secondary">The brand you're looking for doesn't exist.</p>
        <NuxtLink
          to="/"
          class="px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90"
        >
          Go Home
        </NuxtLink>
      </div>
    </div>

    <!-- Render sections dynamically -->
   
    <SectionRenderer v-else :sections="sortedSections" />
  </div>
</template>

<script setup lang="ts">
import type { SectionConfig } from '../../tokens/types'
import { useBrand } from '~/composables/useBrand'

// Get route parameters
const route = useRoute()
const brandSlug = route.params.brand as string

// Define page meta to use dynamic layout based on brand theme
const layoutType = ref('brand-shell')

// Load brand config for layout selection
const loadLayoutType = async () => {
  try {
    // Dynamically import brand config to get layout type
    let brandConfig
    switch (brandSlug) {
      case 'chitti':
        brandConfig = await import('../../brands/chitti/config.ts')
        break
      case 'pmc':
        brandConfig = await import('../../brands/pmc/config.ts')
        break
      case 'uptor':
        brandConfig = await import('../../brands/uptor/config.ts')
        break
      default:
        console.warn('Unknown brand:', brandSlug)
        layoutType.value = 'brand-shell'
        return
    }

    // Map layout types from brand config
    const brandLayout = brandConfig.default.theme.layout
    switch (brandLayout) {
      case 'modern':
        layoutType.value = 'modern'
        break
      case 'bold':
        layoutType.value = 'bold'
        break
      case 'minimal':
        layoutType.value = 'minimal'
        break
      default:
        layoutType.value = 'brand-shell'
    }

    console.log(`🎯 Using layout "${layoutType.value}" for brand "${brandSlug}" (theme: ${brandLayout})`)
  } catch (error) {
    console.warn('Could not determine layout for brand:', brandSlug, error)
    layoutType.value = 'brand-shell'
  }
}

// Load layout type immediately
await loadLayoutType()

// Define page meta with reactive layout
definePageMeta({
  layout: layoutType.value
})

// Use useAsyncData for proper async handling in Nuxt 3/4
const { data: brandData, error, pending: isLoading } = await useAsyncData(
  `brand-${brandSlug}`,
  async () => {
    console.log(`Loading brand data for: ${brandSlug}`)

    const { config } = await useBrand(brandSlug)
    console.log(`Brand config loaded for ${brandSlug}:`, config)

    // Apply brand theme tokens on client side
    if (process.client && config?.theme?.tokens) {
      console.log(`Applying theme tokens for ${brandSlug}`)
      const { useTokens } = await import('~/composables/useTokens')
      const { applyBrandTheme } = useTokens()
      applyBrandTheme(config.theme, brandSlug)
      console.log(`✅ Brand theme applied: ${config.name} with layout: ${config.theme.layout}`)
    }

    // Load sections with brand-specific overrides
    const { useSectionsConfig } = await import('~/composables/useSectionsConfig')
    const sections = await useSectionsConfig(brandSlug)

    return {
      ...config,
      sections
    }
  },
  {
    // Key the cache by brand slug to ensure different brands get different data
    key: () => `brand-${brandSlug}`
  }
)

// Create a reactive computed property for the brand config
const brandConfig = computed(() => brandData.value)

// Set the shared brand state for layouts to access
const { setBrandState } = await import('~/composables/useBrandState')
setBrandState(brandData.value)

// Update the shared state when brand data changes
watch(brandData, (newData) => {
  setBrandState(newData)

  // Apply new theme tokens when brand data changes
  if (process.client && newData?.theme?.tokens) {
    nextTick(async () => {
      const { useTokens } = await import('~/composables/useTokens')
      const { applyBrandTheme } = useTokens()
      applyBrandTheme(newData.theme, newData.id)
      console.log(`🔄 Brand theme updated: ${newData.name}`)
    })
  }
}, { immediate: true })

// Sort sections by order
const sortedSections = computed(() => {
  if (!brandConfig.value?.sections) return []
  return [...brandConfig.value.sections]
    .filter(section => section.visible)
    .sort((a: SectionConfig, b: SectionConfig) => a.order - b.order)
})

// Set page metadata
watchEffect(() => {
  if (brandConfig.value) {
    useHead({
      title: brandConfig.value.name,
      meta: [
        { name: 'description', content: brandConfig.value.description },
        { name: 'og:title', content: brandConfig.value.name },
        { name: 'og:description', content: brandConfig.value.description },
        { name: 'og:image', content: brandConfig.value.logo }
      ]
    })
  }
})

// Handle errors
if (error.value) {
  console.error('Failed to load brand:', error.value)
  throw new Error('Brand not found')
}
</script>

<style scoped>
.brand-page {
  width: 100%;
  min-height: 100vh;
}

/* Apply CSS variable classes for token usage */
:deep(.token-primary) {
  color: var(--color-primary);
}

:deep(.token-secondary) {
  color: var(--color-secondary);
}

:deep(.token-accent) {
  color: var(--color-accent);
}

:deep(.token-background) {
  background-color: var(--color-background);
}

:deep(.token-surface) {
  background-color: var(--color-surface);
}

:deep(.token-text-primary) {
  color: var(--color-text-primary);
}

:deep(.token-text-secondary) {
  color: var(--color-text-secondary);
}

:deep(.token-text-muted) {
  color: var(--color-text-muted);
}
</style>