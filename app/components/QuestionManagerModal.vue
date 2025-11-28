<template>
  <div class="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black bg-opacity-50" @click="$emit('close')">
    <div
      class="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      @click.stop
    >
      <!-- Header -->
      <div class="p-6 bg-white border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Question Bank Manager</h2>
            <p class="text-gray-600">{{ module.title }} - {{ module.category }} ({{ module.difficulty }})</p>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-6 py-3 text-sm font-medium transition-colors',
            activeTab === tab.key
              ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          {{ tab.label }}
          <span v-if="tab.count" class="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
        <!-- My Questions Tab -->
        <div v-if="activeTab === 'my-questions'">
          <MyQuestionsTab
            :module-id="module.id"
            :questions="customQuestions"
            @edit="handleEditQuestion"
            @delete="handleDeleteQuestion"
            @create="handleCreateQuestion"
          />
        </div>

        <!-- Import from Bank Tab -->
        <div v-if="activeTab === 'import'">
          <ImportQuestionsTab
            :module-category="module.category"
            :module-difficulty="module.difficulty"
            :module-id="module.id"
            @import="handleImportQuestions"
          />
        </div>

        <!-- Create New Tab -->
        <div v-if="activeTab === 'create'">
          <CreateQuestionTab
            :module-category="module.category"
            :module-difficulty="module.difficulty"
            :module-id="module.id"
            :editing-question="editingQuestion"
            @save="handleCreateQuestion"
            @cancel="handleCancelEdit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module, CustomQuestion } from '~/types'
import { useLearningPath } from '~/composables/useLearningPath'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import MyQuestionsTab from './MyQuestionsTab.vue'
import ImportQuestionsTab from './ImportQuestionsTab.vue'
import CreateQuestionTab from './CreateQuestionTab.vue'

interface Props {
  module: Module
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  questionsUpdated: [moduleId: string]
}>()

const {
  getModuleCustomQuestions,
  removeCustomQuestion,
  importQuestionsFromBank,
  addCustomQuestion,
  updateCustomQuestion
} = useLearningPath()

const activeTab = ref('my-questions')
const customQuestions = ref<CustomQuestion[]>([])
const editingQuestion = ref<CustomQuestion | undefined>()

const tabs = computed(() => [
  {
    key: 'my-questions',
    label: 'My Questions',
    count: customQuestions.value.length
  },
  {
    key: 'import',
    label: 'Import from Bank',
    count: 0
  },
  {
    key: 'create',
    label: 'Create New',
    count: 0
  }
])

// Load questions when component mounts
onMounted(() => {
  loadQuestions()
})

const loadQuestions = () => {
  customQuestions.value = getModuleCustomQuestions(props.module.id)
}

const handleEditQuestion = (question: CustomQuestion) => {
  editingQuestion.value = question
  activeTab.value = 'create'
}

const handleDeleteQuestion = async (questionId: string) => {
  if (confirm('Are you sure you want to delete this question?')) {
    try {
      const success = await removeCustomQuestion(props.module.id, questionId)
      if (success) {
        loadQuestions()
        emit('questionsUpdated', props.module.id)
      } else {
        console.error('Failed to delete question')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
    }
  }
}

const handleImportQuestions = async (questionIds: string[]) => {
  try {
    await importQuestionsFromBank(props.module.id, questionIds)
    loadQuestions()
    emit('questionsUpdated', props.module.id)
  } catch (error) {
    console.error('Error importing questions:', error)
  }
}

const handleCreateQuestion = async (questionData: Omit<CustomQuestion, 'id' | 'isCustom' | 'createdAt'>) => {
  try {
    if (editingQuestion.value) {
      // Update existing question
      await updateCustomQuestion(props.module.id, editingQuestion.value.id, questionData)
    } else {
      // Create new question
      await addCustomQuestion(props.module.id, questionData)
    }

    loadQuestions()
    emit('questionsUpdated', props.module.id)
    handleCancelEdit()
  } catch (error) {
    console.error('Error saving question:', error)
  }
}

const handleCancelEdit = () => {
  editingQuestion.value = undefined
  if (activeTab.value === 'create') {
    activeTab.value = 'my-questions'
  }
}
</script>