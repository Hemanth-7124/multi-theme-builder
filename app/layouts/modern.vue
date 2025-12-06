<template>
  <div class="min-h-screen brand-modern token-bg" :data-brand="safeBrandConfig.id">
    <!-- Modern sticky header with glassmorphism effect -->
    <header class="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-lg bg-surface/80" style="border-color: var(--color-surface);">
      <nav class="container px-6 py-4 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Logo with modern styling -->
          <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-3 group">
            <div class="relative">
              <img
                :src="safeBrandConfig.logo"
                :alt="`${safeBrandConfig.name} logo`"
                class="w-auto h-10 filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute -inset-1 bg-gradient-to-r rounded-lg opacity-0 blur-sm transition-opacity duration-300 from-primary/20 to-accent/20 group-hover:opacity-100"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-xl font-bold transition-colors duration-200 text-primary group-hover:text-accent">
                {{ safeBrandConfig.name }}
              </span>
              <span class="text-xs font-medium text-text-muted">AI Platform</span>
            </div>
          </NuxtLink>

          <!-- Centered navigation with modern styling -->
          <div class="hidden items-center space-x-8 lg:flex">
            <NuxtLink
              v-for="navItem in safeBrandConfig.navigation"
              :key="navItem.href"
              :href="navItem.href"
              class="relative py-2 font-medium transition-all duration-200 text-text-secondary hover:text-primary hover:scale-105"
            >
              {{ navItem.label }}
              <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r transition-transform duration-300 transform scale-x-0 from-primary to-accent hover:scale-x-100"></div>
            </NuxtLink>
          </div>

          <!-- Modern CTA button with gradient -->
          <div class="flex items-center space-x-4">
            <button
              class="overflow-hidden relative px-6 py-3 font-semibold text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              :style="{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }"
            >
              <span class="relative z-10">{{ safeBrandConfig.cta.primary }}</span>
              <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </button>

            <!-- Mobile menu toggle -->
            <button class="p-2 rounded-lg transition-colors lg:hidden hover:bg-surface/50" @click="toggleMobileMenu">
              <Icon name="lucide:menu" class="w-6 h-6" :style="{ color: 'var(--color-text-primary)' }" />
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Mobile navigation with slide-in effect -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-x-full"
      enter-to-class="transform translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0"
      leave-to-class="transform -translate-x-full"
    >
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 lg:hidden">
        <div class="fixed inset-0 bg-black/50" @click="toggleMobileMenu"></div>
        <div class="fixed top-0 right-0 w-80 h-full border-l shadow-2xl bg-surface">
          <div class="p-6">
            <div class="flex justify-between items-center mb-8">
              <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-3">
                <img :src="safeBrandConfig.logo" :alt="`${safeBrandConfig.name} logo`" class="w-auto h-8" />
                <span class="text-lg font-bold text-primary">{{ safeBrandConfig.name }}</span>
              </NuxtLink>
              <button class="p-2 rounded-lg hover:bg-surface/50" @click="toggleMobileMenu">
                <Icon name="lucide:x" class="w-5 h-5" :style="{ color: 'var(--color-text-primary)' }" />
              </button>
            </div>
            <nav class="space-y-4">
              <a
                v-for="navItem in safeBrandConfig.navigation"
                :key="navItem.href"
                :href="navItem.href"
                class="block px-4 py-3 font-medium rounded-lg transition-colors duration-200 text-text-secondary hover:bg-surface/50 hover:text-primary"
                @click="toggleMobileMenu"
              >
                {{ navItem.label }}
              </a>
            </nav>
            <div class="mt-8">
              <button
                class="px-6 py-3 w-full font-semibold text-white rounded-xl"
                :style="{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }"
              >
                {{ safeBrandConfig.cta.primary }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main content with proper padding for fixed header -->
    <main class="pt-20">
      <slot />
    </main>

    <!-- Modern footer -->
    <footer class="mt-20 border-t bg-surface" style="border-color: var(--color-surface);">
      <div class="container px-6 py-12 mx-auto">
        <div class="flex flex-col justify-between items-center md:flex-row">
          <div class="flex items-center mb-4 space-x-3 md:mb-0">
            <img :src="safeBrandConfig.logo" :alt="`${safeBrandConfig.name} logo`" class="w-auto h-6" />
            <span class="text-sm text-text-muted">© 2024 {{ safeBrandConfig.name }}. All rights reserved.</span>
          </div>
          <div class="flex items-center space-x-6">
            <a href="#" class="transition-colors duration-200 text-text-muted hover:text-primary">Privacy</a>
            <a href="#" class="transition-colors duration-200 text-text-muted hover:text-primary">Terms</a>
            <a href="#" class="transition-colors duration-200 text-text-muted hover:text-primary">Support</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { BrandConfig } from '../../tokens/types'

export default defineComponent({
  name: 'BrandHeader',

  props: {
    brandConfig: {
      type: Object as () => BrandConfig,
      required: true
    }
  },

  data() {
    return {
      mobileMenuOpen: false
    }
  },

  computed: {
    safeBrandConfig(): BrandConfig {
      return this.brandConfig
    }
  },

  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    }
  },

  watch: {
    // Automatically triggers on route path change
    '$route.path'() {
      this.mobileMenuOpen = false
    }
  }
})
</script>

<style scoped>
.brand-modern {
  /* Modern layout styles */
}

/* Glassmorphism effect for header */
header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Custom scrollbar for mobile menu */
.fixed.right-0::-webkit-scrollbar {
  width: 4px;
}

.fixed.right-0::-webkit-scrollbar-track {
  background: transparent;
}

.fixed.right-0::-webkit-scrollbar-thumb {
  background: var(--color-surface);
  border-radius: 2px;
}

/* Smooth transitions for all interactive elements */
button, a {
  transition: all 0.2s ease;
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>