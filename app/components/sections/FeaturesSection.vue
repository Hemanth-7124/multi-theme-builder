<template>
  <section class="py-20 features-section" style="background-color: var(--color-surface);">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-extrabold md:text-4xl" style="color: var(--color-primary);">
          {{ content.title }}
        </h2>
        <p class="mx-auto max-w-2xl text-lg" style="color: var(--color-text-secondary);">
          {{ content.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feature, index) in content.features"
          :key="index"
          class="p-8 text-center rounded-lg shadow-lg transition-all feature-card hover:shadow-xl hover:-translate-y-1"
          style="background-color: var(--color-background);"
        >
          <div class="mb-4 feature-icon">
            <img
              v-if="feature.icon && feature.icon.endsWith('.svg')"
              :src="feature.icon"
              :alt="feature.title"
              class="mx-auto w-16 h-16"
              loading="lazy"
            />
            <div
              v-else
              class="flex justify-center items-center mx-auto w-16 h-16 text-2xl rounded-full"
              style="background-color: var(--color-primary); color: var(--color-text-inverse);"
            >
              {{ feature.icon }}
            </div>
          </div>
          <h3 class="mb-3 text-xl font-semibold" style="color: var(--color-primary);">
            {{ feature.title }}
          </h3>
          <p class="text-base" style="color: var(--color-text-secondary);">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SectionConfig } from '../../../tokens/types'

interface Props { 
  section?: SectionConfig
  content?: any
}

const props = defineProps<Props>()

// Support both old format (section prop) and new format (content prop)
const content = computed(() => {
  if (props.content) {
    return props.content
  }
  return props.section?.content || {}
})
</script>

<style scoped>
.features-section {
  /* Base styles - colors handled by Tailwind token classes */
}

.feature-card {
  /* Base styles - colors handled by Tailwind token classes */
}

.feature-icon {
  /* Base styles - background handled by Tailwind token classes */
}
</style>