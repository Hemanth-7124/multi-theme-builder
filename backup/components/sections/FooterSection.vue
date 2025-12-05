<template>
  <footer class="py-12 footer-section bg-surface text-primary">
    <div class="container px-6 mx-auto">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <!-- Brand Info -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <img
              v-if="content.brandLogo"
              :src="content.brandLogo"
              :alt="content.brandName"
              class="mr-3 h-8"
            />
            <h3 class="text-xl font-bold">
              {{ content.brandName }}
            </h3>
          </div>
          <p class="mb-4 text-secondary">
            {{ content.brandDescription }}
          </p>
          <div v-if="content.socialLinks" class="flex space-x-4">
            <a
              v-for="link in content.socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors text-secondary hover:text-primary"
            >
              {{ link.icon }}
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div v-if="content.quickLinks">
          <h4 class="mb-4 text-lg font-semibold">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in content.quickLinks" :key="link.text">
              <a
                :href="link.url"
                class="transition-colors text-secondary hover:text-primary"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div v-if="content.contact">
          <h4 class="mb-4 text-lg font-semibold">Contact</h4>
          <div class="space-y-2 text-secondary">
            <p v-if="content.contact.email">
              {{ content.contact.email }}
            </p>
            <p v-if="content.contact.phone">
              {{ content.contact.phone }}
            </p>
            <p v-if="content.contact.address">
              {{ content.contact.address }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 mt-8 text-center border-t border-border text-secondary">
        <p>
          © {{ currentYear }} {{ content.brandName }}. {{ content.copyrightText || 'All rights reserved.' }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { SectionConfig } from '../../../tokens/types'

interface Props {
  section: SectionConfig
}

const props = defineProps<Props>()

const content = computed(() => props.section.content || {})

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-section {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

.footer-section .text-secondary {
  color: var(--color-text-secondary);
}

.footer-section .text-primary {
  color: var(--color-text-primary);
}

.footer-section .hover\:text-primary:hover {
  color: var(--color-primary);
}

.footer-section .border-border {
  border-color: var(--color-border, rgba(0, 0, 0, 0.1));
}
</style>