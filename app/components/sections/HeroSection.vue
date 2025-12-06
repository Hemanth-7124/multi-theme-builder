<template>
  <BaseAdapter :section="section" :content="content" :custom-styles="computedStyles">
    <div class="hero-section">
      <!-- Main content container matching reference design -->
      <div class="hero-container">
        <!-- Left column: Main content -->
        <div class="hero-main">
          <!-- Badge section -->
          <div v-if="content?.badge" class="hero-badge">
            <div class="badge-stars" v-if="content.badge.showStars !== false">
              <svg viewBox="0 0 20 20" fill="currentColor" class="star-icon">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg viewBox="0 0 20 20" fill="currentColor" class="star-icon">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg viewBox="0 0 20 20" fill="currentColor" class="star-icon">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg viewBox="0 0 20 20" fill="currentColor" class="star-icon">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg viewBox="0 0 20 20" fill="currentColor" class="star-icon">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div v-if="content.badge.text" class="badge-text" v-html="content.badge.text"></div>
          </div>

          <!-- Title section -->
          <div class="hero-title">
            <h2 v-if="content?.secondaryTitle" class="secondary-title" v-html="content.secondaryTitle"></h2>
            <h1 v-if="content?.title" class="main-title" v-html="content.title"></h1>
            <p v-if="content?.description" class="description" v-html="content.description"></p>
          </div>

          <!-- CTA Button in main content -->
          <div v-if="content?.workshop?.button?.text" class="main-cta">
            <button
              @click="handleCtaClick"
              class="cta-button"
              :style="buttonStyles"
            >
              <span class="button-text" v-html="content.workshop.button.text"></span>
              <div class="shine"></div>
            </button>
          </div>
        </div>

        <!-- Right column: Mentor and workshop details -->
        <div class="hero-sidebar">
          <!-- Mentor info -->
          <div v-if="content?.mentor" class="mentor-info">
            <div v-if="content.mentor.image" class="mentor-image-wrapper">
              <img
                :src="content.mentor.image"
                :alt="content.mentor.name || 'Mentor'"
                class="mentor-image"
              />
            </div>
            <div class="mentor-details">
              <div v-if="content.mentor.highlight" class="mentor-highlight" v-html="content.mentor.highlight"></div>
              <h3 v-if="content.mentor.name" class="mentor-name" v-html="content.mentor.name"></h3>
              <p v-if="content.mentor.tagline" class="mentor-tagline" v-html="content.mentor.tagline"></p>
            </div>
          </div>

          <!-- Workshop details cards -->
          <div v-if="content?.workshop?.cards" class="workshop-cards">
            <div
              v-for="(card, index) in content.workshop.cards"
              :key="index"
              class="workshop-card"
            >
              <h4 v-if="card.title" class="card-title" v-html="card.title"></h4>
              <p v-if="card.content" class="card-content" v-html="card.content"></p>
            </div>
          </div>

          <!-- Timer -->
          <div v-if="content?.workshop?.showTimer !== false" class="timer-section">
            <div v-if="content.workshop.timerPrefix" class="timer-prefix" v-html="content.workshop.timerPrefix"></div>
            <div class="timer-display">
              {{ formattedTime }}
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
  name: 'SpecialOfferAdapter',

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

  data() {
    return {
      countdown: 180, // 3 minutes in seconds
      intervalId: null as any
    }
  },

  computed: {
    computedStyles(): Record<string, any> {
      const styles: Record<string, any> = {}

      if (this.content?.backgroundColor) {
        styles.backgroundColor = this.content.backgroundColor
      }
      return styles
    },

    buttonStyles(): Record<string, any> {
      return {
        background: `linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))`,
        color: 'var(--color-text-inverse)',
        border: `1px solid var(--color-primary)`
      }
    },

    formattedTime(): string {
      const minutes = Math.floor(this.countdown / 60)
      const seconds = this.countdown % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },

  mounted() {
    this.startCountdown()
  },

  unmounted() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },

  methods: {
    startCountdown() {
      this.intervalId = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          this.countdown = 180 // reset 3 min
        }
      }, 1000)
    },

    handleCtaClick() {
      this.$emit('cta-click', {
        sectionId: this.section.id,
        sectionType: this.section.type,
        buttonData: this.content?.workshop?.button
      })

      if (this.content?.workshop?.button?.href) {
        navigateTo?.(this.content.workshop.button.href)
      }
    }
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  padding: var(--spacing-32) 0;
  overflow: hidden;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-16);
  align-items: start;
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
  }
}

/* Main Content Column */
.hero-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  text-align: left;
}

@media (max-width: 1024px) {
  .hero-main {
    text-align: center;
  }
}

/* Badge Styles */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--badge-background, rgba(255, 255, 255, 0.1));
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  align-self: flex-start;
}

@media (max-width: 1024px) {
  .hero-badge {
    align-self: center;
  }
}

.badge-stars {
  display: flex;
  gap: var(--spacing-1);
}

.star-icon {
  width: var(--spacing-4);
  height: var(--spacing-4);
  color: var(--star-color, #fbbf24);
}

.badge-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Title Styles */
.hero-title {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.secondary-title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.main-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
}

@media (max-width: 1024px) {
  .description {
    max-width: none;
    margin: 0 auto;
  }
}

/* CTA Button */
.main-cta {
  margin-top: var(--spacing-4);
}

.cta-button {
  position: relative;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-inverse);
  cursor: pointer;
  transition: all var(--transition-fast, 0.3s ease);
  overflow: hidden;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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

/* Sidebar Column */
.hero-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

/* Mentor Info */
.mentor-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
  padding: var(--spacing-6);
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .mentor-info {
    flex-direction: column;
    text-align: center;
  }
}

.mentor-image-wrapper {
  flex-shrink: 0;
}

.mentor-image {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 3px solid var(--color-border);
}

.mentor-details {
  flex: 1;
}

.mentor-highlight {
  font-size: var(--font-size-sm);
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-1);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.mentor-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-1);
}

.mentor-tagline {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

/* Workshop Cards */
.workshop-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.workshop-card {
  padding: var(--spacing-5);
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast, 0.3s ease);
}

.workshop-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.card-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--spacing-2);
}

.card-content {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

/* Timer Section */
.timer-section {
  padding: var(--spacing-6);
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.timer-prefix {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-3);
  font-weight: var(--font-weight-medium);
}

.timer-display {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  font-family: var(--font-family-mono);
  letter-spacing: var(--letter-spacing-wide);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-20) 0;
  }

  .hero-container {
    padding: 0 var(--spacing-4);
    gap: var(--spacing-8);
  }

  .main-title {
    font-size: var(--font-size-4xl);
  }

  .description {
    font-size: var(--font-size-base);
  }

  .mentor-image {
    width: 64px;
    height: 64px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .shine {
    animation: none;
  }

  .cta-button {
    transition: none;
  }

  .cta-button:hover {
    transform: none;
  }

  .workshop-card {
    transition: none;
  }

  .workshop-card:hover {
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