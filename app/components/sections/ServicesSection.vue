<template>
  <section class="services-section py-16 bg-surface">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
            {{ content.title || 'Our Services' }}
          </h2>
          <p class="text-lg text-text-secondary max-w-3xl mx-auto" v-if="content.subtitle">
            {{ content.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in content.services"
            :key="service.id"
            class="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="w-16 h-16 bg-accent text-white rounded-lg flex items-center justify-center mb-6">
              <img
                v-if="service.icon"
                :src="service.icon"
                :alt="service.title"
                class="w-8 h-8"
                loading="lazy"
              />
              <svg v-else class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary mb-3">{{ service.title }}</h3>
            <p class="text-text-secondary mb-4">{{ service.description }}</p>

            <div v-if="service.features" class="mb-6">
              <ul class="space-y-2">
                <li
                  v-for="feature in service.features"
                  :key="feature"
                  class="flex items-center text-text-secondary text-sm"
                >
                  <svg class="w-4 h-4 text-accent mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-primary font-semibold">{{ service.price }}</span>
              <button
                v-if="service.cta"
                @click="handleServiceCta(service.cta)"
                class="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
              >
                {{ service.cta.text }}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="content.process" class="mt-20">
          <h3 class="text-2xl font-bold text-center text-primary mb-12">Our Process</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div
              v-for="(step, index) in content.process"
              :key="index"
              class="text-center"
            >
              <div class="relative mb-6">
                <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto">
                  <span class="text-xl font-bold">{{ index + 1 }}</span>
                </div>
                <div
                  v-if="index < content.process.length - 1"
                  class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20"
                ></div>
              </div>
              <h4 class="text-lg font-semibold text-primary mb-2">{{ step.title }}</h4>
              <p class="text-text-secondary text-sm">{{ step.description }}</p>
            </div>
          </div>
        </div>

        <div v-if="content.cta" class="text-center mt-16">
          <div class="bg-primary text-white rounded-xl p-8 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold mb-4">{{ content.cta.title }}</h3>
            <p class="mb-6">{{ content.cta.description }}</p>
            <button
              @click="handleCtaClick(content.cta.button.href)"
              class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {{ content.cta.button.text }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceFeature {
  text: string
}

interface ServiceCTA {
  text: string
  href: string
}

interface Service {
  id: string
  title: string
  description: string
  icon?: string
  features?: string[]
  price?: string
  cta?: ServiceCTA
}

interface ProcessStep {
  title: string
  description: string
}

interface Content {
  title?: string
  subtitle?: string
  services: Service[]
  process?: ProcessStep[]
  cta?: {
    title: string
    description: string
    button: {
      text: string
      href: string
    }
  }
}

interface Props {
  content: Content
}

const props = defineProps<Props>()

const handleServiceCta = (cta: ServiceCTA) => {
  // Handle service-specific CTA clicks
  console.log('Service CTA clicked:', cta)
}

const handleCtaClick = (href: string) => {
  // Handle main CTA click
  console.log('Main CTA clicked:', href)
}
</script>