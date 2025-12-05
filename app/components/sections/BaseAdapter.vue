<template>
  <section
    :class="[
      'section-adapter',
      `section-${sectionType}`,
      { 'section-hidden': !isVisible }
    ]"
    :style="computedStyles"
    :data-section-id="section.id"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Slot for component content -->
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SectionConfig } from '../../../tokens/types'

interface Props {
  section: SectionConfig
  content?: any
  isVisible?: boolean
  customStyles?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: true,
  customStyles: () => ({})
})

// Extract section type from section config
const sectionType = computed(() => props.section.type || 'unknown')

// Compute section styles based on tokens and custom styles
const computedStyles = computed(() => {
  const styles: Record<string, any> = {}

  // Apply custom background if specified
  if (props.content?.backgroundImage) {
    styles.backgroundImage = `url(${props.content.backgroundImage})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'no-repeat'
  }

  // Apply custom styles from props
  Object.assign(styles, props.customStyles)

  // Apply section-specific styles from section config
  if (props.section.styles) {
    Object.entries(props.section.styles).forEach(([key, value]) => {
      if (key !== 'className') {
        styles[key] = value
      }
    })
  }

  return styles
})

// Provide common reactive values to child components
provide('sectionContent', computed(() => props.content))
provide('sectionConfig', computed(() => props.section))
provide('sectionType', sectionType)
</script>

<style scoped>
.section-adapter {
  width: 100%;
  min-height: fit-content;
  position: relative;
}

.section-hidden {
  display: none;
}

/* Default container styles */
.container {
  max-width: 1280px;
}

/* Token-based color classes that can be overridden by CSS variables */
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

:deep(.token-text-inverse) {
  color: var(--color-text-inverse);
}

:deep(.token-border) {
  border-color: var(--color-border);
}

:deep(.token-shadow) {
  box-shadow: var(--shadow-md);
}

/* Typography token classes */
:deep(.token-font-sans) {
  font-family: var(--font-family-sans);
}

:deep(.token-font-serif) {
  font-family: var(--font-family-serif);
}

:deep(.token-font-mono) {
  font-family: var(--font-family-mono);
}

/* Responsive utilities */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>