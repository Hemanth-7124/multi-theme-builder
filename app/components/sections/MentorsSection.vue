<template>
  <BaseAdapter :section="section" :content="content">
    <div class="mentors-section">
      <!-- Single Founder (Default Design) -->
      <div v-if="content?.designVariant === 'default' || !content?.designVariant" class="founder-showcase">
        <!-- Title for mobile only -->
        <div class="founder-title-mobile">
          <h2 v-if="content?.title" class="founder-title" v-html="content.title"></h2>
        </div>

        <div class="founder-container">
          <div class="founder-card">
            <div class="founder-media">
              <!-- Video Element -->
              <video
                v-if="hasValidVideoUrl"
                ref="mentorVideo"
                class="founder-video"
                :poster="content?.founderInfo?.posterUrl || content?.founderInfo?.image"
                playsinline
                :controls="!videoWatchButtonVisible"
                @play="videoWatchButtonVisible = false"
                preload="auto"
              >
                <source :src="content?.founderInfo?.videoUrl?.trim()" type="video/mp4" />
              </video>

              <!-- Image Element (fallback) -->
              <img
                v-else
                class="founder-image"
                :src="content?.founderInfo?.image"
                alt="Founder"
                @error="handleImageError"
              />

              <!-- Play Button Overlay -->
              <div
                v-if="hasValidVideoUrl && videoWatchButtonVisible"
                class="video-play-button"
                @click="toggleVideoPlay"
              >
                <button class="play-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Profile Badge -->
            <div class="founder-profile">
              <div v-if="content?.founderInfo?.experience" class="founder-experience" v-html="content.founderInfo.experience"></div>
              <div class="founder-details">
                <div v-if="content?.founderInfo?.name" class="founder-name" v-html="content.founderInfo.name"></div>
                <div v-if="content?.founderInfo?.role" class="founder-role" v-html="content.founderInfo.role"></div>
              </div>
            </div>
          </div>

          <div class="founder-content">
            <div class="founder-header">
              <h2 v-if="content?.title" class="founder-title-desktop" v-html="content.title"></h2>
              <div class="founder-description">
                <p v-if="content?.description" v-html="content.description"></p>
                <p v-if="content?.caption" v-html="content.caption"></p>
              </div>
            </div>

            <div class="companies-card">
              <div v-if="content?.titleTwo" class="companies-title" v-html="content.titleTwo"></div>

              <div v-if="content?.images && content.images.length > 0" class="companies-grid">
                <div
                  v-for="(image, index) in content.images"
                  :key="index"
                  class="company-logo"
                >
                  <img
                    :src="image.logo"
                    alt="Company Logo"
                    @error="handleImageError"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Multiple Mentors (Alternative Design) -->
      <div v-else-if="content?.designVariant === 'alternative'" class="mentors-showcase">
        <!-- Title & Subtitle -->
        <div class="mentors-header">
          <h2 v-if="content?.alternativeTitle" class="mentors-title" v-html="content.alternativeTitle"></h2>
          <p v-if="content?.alternativeSubtitle" class="mentors-subtitle" v-html="content.alternativeSubtitle"></p>
        </div>

        <!-- Mentors Grid -->
        <div class="mentors-grid">
          <div
            v-for="(mentor, index) in content?.mentors"
            :key="`mentor-${index}`"
            class="mentor-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Photo -->
            <div class="mentor-photo">
              <img
                :src="mentor.image"
                :alt="mentor.name"
                @error="handleImageError"
              />
            </div>

            <!-- Content -->
            <div class="mentor-info">
              <h3 v-if="mentor.name" class="mentor-name" v-html="mentor.name"></h3>
              <p v-if="mentor.role" class="mentor-role" v-html="mentor.role"></p>
              <p v-if="mentor.company" class="mentor-company" v-html="mentor.company"></p>
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

const videoWatchButtonVisible = ref(true)
const mentorVideo = ref<HTMLVideoElement>()

const hasValidVideoUrl = computed(() => {
  return (
    props.content?.founderInfo?.mediaType === 'video' &&
    props.content?.founderInfo?.videoUrl &&
    props.content.founderInfo.videoUrl.trim() !== '' &&
    props.content.founderInfo.videoUrl.trim().length > 1
  )
})

const toggleVideoPlay = () => {
  if (mentorVideo.value) {
    if (mentorVideo.value.paused) {
      mentorVideo.value.play()
      videoWatchButtonVisible.value = false
    } else {
      mentorVideo.value.pause()
    }
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg width="400" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="400" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23666"%3ENo Image%3C/text%3E%3C/svg%3E'
}

</script>

<style scoped>
.mentors-section {
  padding: var(--spacing-20) 0;
  background: var(--color-surface);
}

/* Founder Showcase Styles */
.founder-showcase {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

.founder-title-mobile {
  text-align: center;
  margin-bottom: var(--spacing-4);
  display: none;
}

.founder-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.founder-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  align-items: center;
}

.founder-card {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(0, 0, 0, 0.05) 100%
  );
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  padding: var(--spacing-3);
  box-shadow: var(--shadow-lg);
  max-width: 320px;
  width: 100%;
}

.founder-media {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--spacing-2);
}

.founder-video,
.founder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xl);
}

.video-play-button {
  position: absolute;
  bottom: var(--spacing-4);
  right: var(--spacing-4);
  z-index: 10;
}

.play-button {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3);
  cursor: pointer;
  transition: all var(--transition-fast, 0.3s ease);
}

.play-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.founder-profile {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  width: 100%;
}

.founder-experience {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.founder-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.founder-name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.founder-role {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
}

.founder-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  flex: 1;
  max-width: 600px;
}

.founder-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.founder-title-desktop {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
  display: none;
}

.founder-description {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.founder-description p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

.companies-card {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(0, 0, 0, 0.05) 100%
  );
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: var(--spacing-5);
}

.companies-title {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-4);
}

.companies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-4);
  align-items: center;
}

.company-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Multiple Mentors Styles */
.mentors-showcase {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

.mentors-header {
  text-align: center;
  margin-bottom: var(--spacing-16);
}

.mentors-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
}

.mentors-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

.mentors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
}

.mentor-card {
  background: linear-gradient(
    180deg,
    var(--color-primary-container, var(--color-primary)20) 0%,
    var(--color-surface-variant, var(--color-primary)10) 100%
  );
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  padding: var(--spacing-5);
  transition: all var(--transition-fast, 0.3s ease);
  box-shadow: var(--shadow-md);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.mentor-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.mentor-photo {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  margin-bottom: var(--spacing-4);
}

.mentor-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mentor-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.mentor-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.mentor-role {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.mentor-company {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
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
  .mentors-section {
    padding: var(--spacing-16) 0;
  }

  .founder-showcase,
  .mentors-showcase {
    padding: 0 var(--spacing-4);
  }

  .founder-title-mobile {
    display: block;
    margin-bottom: var(--spacing-4);
  }

  .founder-title-desktop {
    display: none;
  }

  .founder-container {
    gap: var(--spacing-6);
  }

  .founder-card {
    max-width: 100%;
  }

  .founder-content {
    gap: var(--spacing-6);
  }

  .companies-grid {
    gap: var(--spacing-3);
  }

  .mentors-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  .mentor-card {
    padding: var(--spacing-4);
  }
}

@media (min-width: 768px) {
  .founder-title-mobile {
    display: none;
  }

  .founder-title-desktop {
    display: block;
    font-size: var(--font-size-5xl);
  }

  .founder-container {
    flex-direction: row;
    gap: var(--spacing-10);
    align-items: stretch;
  }

  .companies-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .mentor-card {
    transition: none;
    opacity: 1;
    transform: translateY(0);
    animation: none;
  }

  .mentor-card:hover {
    transform: none;
  }

  .play-button {
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