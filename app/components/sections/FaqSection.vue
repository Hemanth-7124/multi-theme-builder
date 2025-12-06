<template>
  <BaseAdapter :section="section" :content="content">
    <div class="faq-section">
      <!-- Section Header -->
      <div class="faq-header" v-if="content?.title || content?.subtitle">
        <h2 v-if="content?.title" class="faq-title" v-html="content.title"></h2>
        <p v-if="content?.subtitle" class="faq-subtitle" v-html="content.subtitle"></p>
      </div>

      <!-- FAQ Items -->
      <div class="faq-container">
        <div
          v-for="(faq, index) in items"
          :key="`faq-${index}`"
          ref="faqItems"
          :data-index="index"
          @click="toggleFaq(index)"
          :class="['faq-item', { visible: visibleFaqIndexes.includes(index) }]"
        >
          <!-- Question Block -->
          <div class="faq-question">
            <div class="faq-question-text" v-html="faq.question"></div>

            <div class="faq-icon" :class="{ rotated: openFaqIndex === index }">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <!-- Expandable Answer -->
          <div ref="answer" :class="['faq-answer', { 'is-open': openFaqIndex === index }]">
            <div class="faq-answer-content">
              <div class="faq-answer-text" v-html="faq.answer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseAdapter>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import BaseAdapter from "./BaseAdapter.vue";
import type { SectionConfig } from "../../../tokens/types";

export default defineComponent({
  name: "FaqAdapter",

  components: { BaseAdapter },

  props: {
    section: { type: Object as () => SectionConfig, required: true },
    content: { type: Object as () => any, default: () => ({}) }
  },

  data() {
    return {
      openFaqIndex: null as number | null,
      visibleFaqIndexes: [] as number[],
      observer: null as IntersectionObserver | null
    };
  },

  computed: {
    items(): any[] {
      return this.content?.items || [];
    }
  },

  watch: {
    items: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (!newVal.length) return;
        nextTick(() => {
          this.setupObserver();
          this.checkInitialVisibility();
        });
      }
    }
  },

  mounted() {
    this.setupObserver();
  },

  beforeUnmount() {
    this.observer?.disconnect();
  },

  methods: {
    getFaqEls(): HTMLElement[] {
      return (this.$refs.faqItems as HTMLElement[]) || [];
    },

    getAnswerEls(): HTMLElement[] {
      return (this.$refs.answer as HTMLElement[]) || [];
    },

    checkInitialVisibility() {
      this.getFaqEls().forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (!this.visibleFaqIndexes.includes(index)) {
            this.visibleFaqIndexes.push(index);
          }
        }
      });
    },

    setupObserver() {
      this.observer?.disconnect();

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = Number(entry.target.getAttribute("data-index"));

            if (entry.isIntersecting) {
              if (!this.visibleFaqIndexes.includes(index)) {
                this.visibleFaqIndexes.push(index);
              }
            }
          });
        },
        { threshold: 0.15 }
      );

      nextTick(() => {
        this.getFaqEls().forEach((el, index) => {
          el.setAttribute("data-index", index.toString());
          this.observer?.observe(el);
        });
      });
    },

    toggleFaq(index: number) {
      this.openFaqIndex = this.openFaqIndex === index ? null : index;

      nextTick(() => {
        this.getAnswerEls().forEach((el, i) => {
          const inner = el.querySelector(".faq-answer-content") as HTMLElement | null;
          if (!inner) return;

          if (this.openFaqIndex === i) {
            el.style.maxHeight = inner.scrollHeight + 32 + "px";
          } else {
            el.style.maxHeight = "0px";
          }
        });
      });
    }
  }
});
</script>



<style scoped>
.faq-section {
  padding: var(--spacing-20, 5rem) 0;
  background: var(--color-surface, #f8fafc);
}

/* Header Styles */
.faq-header {
  text-align: center;
  margin-bottom: var(--spacing-16, 4rem);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-6, 1.5rem);
}

.faq-title {
  font-family: var(--font-family-sans, Inter, system-ui, sans-serif);
  font-size: var(--font-size-4xl, 2.25rem);
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-text-primary, #1e293b);
  margin-bottom: var(--spacing-4, 1rem);
  line-height: var(--line-height-tight, 1.25);
}

.faq-subtitle {
  font-size: var(--font-size-xl, 1.25rem);
  color: var(--color-text-secondary, #64748b);
  line-height: var(--line-height-relaxed, 1.625);
}

/* Ensure header content renders properly */
.faq-title :deep(p),
.faq-subtitle :deep(p) {
  margin: 0;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.faq-title :deep(p:first-child),
.faq-subtitle :deep(p:first-child) {
  margin-top: 0;
}

.faq-title :deep(p:last-child),
.faq-subtitle :deep(p:last-child) {
  margin-bottom: 0;
}

/* FAQ Container */
.faq-container {
  max-width: var(--container-max, 800px);
  margin: 0 auto;
  padding: 0 var(--spacing-6, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4, 1rem);
}

/* FAQ Items */
.faq-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 4rem;
  padding: var(--spacing-5);
  background: linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.1) 0%,
    var(--color-surface, #f8fafc) 100%
  );
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border, #e2e8f0);
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--transition-default, 0.3s ease);
  box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
}

.faq-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.faq-item:hover {
  box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
  transform: translateY(-2px);
}

/* FAQ Question */
.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: var(--spacing-3);
  min-height: 2rem;
}

.faq-question-text {
  font-size: var(--font-size-lg, 1.125rem);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-text-primary, #1e293b);
  line-height: var(--line-height-normal, 1.5);
  flex: 1;
}

/* Ensure HTML content renders properly */
.faq-question-text :deep(p),
.faq-answer-text :deep(p) {
  margin: 0;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
}

.faq-question-text :deep(p:first-child),
.faq-answer-text :deep(p:first-child) {
  margin-top: 0;
}

.faq-question-text :deep(p:last-child),
.faq-answer-text :deep(p:last-child) {
  margin-bottom: 0;
}

.faq-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary, #64748b);
  transition: transform var(--transition-fast, 0.15s ease);
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

/* FAQ Answer */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-default, 0.3s ease-in-out);
}

.faq-answer-content {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-border, #e2e8f0);
}

.faq-answer-text {
  font-size: var(--font-size-base, 1rem);
  color: var(--color-text-secondary, #64748b);
  line-height: var(--line-height-relaxed, 1.625);
}

/* Responsive Design */
@media (max-width: 768px) {
  .faq-section {
    padding: var(--spacing-16, 4rem) 0;
  }

  .faq-header {
    padding: 0 var(--spacing-4, 1rem);
    margin-bottom: var(--spacing-12, 3rem);
  }

  .faq-title {
    font-size: var(--font-size-3xl, 1.875rem);
  }

  .faq-subtitle {
    font-size: var(--font-size-lg, 1.125rem);
  }

  .faq-container {
    padding: 0 var(--spacing-4, 1rem);
    gap: var(--spacing-3, 0.75rem);
  }

  .faq-item {
    padding: var(--spacing-4, 1rem);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .faq-item {
    opacity: 1;
    transform: translateY(0);
    transition: none;
  }

  .faq-item:hover {
    transform: none;
  }

  .faq-answer {
    transition: none;
  }

  .faq-icon {
    transition: none;
  }
}

/* Rich Text Support - Ensure all HTML content displays properly */
:deep(p) {
  margin: 0 0 var(--spacing-2, 0.5rem) 0;
  color: inherit;
  line-height: var(--line-height-relaxed, 1.625);
}

:deep(p:last-child) {
  margin-bottom: 0;
}

:deep(strong) {
  font-weight: var(--font-weight-bold, 700);
}

:deep(em) {
  font-style: italic;
}

:deep(u) {
  text-decoration: underline;
}

:deep(mark) {
  background: var(--color-accent, #10b981);
  color: var(--color-text-inverse, #ffffff);
  padding: 0 var(--spacing-1, 0.25rem);
  border-radius: var(--radius-sm, 0.125rem);
}

/* Tiptap specific styles */
:deep(.tiptap-text) p {
  margin: 0;
  line-height: var(--line-height-relaxed, 1.625);
}
</style>