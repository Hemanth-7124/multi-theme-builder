<template>
  <div>
    <!-- Filters -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            v-model="filters.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            v-model="filters.difficulty"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Levels</option>
            <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty">
              {{ difficulty }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search questions..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>

    <!-- Question Selection -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          Available Questions ({{ filteredQuestions.length }})
        </h3>
        <div class="flex gap-3">
          <button
            @click="selectAllQuestions"
            class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Select All
          </button>
          <button
            @click="clearSelection"
            class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear Selection
          </button>
          <button
            @click="handleImport"
            :disabled="selectedQuestions.length === 0"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import {{ selectedQuestions.length }} Question{{ selectedQuestions.length !== 1 ? 's' : '' }}
          </button>
        </div>
      </div>

      <!-- Questions Grid -->
      <div v-if="filteredQuestions.length === 0" class="py-12 text-center text-gray-500">
        <QuestionMarkCircleIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>No questions found matching your criteria.</p>
      </div>

      <div v-else class="space-y-4 max-h-96 overflow-y-auto">
        <div
          v-for="question in filteredQuestions"
          :key="question.id"
          class="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          :class="{ 'border-indigo-500 bg-indigo-50': selectedQuestions.includes(question.id) }"
        >
          <div class="flex items-start gap-3">
            <input
              type="checkbox"
              :checked="selectedQuestions.includes(question.id)"
              @change="toggleQuestionSelection(question.id)"
              class="mt-1 border-gray-300 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                  :class="getDifficultyClass(question.difficulty)"
                >
                  {{ question.difficulty }}
                </span>
                <span class="text-xs text-gray-500">{{ question.category }}</span>
              </div>
              <h4 class="font-medium text-gray-900 mb-2">{{ question.text }}</h4>
              <div class="text-sm text-gray-600">
                <span>Options: {{ question.options.length }}</span>
                <span class="ml-4">Correct: {{ String.fromCharCode(65 + question.correctAnswer) }}</span>
              </div>
              <div v-if="question.explanation" class="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                <span class="font-medium">Explanation:</span> {{ question.explanation }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '~/types'
import { questionBank } from '~/data/questionBank'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
  moduleId: string
  moduleCategory: string
  moduleDifficulty: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  import: [questionIds: string[]]
}>()

const filters = ref({
  category: props.moduleCategory,
  difficulty: props.moduleDifficulty,
  search: ''
})

const selectedQuestions = ref<string[]>([])

const categories = computed(() => {
  const cats = new Set(questionBank.map(q => q.category))
  return Array.from(cats).sort()
})

const difficulties = ['Beginner', 'Intermediate', 'Advanced']

const filteredQuestions = computed(() => {
  return questionBank.filter(question => {
    // Category filter
    if (filters.value.category && question.category !== filters.value.category) {
      return false
    }

    // Difficulty filter
    if (filters.value.difficulty && question.difficulty !== filters.value.difficulty) {
      return false
    }

    // Search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      return question.text.toLowerCase().includes(searchLower) ||
             question.options.some(opt => opt.toLowerCase().includes(searchLower))
    }

    return true
  })
})

const toggleQuestionSelection = (questionId: string) => {
  const index = selectedQuestions.value.indexOf(questionId)
  if (index > -1) {
    selectedQuestions.value.splice(index, 1)
  } else {
    selectedQuestions.value.push(questionId)
  }
}

const selectAllQuestions = () => {
  selectedQuestions.value = filteredQuestions.value.map(q => q.id)
}

const clearSelection = () => {
  selectedQuestions.value = []
}

const handleImport = () => {
  if (selectedQuestions.value.length > 0) {
    emit('import', [...selectedQuestions.value])
    selectedQuestions.value = []
  }
}

const getDifficultyClass = (difficulty: string) => {
  const classes = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  }
  return classes[difficulty as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script>