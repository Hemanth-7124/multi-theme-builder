<template>
  <!-- Use page-level loading states - just render the content -->
  <div class="brand-shell" :class="`brand-shell-${safeBrandConfig?.theme?.layout || 'default'}`">
    <!-- Brand Header -->
    <header v-if="safeBrandConfig" class="border-b brand-header" style="background-color: var(--color-surface); border-color: var(--color-border);">
      <nav class="container px-4 py-4 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-3">
            <img
              :src="safeBrandConfig.logo"
              :alt="`${safeBrandConfig.name} logo`"
              class="w-auto h-8"
              loading="lazy"
            />
            <span class="text-xl font-semibold" style="color: var(--color-primary);">{{ safeBrandConfig.name }}</span>
          </NuxtLink>

          <!-- Navigation -->
          <div class="hidden items-center space-x-6 md:flex">
            <a
              v-for="navItem in safeBrandConfig.navigation"
              :key="navItem.href"
              :href="navItem.href"
              class="transition-colors"
              style="color: var(--color-text-secondary);"
              @mouseenter="$event.target.style.color = 'var(--color-primary)'"
              @mouseleave="$event.target.style.color = 'var(--color-text-secondary)'"
            >
              {{ navItem.label }}
            </a>
          </div>

          <!-- CTA Button -->
          <button
            class="px-4 py-2 font-medium rounded-md"
            style="background-color: var(--color-primary); color: var(--color-text-inverse);"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-primary-hover)'"
            @mouseleave="$event.target.style.backgroundColor = 'var(--color-primary)'"
          >
            {{ safeBrandConfig.cta.primary }}
          </button>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="brand-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { BrandConfig } from '../../tokens/types'
import { useSafeBrandConfig } from '~/composables/useBrandState'

// Get brand config from shared state
const safeBrandConfig = useSafeBrandConfig()

// Debug: Log the brand config value
console.log('BrandShell Layout - safeBrandConfig:', safeBrandConfig.value)
</script>

<style scoped>
.brand-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.brand-main {
  flex: 1;
}

.brand-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
}

/* Layout variations */
.brand-shell-minimal .brand-header {
  border-bottom: none;
}

.brand-shell-modern .brand-header {
  box-shadow: var(--shadow-md);
}

.brand-shell-bold .brand-header {
  box-shadow: var(--shadow-lg);
  border-width: 2px;
}
</style>