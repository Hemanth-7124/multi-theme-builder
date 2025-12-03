<template>
  <div class="min-h-screen brand-bold token-bg" :data-brand="safeBrandConfig.id">
    <!-- Bold, impactful header -->
    <header class="relative border-b-2 shadow-xl" style="border-color: var(--color-primary); background: var(--color-surface);">
      <!-- Accent bar for visual impact -->
      <div class="w-full h-1" :style="{ background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)' }"></div>

      <nav class="container px-6 py-6 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Bold logo styling -->
          <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-4 transition-all duration-300 transform group hover:scale-105">
            <div class="relative">
              <div class="absolute -inset-2 rounded-xl opacity-20 blur-lg transition-opacity duration-300 bg-primary group-hover:opacity-30"></div>
              <img
                :src="safeBrandConfig.logo"
                :alt="`${safeBrandConfig.name} logo`"
                class="relative w-auto h-12 filter drop-shadow-lg"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-2xl font-black tracking-tight transition-all duration-300 text-primary group-hover:text-accent">
                {{ safeBrandConfig.name }}
              </span>
              <span class="text-sm font-bold tracking-wider uppercase text-text-muted">Enterprise Solution</span>
            </div>
          </NuxtLink>

          <!-- Bold navigation with strong styling -->
          <div class="hidden items-center space-x-2 xl:flex">
            <a
              v-for="navItem in safeBrandConfig.navigation"
              :key="navItem.href"
              :href="navItem.href"
              class="px-4 py-3 text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-200 transform text-text-secondary hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105"
            >
              {{ navItem.label }}
            </a>
          </div>

          <!-- Bold CTA button with strong presence -->
          <div class="flex items-center space-x-4">
            <button
              class="overflow-hidden relative px-8 py-4 font-black tracking-wider text-white uppercase rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl group"
              :style="{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-primary) 100%)' }"
            >
              <span class="relative z-10">{{ safeBrandConfig.cta.primary }}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent to-transparent -skew-x-12 via-white/20 group-hover:animate-shimmer"></div>
            </button>

            <!-- Mobile menu toggle with bold styling -->
            <button
              class="p-3 text-white rounded-xl shadow-lg transition-all duration-200 transform xl:hidden bg-primary hover:shadow-xl hover:scale-110"
              @click="toggleMobileMenu"
            >
              <Icon name="lucide:menu" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Bold mobile navigation with full-screen overlay -->
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95"
    >
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 xl:hidden">
        <div class="absolute inset-0 backdrop-blur-sm bg-black/80" @click="toggleMobileMenu"></div>
        <div class="overflow-hidden absolute inset-4 rounded-2xl border-2 shadow-2xl bg-surface border-primary">
          <div class="p-8">
            <div class="flex justify-between items-center mb-12">
              <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-4">
                <img :src="safeBrandConfig.logo" :alt="`${safeBrandConfig.name} logo`" class="w-auto h-10" />
                <span class="text-xl font-black text-primary">{{ safeBrandConfig.name }}</span>
              </NuxtLink>
              <button
                class="p-3 text-white rounded-xl shadow-lg bg-primary"
                @click="toggleMobileMenu"
              >
                <Icon name="lucide:x" class="w-6 h-6" />
              </button>
            </div>

            <nav class="grid grid-cols-1 gap-4 mb-12">
              <a
                v-for="navItem in safeBrandConfig.navigation"
                :key="navItem.href"
                :href="navItem.href"
                class="px-6 py-4 text-lg font-bold tracking-wider text-center text-white uppercase rounded-xl shadow-lg transition-all duration-200 transform text-text-secondary bg-primary hover:shadow-xl hover:scale-105"
                @click="toggleMobileMenu"
              >
                {{ navItem.label }}
              </a>
            </nav>

            <div class="text-center">
              <button
                class="px-8 py-6 w-full text-lg font-black tracking-wider text-white uppercase rounded-xl"
                :style="{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }"
              >
                {{ safeBrandConfig.cta.primary }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main content with accent border -->
    <main class="relative">
      <!-- Side accent bars for visual impact -->
      <div class="fixed top-0 bottom-0 left-0 w-1" :style="{ background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-accent) 100%)' }"></div>
      <div class="fixed top-0 right-0 bottom-0 w-1" :style="{ background: 'linear-gradient(180deg, var(--color-accent) 0%, var(--color-primary) 100%)' }"></div>

      <div class="container px-6 py-8 mx-auto">
        <slot />
      </div>
    </main>

    <!-- Bold footer with strong presence -->
    <footer class="relative mt-20 border-t-4 bg-surface" style="border-color: var(--color-primary);">
      <!-- Accent top border -->
      <div class="w-full h-2" :style="{ background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-primary) 100%)' }"></div>

      <div class="container px-6 py-16 mx-auto">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <!-- Brand section -->
          <div class="flex flex-col space-y-4">
            <div class="flex items-center space-x-3">
              <img :src="safeBrandConfig.logo" :alt="`${safeBrandConfig.name} logo`" class="w-auto h-8" />
              <span class="text-xl font-black text-primary">{{ safeBrandConfig.name }}</span>
            </div>
            <p class="font-medium text-text-muted">Enterprise-grade solutions for modern businesses.</p>
          </div>

          <!-- Links section -->
          <div class="flex flex-col space-y-4">
            <h3 class="text-lg font-bold tracking-wider uppercase text-primary">Quick Links</h3>
            <div class="space-y-2">
              <a href="#" class="block font-semibold transition-colors duration-200 text-text-secondary hover:text-primary">About Us</a>
              <a href="#" class="block font-semibold transition-colors duration-200 text-text-secondary hover:text-primary">Services</a>
              <a href="#" class="block font-semibold transition-colors duration-200 text-text-secondary hover:text-primary">Contact</a>
            </div>
          </div>

          <!-- CTA section -->
          <div class="flex flex-col space-y-4">
            <h3 class="text-lg font-bold tracking-wider uppercase text-primary">Get Started</h3>
            <button
              class="px-6 py-3 font-bold tracking-wider text-white uppercase rounded-lg"
              :style="{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }"
            >
              {{ safeBrandConfig.cta.primary }}
            </button>
          </div>
        </div>

        <div class="pt-8 mt-12 border-t-2 border-surface">
          <div class="flex flex-col justify-between items-center md:flex-row">
            <p class="font-bold text-text-muted">© 2024 {{ safeBrandConfig.name }}. All rights reserved.</p>
            <div class="flex items-center mt-4 space-x-6 md:mt-0">
              <a href="#" class="font-semibold transition-colors duration-200 text-text-secondary hover:text-primary">Privacy</a>
              <a href="#" class="font-semibold transition-colors duration-200 text-text-secondary hover:text-primary">Terms</a>
              <a href="#" class="font-semibold transition-colors duration-200 text-text-secondary hover:text-primary">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { BrandConfig } from '../../tokens/types'

// Accept brand config as prop from parent
const props = defineProps<{
  brandConfig: BrandConfig
}>()

// Use the passed brand config
const safeBrandConfig = computed(() => props.brandConfig)

// Debug: Log the brand config value in bold layout
console.log('Bold Layout - brandConfig:', props.brandConfig)

// Mobile menu state
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.brand-bold {
  /* Bold layout styles with strong visual presence */
}

/* Shimmer animation for CTA button */
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(100%) skewX(-12deg);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Strong shadows and borders */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Bold transitions for all interactive elements */
button, a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Strong focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: 8px;
}

/* Custom bold scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}
</style>