<template>
  <div class="section-renderer">
    <template v-for="section in sections" :key="section.id">
      <Suspense>
        <template #default>
          <component
            :is="sectionComponents[section.type]"
            :section="section"
            :content="section.content"
            :class="getSectionClasses(section)"
          />
        </template>
        <template #fallback>
          <div class="flex justify-center items-center p-12 section-loading">
            <div class="text-center">
              <div class="mx-auto mb-4 w-8 h-8 rounded-full border-2 animate-spin border-primary border-t-transparent"></div>
              <p class="text-text-muted">Loading {{ section.type }} section...</p>
            </div>
          </div>
        </template>
      </Suspense>
    </template>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import type { SectionConfig } from '../../tokens/types'

export default {
  name: 'LandingPageSections',

  props: {
    sections: {
      type: Array as () => SectionConfig[],
      required: true
    }
  },

  components: {
    HeroSection: defineAsyncComponent(() => import('./sections/HeroSection.vue')),
    FeaturesSection: defineAsyncComponent(() => import('./sections/FeaturesSection.vue')),
    CtaSection: defineAsyncComponent(() => import('./sections/CtaSection.vue')),
    StatsSection: defineAsyncComponent(() => import('./sections/StatsSection.vue')),
    VideoSection: defineAsyncComponent(() => import('./sections/VideoSection.vue')),
    BonusesSection: defineAsyncComponent(() => import('./sections/BonusesSection.vue')),
    TestimonialsSection: defineAsyncComponent(() => import('./sections/TestimonialsSection.vue')),
    FaqSection: defineAsyncComponent(() => import('./sections/FaqSection.vue')),
    MentorsSection: defineAsyncComponent(() => import('./sections/MentorsSection.vue'))
  },

  data() {
    return {
      sectionComponents: {
        hero: 'HeroSection',
        features: 'FeaturesSection',
        cta: 'CtaSection',
        stats: 'StatsSection',
        video: 'VideoSection',
        bonuses: 'BonusesSection',
        testimonials: 'TestimonialsSection',
        faq: 'FaqSection',
        mentors: 'MentorsSection'
      }
    }
  },

  methods: {
    getSectionClasses(section: SectionConfig) {
      const baseClasses = ['section', `section-${section.type}`]

      if (section.styles) {
        Object.entries(section.styles).forEach(([property, value]) => {
          if (property === 'className') {
            baseClasses.push(value as string)
          }
        })
      }

      return baseClasses.join(' ')
    }
  }
}
</script>

<style scoped>
.section-renderer {
  width: 100%;
}

.section {
  width: 100%;
  min-height: fit-content;
}
</style>