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
          <div class="section-loading flex justify-center items-center p-12">
            <div class="text-center">
              <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
const FooterSection = defineAsyncComponent(() => import('./sections/FooterSection.vue'))
const FaqSection = defineAsyncComponent(() => import('./sections/FaqSection.vue'))
const AboutSection = defineAsyncComponent(() => import('./sections/AboutSection.vue'))
const ServicesSection = defineAsyncComponent(() => import('./sections/ServicesSection.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('./sections/TestimonialsSection.vue'))
const HighlightsSection = defineAsyncComponent(() => import('./sections/HighlightsSection.vue'))
const PartnersSection = defineAsyncComponent(() => import('./sections/PartnersSection.vue'))

// Map section types to components
const sectionComponents = {
  hero: HeroSection,
  features: FeaturesSection,
  cta: CtaSection,
  footer: FooterSection,
  faq: FaqSection,
  about: AboutSection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  highlights: HighlightsSection,
  partners: PartnersSection
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

// Log for debugging
watchEffect(() => {
  if (props.sections?.length > 0) {
    console.log('SectionRenderer rendering sections:', props.sections.map(s => ({ id: s.id, type: s.type })))
  }
})
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