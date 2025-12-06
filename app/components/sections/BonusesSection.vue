<template>
  <BaseAdapter :section="section" :content="content">
    <div class="bonuses-section">
      <!-- Section Header -->
      <div class="bonuses-header">
        <h2 v-if="content?.title" class="bonuses-title" v-html="content.title"></h2>
        <p v-if="content?.subtitle" class="bonuses-subtitle" v-html="content.subtitle"></p>
      </div>

      <!-- Bonuses Grid -->
      <div class="bonuses-grid">
        <div
          v-for="(bonus, index) in content?.items"
          :key="index"
          class="bonus-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Bonus Header -->
          <div class="bonus-header">
            <div v-if="bonus.title" class="bonus-title" v-html="bonus.title"></div>
          </div>

          <!-- Bonus Content -->
          <div class="bonus-content">
            <div v-if="bonus.image" class="bonus-image-wrapper">
              <img
                :src="bonus.image"
                :alt="bonus.name || 'Bonus'"
                class="bonus-image"
              />
            </div>
            <div class="bonus-details">
              <h3 v-if="bonus.name" class="bonus-name" v-html="bonus.name"></h3>
              <p v-if="bonus.type" class="bonus-type" v-html="bonus.type"></p>
            </div>
          </div>

          <!-- Bonus Footer -->
          <div class="bonus-footer">
            <div v-if="bonus.price" class="bonus-price" v-html="bonus.price"></div>
            <div v-if="bonus.footerImage" class="bonus-footer-image">
              <img
                :src="bonus.footerImage"
                :alt="'Free gift badge'"
                class="footer-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseAdapter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { SectionConfig } from '../../../tokens/types'
import BaseAdapter from './BaseAdapter.vue'

export default defineComponent({
  name: 'SectionAdapter',

  components: {
    BaseAdapter
  },

  props: {
    section: {
      type: Object as () => SectionConfig,
      required: true
    },
    content: {
      type: Object as () => any,
      default: () => ({})
    }
  }
})
</script>

<style scoped>
.bonuses-section {
  padding: var(--spacing-24) 0;
  background: var(--color-background);
}

/* Header Styles */
.bonuses-header {
  text-align: center;
  margin-bottom: var(--spacing-20);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-6);
}

.bonuses-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  line-height: var(--line-height-tight);
}

.bonuses-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* Bonuses Grid */
.bonuses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-8);
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

/* Bonus Cards */
.bonus-card {
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all var(--transition-fast, 0.3s ease);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.bonus-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Bonus Header */
.bonus-header {
  background: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-6);
  text-align: center;
}

.bonus-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-inverse);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin: 0;
}

/* Bonus Content */
.bonus-content {
  padding: var(--spacing-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  gap: var(--spacing-4);
}

.bonus-image-wrapper {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  margin-bottom: var(--spacing-4);
}

.bonus-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-border);
}

.bonus-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.bonus-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: var(--line-height-tight);
}

.bonus-type {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin: 0;
}

/* Bonus Footer */
.bonus-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-6);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--color-border);
}

.bonus-price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.bonus-footer-image {
  flex-shrink: 0;
}

.footer-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Animation */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .bonuses-section {
    padding: var(--spacing-16) 0;
  }

  .bonuses-header {
    margin-bottom: var(--spacing-16);
    padding: 0 var(--spacing-4);
  }

  .bonuses-title {
    font-size: var(--font-size-3xl);
  }

  .bonuses-subtitle {
    font-size: var(--font-size-lg);
  }

  .bonuses-grid {
    gap: var(--spacing-6);
    padding: 0 var(--spacing-4);
  }

  .bonus-image-wrapper {
    width: 100px;
    height: 100px;
  }

  .bonus-name {
    font-size: var(--font-size-lg);
  }

  .bonus-footer {
    padding: var(--spacing-3) var(--spacing-4);
  }
}

@media (max-width: 480px) {
  .bonuses-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  .bonus-image-wrapper {
    width: 80px;
    height: 80px;
  }

  .bonus-content {
    padding: var(--spacing-6);
  }

  .bonus-header,
  .bonus-footer {
    padding: var(--spacing-3) var(--spacing-4);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .bonus-card {
    transition: none;
  }

  .bonus-card:hover {
    transform: none;
  }

  .bonus-card {
    opacity: 1;
    transform: translateY(0);
    animation: none;
  }
}

/* Rich Text Support */
:deep(.tiptap-text) p {
  margin: 0;
}

:deep(.tiptap-text) strong {
  font-weight: var(--font-weight-bold);
}

:deep(.tiptap-text) em {
  font-style: italic;
}

:deep(.tiptap-text) u {
  text-decoration: underline;
}

:deep(.tiptap-text) mark {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}
</style>