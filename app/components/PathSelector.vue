<template>
  <div class="relative path-selector-container">
 
    <button
       @click="toggleDropdown"
      class="flex gap-2 items-center px-3 py-2 min-w-0 max-w-xs text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div
        v-if="currentLearningPath"
        class="flex-shrink-0 w-2 h-2 rounded-full"
        :style="{ backgroundColor: currentLearningPath.color || '#6366f1' }"
      ></div>
      <span class="truncate">{{ currentLearningPath?.name || 'Select Path' }}</span>
      <ChevronDownIcon
        class="w-4 h-4 text-gray-400 transition-transform"
        :class="{ 'rotate-180': showDropdown }"
      />
    </button>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="overflow-hidden absolute right-0 z-50 mt-1 w-72 max-h-96 bg-white rounded-lg border border-gray-200 shadow-lg"
    >
      <!-- Search Bar -->
      <div class="p-3 border-b border-gray-200">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
          <input
            v-model="searchQuery"
            @click.stop
            placeholder="Search paths..."
            class="py-2 pr-4 pl-10 w-full text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Path List -->
      <div class="overflow-y-auto max-h-64">
        <div v-if="filteredPathsList.length === 0" class="p-4 text-sm text-center text-gray-500">
          {{ searchQuery ? 'No paths found' : 'No paths created yet' }}
        </div>

        <div
          v-for="path in filteredPathsList"
          :key="path.id"
          @click="selectPath(path.id)"
          class="p-3 w-full text-left border-b border-gray-100 transition-colors cursor-pointer"
          :class="{
            'bg-indigo-50 border-indigo-200': path.id === activePathId
          }"
        >
          <div class="flex gap-3 items-center">
            <div
              class="flex-shrink-0 w-3 h-3 rounded-full"
              :style="{ backgroundColor: path.color || '#6366f1' }"
            ></div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <p class="text-sm font-medium text-gray-900 truncate">{{ path.name }}</p>
             
              </div>
              <div class="flex gap-2 items-center mt-1">
                <span class="text-xs text-gray-500">{{ path.modules?.length || 0 }} modules</span>
                <span class="text-xs text-gray-400">•</span>
                <span class="text-xs text-gray-500">{{ formatDuration(path.totalDuration || 0) }}</span>
                <span v-if="path.overallProgress > 0" class="text-xs text-gray-400">•</span>
                <span v-if="path.overallProgress > 0" class="text-xs font-medium" :class="getPathProgressColor(path.overallProgress)">
                  {{ path.overallProgress }}%
                </span>
              </div>
              <div v-if="path.tags && path.tags.length > 0" class="flex flex-wrap gap-1 mt-1">
                <span
                  v-for="tag in path.tags.slice(0, 2)"
                  :key="tag"
                  class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded"
                >
                  {{ tag }}
                </span>
                <span v-if="path.tags.length > 2" class="text-xs text-gray-500">
                  +{{ path.tags.length - 2 }}
                </span>
              </div>
            </div>
            <div class="flex flex-col gap-1 items-end">
              <CheckIcon
                v-if="path.id === activePathId"
                class="w-5 h-5 text-indigo-600"
              />
              <div class="text-xs text-gray-400">
                {{ formatDate(path.lastUpdated) }}
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

 
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue'
import {
  ChevronDownIcon,
  CheckIcon,
  PlusIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  InformationCircleIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'
import { formatDate } from '~/utils/formatting'
import { ref } from 'vue'

// State
const showDropdown = ref(false)

const searchQuery = ref('')
const selectedPathDetails = ref(null)

// Composables
const {
  currentLearningPath,
  activePathId,
  learningPaths,
  formatDuration,
  loadLearningPaths
} = useLearningPath()

const {
  switchToPath,
  startCreatePath,
  searchPaths,
  filteredPaths
} = usePathManager()

// Local storage fallback
const localPaths = ref([])

// Method to load paths directly from Local Storage
const loadPathsFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedPaths = localStorage.getItem('learning-paths')
      if (savedPaths) {
        const paths = JSON.parse(savedPaths)
        if (Array.isArray(paths)) {
          console.log('PathSelector: Loaded', paths.length, 'paths from Local Storage')
          localPaths.value = paths
          return paths
        }
      }
    } catch (error) {
      console.error('PathSelector: Error loading from Local Storage:', error)
    }
  }
  return []
}

const toggleDropdown = () => {
showDropdown.value = !showDropdown.value
}

// Method to ensure paths are loaded
const ensurePathsLoaded = () => {
  let paths = []

  // Try reactive learningPaths first
  if (learningPaths?.value && learningPaths.value.length > 0) {
    paths = learningPaths.value
    console.log('PathSelector: Using learningPaths:', paths.length)
  }
  // Fallback to filteredPaths
  else if (filteredPaths?.value && filteredPaths.value.length > 0) {
    paths = filteredPaths.value
    console.log('PathSelector: Using filteredPaths:', paths.length)
  }
  // Final fallback to local storage data
  else if (localPaths.value.length > 0) {
    paths = localPaths.value
    console.log('PathSelector: Using localPaths:', paths.length)
  }

  return paths
}

// Computed with forced reactivity
const filteredPathsList = computed(() => {
  // Force dependency tracking and use the enhanced data loading
  const paths = ensurePathsLoaded()
  const query = searchQuery?.value?.trim()

  console.log('PathSelector: Computing filteredPathsList', {
    totalPaths: paths.length,
    searchQuery: query
  })

  // Filter out archived paths
  const activePaths = paths.filter(path => !path.isArchived)

  // Apply search filter if needed
  if (!query) {
    console.log('PathSelector: Returning', activePaths.length, 'active paths')
    return activePaths
  }

  // Search functionality - fallback to searchPaths if available
  if (typeof searchPaths === 'function') {
    return searchPaths(query) || []
  }

  // Manual search if searchPaths not available
  const searchQueryLower = query.toLowerCase()
  const filtered = activePaths.filter(path =>
    path.name.toLowerCase().includes(searchQueryLower) ||
    (path.description && path.description.toLowerCase().includes(searchQueryLower)) ||
    (path.tags && path.tags.some(tag => tag.toLowerCase().includes(searchQueryLower)))
  )

  console.log('PathSelector: Returning', filtered.length, 'filtered paths')
  return filtered
})

// Methods
const selectPath = (pathId: string) => {
  switchToPath(pathId)
  showDropdown.value = false // close after select
}





const getPathProgressColor = (progress: number): string => {
  if (progress >= 80) return 'text-green-600'
  if (progress >= 50) return 'text-yellow-600'
  return 'text-gray-600'
}



const formatDate = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date'
    }

    const now = new Date()
    const diffTime = Math.abs(now.getTime() - dateObj.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'today'
    if (diffDays === 1) return 'yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
    return `${Math.floor(diffDays / 365)}y ago`
  } catch (error) {
    console.error('Error formatting relative date:', error, 'Input:', date)
    return 'Invalid date'
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.path-selector-container')) {
    showDropdown.value = false
  }
}

// Watch dropdown state changes
watch(showDropdown, (isOpen) => {
  if (isOpen) {
    console.log('PathSelector: Dropdown opened')


  }
})

// Watch reactive sources to trigger updates
watch([learningPaths, filteredPaths, localPaths], () => {
  console.log('PathSelector: Paths updated, recomputing filtered list')
  nextTick(() => {
    ensurePathsLoaded()
  })
}, { deep: true })


onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>