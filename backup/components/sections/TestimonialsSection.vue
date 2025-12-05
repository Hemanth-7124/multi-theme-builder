<template>
  <section class="py-16 testimonials-section bg-background">
    <div class="container px-6 mx-auto">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl text-primary">
            {{ content.title || 'What Our Clients Say' }}
          </h2>
          <p class="mx-auto max-w-3xl text-lg text-text-secondary" v-if="content.subtitle">
            {{ content.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="testimonial in content.testimonials"
            :key="testimonial.id"
            class="relative p-8 rounded-xl shadow-lg bg-surface"
          >
            <div class="absolute -top-4 left-8">
              <div class="flex justify-center items-center w-8 h-8 text-white rounded-full bg-accent">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex items-center mb-4">
                <img
                  :src="testimonial.avatar || '/placeholder-avatar.jpg'"
                  :alt="testimonial.name"
                  class="mr-4 w-12 h-12 rounded-full border-2 border-surface"
                  loading="lazy"
                />
                <div>
                  <h4 class="font-semibold text-primary">{{ testimonial.name }}</h4>
                  <p class="text-sm text-text-secondary">{{ testimonial.role }}</p>
                  <p class="text-xs text-text-muted">{{ testimonial.company }}</p>
                </div>
              </div>

              <div class="flex mb-4">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-4 h-4"
                  :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            <blockquote class="italic text-text-secondary">
              "{{ testimonial.content }}"
            </blockquote>

            <div v-if="testimonial.result" class="pt-6 mt-6 border-t border-gray-200">
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-primary">{{ testimonial.result.label }}</span>
                <span class="text-lg font-bold text-accent">{{ testimonial.result.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="content.stats" class="mt-16">
          <div class="p-8 rounded-xl bg-surface">
            <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div
                v-for="stat in content.stats"
                :key="stat.label"
              >
                <div class="mb-2 text-3xl font-bold text-primary">{{ stat.value }}</div>
                <div class="text-sm text-text-secondary">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="content.cta" class="mt-12 text-center">
          <p class="mb-4 text-text-secondary">{{ content.cta.text }}</p>
          <button
            @click="handleCtaClick(content.cta.href)"
            class="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
          >
            {{ content.cta.buttonText }}
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TestimonialResult {
  label: string
  value: string
}

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  rating: number
  content: string
  result?: TestimonialResult
}

interface Stats {
  value: string
  label: string
}

interface Content {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  stats?: Stats[]
  cta?: {
    text: string
    buttonText: string
    href: string
  }
}

interface Props {
  content: Content
}

const props = defineProps<Props>()

const handleCtaClick = (href: string) => {
  // Handle CTA click
}
</script>