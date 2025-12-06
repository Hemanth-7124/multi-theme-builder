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

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { useRoute, useHead } from '#imports'
import { useBrand } from '~/composables/useBrand'
import type { SectionConfig } from '../../tokens/types'

definePageMeta({
  layout: 'brand-shell'
})

export default defineComponent({
  name: 'BrandPageAdapter',

  data() {
    return {
      brandData: null as any,
      error: null as any,
      isLoading: true
    }
  },

  computed: {
    route() {
      return useRoute()
    },

    brandSlug(): string {
      return (this.route.params.brand as string) ?? ''
    },

    brandConfig() {
      return this.brandData
    },

    sortedSections(): SectionConfig[] {
      if (!this.brandConfig?.sections) return []
      return [...this.brandConfig.sections]
        .filter(section => section.visible)
        .sort((a, b) => a.order - b.order)
    }
  },

  watch: {
    brandSlug: {
      immediate: true,
      async handler() {
        await this.refreshBrand()
      }
    }
  },

  methods: {
    async refreshBrand() {
      try {
        this.isLoading = true
        this.error = null

        if (!this.brandSlug) throw new Error('Brand slug is required')

        if (
          this.brandSlug.includes('.svg') ||
          this.brandSlug.includes('/') ||
          this.brandSlug.includes('\\') ||
          this.brandSlug.includes('..')
        ) {
          throw new Error(`Invalid brand slug format: "${this.brandSlug}"`)
        }

        const { config } = await useBrand(this.brandSlug)

        const { useSectionsConfig } = await import('~/composables/useSectionsConfig')
        const sections = await useSectionsConfig(this.brandSlug)

        this.brandData = {
          ...config,
          sections
        }

        await this.applyBrandTheme()
        this.applyMetaTags()

      } catch (err: any) {
        this.error = err
        console.error('Failed to load brand:', err)
      } finally {
        this.isLoading = false
      }
    },

    async applyBrandTheme() {
      if (process.client && this.brandData?.theme?.tokens) {
        nextTick(async () => {
          const { tokenEngine } = await import('../../tokens/engine')
          tokenEngine.applyTokens(this.brandData.theme, this.brandData.id)
        })
      }
    },

    applyMetaTags() {
      if (!this.brandConfig) return

      useHead({
        title: this.brandConfig.name,
        meta: [
          { name: 'description', content: this.brandConfig.description },
          { name: 'og:title', content: this.brandConfig.name },
          { name: 'og:description', content: this.brandConfig.description },
          { name: 'og:image', content: this.brandConfig.logo }
        ]
      })
    }
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