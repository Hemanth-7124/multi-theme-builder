<template>
  <BaseAdapter :section="section" :content="content">
    <div class="testimonials-section">
      <!-- Section Header -->
      <div class="testimonials-header">
        <div v-if="content?.badge" class="testimonials-badge" v-html="content.badge"></div>
        <h2 v-if="content?.title" class="testimonials-title" v-html="content.title"></h2>
      </div>

      <!-- Testimonials Container -->
      <div class="testimonials-container">
        <!-- Left fade gradient -->
        <div class="fade-gradient fade-left"></div>

        <!-- Main testimonials scroll -->
        <div class="testimonials-scroll testimonials-scroll-primary">
          <div
            v-for="(testimonial, index) in scrollableTestimonials"
            :key="`primary-${index}`"
            class="testimonial-card"
          >
            <!-- Testimonial Content -->
            <div class="testimonial-content">
              <div v-if="testimonial.title" class="testimonial-title" v-html="testimonial.title"></div>
              <div v-if="testimonial.description" class="testimonial-description" v-html="testimonial.description"></div>
            </div>

            <!-- Testimonial Author -->
            <div class="testimonial-author">
              <img
                v-if="testimonial.image"
                :src="testimonial.image"
                :alt="testimonial.name || 'Testimonial author'"
                class="author-avatar"
              />
              <div class="author-info">
                <div v-if="testimonial.name" class="author-name" v-html="testimonial.name"></div>
                <div v-if="testimonial.role" class="author-role" v-html="testimonial.role"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary testimonials scroll (optional) -->
        <div v-if="content?.items2 && content.items2.length" class="testimonials-scroll testimonials-scroll-secondary">
          <div
            v-for="(testimonial, index) in scrollableTestimonialsSecondary"
            :key="`secondary-${index}`"
            class="testimonial-card"
          >
            <!-- Testimonial Content -->
            <div class="testimonial-content">
              <div v-if="testimonial.title" class="testimonial-title" v-html="testimonial.title"></div>
              <div v-if="testimonial.description" class="testimonial-description" v-html="testimonial.description"></div>
            </div>

            <!-- Testimonial Author -->
            <div class="testimonial-author">
              <img
                v-if="testimonial.image"
                :src="testimonial.image"
                :alt="testimonial.name || 'Testimonial author'"
                class="author-avatar"
              />
              <div class="author-info">
                <div v-if="testimonial.name" class="author-name" v-html="testimonial.name"></div>
                <div v-if="testimonial.role" class="author-role" v-html="testimonial.role"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right fade gradient -->
        <div class="fade-gradient fade-right"></div>
      </div>
    </div>
  </BaseAdapter>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { SectionConfig } from '../../../tokens/types'
import BaseAdapter from './BaseAdapter.vue'

export default defineComponent({
  name: 'TestimonialsInfiniteScrollAdapter',

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

  computed: {
    scrollableTestimonials(): any[] {
      if (!this.content?.items) return []
      return [
        ...this.content.items,
        ...this.content.items,
        ...this.content.items,
        ...this.content.items,
        ...this.content.items,
        ...this.content.items
      ]
    },

    scrollableTestimonialsSecondary(): any[] {
      if (!this.content?.items2) return []
      return [
        ...this.content.items2,
        ...this.content.items2,
        ...this.content.items2,
        ...this.content.items2,
        ...this.content.items2,
        ...this.content.items2
      ]
    }
  }
})
</script>

<style scoped>
.testimonials-section {
  padding: var(--spacing-20) 0;
  background: var(--color-surface);
  overflow: hidden;
}

/* Header Styles */
.testimonials-header {
  text-align: center;
  margin-bottom: var(--spacing-16);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-6);
}

.testimonials-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--color-primary);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inverse);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}

.testimonials-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin: 0;
}

/* Testimonials Container */
.testimonials-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
  align-items: center;
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

/* Fade Gradients */
.fade-gradient {
  position: absolute;
  top: 0;
  height: 100%;
  width: 120px;
  z-index: 10;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(90deg, var(--color-surface) 0%, transparent 100%);
}

.fade-right {
  right: 0;
  background: linear-gradient(90deg, transparent 0%, var(--color-surface) 100%);
}

@media (min-width: 1024px) {
  .fade-left,
  .fade-right {
    width: 200px;
  }
}

/* Testimonials Scroll Container */
.testimonials-scroll {
  display: flex;
  gap: var(--spacing-5);
  width: max-content;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
}

.testimonials-scroll-primary {
  animation: scroll-left 150s linear infinite;
}

.testimonials-scroll-secondary {
  animation: scroll-right 150s linear infinite;
}

/* Testimonial Cards */
.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-5);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    var(--color-surface) 100%
  );
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
  width: 300px;
  flex-shrink: 0;
  transition: all var(--transition-fast, 0.3s ease);
}

.testimonial-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

@media (min-width: 1024px) {
  .testimonial-card {
    width: 380px;
    padding: var(--spacing-6);
    gap: var(--spacing-6);
  }
}

/* Testimonial Content */
.testimonial-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.testimonial-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  margin: 0;
}

.testimonial-description {
  font-size: var(--font-size-base);
  font-style: italic;
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

/* Testimonial Author */
.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid var(--color-border);
  flex-shrink: 0;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.author-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  margin: 0;
}

.author-role {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  margin: 0;
}

/* Animations */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .testimonials-section {
    padding: var(--spacing-16) 0;
  }

  .testimonials-header {
    padding: 0 var(--spacing-4);
    margin-bottom: var(--spacing-12);
  }

  .testimonials-title {
    font-size: var(--font-size-3xl);
  }

  .testimonials-container {
    gap: var(--spacing-4);
    padding: 0 var(--spacing-4);
  }

  .testimonials-scroll {
    gap: var(--spacing-4);
  }

  .testimonial-card {
    width: 280px;
    padding: var(--spacing-4);
  }

  .author-avatar {
    width: 36px;
    height: 36px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .testimonials-scroll-primary,
  .testimonials-scroll-secondary {
    animation: none;
  }

  .testimonial-card {
    transition: none;
  }

  .testimonial-card:hover {
    transform: none;
  }
}

/* Rich Text Support */
:deep(.tiptap-text) p {
  margin: 0;
  line-height: var(--line-height-relaxed);
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