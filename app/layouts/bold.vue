<template>
  <div class="min-h-screen brand-bold token-bg" :data-brand="safeBrandConfig.id">
    <!-- Bold, striking header -->
    <header class="relative token-surface" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);">
      <div class="container px-4 py-8 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Bold logo presentation -->
          <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-4 group">
            <div class="relative">
              <img
                :src="safeBrandConfig.logo"
                :alt="`${safeBrandConfig.name} logo`"
                class="w-auto h-14 transition-transform duration-300 transform group-hover:rotate-3"
              />
              <div class="absolute -right-2 -bottom-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div class="text-white">
              <h1 class="text-3xl font-black tracking-tight uppercase">
                {{ safeBrandConfig.name }}
              </h1>
              <div class="flex items-center mt-1 space-x-2">
                <div class="w-8 h-1 bg-yellow-400"></div>
                <span class="text-sm font-bold">{{ safeBrandConfig.description }}</span>
              </div>
            </div>
          </NuxtLink>

          <!-- Bold navigation -->
          <nav class="hidden items-center space-x-2 lg:flex">
            <a
              v-for="navItem in safeBrandConfig.navigation"
              :key="navItem.href"
              :href="navItem.href"
              class="px-6 py-3 text-sm font-black tracking-wide text-white uppercase rounded-lg transition-all duration-200 hover:bg-white/20"
            >
              {{ navItem.label }}
            </a>
          </nav>

          <!-- Bold CTA button -->
          <div class="flex items-center space-x-4">
            <button
              class="px-8 py-4 text-sm font-black tracking-wide text-black uppercase bg-yellow-400 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110 hover:bg-yellow-300 hover:rotate-1"
            >
              {{ safeBrandConfig.cta.primary }}
            </button>

            <!-- Mobile menu -->
            <button class="p-3 text-white lg:hidden" @click="toggleMobileMenu">
              <Icon name="lucide:menu" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile navigation -->
      <div v-if="mobileMenuOpen" class="backdrop-blur-lg lg:hidden bg-black/20">
        <div class="container px-4 py-4 mx-auto space-y-2">
          <a
            v-for="navItem in safeBrandConfig.navigation"
            :key="navItem.href"
            :href="navItem.href"
            class="block px-4 py-3 font-bold text-white"
            @click="toggleMobileMenu"
          >
            {{ navItem.label }}
          </a>
          <button class="px-4 py-3 w-full font-bold text-left text-black bg-yellow-400 rounded-lg">
            {{ safeBrandConfig.cta.primary }}
          </button>
        </div>
      </div>
    </header>

    <!-- Bold main content with dramatic sections -->
    <main>
      <!-- Decorative element -->
      <div class="relative h-1">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 animate-pulse"></div>
      </div>

      <div class="container px-4 py-12 mx-auto">
        <slot />
      </div>
    </main>

    <!-- Bold footer -->
    <footer class="overflow-hidden relative text-white token-surface" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);">
      <!-- Pattern overlay -->
      <div class="absolute inset-0 opacity-10">
        <div class="w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);"></div>
      </div>

      <div class="container relative px-4 py-12 mx-auto">
        <div class="flex flex-col justify-between items-center md:flex-row">
          <div class="flex items-center mb-6 space-x-4 md:mb-0">
            <img :src="safeBrandConfig.logo" :alt="`${safeBrandConfig.name} logo`" class="w-auto h-10" />
            <div>
              <h3 class="text-2xl font-black uppercase">{{ safeBrandConfig.name }}</h3>
              <p class="text-sm font-bold opacity-90">MAKING WAVES</p>
            </div>
          </div>

          <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            <a href="#" class="font-bold transition-colors hover:text-yellow-400">About</a>
            <a href="#" class="font-bold transition-colors hover:text-yellow-400">Services</a>
            <a href="#" class="font-bold transition-colors hover:text-yellow-400">Contact</a>
            <div class="flex space-x-4">
              <!-- Social icons placeholder -->
              <div class="w-8 h-8 bg-yellow-400 rounded-full"></div>
              <div class="w-8 h-8 bg-yellow-400 rounded-full"></div>
              <div class="w-8 h-8 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div class="pt-8 mt-8 text-center border-t border-white/20">
          <p class="font-bold">© {{ new Date().getFullYear() }} {{ safeBrandConfig.name }}. ALL RIGHTS RESERVED.</p>
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
  }
})
</script>

<style scoped>
.brand-bold {
  /* Bold layout styles */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Strong contrasts and shadows */
* {
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Dramatic hover effects */
a:hover, button:hover {
  transform: translateY(-2px);
}

/* Bold animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Strong borders and dividers */
.border-t {
  border-top-width: 4px;
}

/* Aggressive transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>