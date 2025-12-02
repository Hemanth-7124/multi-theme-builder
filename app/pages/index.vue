<template>
  <div class="min-h-screen bg-background text-text-primary">
    <div class="container px-6 py-16 mx-auto">
      <div class="mb-16 text-center">
        <h1 class="mb-6 text-5xl font-bold text-primary">Brand Router Engine</h1>
        <p class="mx-auto max-w-3xl text-xl text-text-secondary">
          A powerful multi-theme website engine with dynamic brand switching and design token integration.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-3">
        <!-- Loading state -->
        <div v-if="pending" class="col-span-full text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-4 text-text-secondary">Loading brands...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="!availableBrands || availableBrands.length === 0" class="col-span-full text-center py-8">
          <div class="p-8 rounded-xl bg-surface">
            <h3 class="text-xl font-semibold text-primary mb-2">No Brands Found</h3>
            <p class="text-text-secondary">No brand configurations were found in the /brands directory.</p>
          </div>
        </div>

        <!-- Brand cards -->
        <div
          v-for="brand in availableBrands"
          v-else
          :key="brand.id"
          class="rounded-xl shadow-lg transition-all duration-300 bg-surface hover:shadow-xl hover:-translate-y-1"
        >
          <div class="p-8">
            <div class="flex items-center mb-4">
              <img
                :src="brand.logo"
                :alt="`${brand.name} logo`"
                class="mr-4 w-12 h-12 rounded-lg"
                loading="lazy"
              />
              <h3 class="text-2xl font-bold text-primary">{{ brand.name }}</h3>
            </div>
            <p class="mb-6 text-text-secondary">{{ brand.description }}</p>
            <NuxtLink
              :to="`/${brand.id}`"
              class="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
            >
              View {{ brand.name }} Site
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <div class="p-8 mx-auto max-w-4xl rounded-xl bg-surface">
          <h2 class="mb-6 text-3xl font-bold text-primary">Features</h2>
          <div class="grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            <div class="flex items-start space-x-3">
              <div class="flex flex-shrink-0 justify-center items-center mt-1 w-6 h-6 text-white rounded-full bg-accent">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-primary">Dynamic Theme Switching</h3>
                <p class="text-sm text-text-secondary">Route-based brand theme changes with CSS variables</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex flex-shrink-0 justify-center items-center mt-1 w-6 h-6 text-white rounded-full bg-accent">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-primary">Design Token System</h3>
                <p class="text-sm text-text-secondary">Centralized design tokens with Tailwind integration</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex flex-shrink-0 justify-center items-center mt-1 w-6 h-6 text-white rounded-full bg-accent">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-primary">Lazy Loading</h3>
                <p class="text-sm text-text-secondary">Optimized performance with code splitting</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex flex-shrink-0 justify-center items-center mt-1 w-6 h-6 text-white rounded-full bg-accent">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-primary">Config-Driven</h3>
                <p class="text-sm text-text-secondary">Easy brand setup with JSON configuration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define page meta
definePageMeta({
  layout: 'default'
})

// Dynamic brand discovery
const { data: availableBrands, pending } = await useAsyncData('available-brands', async () => {
  try {
    const { useAllBrandsInfo } = await import('../composables/useBrand')
    return await useAllBrandsInfo()
  } catch (error) {
    console.error('Error loading brands:', error)
    return []
  }
})

// Set page metadata
useHead({
  title: 'Brand Router Engine',
  meta: [
    { name: 'description', content: 'Multi-theme website engine with dynamic brand switching' },
    { name: 'og:title', content: 'Brand Router Engine' },
    { name: 'og:description', content: 'A powerful multi-theme website engine with dynamic brand switching' }
  ]
})
</script>
