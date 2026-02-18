import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { allQuestions, topics } from '../data/questions'
import type { Question } from '../types/quiz'

/**
 * Quiz Controller ViewModel (MVVM)
 * Verwaltet Quiz-Ablauf und Fragen-Navigation
 */
export function useQuizController() {
  const store = useGameStore()
  
  // === UI STATE ===
  const currentTopicId = ref<string | null>(null)
  const currentQuestionIndex = ref(0)
  const currentQuestion = ref<Question | null>(null)
  
  // === COMPUTED ===
  const currentTopic = computed(() => {
    if (!currentTopicId.value) return null
    return topics.find(t => t.id === currentTopicId.value) || null
  })
  
  const currentTopicName = computed(() => currentTopic.value?.name || 'Quiz')
  
  const totalQuestions = computed(() => {
    if (!currentTopicId.value) return 0
    return allQuestions[currentTopicId.value]?.length || 0
  })
  
  const questionNumber = computed(() => currentQuestionIndex.value + 1)
  
  const isLastQuestion = computed(() => {
    return questionNumber.value >= totalQuestions.value
  })
  
  // === ACTIONS ===
  function selectTopic(topicId: string) {
    currentTopicId.value = topicId
    currentQuestionIndex.value = 0
    loadCurrentQuestion()
  }
  
  function loadCurrentQuestion() {
    if (!currentTopicId.value) {
      currentQuestion.value = null
      return
    }
    
    const questions = allQuestions[currentTopicId.value]
    const question = questions?.[currentQuestionIndex.value]
    currentQuestion.value = question ?? null
  }
  
  function submitAnswer(isCorrect: boolean): boolean {
    if (!currentQuestion.value) return false
    
    store.recordAnswer(isCorrect, currentQuestion.value)
    return true
  }
  
  function nextQuestion(): boolean {
    if (isLastQuestion.value) {
      return false // Quiz beendet
    }
    
    currentQuestionIndex.value++
    loadCurrentQuestion()
    return true
  }
  
  function resetQuiz() {
    currentTopicId.value = null
    currentQuestionIndex.value = 0
    currentQuestion.value = null
    store.resetStats()
  }
  
  function endQuiz() {
    currentTopicId.value = null
    currentQuestionIndex.value = 0
    currentQuestion.value = null
  }
  
  return {
    // State
    currentTopicId,
    currentQuestionIndex,
    currentQuestion,
    // Computed
    currentTopic,
    currentTopicName,
    totalQuestions,
    questionNumber,
    isLastQuestion,
    // Actions
    selectTopic,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    endQuiz
  }
}
