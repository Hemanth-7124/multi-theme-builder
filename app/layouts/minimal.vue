<template>
  <div class="min-h-screen brand-minimal token-bg" :data-brand="safeBrandConfig.id">
    <!-- Minimal header - just logo and nav -->
    <header class="token-surface" style="border-bottom: 1px solid var(--color-border);">
      <div class="container px-6 py-4 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Simple logo -->
          <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center">
            <img
              :src="safeBrandConfig.logo"
              :alt="`${safeBrandConfig.name} logo`"
              class="w-auto h-8"
            />
            <span class="ml-3 text-lg font-light" :style="{ color: 'var(--color-text-primary)' }">
              {{ safeBrandConfig.name }}
            </span>
          </NuxtLink>

          <!-- Minimal navigation -->
          <nav class="hidden items-center space-x-8 md:flex">
            <a
              v-for="navItem in safeBrandConfig.navigation"
              :key="navItem.href"
              :href="navItem.href"
              class="text-sm font-medium transition-colors duration-200"
              :style="{ color: 'var(--color-text-secondary)' }"
              @mouseover="$event.target.style.color = 'var(--color-text-primary)'"
              @mouseout="$event.target.style.color = 'var(--color-text-secondary)'"
            >
              {{ navItem.label }}
            </a>
            <button
              class="px-4 py-2 text-sm font-medium transition-all duration-200"
              :style="{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-inverse)'
              }"
              @mouseover="$event.target.style.opacity = '0.8'"
              @mouseout="$event.target.style.opacity = '1'"
            >
              {{ safeBrandConfig.cta.primary }}
            </button>
          </nav>

          <!-- Mobile menu -->
          <button class="md:hidden" @click="toggleMobileMenu">
            <Icon name="lucide:menu" class="w-5 h-5" :style="{ color: 'var(--color-text-primary)' }" />
          </button>
        </div>
      </div>

      <!-- Mobile navigation slide down -->
      <div v-if="mobileMenuOpen" class="border-t md:hidden" style="border-color: var(--color-border);">
        <div class="container px-6 py-4 mx-auto space-y-3">
          <a
            v-for="navItem in safeBrandConfig.navigation"
            :key="navItem.href"
            :href="navItem.href"
            class="block py-2 text-sm"
            :style="{ color: 'var(--color-text-secondary)' }"
            @click="toggleMobileMenu"
          >
            {{ navItem.label }}
          </a>
          <button
            class="py-2 w-full text-sm font-medium text-left"
            :style="{ color: 'var(--color-primary)' }"
          >
            {{ safeBrandConfig.cta.primary }}
          </button>
        </div>
      </div>
    </header>

    <!-- Clean main content area -->
    <main class="container px-6 py-12 mx-auto">
      <slot />
    </main>

    <!-- Minimal footer -->
    <footer class="py-8 text-center">
      <p class="text-xs" :style="{ color: 'var(--color-text-muted)' }">
        © {{ new Date().getFullYear() }} {{ safeBrandConfig.name }}
      </p>
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
  }
})
</script>


<style scoped>
.brand-minimal {
  /* Minimal layout styles - clean and simple */
}

/* Remove all unnecessary decorations */
header {
  box-shadow: none;
}

/* Minimal typography */
main {
  line-height: 1.6;
}

/* Clean transitions */
a, button {
  transition: all 0.15s ease-in-out;
}

/* Focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove animations on reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>