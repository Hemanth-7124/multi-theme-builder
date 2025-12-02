<template>
  <section class="about-section py-16 bg-background">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
            {{ content.title || 'About Us' }}
          </h2>
          <p class="text-lg text-text-secondary max-w-3xl mx-auto" v-if="content.subtitle">
            {{ content.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div class="prose prose-lg text-text-secondary" v-html="content.story"></div>
            <div v-if="content.stats" class="grid grid-cols-2 gap-6 mt-8">
              <div
                v-for="stat in content.stats"
                :key="stat.label"
                class="text-center"
              >
                <div class="text-3xl font-bold text-primary">{{ stat.value }}</div>
                <div class="text-sm text-text-secondary">{{ stat.label }}</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <img
              :src="content.image || '/placeholder-about.jpg'"
              :alt="content.imageAlt || 'About us image'"
              class="rounded-xl shadow-lg w-full"
              loading="lazy"
            />
            <div v-if="content.experienceBadge" class="absolute -bottom-6 -right-6 bg-primary text-white rounded-lg p-4 shadow-xl">
              <div class="text-2xl font-bold">{{ content.experienceBadge.years }}</div>
              <div class="text-sm">{{ content.experienceBadge.text }}</div>
            </div>
          </div>
        </div>

        <div v-if="content.values" class="border-t pt-16">
          <h3 class="text-2xl font-bold text-center text-primary mb-12">Our Values</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="value in content.values"
              :key="value.title"
              class="text-center"
            >
              <div class="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-primary mb-2">{{ value.title }}</h4>
              <p class="text-text-secondary">{{ value.description }}</p>
            </div>
          </div>
        </div>

        <div v-if="content.team" class="border-t pt-16 mt-16">
          <h3 class="text-2xl font-bold text-center text-primary mb-12">Our Team</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div
              v-for="member in content.team"
              :key="member.name"
              class="text-center"
            >
              <img
                :src="member.photo || '/placeholder-avatar.jpg'"
                :alt="member.name"
                class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-surface"
                loading="lazy"
              />
              <h4 class="text-lg font-semibold text-primary">{{ member.name }}</h4>
              <p class="text-text-secondary text-sm">{{ member.role }}</p>
              <p class="text-text-muted text-xs mt-2">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stats {
  value: string
  label: string
}

interface ExperienceBadge {
  years: string
  text: string
}

interface Value {
  title: string
  description: string
}

interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: string
}

interface Content {
  title?: string
  subtitle?: string
  story: string
  image?: string
  imageAlt?: string
  stats?: Stats[]
  experienceBadge?: ExperienceBadge
  values?: Value[]
  team?: TeamMember[]
}

interface Props {
  content: Content
}

const props = defineProps<Props>()
</script>