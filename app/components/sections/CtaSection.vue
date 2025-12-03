<template>
  <section class="py-20 cta-section">
    <div class="container px-6 mx-auto text-center">
      <h2 class="mb-6 text-3xl font-bold md:text-4xl font-extrabold leading-tight" style="color: var(--color-text-inverse);">
        {{ content.title }}
      </h2>
      <p class="mx-auto mb-8 max-w-2xl text-xl leading-relaxed" style="color: var(--color-text-inverse);">
        {{ content.subtitle }}
      </p>

      <div class="flex flex-col gap-4 justify-center sm:flex-row">
        <button
          v-if="content.primaryButton"
          @click="handleButtonClick(content.primaryButton.url)"
          class="px-8 py-4 text-lg font-semibold rounded-lg transition-all hover:shadow-lg font-semibold"
          style="background-color: var(--color-accent); color: var(--color-text-inverse);"
          @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent-hover)'"
          @mouseleave="$event.target.style.backgroundColor = 'var(--color-accent)'"
        >
          {{ content.primaryButton.text }}
        </button>
        <button
          v-if="content.secondaryButton"
          @click="handleButtonClick(content.secondaryButton.url)"
          class="px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all hover:shadow-md font-semibold"
          style="background-color: transparent; color: var(--color-text-inverse); border-color: var(--color-text-inverse);"
          @mouseenter="$event.target.style.backgroundColor = 'var(--color-text-inverse)'; $event.target.style.color = 'var(--color-primary)'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'; $event.target.style.color = 'var(--color-text-inverse)'"
        >
          {{ content.secondaryButton.text }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SectionConfig } from '../../../tokens/types'

interface Props {
  section: SectionConfig
}

const props = defineProps<Props>()

const content = computed(() => props.section.content || {})

const handleButtonClick = (url: string) => {
  if (url.startsWith('http')) {
    window.open(url, '_blank')
  } else {
    navigateTo(url)
  }
}
</script>

<style scoped>
.cta-section {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}
</style>