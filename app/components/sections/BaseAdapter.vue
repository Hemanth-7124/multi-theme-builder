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
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <!-- Slot for component content -->
      <slot />
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent, computed, provide } from 'vue'
import type { SectionConfig } from '../../../tokens/types'

export default defineComponent({
  name: 'SectionWrapper',

  props: {
    section: {
      type: Object as () => SectionConfig,
      required: true
    },
    content: {
      type: Object as () => any,
      default: () => ({})
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    customStyles: {
      type: Object as () => Record<string, any>,
      default: () => ({})
    }
  },

  setup(props) {
    // Compute section type
    const sectionType = computed(() => props.section.type || 'unknown')

    // Compute final styles
    const computedStyles = computed(() => {
      const styles: Record<string, any> = {}

      // Background image
      if (props.content?.backgroundImage) {
        styles.backgroundImage = `url(${props.content.backgroundImage})`
        styles.backgroundSize = 'cover'
        styles.backgroundPosition = 'center'
        styles.backgroundRepeat = 'no-repeat'
      }

      // Custom style overrides from props
      Object.assign(styles, props.customStyles)

      // Style overrides from section config
      if (props.section.styles) {
        Object.entries(props.section.styles).forEach(([key, value]) => {
          if (key !== 'className') {
            styles[key] = value
          }
        })
      }

      return styles
    })

    // Provide to children
    provide('sectionContent', computed(() => props.content))
    provide('sectionConfig', computed(() => props.section))
    provide('sectionType', sectionType)

    return {
      sectionType,
      computedStyles
    }
  }
})
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