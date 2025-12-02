<template>
  <section class="faq-section py-16 bg-surface">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
            {{ content.title || 'Frequently Asked Questions' }}
          </h2>
          <p class="text-lg text-text-secondary" v-if="content.subtitle">
            {{ content.subtitle }}
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in content.faqs"
            :key="index"
            class="bg-background rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 class="text-lg font-semibold text-primary">{{ faq.question }}</h3>
              <svg
                class="w-5 h-5 text-text-secondary transition-transform duration-200"
                :class="{ 'rotate-180': openFaq === index }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openFaq === index"
              class="px-6 pb-4 text-text-secondary"
            >
              <p class="leading-relaxed">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div v-if="content.contactCta" class="text-center mt-12">
          <p class="text-text-secondary mb-4">{{ content.contactCta.text }}</p>
          <a
            :href="content.contactCta.href"
            class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {{ content.contactCta.buttonText }}
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FAQ {
  question: string
  answer: string
}

interface Content {
  title?: string
  subtitle?: string
  faqs: FAQ[]
  contactCta?: {
    text: string
    buttonText: string
    href: string
  }
}

interface Props {
  content: Content
}

const props = defineProps<Props>()

const openFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>