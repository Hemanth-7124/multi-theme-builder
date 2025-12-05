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

<script setup lang="ts">
import type { SectionConfig } from '../../tokens/types'

interface Props {
  sections: SectionConfig[]
}

const props = defineProps<Props>()

// Define components with proper async handling using defineAsyncComponent
const HeroSection = defineAsyncComponent(() => import('./sections/HeroSection.vue'))
const FeaturesSection = defineAsyncComponent(() => import('./sections/FeaturesSection.vue'))
const CtaSection = defineAsyncComponent(() => import('./sections/CtaSection.vue'))
const StatsSection = defineAsyncComponent(() => import('./sections/StatsSection.vue'))
const VideoSection = defineAsyncComponent(() => import('./sections/VideoSection.vue'))
const BonusesSection = defineAsyncComponent(() => import('./sections/BonusesSection.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('./sections/TestimonialsSection.vue'))
const FaqSection = defineAsyncComponent(() => import('./sections/FaqSection.vue'))
const MentorsSection = defineAsyncComponent(() => import('./sections/MentorsSection.vue'))

// Map section types to components
const sectionComponents = {
  hero: HeroSection,
  features: FeaturesSection,
  cta: CtaSection,
  stats: StatsSection,
  video: VideoSection,
  bonuses: BonusesSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  mentors: MentorsSection
}

// Get CSS classes for section
const getSectionClasses = (section: SectionConfig) => {
  const baseClasses = ['section', `section-${section.type}`]

  if (section.styles) {
    Object.entries(section.styles).forEach(([property, value]) => {
      if (property === 'className') {
        baseClasses.push(value)
      }
    })
  }

  return baseClasses.join(' ')
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