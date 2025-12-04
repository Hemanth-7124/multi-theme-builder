<template>
  <section
    class="flex relative justify-center items-center min-h-screen hero-section"
    :style="heroStyles"
  >
    <div class="container px-6 mx-auto text-center">
      <h1 class="mb-6 text-4xl font-bold font-extrabold leading-tight md:text-6xl" style="color: var(--color-text-inverse);">
        {{ content.title }}
      </h1>
      <p class="mx-auto mb-8 max-w-3xl text-xl leading-normal md:text-2xl" style="color: var(--color-text-inverse);">
        {{ content.subtitle }}
      </p>
      <div v-if="content.description" class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed" style="color: var(--color-text-inverse); opacity: 0.9;">
        {{ content.description }}
      </div>
      <div v-if="hasCta" class="flex gap-4 justify-center">
        <button
          v-if="primaryCta"
          @click="handleCtaClick(primaryCta.href)"
          class="px-8 py-3 font-semibold rounded-lg transition-all hover:shadow-lg"
          style="background-color: var(--color-accent); color: var(--color-text-inverse);"
          @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent-hover)'"
          @mouseleave="$event.target.style.backgroundColor = 'var(--color-accent)'"
        >
          {{ primaryCta.text }}
        </button>
        <button
          v-if="secondaryCta"
          @click="handleCtaClick(secondaryCta.href)"
          class="px-8 py-3 font-semibold rounded-lg border-2 transition-all hover:shadow-md"
          style="background-color: transparent; color: var(--color-text-inverse); border-color: var(--color-text-inverse);"
          @mouseenter="$event.target.style.backgroundColor = 'var(--color-text-inverse)'; $event.target.style.color = 'var(--color-primary)'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'; $event.target.style.color = 'var(--color-text-inverse)'"
        >
          {{ secondaryCta.text }}
        </button>
      </div>
      <div v-if="content.ctaText" class="flex gap-4 justify-center">
        <button
          @click="handleCtaClick('#contact')"
          class="px-8 py-3 font-semibold rounded-lg transition-colors"
          style="background-color: var(--color-accent); color: var(--color-text-inverse);"
          @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent-hover)'"
          @mouseleave="$event.target.style.backgroundColor = 'var(--color-accent)'"
        >
          {{ content.ctaText }}
        </button>
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

// Handle hero section styles (background image or gradient)
const heroStyles = computed(() => {
  if (content.value.backgroundImage) {
    return {
      backgroundImage: `url(${content.value.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgba(0, 0, 0, 0.4)' // Overlay for text readability
    }
  } else {
    // Default gradient
    return {
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
    }
  }
})

// Handle CTA buttons (support different brand config structures)
const hasCta = computed(() => {
  return content.value.cta || content.value.ctaText
})

const primaryCta = computed(() => {
  if (content.value.cta?.primary) {
    return content.value.cta.primary
  }
  return null
})

const secondaryCta = computed(() => {
  if (content.value.cta?.secondary) {
    return content.value.cta.secondary
  }
  return null
})

const handleCtaClick = (url: string) => {
  if (url && url.startsWith('http')) {
    window.open(url, '_blank')
  } else if (url) {
    navigateTo(url)
  }
}
</script>

<style scoped>
.hero-section {
  /* Base styles - colors handled by dynamic theming and text classes */
}
</style>