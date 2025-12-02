<template>
  <div v-if="safeBrandConfig" class="minimal-layout min-h-screen token-bg" :data-brand="safeBrandConfig.id">
    <!-- Minimal header with just logo -->
    <header class="p-6 border-b" style="border-color: var(--color-border);">
      <div class="max-w-6xl mx-auto flex items-center justify-center">
        <NuxtLink :to="`/${safeBrandConfig.id}`" class="flex items-center space-x-3 group">
          <img
            :src="safeBrandConfig.logo"
            :alt="`${safeBrandConfig.name} logo`"
            class="w-auto h-8 transition-opacity duration-200 group-hover:opacity-80"
            loading="lazy"
          />
          <span class="text-2xl font-light tracking-wide transition-colors duration-200" style="color: var(--color-primary);">
            {{ safeBrandConfig.name }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <!-- Minimal navigation -->
    <nav v-if="safeBrandConfig.navigation?.length" class="px-4 py-3 border-b" style="border-color: var(--color-border);">
      <div class="max-w-6xl mx-auto flex justify-center items-center space-x-8">
        <a
          v-for="navItem in safeBrandConfig.navigation"
          :key="navItem.href"
          :href="navItem.href"
          class="text-sm font-light tracking-wide transition-colors duration-200"
          style="color: var(--color-text-secondary);"
          @mouseenter="$event.target.style.color = 'var(--color-primary)'"
          @mouseleave="$event.target.style.color = 'var(--color-text-secondary)'"
        >
          {{ navItem.label }}
        </a>
      </div>
    </nav>

    <!-- Content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSafeBrandConfig } from '~/composables/useBrandState'

// Get brand config from shared state
const safeBrandConfig = useSafeBrandConfig()
</script>

<style scoped>
.minimal-layout {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>