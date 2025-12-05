<template>
  <section class="highlights-section py-16 bg-surface">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
            {{ content.title || 'Key Highlights' }}
          </h2>
          <p class="text-lg text-text-secondary max-w-3xl mx-auto" v-if="content.subtitle">
            {{ content.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div
            v-for="highlight in content.highlights"
            :key="highlight.id"
            class="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  v-if="highlight.icon"
                  :src="highlight.icon"
                  :alt="highlight.title"
                  class="w-6 h-6"
                  loading="lazy"
                />
                <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-primary mb-2">{{ highlight.title }}</h3>
                <p class="text-text-secondary text-sm">{{ highlight.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="content.achievements" class="mb-16">
          <h3 class="text-2xl font-bold text-center text-primary mb-12">Our Achievements</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="achievement in content.achievements"
              :key="achievement.title"
              class="text-center"
            >
              <div class="bg-primary text-white rounded-xl p-6 mb-4">
                <div class="text-3xl font-bold mb-2">{{ achievement.value }}</div>
                <div class="text-sm">{{ achievement.metric }}</div>
              </div>
              <h4 class="font-semibold text-primary">{{ achievement.title }}</h4>
              <p class="text-text-secondary text-sm mt-2">{{ achievement.description }}</p>
            </div>
          </div>
        </div>

        <div v-if="content.media" class="mb-16">
          <h3 class="text-2xl font-bold text-center text-primary mb-12">In the Spotlight</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="item in content.media"
              :key="item.title"
              class="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                :src="item.image || '/placeholder-media.jpg'"
                :alt="item.title"
                class="w-full h-48 object-cover"
                loading="lazy"
              />
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-accent">{{ item.type }}</span>
                  <span class="text-text-muted text-xs">{{ item.date }}</span>
                </div>
                <h4 class="text-lg font-semibold text-primary mb-2">{{ item.title }}</h4>
                <p class="text-text-secondary text-sm mb-4">{{ item.description }}</p>
                <a
                  :href="item.url"
                  class="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center"
                >
                  Read More
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="content.callToAction" class="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white">
          <h3 class="text-2xl font-bold mb-4">{{ content.callToAction.title }}</h3>
          <p class="mb-6">{{ content.callToAction.description }}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              v-if="content.callToAction.primaryButton"
              @click="handleCtaClick(content.callToAction.primaryButton.href)"
              class="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {{ content.callToAction.primaryButton.text }}
            </button>
            <button
              v-if="content.callToAction.secondaryButton"
              @click="handleCtaClick(content.callToAction.secondaryButton.href)"
              class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              {{ content.callToAction.secondaryButton.text }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Highlight {
  id: string
  title: string
  description: string
  icon?: string
}

interface Achievement {
  title: string
  description: string
  value: string
  metric: string
}

interface MediaItem {
  title: string
  description: string
  type: string
  date: string
  url: string
  image?: string
}

interface CallToAction {
  title: string
  description: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
}

interface Content {
  title?: string
  subtitle?: string
  highlights: Highlight[]
  achievements?: Achievement[]
  media?: MediaItem[]
  callToAction?: CallToAction
}

interface Props {
  content: Content
}

const props = defineProps<Props>()

const handleCtaClick = (href: string) => {
  // Handle CTA click
}
</script>