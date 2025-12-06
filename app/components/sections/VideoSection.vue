<template>
  <BaseAdapter :section="section" :content="content">
    <div class="video-section">
      <div class="video-container">
        <!-- Section Header -->
        <div v-if="content?.title || content?.subtitle" class="video-header">
          <h2 v-if="content?.title" class="video-title" v-html="content.title"></h2>
          <p v-if="content?.subtitle" class="video-subtitle" v-html="content.subtitle"></p>
        </div>

        <!-- Video Player -->
        <div class="video-player">
          <div v-if="content?.videoUrl" class="video-wrapper" @click="playVideo">
            <img
              v-if="!isPlaying && content.thumbnailUrl"
              :src="content.thumbnailUrl"
              :alt="content.title || 'Video thumbnail'"
              class="video-thumbnail"
            />
            <video
              v-if="isPlaying"
              ref="videoRef"
              :src="content.videoUrl"
              class="video-element"
              controls
              @ended="handleVideoEnd"
              @pause="handleVideoPause"
              @play="handleVideoPlay"
            />

            <!-- Play Button Overlay -->
            <div v-if="!isPlaying" class="play-button">
              <div class="play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" class="play-svg">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>

            <!-- Video Duration -->
            <div v-if="!isPlaying && content.duration" class="video-duration">
              {{ content.duration }}
            </div>
          </div>
        </div>

        <!-- Video Description -->
        <div v-if="content?.description" class="video-description">
          <div v-html="content.description"></div>
        </div>

        <!-- Video Stats -->
        <div v-if="content?.stats && content.stats.length" class="video-stats">
          <div
            v-for="(stat, index) in content.stats"
            :key="index"
            class="video-stat"
          >
            <div class="stat-icon">
              <component :is="getStatIcon(stat.icon)" v-if="stat.icon" />
            </div>
            <div class="stat-content">
              <div class="stat-value" v-html="stat.value"></div>
              <div class="stat-label" v-html="stat.label"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseAdapter>
</template>

<script lang="ts">
import { defineComponent, h, nextTick } from 'vue'
import type { SectionConfig } from '../../../tokens/types'
import BaseAdapter from './BaseAdapter.vue'

export default defineComponent({
  name: 'VideoStatsAdapter',

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

  data() {
    return {
      isPlaying: false,
      videoRef: null as HTMLVideoElement | null
    }
  },

  methods: {
    playVideo() {
      if (this.content?.videoUrl) {
        this.isPlaying = true
        nextTick(() => {
          if (this.videoRef) {
            this.videoRef.play()
          }
        })
      }
    },

    handleVideoEnd() {
      this.isPlaying = false
    },

    handleVideoPause() {
      if (this.videoRef && !this.videoRef.ended) {
        this.isPlaying = false
      }
    },

    handleVideoPlay() {
      this.isPlaying = true
    },

    getStatIcon(iconType: string) {
      switch (iconType) {
        case 'play':
          return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'icon' }, [
            h('path', { d: 'M8 5v14l11-7z' })
          ])
        case 'clock':
          return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'icon' }, [
            h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' })
          ])
        case 'users':
          return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'icon' }, [
            h('path', { d: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' })
          ])
        default:
          return null
      }
    }
  }
})
</script>

<style scoped>
.video-section {
  padding: var(--spacing-24) 0;
  background: var(--color-surface);
}

.video-container {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

/* Header Styles */
.video-header {
  text-align: center;
  margin-bottom: var(--spacing-16);
}

.video-title {
  font-family: var(--heading-font-family, var(--font-family-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  line-height: var(--line-height-tight);
}

.video-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 800px;
  margin: 0 auto;
}

/* Video Player */
.video-player {
  margin-bottom: var(--spacing-12);
}

.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background: var(--color-background);
  box-shadow: var(--shadow-xl);
  cursor: pointer;
  aspect-ratio: 16/9;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-fast, 0.3s ease);
}

.video-wrapper:hover .video-thumbnail {
  transform: scale(1.02);
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Play Button */
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.play-icon {
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast, 0.3s ease);
  backdrop-filter: blur(10px);
}

.video-wrapper:hover .play-icon {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.play-svg {
  width: 32px;
  height: 32px;
  color: white;
  margin-left: 4px; /* Center the play triangle */
}

/* Video Duration */
.video-duration {
  position: absolute;
  bottom: var(--spacing-4);
  right: var(--spacing-4);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-mono);
  backdrop-filter: blur(10px);
}

/* Video Description */
.video-description {
  max-width: 800px;
  margin: 0 auto var(--spacing-12);
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  text-align: center;
}

/* Video Stats */
.video-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-6);
  max-width: 800px;
  margin: 0 auto;
}

.video-stat {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background: var(--color-background);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast, 0.3s ease);
}

.video-stat:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 24px;
  height: 24px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

/* Responsive Design */
@media (max-width: 768px) {
  .video-section {
    padding: var(--spacing-16) 0;
  }

  .video-container {
    padding: 0 var(--spacing-4);
  }

  .video-title {
    font-size: var(--font-size-3xl);
  }

  .video-subtitle {
    font-size: var(--font-size-lg);
  }

  .play-icon {
    width: 64px;
    height: 64px;
  }

  .play-svg {
    width: 24px;
    height: 24px;
  }

  .video-stats {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  .video-stat {
    padding: var(--spacing-4);
  }

  .stat-icon {
    width: 40px;
    height: 40px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .video-thumbnail {
    transition: none;
  }

  .video-wrapper:hover .video-thumbnail {
    transform: none;
  }

  .play-icon {
    transition: none;
  }

  .video-wrapper:hover .play-icon {
    transform: none;
  }

  .video-stat {
    transition: none;
  }

  .video-stat:hover {
    transform: none;
  }
}

/* Rich Text Support */
:deep(.tiptap-text) p {
  margin: 0 0 var(--spacing-4) 0;
}

:deep(.tiptap-text) p:last-child {
  margin-bottom: 0;
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