<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-6">
      {{ editingQuestion ? 'Edit Question' : 'Create New Question' }}
    </h3>

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- Question Text -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Question Text *
        </label>
        <textarea
          v-model="formData.text"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your question here..."
          required
        />
      </div>

      <!-- Category and Difficulty -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            v-model="formData.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Difficulty *
          </label>
          <select
            v-model="formData.difficulty"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Difficulty</option>
            <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty">
              {{ difficulty }}
            </option>
          </select>
        </div>
      </div>

      <!-- Answer Options -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Answer Options *
        </label>
        <div class="space-y-3">
          <div
            v-for="(option, index) in formData.options"
            :key="index"
            class="flex items-center gap-3"
          >
            <input
              type="radio"
              :name="`correct-answer-${moduleId}`"
              :checked="formData.correctAnswer === index"
              @change="formData.correctAnswer = index"
              class="border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span class="text-sm font-medium text-gray-600 w-8">{{ String.fromCharCode(65 + index) }}.</span>
            <input
              v-model="formData.options[index]"
              type="text"
              :placeholder="`Option ${String.fromCharCode(65 + index)}`"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <button
              v-if="formData.options.length > 2"
              type="button"
              @click="removeOption(index)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          v-if="formData.options.length < 6"
          type="button"
          @click="addOption"
          class="mt-3 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-md hover:border-gray-400 hover:text-gray-700"
        >
          + Add Option
        </button>

        <p class="mt-2 text-sm text-gray-500">
          Select the radio button next to the correct answer. Minimum 2 options required.
        </p>
      </div>

      <!-- Explanation -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Explanation (Optional)
        </label>
        <textarea
          v-model="formData.explanation"
          rows="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Explain why the correct answer is right..."
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          @click="handleCancel"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="!isFormValid"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ editingQuestion ? 'Update Question' : 'Save Question' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CustomQuestion } from '~/types'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  moduleId: string
  moduleCategory: string
  moduleDifficulty: string
  editingQuestion?: CustomQuestion
}

const props = defineProps<Props>()
const emit = defineEmits<{
  save: [questionData: Omit<CustomQuestion, 'id' | 'isCustom' | 'createdAt'>]
  cancel: []
}>()

const formData = ref({
  text: '',
  category: props.moduleCategory,
  difficulty: props.moduleDifficulty,
  options: ['', '', ''],
  correctAnswer: 0,
  explanation: ''
})

const categories = [
  'Web Development',
  'Backend Development',
  'DevOps',
  'Mobile Development',
  'Data Science',
  'Soft Skills',
  'Design',
  'Testing',
  'Security',
  'Database'
]

const difficulties = ['Beginner', 'Intermediate', 'Advanced']

// Initialize form with editing question data
if (props.editingQuestion) {
  formData.value = {
    text: props.editingQuestion.text,
    category: props.editingQuestion.category,
    difficulty: props.editingQuestion.difficulty,
    options: [...props.editingQuestion.options],
    correctAnswer: props.editingQuestion.correctAnswer,
    explanation: props.editingQuestion.explanation || ''
  }
}

const isFormValid = computed(() => {
  return formData.value.text.trim() &&
         formData.value.category &&
         formData.value.difficulty &&
         formData.value.options.length >= 2 &&
         formData.value.options.every(opt => opt.trim()) &&
         formData.value.correctAnswer >= 0 &&
         formData.value.correctAnswer < formData.value.options.length
})

const addOption = () => {
  if (formData.value.options.length < 6) {
    formData.value.options.push('')
  }
}

const removeOption = (index: number) => {
  if (formData.value.options.length > 2) {
    formData.value.options.splice(index, 1)

    // Adjust correct answer if needed
    if (formData.value.correctAnswer >= formData.value.options.length) {
      formData.value.correctAnswer = formData.value.options.length - 1
    }
  }
}

const handleSave = () => {
  if (isFormValid.value) {
    emit('save', {
      moduleId: props.moduleId,
      text: formData.value.text.trim(),
      category: formData.value.category,
      difficulty: formData.value.difficulty as any,
      options: formData.value.options.map(opt => opt.trim()),
      correctAnswer: formData.value.correctAnswer,
      explanation: formData.value.explanation.trim() || undefined
    })
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>