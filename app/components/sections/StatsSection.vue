<template>
  <BaseAdapter :section="section" :content="content">
    <div class="stats-section">
      <div class="stats-container">
        <!-- Section Header -->
        <div v-if="content?.title || content?.subtitle" class="stats-header">
          <h2 v-if="content?.title" class="stats-title" v-html="content.title"></h2>
          <p v-if="content?.subtitle" class="stats-subtitle" v-html="content.subtitle"></p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div
            v-for="(stat, index) in content?.stats"
            :key="index"
            class="stat-item"
            :style="getStatDelay(index)"
          >
            <div class="stat-value" v-html="stat.value"></div>
            <div class="stat-label" v-html="stat.label"></div>
          </div>
        </div>

        <!-- Optional CTA -->
        <div v-if="content?.cta" class="stats-cta">
          <button
            @click="handleCtaClick"
            class="cta-button"
            :style="buttonStyles"
          >
            <span class="button-text" v-html="content.cta.text"></span>
            <div class="shine"></div>
          </button>
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
  name: 'StatsAdapter',

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
  },

  emits: ['cta-click'],

  computed: {
    buttonStyles(): Record<string, any> {
      return {
        background: `linear-gradient(180deg, var(--color-primary), var(--color-primary-hover))`,
        color: 'var(--color-text-inverse)',
        border: `1px solid var(--color-primary)`
      }
    }
  },

  methods: {
    getStatDelay(index: number): Record<string, any> {
      return {
        animationDelay: `${index * 0.1}s`
      }
    },

    handleCtaClick() {
      this.$emit('cta-click', {
        sectionId: this.section.id,
        sectionType: this.section.type,
        ctaData: this.content?.cta
      })

      if (this.content?.cta?.href) {
        navigateTo?.(this.content.cta.href)
      }
    }
  }
})
</script>

<style scoped>
.stats-section {
  padding: var(--spacing-24) 0;
  background: var(--color-background);
}

.stats-container {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
  text-align: center;
}

/* Header Styles */
.stats-header {
  margin-bottom: var(--spacing-16);
}

.stats-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  line-height: var(--line-height-tight);
}

.stats-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: var(--container-max, 600px);
  margin: 0 auto;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--spacing-48), 1fr));
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-16);
}

.stat-item {
  opacity: 0;
  transform: translateY(var(--spacing-5));
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-value {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
  font-family: var(--font-family-mono);
  letter-spacing: var(--letter-spacing-wide);
}

.stat-label {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
}

/* CTA Section */
.stats-cta {
  margin-top: var(--spacing-12);
}

.cta-button {
  position: relative;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast, 0.3s ease);
  overflow: hidden;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.cta-button:active {
  transform: translateY(0);
}

.cta-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.button-text {
  position: relative;
  z-index: 2;
}

.shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 60%
  );
  animation: shine 6s linear infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-section {
    padding: var(--spacing-16) 0;
  }

  .stats-container {
    padding: 0 var(--spacing-4);
  }

  .stats-title {
    font-size: var(--font-size-3xl);
  }

  .stats-subtitle {
    font-size: var(--font-size-lg);
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-6);
  }

  .stat-value {
    font-size: var(--font-size-4xl);
  }

  .stat-label {
    font-size: var(--font-size-base);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .stat-item {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .shine {
    animation: none;
  }

  .cta-button {
    transition: none;
  }

  .cta-button:hover {
    transform: none;
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
</style>