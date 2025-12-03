<template>
  <div
    class="min-h-screen brand-shell token-bg"
    :class="layoutClasses"
    :data-brand="brandConfig.id"
  >
    <!-- Brand Header -->
    <header class="border-b brand-header token-surface" :style="headerStyles">
      <nav class="container px-4 py-4 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <NuxtLink
            :to="`/${brandConfig.id}`"
            class="flex items-center space-x-3 group"
            :class="logoClasses"
          >
            <img
              :src="brandConfig.logo"
              :alt="`${brandConfig.name} logo`"
              class="w-auto h-8 transition-transform group-hover:scale-105"
              :class="logoImageClasses"
            />
            <span
              class="font-semibold transition-colors leading-tight"
              :class="titleClasses"
              :style="{ color: 'var(--color-primary)' }"
            >
              {{ brandConfig.name }}
            </span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden items-center space-x-6 md:flex">
            <NuxtLink
              v-for="navItem in brandConfig.navigation"
              :key="navItem.href"
              :href="navItem.href"
              class="transition-all duration-200 hover:scale-105"
              :class="navLinkClasses"
            >
              {{ navItem.label }}
            </NuxtLink>
          </div>

          <!-- CTA Button -->
          <button
            class="px-6 py-2.5 font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
            :class="ctaButtonClasses"
            :style="ctaButtonStyle"
          >
            {{ brandConfig.cta.primary }}
          </button>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1 brand-main">
      <slot />
    </main>

    <!-- Mobile Navigation (for responsive) -->
    <div
      class="fixed right-0 bottom-0 left-0 border-t md:hidden token-surface"
      :style="mobileNavStyles"
    >
      <div class="flex justify-around items-center py-2">
        <button class="p-2 rounded-lg" @click="toggleMobileMenu">
          <Icon name="lucide:menu" class="w-5 h-5" :style="{ color: 'var(--color-text-primary)' }" />
        </button>
        <NuxtLink
          :to="`/${brandConfig.id}`"
          class="p-2"
        >
          <img
            :src="brandConfig.logo"
            :alt="`${brandConfig.name} logo`"
            class="w-auto h-6"
          />
        </NuxtLink>
        <button
          class="px-3 py-1.5 text-xs font-medium rounded-md"
          :style="ctaButtonStyle"
        >
          {{ brandConfig.cta.primary }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BrandConfig } from '../../../tokens/types'
import { useTokens } from '../composables/useTokens'

interface Props {
  brandConfig: BrandConfig
}

const props = defineProps<Props>()

const { getToken } = useTokens()

// Dynamic layout classes based on brand theme
const layoutClasses = computed(() => {
  const layout = props.brandConfig.theme.layout
  return {
    'layout-modern': layout === 'modern',
    'layout-minimal': layout === 'minimal',
    'layout-bold': layout === 'bold',
  }
})

// Component-specific classes based on layout
const logoClasses = computed(() => {
  switch (props.brandConfig.theme.layout) {
    case 'modern':
      return 'hover:opacity-90'
    case 'minimal':
      return 'hover:opacity-80'
    case 'bold':
      return 'hover:rotate-1'
    default:
      return ''
  }
})

const logoImageClasses = computed(() => {
  switch (props.brandConfig.theme.layout) {
    case 'modern':
      return 'filter drop-shadow-sm'
    case 'minimal':
      return 'filter grayscale-0'
    case 'bold':
      return 'filter drop-shadow-md'
    default:
      return ''
  }
})

const titleClasses = computed(() => {
  const baseClasses = 'token-primary'
  switch (props.brandConfig.theme.layout) {
    case 'modern':
      return `${baseClasses} text-xl tracking-tight`
    case 'minimal':
      return `${baseClasses} text-lg font-light tracking-wide`
    case 'bold':
      return `${baseClasses} text-2xl font-bold tracking-normal`
    default:
      return baseClasses
  }
})

const navLinkClasses = computed(() => {
  const baseClasses = 'token-secondary'
  switch (props.brandConfig.theme.layout) {
    case 'modern':
      return `${baseClasses} hover:token-primary font-medium`
    case 'minimal':
      return `${baseClasses} hover:token-primary font-light`
    case 'bold':
      return `${baseClasses} hover:token-primary font-semibold text-sm uppercase tracking-wide`
    default:
      return baseClasses
  }
})

const ctaButtonClasses = computed(() => {
  switch (props.brandConfig.theme.layout) {
    case 'modern':
      return 'shadow-lg hover:shadow-xl text-white'
    case 'minimal':
      return 'shadow-sm hover:shadow-md text-white'
    case 'bold':
      return 'shadow-xl hover:shadow-2xl text-white font-bold uppercase tracking-wide'
    default:
      return 'text-white'
  }
})

// Dynamic styles
const headerStyles = computed(() => {
  const borderColor = getToken('color-surface')
  return {
    borderColor,
  }
})

const mobileNavStyles = computed(() => {
  const borderColor = getToken('color-surface')
  return {
    borderColor,
  }
})

const ctaButtonStyle = computed(() => {
  return {
    backgroundColor: getToken('color-primary'),
  }
})

// Mobile menu state
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Apply brand tokens when component mounts
onMounted(() => {
  // Tokens are already applied via the plugin, but we can ensure they're correct
  console.log(`🎨 BrandShell initialized for: ${props.brandConfig.name}`)
})
</script>

<style scoped>
.brand-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.brand-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.brand-main {
  flex: 1;
}

/* Layout-specific styles */
.layout-modern .brand-header {
  box-shadow: var(--shadow-md);
}

.layout-minimal .brand-header {
  border-bottom-width: 1px;
}

.layout-bold .brand-header {
  box-shadow: var(--shadow-lg);
  border-bottom: 2px solid var(--color-surface);
}

/* Smooth transitions for all interactive elements */
button, a {
  transition: all 0.2s ease;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .brand-main {
    padding-bottom: 4rem; /* Account for mobile nav */
  }
}
</style>