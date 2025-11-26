<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-gray-900">Export Learning Path</h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          :disabled="isGeneratingPdf"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Export Options -->
      <div class="space-y-3">
        <!-- JSON Export Option -->
        <button
          @click="handleJsonExport"
          :disabled="isGeneratingPdf"
          class="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div class="flex items-center gap-3">
            <div class="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full">
              <DocumentTextIcon class="w-5 h-5 text-blue-600" />
            </div>
            <div class="text-left">
              <span class="font-semibold text-gray-900 block">Export as JSON</span>
              <span class="text-sm text-gray-500">For developers and data interchange</span>
            </div>
          </div>
          <ChevronRightIcon class="w-5 h-5 text-gray-400" />
        </button>

        <!-- PDF Export Option -->
        <button
          @click="handlePdfExport"
          :disabled="isGeneratingPdf"
          class="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <div class="flex items-center gap-3">
            <div class="flex justify-center items-center w-10 h-10 bg-red-100 rounded-full">
              <DocumentArrowDownIcon class="w-5 h-5 text-red-600" />
            </div>
            <div class="text-left">
              <span class="font-semibold text-gray-900 block">Export as PDF</span>
              <span class="text-sm text-gray-500">For sharing and professional documents</span>
            </div>
          </div>

          <!-- Loading indicator for PDF -->
          <div v-if="isGeneratingPdf" class="flex items-center gap-2">
            <div class="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm text-red-600">Generating...</span>
          </div>
          <ChevronRightIcon v-else class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <!-- Help Text -->
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-600">
          <strong>JSON:</strong> Machine-readable format, perfect for importing or data analysis.
        </p>
        <p class="text-sm text-gray-600 mt-2">
          <strong>PDF:</strong> Professional document format, ideal for sharing and printing.
        </p>
      </div>

      <!-- Cancel Button -->
      <div class="mt-6 flex justify-end">
        <button
          @click="closeModal"
          :disabled="isGeneratingPdf"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LearningPath } from '~/types'

import {
  XMarkIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

interface Props {
  learningPath: LearningPath
}

interface Emits {
  (e: 'close'): void
  (e: 'error', message: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isGeneratingPdf = ref(false)

const closeModal = () => {
  if (!isGeneratingPdf.value) {
    emit('close')
  }
}

const handleJsonExport = () => {
  // Reuse the existing JSON export logic
  const dataStr = JSON.stringify(props.learningPath, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${props.learningPath.name || 'learning-path'}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  emit('close')
}

const handlePdfExport = async () => {
  if (isGeneratingPdf.value) return

  try {
    isGeneratingPdf.value = true

    const { generatePdfFromData } = usePdfExport()
    await generatePdfFromData(props.learningPath)

    emit('close')
  } catch (error) {
    console.error('PDF export error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF. Please try again.'
    emit('error', errorMessage)
  } finally {
    isGeneratingPdf.value = false
  }
}

// Close modal on Escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !isGeneratingPdf.value) {
      closeModal()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>