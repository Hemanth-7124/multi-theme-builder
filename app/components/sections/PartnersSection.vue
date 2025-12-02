<template>
  <section class="partners-section py-16 bg-background">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
            {{ content.title || 'Our Partners' }}
          </h2>
          <p class="text-lg text-text-secondary max-w-3xl mx-auto" v-if="content.subtitle">
            {{ content.subtitle }}
          </p>
        </div>

        <!-- Partner Categories -->
        <div v-if="content.categories" class="mb-16">
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              v-for="category in content.categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
                'px-6 py-2 rounded-full font-medium transition-colors',
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary hover:bg-primary hover:text-white'
              ]"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Featured Partners -->
        <div v-if="content.featuredPartners" class="mb-16">
          <h3 class="text-2xl font-bold text-center text-primary mb-8">Featured Partners</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="partner in filteredFeaturedPartners"
              :key="partner.id"
              class="bg-surface rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <img
                :src="partner.logo || '/placeholder-logo.svg'"
                :alt="partner.name"
                class="h-20 mx-auto mb-4 object-contain"
                loading="lazy"
              />
              <h4 class="text-lg font-semibold text-primary mb-2">{{ partner.name }}</h4>
              <p class="text-text-secondary text-sm mb-4">{{ partner.description }}</p>
              <div v-if="partner.badge" class="inline-block px-3 py-1 bg-accent text-white text-xs rounded-full mb-4">
                {{ partner.badge }}
              </div>
              <a
                v-if="partner.website"
                :href="partner.website"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center"
              >
                Visit Website
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Partner Logos Grid -->
        <div v-if="content.partnerLogos" class="mb-16">
          <h3 class="text-xl font-semibold text-center text-primary mb-8">Trusted by Leading Companies</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div
              v-for="partner in filteredPartnerLogos"
              :key="partner.id"
              class="flex items-center justify-center p-4 bg-surface rounded-lg hover:shadow-md transition-all duration-300"
            >
              <img
                :src="partner.logo || '/placeholder-logo.svg'"
                :alt="partner.name"
                class="h-12 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Partnership Programs -->
        <div v-if="content.programs" class="mb-16">
          <h3 class="text-2xl font-bold text-center text-primary mb-12">Partnership Programs</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="program in content.programs"
              :key="program.id"
              class="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white"
            >
              <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h4 class="text-xl font-bold mb-3">{{ program.name }}</h4>
              <p class="mb-6 text-white/90">{{ program.description }}</p>
              <ul class="space-y-2 mb-6 text-white/80 text-sm">
                <li v-for="benefit in program.benefits" :key="benefit" class="flex items-center">
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ benefit }}
                </li>
              </ul>
              <button
                @click="handleProgramClick(program.id)"
                class="w-full bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        <!-- Partner CTA -->
        <div v-if="content.cta" class="text-center">
          <div class="bg-surface rounded-xl p-8 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-primary mb-4">{{ content.cta.title }}</h3>
            <p class="text-text-secondary mb-6">{{ content.cta.description }}</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                v-if="content.cta.primaryButton"
                @click="handleCtaClick(content.cta.primaryButton.href)"
                class="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {{ content.cta.primaryButton.text }}
              </button>
              <button
                v-if="content.cta.secondaryButton"
                @click="handleCtaClick(content.cta.secondaryButton.href)"
                class="px-8 py-3 bg-surface text-primary rounded-lg font-semibold hover:bg-background transition-colors border border-primary/20"
              >
                {{ content.cta.secondaryButton.text }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PartnerCategory {
  id: string
  name: string
}

interface FeaturedPartner {
  id: string
  name: string
  description: string
  logo?: string
  website?: string
  badge?: string
  category: string
}

interface PartnerLogo {
  id: string
  name: string
  logo: string
  category: string
}

interface PartnershipProgram {
  id: string
  name: string
  description: string
  benefits: string[]
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
  categories?: PartnerCategory[]
  featuredPartners?: FeaturedPartner[]
  partnerLogos?: PartnerLogo[]
  programs?: PartnershipProgram[]
  cta?: CallToAction
}

interface Props {
  content: Content
}

const props = defineProps<Props>()

const selectedCategory = ref<string>('all')

const filteredFeaturedPartners = computed(() => {
  if (!props.content.featuredPartners) return []
  if (selectedCategory.value === 'all') return props.content.featuredPartners
  return props.content.featuredPartners.filter(partner => partner.category === selectedCategory.value)
})

const filteredPartnerLogos = computed(() => {
  if (!props.content.partnerLogos) return []
  if (selectedCategory.value === 'all') return props.content.partnerLogos
  return props.content.partnerLogos.filter(partner => partner.category === selectedCategory.value)
})

const handleProgramClick = (programId: string) => {
  console.log('Program clicked:', programId)
}

const handleCtaClick = (href: string) => {
  console.log('Partners CTA clicked:', href)
}
</script>