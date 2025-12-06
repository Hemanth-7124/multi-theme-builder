<template>
  <BaseAdapter :section="section" :content="content">
    <div class="features-section">
      <!-- Section Header -->
      <div class="features-header">
        <h2 v-if="content?.title" class="features-title" v-html="content.title"></h2>
        <p v-if="content?.subtitle" class="features-subtitle" v-html="content.subtitle"></p>
      </div>

      <!-- Feature Cards Grid -->
      <div class="features-grid">
        <div
          v-for="(item, index) in content?.items"
          :key="index"
          class="feature-card"
          :class="getCardClasses(item, index)"
          :style="getCardStyles(item, index)"
        >
          <!-- Offer Badge -->
          <div v-if="item.offerPercentage" class="offer-badge">
            <span class="offer-percentage" v-html="item.offerPercentage"></span>
            <span v-if="item.offText" class="off-text" v-html="item.offText"></span>
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <!-- Image Section -->
            <div class="image-section">
              <div v-if="item.image" class="image-wrapper">
                <img
                  :src="item.image"
                  :alt="`Feature ${index + 1}`"
                  class="feature-image"
                />
              </div>
              <!-- Price/Value Display -->
              <div v-if="item.price" class="price-display" v-html="item.price"></div>
            </div>

            <!-- Features List -->
            <div v-if="item.points && item.points.length" class="points-section">
              <ul class="points-list">
                <li v-for="(point, pointIndex) in item.points" :key="pointIndex" class="point-item">
                  <div class="point-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor" class="tick-icon">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="point-text" v-html="point"></span>
                </li>
              </ul>
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
  name: 'CardAdapter',

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

  methods: {
    // Dynamic card class builder
    getCardClasses(item: any, index: number): string {
      const classes = ['card-wrapper']

      if (index === 1) {
        classes.push('featured-card')
      }

      return classes.join(' ')
    },

    // Dynamic card style builder
    getCardStyles(item: any, index: number): Record<string, any> {
      const styles: Record<string, any> = {}

      let primaryColor = 'var(--color-primary)'
      let secondaryColor = 'var(--color-primary-hover)'

      if (item.background) {
        switch (item.background) {
          case 'green':
            primaryColor = 'var(--color-success)'
            secondaryColor = 'var(--color-success-hover, var(--color-success))'
            break
          case 'red':
            primaryColor = 'var(--color-error)'
            secondaryColor = 'var(--color-error-hover, var(--color-error))'
            break
          case 'black':
            primaryColor = 'var(--color-text-primary)'
            secondaryColor = 'var(--color-text-secondary)'
            break
          default:
            primaryColor = 'var(--color-primary)'
            secondaryColor = 'var(--color-primary-hover)'
            break
        }
      }

      // default gradient
      styles.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`

      // style override for featured card
      if (index === 1) {
        styles.background = `linear-gradient(135deg,
          var(--color-primary),
          var(--color-primary-hover)
        )`
        styles.transform = 'scale(1.05)'
        styles.boxShadow = 'var(--shadow-2xl)'
      }

      return styles
    }
  }
})
</script>

<style scoped>
.features-section {
  padding: var(--spacing-16) 0;
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
}

/* Section Header */
.features-header {
  text-align: center;
  margin-bottom: var(--spacing-16);
}

.features-title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  line-height: var(--line-height-tight);
}

.features-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  margin: 0 auto;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
  padding: 0 var(--spacing-4);
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(var(--spacing-80), 1fr));
    gap: var(--spacing-8);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
  }
}

/* Feature Cards */
.feature-card {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-lg);
}

.feature-card:hover {
  transform: translateY(calc(-1 * var(--spacing-4)));
  box-shadow: var(--shadow-2xl);
}

.feature-card.featured-card:hover {
  transform: scale(1.05) translateY(calc(-1 * var(--spacing-4)));
}

/* Offer Badge */
.offer-badge {
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-full);
  z-index: 10;
}

.offer-percentage {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inverse);
}

.off-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-inverse);
  opacity: 0.8;
  margin-left: var(--spacing-1);
}

/* Card Content */
.card-content {
  padding: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  height: 100%;
}

@media (min-width: 1024px) {
  .card-content {
    flex-direction: row;
    align-items: center;
    padding: var(--spacing-8);
    gap: var(--spacing-8);
  }
}

/* Image Section */
.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.image-wrapper {
  width: var(--spacing-40);
  height: var(--spacing-32);
  margin-bottom: var(--spacing-4);
}

@media (min-width: 1024px) {
  .image-wrapper {
    width: var(--spacing-44);
    height: var(--spacing-36);
  }
}

.feature-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
  aspect-ratio: 5/4;
}

.price-display {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-text-inverse);
  text-align: center;
  line-height: var(--line-height-tight);
}

/* Points Section */
.points-section {
  flex: 1;
}

.points-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2-5, 0.625rem);
}

.point-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);
}

.point-icon {
  flex-shrink: 0;
  margin-top: var(--spacing-0-5, 0.125rem);
}

.tick-icon {
  width: var(--spacing-5);
  height: var(--spacing-5);
  color: var(--color-success);
}

.point-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--line-height-relaxed);
}

/* Featured Card Special Styles */
.featured-card {
  position: relative;
}

.featured-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--color-accent), var(--color-primary), var(--color-accent));
  border-radius: var(--radius-2xl);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.featured-card:hover::before {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 1023px) {
  .features-section {
    padding: var(--spacing-12) 0;
  }

  .features-title {
    font-size: var(--font-size-3xl);
  }

  .card-content {
    text-align: center;
  }
}

@media (max-width: 767px) {
  .features-grid {
    gap: var(--spacing-6);
  }

  .card-content {
    padding: var(--spacing-5);
  }

  .image-wrapper {
    width: var(--spacing-36);
    height: var(--spacing-28);
  }

  .price-display {
    font-size: var(--font-size-2xl);
  }
}
</style>