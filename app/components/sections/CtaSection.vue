<template>
  <BaseAdapter :section="section" :content="content" :custom-styles="computedStyles">
    <div class="cta-section">
      <!-- Main CTA Card -->
      <div class="cta-card" :style="cardStyles">
        <!-- Main Text -->
        <h2 v-if="content?.text" class="cta-text" v-html="content.text"></h2>

        <!-- CTA Button -->
        <button
          v-if="content?.button?.text"
          @click="handleCtaClick"
          class="cta-button"
          :style="buttonStyles"
        >
          <span class="button-text" v-html="content.button.text"></span>
          <div class="shine"></div>
        </button>

        <!-- Social Proof Section -->
        <div
          v-if="showSocialProof"
          class="social-proof"
        >
          <!-- Stars -->
          <div v-if="content?.showStars !== false" class="stars-container">
            <div
              v-for="i in 5"
              :key="i"
              class="star"
            >
              <svg viewBox="0 0 17 16" fill="currentColor" class="star-icon">
                <path d="M15.2055 7.14863L12.3868 9.60863L13.2312 13.2711C13.2758 13.4626 13.2631 13.663 13.1945 13.8472C13.1259 14.0315 13.0045 14.1914 12.8455 14.3071C12.6865 14.4227 12.497 14.489 12.3005 14.4975C12.1041 14.5059 11.9095 14.4564 11.7412 14.3549L8.54678 12.4174L5.35928 14.3549C5.19089 14.4564 4.99632 14.5059 4.79989 14.4975C4.60346 14.489 4.4139 14.4227 4.2549 14.3071C4.0959 14.1914 3.97452 14.0315 3.90594 13.8472C3.83735 13.663 3.8246 13.4626 3.86928 13.2711L4.71241 9.61238L1.89303 7.14863C1.74391 7.02002 1.63608 6.85024 1.58307 6.66059C1.53005 6.47094 1.53421 6.26986 1.59501 6.08257C1.65582 5.89527 1.77057 5.7301 1.92488 5.60776C2.07919 5.48542 2.26618 5.41137 2.46241 5.39488L6.17866 5.073L7.62928 1.613C7.70503 1.43145 7.83281 1.27637 7.99652 1.16729C8.16023 1.05821 8.35256 1 8.54928 1C8.746 1 8.93833 1.05821 9.10204 1.16729C9.26575 1.27637 9.39353 1.43145 9.46928 1.613L10.9243 5.073L14.6393 5.39488C14.8355 5.41137 15.0225 5.48542 15.1768 5.60776C15.3311 5.7301 15.4459 5.89527 15.5067 6.08257C15.5675 6.26986 15.5716 6.47094 15.5186 6.66059C15.4656 6.85024 15.3578 7.02002 15.2087 7.14863H15.2055Z"/>
              </svg>
            </div>
          </div>

          <!-- Rating Text -->
          <div
            v-if="content?.ratingText"
            class="rating-text"
            v-html="content.ratingText"
          ></div>
        </div>
      </div>
    </div>
  </BaseAdapter>
</template>

<script setup lang="ts">
import type { SectionConfig } from '../../../tokens/types'
import BaseAdapter from './BaseAdapter.vue'

interface Props {
  section: SectionConfig
  content?: any
}

const props = defineProps<Props>()

// Computed styles for the section
const computedStyles = computed(() => {
  const styles: Record<string, any> = {}

  // Apply section background if specified
  if (props.content?.backgroundColor) {
    styles.backgroundColor = props.content.backgroundColor
  }

  return styles
})

// Card styles with gradient background
const cardStyles = computed(() => ({
  background: `linear-gradient(119deg,
    rgba(255, 255, 255, 0.05) 0.05%,
    ${getPrimaryColorWithOpacity('30%')} 50.05%,
    rgba(255, 255, 255, 0.05) 100.05%
  )`,
  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
}))

// Button styles with gradient background
const buttonStyles = computed(() => ({
  background: `linear-gradient(180deg, var(--color-primary), var(--color-primary-hover))`,
  boxShadow: `
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 6px 12px ${getPrimaryColorWithOpacity('20%')},
    inset -2px -2px 4px rgba(0, 0, 0, 0.2),
    inset 2px 2px 4px rgba(0, 0, 0, 0.2)
  `
}))

// Get primary color with opacity for gradients
const getPrimaryColorWithOpacity = (opacity: string) => {
  // This is a simplified approach - in production you might want to parse the CSS variable
  // and apply opacity programmatically
  return `rgba(5, 150, 105, ${opacity})` // Fallback green with opacity
}

// Computed property for social proof visibility
const showSocialProof = computed(() => {
  return props.content?.showStars !== false || !!props.content?.ratingText
})

// Handle CTA button click
const handleCtaClick = () => {
  emit('cta-click', {
    sectionId: props.section.id,
    sectionType: props.section.type,
    buttonData: props.content?.button
  })

  // Example navigation (can be customized based on requirements)
  if (props.content?.button?.href) {
    navigateTo(props.content.button.href)
  }
}

const emit = defineEmits<{
  'cta-click': [data: any]
}>()
</script>

<style scoped>
.cta-section {
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* CTA Card */
.cta-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  border-radius: var(--radius-2xl);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .cta-card {
    padding: 3rem 2.5rem;
  }
}

@media (min-width: 1024px) {
  .cta-card {
    padding: 3rem;
  }
}

/* CTA Text */
.cta-text {
  font-family: 'Sora', var(--font-family-sans);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .cta-text {
    font-size: var(--font-size-4xl);
  }
}

@media (min-width: 1024px) {
  .cta-text {
    font-size: 3.25rem; /* 52px equivalent */
    line-height: 3.75rem; /* 60px equivalent */
  }
}

/* CTA Button */
.cta-button {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-lg);
  border: none;
  color: var(--color-text-inverse);
  white-space: nowrap;
  transition: all 0.3s ease;
  width: 100%;
}

@media (min-width: 768px) {
  .cta-button {
    width: auto;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .cta-button {
    margin-top: 2rem;
    padding: 1rem 1.5rem;
  }
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 8px 16px rgba(5, 150, 105, 0.3),
    inset -2px -2px 4px rgba(0, 0, 0, 0.2),
    inset 2px 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.cta-button:active {
  transform: translateY(0);
}

.button-text {
  position: relative;
  z-index: 2;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-relaxed);
}

@media (min-width: 1024px) {
  .button-text {
    font-size: var(--font-size-xl);
  }
}

/* Shine Effect */
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

/* Social Proof Section */
.social-proof {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Stars Container */
.stars-container {
  display: flex;
  gap: 0.25rem;
}

.star {
  display: flex;
  align-items: center;
}

.star-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Rating Text */
.rating-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}

@media (min-width: 1024px) {
  .rating-text {
    font-size: var(--font-size-base);
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

/* Responsive Design */
@media (max-width: 767px) {
  .cta-section {
    padding: 2rem 1rem;
  }

  .cta-text {
    font-size: var(--font-size-2xl);
  }
}

/* Focus States for Accessibility */
.cta-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
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
}
</style>