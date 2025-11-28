import type { Module, LearningPath, ModuleStatus, QuizAttempt, Certificate, CustomQuestion, CustomQuestionBank, ImportedQuestion } from '~/types'
import { formatDuration } from '~/utils/formatting'

const LEARNING_PATH_KEY = 'learning-path'
const CUSTOM_MODULES_KEY = 'custom-modules'
const QUIZ_ATTEMPTS_KEY = 'quiz-attempts'
const CERTIFICATES_KEY = 'certificates'
const CUSTOM_QUESTIONS_KEY = 'custom-module-questions'
const QUESTION_IMPORTS_KEY = 'imported-questions'

export const useLearningPath = () => {
  // Sample modules data
  const sampleModules: Module[] = [
    {
      id: 'html-basics',
      title: 'HTML Fundamentals',
      description: 'Learn the basics of HTML including tags, attributes, and semantic markup.',
      duration: 120,
      category: 'Web Development',
      difficulty: 'Beginner',
      icon: '🌐',
      status: 'not-started',
      progress: 0,
      prerequisites: [],
      learningObjectives: [
        'Understand HTML document structure',
        'Master common HTML tags and attributes',
        'Learn semantic HTML best practices',
        'Create accessible web content'
      ],
      topics: ['HTML Elements', 'Attributes', 'Semantic Markup', 'Accessibility', 'Forms'],
      resources: [
        {
          id: 'mdn-html',
          title: 'MDN HTML Documentation',
          type: 'documentation',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          description: 'Comprehensive HTML reference guide'
        }
      ]
    },
    {
      id: 'css-basics',
      title: 'CSS Essentials',
      description: 'Master CSS fundamentals including selectors, properties, and layout techniques.',
      duration: 180,
      category: 'Web Development',
      difficulty: 'Beginner',
      icon: '🎨',
      status: 'not-started',
      progress: 0,
      prerequisites: ['HTML Fundamentals'],
      learningObjectives: [
        'Understand CSS syntax and selectors',
        'Master the box model and positioning',
        'Learn Flexbox and CSS Grid layouts',
        'Create responsive designs with media queries',
        'Apply modern CSS features and best practices'
      ],
      topics: ['CSS Selectors', 'Box Model', 'Flexbox', 'CSS Grid', 'Responsive Design', 'Transitions', 'Animations'],
      resources: [
        {
          id: 'mdn-css',
          title: 'MDN CSS Documentation',
          type: 'documentation',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          description: 'Comprehensive CSS reference guide'
        }
      ]
    },
    {
      id: 'javascript-basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript programming concepts, DOM manipulation, and basic algorithms.',
      duration: 240,
      category: 'Web Development',
      difficulty: 'Beginner',
      icon: '⚡',
      status: 'not-started',
      progress: 0,
      prerequisites: ['HTML Fundamentals', 'CSS Essentials'],
      learningObjectives: [
        'Understand JavaScript syntax and data types',
        'Master functions, scope, and closures',
        'Learn DOM manipulation and event handling',
        'Implement asynchronous programming with promises',
        'Apply modern ES6+ features and best practices'
      ],
      topics: ['Variables & Data Types', 'Functions', 'DOM Manipulation', 'Events', 'Async Programming', 'ES6+', 'Error Handling'],
      resources: [
        {
          id: 'mdn-js',
          title: 'MDN JavaScript Guide',
          type: 'documentation',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          description: 'Complete JavaScript learning guide'
        },
        {
          id: 'javascript-info',
          title: 'Modern JavaScript Tutorial',
          type: 'course',
          url: 'https://javascript.info/',
          description: 'Comprehensive JavaScript tutorial'
        }
      ]
    },
    {
      id: 'react-basics',
      title: 'React Fundamentals',
      description: 'Introduction to React, components, state management, and hooks.',
      duration: 300,
      category: 'Web Development',
      difficulty: 'Intermediate',
      icon: '⚛️'
    },
    {
      id: 'nodejs-basics',
      title: 'Node.js Fundamentals',
      description: 'Server-side JavaScript with Node.js, Express, and basic API development.',
      duration: 280,
      category: 'Backend Development',
      difficulty: 'Intermediate',
      icon: '🟢'
    },
    {
      id: 'database-basics',
      title: 'Database Fundamentals',
      description: 'Introduction to SQL, NoSQL databases, and data modeling concepts.',
      duration: 200,
      category: 'Backend Development',
      difficulty: 'Intermediate',
      icon: '🗄️'
    },
    {
      id: 'git-basics',
      title: 'Git Version Control',
      description: 'Master Git commands, branching, merging, and collaborative workflows.',
      duration: 150,
      category: 'DevOps',
      difficulty: 'Beginner',
      icon: '📦'
    },
    {
      id: 'docker-basics',
      title: 'Docker Fundamentals',
      description: 'Containerization with Docker, images, containers, and Docker Compose.',
      duration: 220,
      category: 'DevOps',
      difficulty: 'Intermediate',
      icon: '🐳'
    },
    {
      id: 'react-native-basics',
      title: 'React Native Fundamentals',
      description: 'Build mobile apps with React Native, components, and platform-specific code.',
      duration: 320,
      category: 'Mobile Development',
      difficulty: 'Intermediate',
      icon: '📱'
    },
    {
      id: 'python-basics',
      title: 'Python Programming',
      description: 'Learn Python fundamentals, data structures, and basic algorithms.',
      duration: 260,
      category: 'Data Science',
      difficulty: 'Beginner',
      icon: '🐍'
    },
    {
      id: 'communication-skills',
      title: 'Effective Communication',
      description: 'Develop verbal and written communication skills for technical professionals.',
      duration: 180,
      category: 'Soft Skills',
      difficulty: 'Beginner',
      icon: '💬'
    },
    {
      id: 'project-management',
      title: 'Agile Project Management',
      description: 'Learn Scrum, Kanban, and agile methodologies for software projects.',
      duration: 200,
      category: 'Soft Skills',
      difficulty: 'Intermediate',
      icon: '📋'
    }
  ]

  // State
  const learningPath = useState<LearningPath>('learning-path', () => ({
    modules: [],
    totalDuration: 0,
    lastUpdated: new Date(),
    name: 'My Learning Path'
  }))

  const customModules = useState<Module[]>('custom-modules', () => [])

  // Quiz-related state
  const quizAttempts = useState<QuizAttempt[]>('quiz-attempts', () => [])
  const certificates = useState<Certificate[]>('certificates', () => [])

  // Custom Questions state
  const customQuestions = useState<CustomQuestionBank>('custom-module-questions', () => ({}))
  const importedQuestions = useState<ImportedQuestion[]>('imported-questions', () => [])

  // Computed available modules that combines sample and custom modules
  const availableModules = computed(() => [...sampleModules, ...customModules.value])

  // Computed properties
  const totalDuration = computed(() =>
    learningPath.value.modules.reduce((total, module) => total + module.duration, 0)
  )

  const moduleCount = computed(() => learningPath.value.modules.length)

  // Methods
  const calculateTotalDuration = (modules: Module[]): number => {
    return modules.reduce((total, module) => total + module.duration, 0)
  }

  const addToLearningPath = (module: Module) => {
    // Check if module is already in the learning path
    if (!learningPath.value.modules.find(m => m.id === module.id)) {
      // Add module with default progress tracking values
      const moduleToAdd = {
        ...module,
        status: module.status || 'not-started',
        progress: module.progress || 0
      }
      learningPath.value.modules.push(moduleToAdd)
      learningPath.value.totalDuration = calculateTotalDuration(learningPath.value.modules)
      learningPath.value.lastUpdated = new Date()
      saveToLocalStorage()
    }
  }

  const removeFromLearningPath = (moduleId: string) => {
    const index = learningPath.value.modules.findIndex(m => m.id === moduleId)
    if (index > -1) {
      learningPath.value.modules.splice(index, 1)
      learningPath.value.totalDuration = calculateTotalDuration(learningPath.value.modules)
      learningPath.value.lastUpdated = new Date()
      saveToLocalStorage()
    }
  }

  const reorderModules = (oldIndex: number, newIndex: number) => {
    const [movedModule] = learningPath.value.modules.splice(oldIndex, 1)
    learningPath.value.modules.splice(newIndex, 0, movedModule)
    learningPath.value.lastUpdated = new Date()
    saveToLocalStorage()
  }

  const clearLearningPath = () => {
    learningPath.value.modules = []
    learningPath.value.totalDuration = 0
    learningPath.value.lastUpdated = new Date()
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    if (import.meta.client) {
      localStorage.setItem(LEARNING_PATH_KEY, JSON.stringify(learningPath.value))
      localStorage.setItem(CUSTOM_MODULES_KEY, JSON.stringify(customModules.value))
      localStorage.setItem(QUIZ_ATTEMPTS_KEY, JSON.stringify(quizAttempts.value))
      localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(certificates.value))
    }
  }

  const loadFromLocalStorage = () => {
    if (import.meta.client) {
      // Load learning path
      const savedPath = localStorage.getItem(LEARNING_PATH_KEY)
      if (savedPath) {
        try {
          const data = JSON.parse(savedPath)
          learningPath.value = {
            ...data,
            lastUpdated: new Date(data.lastUpdated),
            lastProgressUpdate: data.lastProgressUpdate ? new Date(data.lastProgressUpdate) : undefined,
            // Ensure modules have progress tracking fields
            modules: data.modules?.map((module: any) => ({
              ...module,
              status: module.status || 'not-started',
              progress: module.progress || 0
            })) || []
          }
        } catch (error) {
          console.error('Error loading learning path from localStorage:', error)
        }
      }

      // Load custom modules
      const savedModules = localStorage.getItem(CUSTOM_MODULES_KEY)
      if (savedModules) {
        try {
          const modules = JSON.parse(savedModules)
          customModules.value = Array.isArray(modules) ? modules : []
        } catch (error) {
          console.error('Error loading custom modules from localStorage:', error)
          customModules.value = []
        }
      } else {
        customModules.value = []
      }

      // Load quiz attempts
      const savedQuizAttempts = localStorage.getItem(QUIZ_ATTEMPTS_KEY)
      if (savedQuizAttempts) {
        try {
          const attempts = JSON.parse(savedQuizAttempts)
          quizAttempts.value = Array.isArray(attempts) ? attempts.map((attempt: any) => ({
            ...attempt,
            timestamp: new Date(attempt.timestamp)
          })) : []
        } catch (error) {
          console.error('Error loading quiz attempts from localStorage:', error)
          quizAttempts.value = []
        }
      } else {
        quizAttempts.value = []
      }

      // Load certificates
      const savedCertificates = localStorage.getItem(CERTIFICATES_KEY)
      if (savedCertificates) {
        try {
          const certs = JSON.parse(savedCertificates)
          certificates.value = Array.isArray(certs) ? certs.map((cert: any) => ({
            ...cert,
            completionDate: new Date(cert.completionDate)
          })) : []
        } catch (error) {
          console.error('Error loading certificates from localStorage:', error)
          certificates.value = []
        }
      } else {
        certificates.value = []
      }
    }
  }

  const isInLearningPath = (moduleId: string): boolean => {
    return learningPath.value.modules.some(m => m.id === moduleId)
  }

  // Module Creation Methods
  const createModule = (moduleData: Omit<Module, 'id'>): Module => {
    const id = moduleData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now()

    const newModule: Module = {
      ...moduleData,
      id,
      icon: moduleData.icon || getDefaultIcon(moduleData.category)
    }

    return newModule
  }

  const addCustomModule = (moduleData: Omit<Module, 'id'>): void => {
    const newModule = createModule(moduleData)
    customModules.value.push(newModule)
    saveToLocalStorage()
  }

  const getDefaultIcon = (category: string): string => {
    const iconMap: Record<string, string> = {
      'Web Development': '🌐',
      'Backend Development': '⚙️',
      'DevOps': '🔧',
      'Mobile Development': '📱',
      'Data Science': '📊',
      'Soft Skills': '💡',
      'Design': '🎨',
      'Testing': '🧪',
      'Security': '🔒',
      'Database': '🗄️'
    }
    return iconMap[category] || '📚'
  }

  const validateModule = (moduleData: Partial<Module>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!moduleData.title || moduleData.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long')
    }

    if (!moduleData.description || moduleData.description.trim().length < 10) {
      errors.push('Description must be at least 10 characters long')
    }

    if (!moduleData.duration || moduleData.duration < 5) {
      errors.push('Duration must be at least 5 minutes')
    }

    if (!moduleData.category) {
      errors.push('Category is required')
    }

    if (!moduleData.difficulty) {
      errors.push('Difficulty level is required')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const removeCustomModule = (moduleId: string): void => {
    const index = customModules.value.findIndex(m => m.id === moduleId)
    if (index > -1) {
      customModules.value.splice(index, 1)
      // Also remove from learning path if it's there
      removeFromLearningPath(moduleId)
      saveToLocalStorage()
    }
  }

  const isCustomModule = (moduleId: string): boolean => {
    return customModules.value.some(m => m.id === moduleId)
  }

  // Progress Tracking Methods
  const updateModuleStatus = (moduleId: string, status: ModuleStatus): void => {
    const module = learningPath.value.modules.find(m => m.id === moduleId)
    if (module) {
      module.status = status
      if (status === 'completed') {
        module.progress = 100
        if (!learningPath.value.completedModules) {
          learningPath.value.completedModules = []
        }
        if (!learningPath.value.completedModules.includes(moduleId)) {
          learningPath.value.completedModules.push(moduleId)
        }
      } else if (status === 'quiz-passed') {
        module.progress = 90
        module.quizCompleted = true
        if (learningPath.value.completedModules) {
          learningPath.value.completedModules = learningPath.value.completedModules.filter(id => id !== moduleId)
        }
      } else if (status === 'quiz-required') {
        module.progress = 75
        if (learningPath.value.completedModules) {
          learningPath.value.completedModules = learningPath.value.completedModules.filter(id => id !== moduleId)
        }
      } else if (status === 'in-progress') {
        module.progress = 50
        if (learningPath.value.completedModules) {
          learningPath.value.completedModules = learningPath.value.completedModules.filter(id => id !== moduleId)
        }
      } else if (status === 'not-started') {
        module.progress = 0
        module.quizCompleted = false
        if (learningPath.value.completedModules) {
          learningPath.value.completedModules = learningPath.value.completedModules.filter(id => id !== moduleId)
        }
      }
      learningPath.value.lastProgressUpdate = new Date()
      learningPath.value.lastUpdated = new Date()
      saveToLocalStorage()
    }
  }

  const updateModuleProgress = (moduleId: string, progress: number): void => {
    const module = learningPath.value.modules.find(m => m.id === moduleId)
    if (module) {
      module.progress = Math.max(0, Math.min(100, progress))
      if (module.progress === 100 && module.status !== 'completed') {
        updateModuleStatus(moduleId, 'completed')
      } else if (module.progress > 0 && module.status === 'not-started') {
        module.status = 'in-progress'
      } else if (module.progress === 0 && module.status === 'in-progress') {
        module.status = 'not-started'
      }
      learningPath.value.lastProgressUpdate = new Date()
      learningPath.value.lastUpdated = new Date()
      saveToLocalStorage()
    }
  }

  const getModuleStatus = (moduleId: string): ModuleStatus => {
    const module = learningPath.value.modules.find(m => m.id === moduleId)
    return module?.status || 'not-started'
  }

  const getModuleProgress = (moduleId: string): number => {
    const module = learningPath.value.modules.find(m => m.id === moduleId)
    return module?.progress || 0
  }

  const getCompletedModulesCount = (): number => {
    return learningPath.value.modules.filter(m => m.status === 'completed').length
  }

  const getOverallProgress = (): number => {
    if (learningPath.value.modules.length === 0) return 0

    // Calculate the sum of progress from all modules
    const totalProgress = learningPath.value.modules.reduce((sum, module) => {
      // If module has progress value, use it
      if (module.progress !== undefined) {
        return sum + module.progress
      }
      // Otherwise, use status-based progress
      if (module.status === 'completed') {
        return sum + 100
      }
      if (module.status === 'in-progress') {
        return sum + 50 // Default to 50% for in-progress without specific progress
      }
      // For 'not-started' status, progress is 0
      return sum
    }, 0)

    // Calculate average progress
    const averageProgress = totalProgress / learningPath.value.modules.length

    // Round to nearest integer and ensure it's between 0-100
    return Math.round(Math.max(0, Math.min(100, averageProgress)))
  }

  const isInProgress = (moduleId: string): boolean => {
    return getModuleStatus(moduleId) === 'in-progress'
  }

  const isCompleted = (moduleId: string): boolean => {
    return getModuleStatus(moduleId) === 'completed'
  }

  // Quiz-related Methods
  const completeQuiz = (moduleId: string, quizAttempt: QuizAttempt): void => {
    // Add quiz attempt to the attempts array
    quizAttempts.value.push(quizAttempt)

    // Find the module and update its quiz-related fields
    const module = learningPath.value.modules.find(m => m.id === moduleId)
    if (module) {
      if (!module.quizAttempts) {
        module.quizAttempts = []
      }
      module.quizAttempts.push(quizAttempt)

      if (quizAttempt.passed) {
        // Update module status to quiz-passed
        updateModuleStatus(moduleId, 'quiz-passed')
      }
    }

    saveToLocalStorage()
  }

  const getQuizAttempts = (moduleId: string): QuizAttempt[] => {
    return quizAttempts.value.filter(attempt => attempt.moduleId === moduleId)
  }

  const getQuizStatistics = (moduleId: string) => {
    const attempts = getQuizAttempts(moduleId)

    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        passedAttempts: 0,
        failedAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        averageTimeSpent: 0,
        passRate: 0
      }
    }

    const passedAttempts = attempts.filter(attempt => attempt.passed)
    const scores = attempts.map(attempt => attempt.score)
    const timesSpent = attempts.map(attempt => attempt.timeSpent)

    return {
      totalAttempts: attempts.length,
      passedAttempts: passedAttempts.length,
      failedAttempts: attempts.length - passedAttempts.length,
      bestScore: Math.max(...scores),
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      averageTimeSpent: Math.round(timesSpent.reduce((a, b) => a + b, 0) / timesSpent.length),
      passRate: Math.round((passedAttempts.length / attempts.length) * 100)
    }
  }

  const addCertificate = (certificate: Certificate): void => {
    certificates.value.push(certificate)

    // Update the module with certificate information
    const module = learningPath.value.modules.find(m => m.id === certificate.moduleId)
    if (module) {
      module.certificate = certificate
    }

    saveToLocalStorage()
  }

  const getCertificates = (): Certificate[] => {
    return certificates.value
  }

  const getCertificate = (moduleId: string): Certificate | null => {
    return certificates.value.find(cert => cert.moduleId === moduleId) || null
  }

  const hasCertificate = (moduleId: string): boolean => {
    return certificates.value.some(cert => cert.moduleId === moduleId)
  }

  // Custom Questions Management Functions

  const loadCustomQuestions = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CUSTOM_QUESTIONS_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          customQuestions.value = parsed || {}
          // Convert date strings back to Date objects
          Object.keys(customQuestions.value).forEach(moduleId => {
            customQuestions.value[moduleId] = customQuestions.value[moduleId].map(q => ({
              ...q,
              createdAt: new Date(q.createdAt),
              updatedAt: q.updatedAt ? new Date(q.updatedAt) : undefined
            }))
          })
        } catch (error) {
          console.error('Error loading custom questions:', error)
          customQuestions.value = {}
        }
      }
    }
  }

  const saveCustomQuestions = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(customQuestions.value))
    }
  }

  const loadImportedQuestions = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(QUESTION_IMPORTS_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          importedQuestions.value = parsed || []
          // Convert date strings back to Date objects
          importedQuestions.value = importedQuestions.value.map(iq => ({
            ...iq,
            importedAt: new Date(iq.importedAt)
          }))
        } catch (error) {
          console.error('Error loading imported questions:', error)
          importedQuestions.value = []
        }
      }
    }
  }

  const saveImportedQuestions = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUESTION_IMPORTS_KEY, JSON.stringify(importedQuestions.value))
    }
  }

  // CRUD Operations for Custom Questions
  const addCustomQuestion = (moduleId: string, questionData: Omit<CustomQuestion, 'id' | 'isCustom' | 'createdAt'>) => {
    // Validate required fields
    if (!moduleId || !questionData.text || !questionData.options || questionData.options.length < 2) {
      throw new Error('Invalid question data: moduleId, text, and at least 2 options are required')
    }

    if (!customQuestions.value[moduleId]) {
      customQuestions.value[moduleId] = []
    }

    const newQuestion: CustomQuestion = {
      ...questionData,
      id: `custom-q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isCustom: true,
      createdAt: new Date(),
      moduleId
    }

    customQuestions.value[moduleId].push(newQuestion)
    updateModuleQuestionCount(moduleId)
    saveCustomQuestions()

    return newQuestion
  }

  const updateCustomQuestion = (moduleId: string, questionId: string, updates: Partial<CustomQuestion>) => {
    const questions = customQuestions.value[moduleId]
    if (!questions) return null

    const questionIndex = questions.findIndex(q => q.id === questionId)
    if (questionIndex === -1) return null

    questions[questionIndex] = {
      ...questions[questionIndex],
      ...updates,
      updatedAt: new Date()
    }

    saveCustomQuestions()
    return questions[questionIndex]
  }

  const removeCustomQuestion = (moduleId: string, questionId: string) => {
    const questions = customQuestions.value[moduleId]
    if (!questions) return false

    const initialLength = questions.length
    customQuestions.value[moduleId] = questions.filter(q => q.id !== questionId)

    // Check if questions still exist after filtering
    if (customQuestions.value[moduleId] && customQuestions.value[moduleId].length === 0) {
      delete customQuestions.value[moduleId]
    }

    updateModuleQuestionCount(moduleId)
    saveCustomQuestions()

    // Calculate result based on whether questions were actually removed
    const currentQuestions = customQuestions.value[moduleId]
    const currentLength = currentQuestions ? currentQuestions.length : 0

    return currentLength < initialLength
  }

  const getModuleCustomQuestions = (moduleId: string): CustomQuestion[] => {
    return customQuestions.value[moduleId] || []
  }

  // Import Questions from Existing Question Bank
  const importQuestionsFromBank = async (moduleId: string, questionIds: string[]) => {
    try {
      const { questionBank } = await import('~/data/questionBank')

      questionIds.forEach(originalId => {
        const originalQuestion = questionBank.find(q => q.id === originalId)
        if (!originalQuestion) return

        // Check if already imported
        const alreadyImported = importedQuestions.value.some(
          iq => iq.originalQuestionId === originalId && iq.targetModuleId === moduleId
        )

        if (alreadyImported) return

        // Create custom question copy
        const customQuestion: Omit<CustomQuestion, 'id' | 'isCustom' | 'createdAt'> = {
          moduleId,
          text: originalQuestion.text,
          category: originalQuestion.category,
          difficulty: originalQuestion.difficulty,
          options: [...originalQuestion.options],
          correctAnswer: originalQuestion.correctAnswer,
          explanation: originalQuestion.explanation
        }

        addCustomQuestion(moduleId, customQuestion)

        // Track import
        importedQuestions.value.push({
          originalQuestionId: originalId,
          targetModuleId: moduleId,
          importedAt: new Date()
        })
      })

      saveImportedQuestions()
    } catch (error) {
      console.error('Error importing questions:', error)
    }
  }

  // Get all available questions for a module (custom + imported from bank)
  const getAllQuestionsForModule = async (moduleId: string, category: string, difficulty: string) => {
    try {
      const customQuestions = getModuleCustomQuestions(moduleId)

      // Get questions from main bank that match this module
      const { getQuestionsByCategory } = await import('~/data/questionBank')
      const bankQuestions = getQuestionsByCategory(category, difficulty as any, moduleId)

      // Combine and return all questions
      return [...customQuestions, ...bankQuestions]
    } catch (error) {
      console.error('Error getting all questions for module:', error)
      return []
    }
  }

  // Helper Functions
  const updateModuleQuestionCount = (moduleId: string) => {
    const module = availableModules.value.find(m => m.id === moduleId)
    if (module && isCustomModule(moduleId)) {
      module.hasCustomQuestions = customQuestions.value[moduleId]?.length > 0
      module.customQuestionCount = customQuestions.value[moduleId]?.length || 0
    }
  }

  // Load from localStorage on initialization
  onMounted(() => {
    loadFromLocalStorage()
    loadCustomQuestions()
    loadImportedQuestions()
  })

  return {
    // State
    learningPath: readonly(learningPath),
    availableModules: readonly(availableModules),
    quizAttempts: readonly(quizAttempts),
    certificates: readonly(certificates),
    customQuestions: readonly(customQuestions),
    importedQuestions: readonly(importedQuestions),

    // Computed
    totalDuration,
    moduleCount,

    // Methods
    addToLearningPath,
    removeFromLearningPath,
    reorderModules,
    clearLearningPath,
    saveToLocalStorage,
    loadFromLocalStorage,
    formatDuration,
    isInLearningPath,

    // Module Creation Methods
    createModule,
    addCustomModule,
    removeCustomModule,
    isCustomModule,
    validateModule,
    getDefaultIcon,

    // Progress Tracking Methods
    updateModuleStatus,
    updateModuleProgress,
    getModuleStatus,
    getModuleProgress,
    getCompletedModulesCount,
    getOverallProgress,
    isInProgress,
    isCompleted,

    // Quiz-related Methods
    completeQuiz,
    getQuizAttempts,
    getQuizStatistics,
    addCertificate,
    getCertificates,
    getCertificate,
    hasCertificate,

    // Custom Questions Management Methods
    addCustomQuestion,
    updateCustomQuestion,
    removeCustomQuestion,
    getModuleCustomQuestions,
    importQuestionsFromBank,
    getAllQuestionsForModule,
    loadCustomQuestions,
    saveCustomQuestions,
    loadImportedQuestions,
    saveImportedQuestions
  }
}