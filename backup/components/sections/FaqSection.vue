<template>
  <section class="py-16 faq-section bg-surface">
    <div class="container px-6 mx-auto">
      <div class="mx-auto max-w-4xl">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl text-primary">
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
            class="overflow-hidden rounded-lg border border-gray-200 shadow-md bg-background"
          >
            <button
              @click="toggleFaq(index)"
              class="flex justify-between items-center px-6 py-4 w-full text-left transition-colors hover:bg-gray-50"
            >
              <h3 class="text-lg font-semibold text-primary">{{ faq.question }}</h3>
              <svg
                class="w-5 h-5 transition-transform duration-200 text-text-secondary"
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
              <p class="text-base">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div v-if="content.contactCta" class="mt-12 text-center">
          <p class="mb-4 text-text-secondary">{{ content.contactCta.text }}</p>
          <a
            :href="content.contactCta.href"
            class="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
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