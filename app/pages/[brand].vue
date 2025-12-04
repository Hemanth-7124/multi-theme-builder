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

// Set default layout - will be switched dynamically
definePageMeta({
  layout: 'brand-shell'
})

// Get route parameters reactively
const route = useRoute()
const brandSlug = computed(() => route.params.brand as string)

// Dynamic layout determination and loading
const loadBrandData = async () => {
  const currentBrandSlug = brandSlug.value
  if (!currentBrandSlug) {
    throw new Error('Brand slug is required')
  }

  // Validate brand slug format
  if (currentBrandSlug.includes('.svg') || currentBrandSlug.includes('/') || currentBrandSlug.includes('\\') || currentBrandSlug.includes('..')) {
    throw new Error(`Invalid brand slug format: "${currentBrandSlug}"`)
  }

  const { config } = await useBrand(currentBrandSlug)

  // Load sections with brand-specific overrides
  const { useSectionsConfig } = await import('~/composables/useSectionsConfig')
  const sections = await useSectionsConfig(currentBrandSlug)

  return {
    ...config,
    sections
  }
}

// Use useAsyncData with reactive key to ensure it refetches when brand changes
const { data: brandData, error, pending: isLoading, refresh } = await useAsyncData(
  computed(() => `brand-${brandSlug.value}`),
  loadBrandData,
  {
    // Key function ensures refetch when brandSlug changes
    server: true
  }
)

// Create a reactive computed property for the brand config
const brandConfig = computed(() => brandData.value)


// Set the shared brand state for layouts to access
const { setBrandState } = await import('~/composables/useBrandState')

// Update the shared state when brand data changes
watch(brandData, (newData, oldData) => {
  // Only update if the brand data actually changed
  if (newData?.id !== oldData?.id) {
    setBrandState(newData)

    // Apply new theme tokens when brand data changes
    if (process.client && newData?.theme?.tokens) {
      nextTick(async () => {
        const { useTokens } = await import('~/composables/useTokens')
        const { applyBrandTheme } = useTokens()
        applyBrandTheme(newData.theme, newData.id)
      })
    }
  }
}, { immediate: true })

// Set initial brand state and handle client-side theme application
if (process.client && brandData.value) {
  setBrandState(brandData.value)

  // Apply theme tokens on initial load
  if (brandData.value?.theme?.tokens) {
    const { useTokens } = await import('~/composables/useTokens')
    const { applyBrandTheme } = useTokens()
    applyBrandTheme(brandData.value.theme, brandData.value.id)
  }
}

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
watch(error, (errorValue) => {
  if (errorValue) {
    console.error('Failed to load brand:', errorValue)
  }
})
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