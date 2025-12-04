<template>
  <div class="min-h-screen brand-classic token-bg" :data-brand="safeBrandConfig.id">
    <!-- Classic traditional header -->
    <header class="border-b-2 token-surface" style="border-color: var(--color-primary);">
      <div class="container px-4 py-6 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Traditional logo and name -->
          <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-4">
            <img
              :src="safeBrandConfig.logo"
              :alt="`${safeBrandConfig.name} logo`"
              class="w-auto h-12"
            />
            <div>
              <h1 class="text-2xl font-serif font-bold" :style="{ color: 'var(--color-primary)' }">
                {{ safeBrandConfig.name }}
              </h1>
              <p class="text-sm italic" :style="{ color: 'var(--color-text-secondary)' }">
                {{ safeBrandConfig.description }}
              </p>
            </div>
          </NuxtLink>

          <!-- Classic navigation -->
          <nav class="hidden md:block">
            <ul class="flex space-x-8">
              <li v-for="navItem in safeBrandConfig.navigation" :key="navItem.href">
                <a
                  :href="navItem.href"
                  class="font-serif text-lg font-medium hover:underline"
                  :style="{ color: 'var(--color-text-primary)' }"
                >
                  {{ navItem.label }}
                </a>
              </li>
            </ul>
          </nav>

          <!-- Traditional CTA button -->
          <button
            class="px-8 py-3 font-serif font-bold border-2 transition-all duration-200 hover:shadow-md"
            :style="{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              backgroundColor: 'transparent'
            }"
            @mouseover="$event.target.style.backgroundColor = 'var(--color-primary)'"
            @mouseout="$event.target.style.color = 'var(--color-primary)'; $event.target.style.backgroundColor = 'transparent'"
            @mouseenter="$event.target.style.color = 'var(--color-text-inverse)'"
          >
            {{ safeBrandConfig.cta.primary }}
          </button>
        </div>

        <!-- Mobile menu button -->
        <button class="mt-4 md:hidden" @click="toggleMobileMenu">
          <Icon name="lucide:menu" class="w-6 h-6" :style="{ color: 'var(--color-text-primary)' }" />
        </button>
      </div>

      <!-- Mobile navigation -->
      <div v-if="mobileMenuOpen" class="border-t md:hidden token-surface" style="border-color: var(--color-surface);">
        <nav class="container px-4 py-4 mx-auto">
          <ul class="space-y-3">
            <li v-for="navItem in safeBrandConfig.navigation" :key="navItem.href">
              <a
                :href="navItem.href"
                class="block font-serif text-lg"
                :style="{ color: 'var(--color-text-primary)' }"
                @click="toggleMobileMenu"
              >
                {{ navItem.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main content area -->
    <main class="container px-4 py-8 mx-auto">
      <slot />
    </main>

    <!-- Classic footer -->
    <footer class="mt-16 border-t token-surface" style="border-color: var(--color-surface);">
      <div class="container px-4 py-8 mx-auto text-center">
        <div class="mb-4">
          <img :src="safeBrandConfig.logo" :alt="`${safeBrandConfig.name} logo`" class="w-auto h-8 mx-auto" />
        </div>
        <p class="font-serif text-sm" :style="{ color: 'var(--color-text-muted)' }">
          © {{ new Date().getFullYear() }} {{ safeBrandConfig.name }}. All rights reserved.
        </p>
        <div class="mt-4 flex justify-center space-x-6">
          <a href="#" class="font-serif hover:underline" :style="{ color: 'var(--color-text-secondary)' }">Privacy Policy</a>
          <a href="#" class="font-serif hover:underline" :style="{ color: 'var(--color-text-secondary)' }">Terms of Service</a>
          <a href="#" class="font-serif hover:underline" :style="{ color: 'var(--color-text-secondary)' }">Contact Us</a>
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

// Mobile menu state
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.brand-classic {
  /* Classic layout styles */
}

/* Classic typography and spacing */
header {
  font-family: Georgia, serif;
}

/* Classic button styling */
button {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Classic link styling */
a:hover {
  text-decoration: underline;
}

/* Traditional section separators */
main {
  min-height: calc(100vh - 200px);
}
</style>