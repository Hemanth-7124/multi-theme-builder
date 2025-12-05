<template>
  <BaseAdapter :section="section" :content="content">
    <div class="faq-section">
      <!-- Section Header -->
      <div class="faq-header">
        <h2 v-if="content?.title" class="faq-title" v-html="content.title"></h2>
        <p v-if="content?.subtitle" class="faq-subtitle" v-html="content.subtitle"></p>
      </div>

      <!-- FAQ Items -->
      <div class="faq-container">
        <div
          v-for="(faq, index) in content?.items"
          :key="`faq-${index}`"
          ref="faqItems"
          :class="['faq-item', { visible: visibleFaqIndexes.includes(index) }]"
          @click="toggleFaq(index)"
          :data-index="index"
        >
          <!-- Question Header -->
          <div class="faq-question">
            <div v-if="faq.question" class="faq-question-text" v-html="faq.question"></div>
            <div class="faq-icon">
              <svg
                :class="{ 'rotated': openFaqIndex === index }"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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

          <!-- Answer Content -->
          <div
            ref="answer"
            :class="['faq-answer', { 'is-open': openFaqIndex === index }]"
          >
            <div class="faq-answer-content">
              <div v-if="faq.answer" class="faq-answer-text" v-html="faq.answer"></div>
            </div>
          </div>
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

const openFaqIndex = ref<number | null>(null)
const visibleFaqIndexes = ref<number[]>([])
const faqItems = ref<HTMLElement[]>([])
const answer = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

// Setup intersection observer for visibility animations
const setupObserver = () => {
  // Disconnect existing observer if any
  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute('data-index'))

        if (entry.isIntersecting) {
          if (!visibleFaqIndexes.value.includes(index)) {
            visibleFaqIndexes.value.push(index)
          }
        } else {
          // Remove if out of view (to hide again)
          const i = visibleFaqIndexes.value.indexOf(index)
          if (i !== -1) {
            visibleFaqIndexes.value.splice(i, 1)
          }
        }
      })
    },
    {
      threshold: 0.3
    }
  )

  // Observe all FAQ items
  nextTick(() => {
    if (faqItems.value) {
      faqItems.value.forEach((el, index) => {
        el.setAttribute('data-index', index.toString())
        observer?.observe(el)
      })
    }
  })
}

// Toggle FAQ item open/closed
const toggleFaq = (index: number) => {
  const isSame = openFaqIndex.value === index

  // Always update openFaqIndex immediately
  openFaqIndex.value = isSame ? null : index

  nextTick(() => {
    if (answer.value) {
      answer.value.forEach((el, i) => {
        const inner = el.querySelector('.faq-answer-content')
        if (!inner) return

        if (openFaqIndex.value === i) {
          // Opening current item - calculate full height
          const totalHeight = inner.scrollHeight
          el.style.maxHeight = `${totalHeight}px`
        } else {
          // Closing others
          el.style.maxHeight = '0px'
        }
      })
    }
  })
}

// Watch for content changes
watch(() => props.content?.items, (newItems) => {
  if (newItems) {
    // When items change, re-setup observer for new items
    nextTick(() => {
      setupObserver()
      // Immediately make new items visible if they're in viewport
      if (faqItems.value) {
        faqItems.value.forEach((el, index) => {
          const rect = el.getBoundingClientRect()
          const inViewport = rect.top >= 0 && rect.bottom <= window.innerHeight
          if (inViewport && !visibleFaqIndexes.value.includes(index)) {
            visibleFaqIndexes.value.push(index)
          }
        })
      }
    })
  }
}, { deep: true })

onMounted(() => {
  setupObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.faq-section {
  padding: var(--spacing-20) 0;
  background: var(--color-surface);
}

/* Header Styles */
.faq-header {
  text-align: center;
  margin-bottom: var(--spacing-16);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-6);
}

.faq-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  line-height: var(--line-height-tight);
}

.faq-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* FAQ Container */
.faq-container {
  max-width: var(--container-max, 800px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

/* FAQ Items */
.faq-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--spacing-5);
  background: linear-gradient(
    90deg,
    var(--color-primary-container, var(--color-primary)20) 0%,
    var(--color-surface) 100%
  );
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--transition-default, 0.5s ease);
  box-shadow: var(--shadow-md);
}

.faq-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.faq-item:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* FAQ Question */
.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: var(--spacing-3);
}

.faq-question-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  flex: 1;
}

.faq-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform var(--transition-fast, 0.3s ease);
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

/* FAQ Answer */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-default, 0.5s ease-in-out);
}

.faq-answer-content {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-border);
}

.faq-answer-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* Responsive Design */
@media (max-width: 768px) {
  .faq-section {
    padding: var(--spacing-16) 0;
  }

  .faq-header {
    padding: 0 var(--spacing-4);
    margin-bottom: var(--spacing-12);
  }

  .faq-title {
    font-size: var(--font-size-3xl);
  }

  .faq-subtitle {
    font-size: var(--font-size-lg);
  }

  .faq-container {
    padding: 0 var(--spacing-4);
    gap: var(--spacing-3);
  }

  .faq-item {
    padding: var(--spacing-4);
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