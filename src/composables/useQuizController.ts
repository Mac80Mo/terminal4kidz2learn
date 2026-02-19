import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { allQuestions, topics } from '../data/questions'
import type { Question } from '../types/quiz'
import { DIFFICULTY_ORDER } from '../constants/game'
import type { Difficulty } from '../constants/game'

/**
 * Quiz Controller ViewModel (MVVM)
 * Pool-basiertes Quiz-System mit Schwierigkeits-Progression:
 * - Easy → Medium → Hard (automatisch wenn alle korrekt)
 * - Falsch beantwortete Fragen bleiben im Pool
 * - Fragen werden zufällig aus dem aktuellen Pool gezogen
 */
export function useQuizController() {
  const store = useGameStore()
  
  // === UI STATE ===
  const currentTopicId = ref<string | null>(null)
  const currentQuestion = ref<Question | null>(null)
  const currentDifficulty = ref<Difficulty>('easy')
  const questionsAnsweredInRound = ref(0)
  const allCompleted = ref(false)
  
  // === COMPUTED ===
  const currentTopic = computed(() => {
    if (!currentTopicId.value) return null
    return topics.find(t => t.id === currentTopicId.value) || null
  })
  
  const currentTopicName = computed(() => currentTopic.value?.name || 'Quiz')
  
  /**
   * Gibt die Fragen für ein Topic + Difficulty zurück,
   * die noch NICHT korrekt beantwortet wurden.
   */
  const availableQuestions = computed(() => {
    if (!currentTopicId.value) return []
    const topicQuestions = allQuestions[currentTopicId.value] || []
    return topicQuestions.filter(q =>
      q.difficulty === currentDifficulty.value &&
      !store.isAnsweredCorrectly(currentTopicId.value!, q.id)
    )
  })
  
  /**
   * Gesamtzahl Fragen der aktuellen Schwierigkeit (inkl. bereits beantworteter)
   */
  const totalQuestionsForDifficulty = computed(() => {
    if (!currentTopicId.value) return 0
    const topicQuestions = allQuestions[currentTopicId.value] || []
    return topicQuestions.filter(q => q.difficulty === currentDifficulty.value).length
  })
  
  /**
   * Anzahl verbleibender Fragen im aktuellen Pool
   */
  const remainingQuestions = computed(() => availableQuestions.value.length)
  
  const questionNumber = computed(() => questionsAnsweredInRound.value + 1)
  
  const difficultyLabel = computed(() => {
    const labels: Record<Difficulty, string> = {
      easy: '⭐ Leicht',
      medium: '⭐⭐ Mittel',
      hard: '⭐⭐⭐ Schwer'
    }
    return labels[currentDifficulty.value]
  })
  
  // === HELPER ===
  
  /**
   * Wählt eine zufällige Frage aus dem verfügbaren Pool
   */
  function pickRandomQuestion(): Question | null {
    const pool = availableQuestions.value
    if (pool.length === 0) return null
    const randomIndex = Math.floor(Math.random() * pool.length)
    return pool[randomIndex]
  }
  
  /**
   * Prüft, ob alle Fragen einer Difficulty für das aktuelle Topic korrekt beantwortet sind
   */
  function isDifficultyComplete(difficulty: Difficulty): boolean {
    if (!currentTopicId.value) return false
    const topicQuestions = allQuestions[currentTopicId.value] || []
    const questionsOfDifficulty = topicQuestions.filter(q => q.difficulty === difficulty)
    return questionsOfDifficulty.every(q =>
      store.isAnsweredCorrectly(currentTopicId.value!, q.id)
    )
  }
  
  /**
   * Bestimmt die aktuelle Schwierigkeit basierend auf Fortschritt.
   * Springt automatisch zur nächsten Stufe wenn alle korrekt.
   * Gibt 'completed' zurück wenn alles geschafft ist.
   */
  function determineCurrentDifficulty(): Difficulty | 'completed' {
    for (const diff of DIFFICULTY_ORDER) {
      if (!isDifficultyComplete(diff)) {
        return diff
      }
    }
    return 'completed'
  }
  
  // === ACTIONS ===
  function selectTopic(topicId: string) {
    currentTopicId.value = topicId
    questionsAnsweredInRound.value = 0
    allCompleted.value = false
    
    // Schwierigkeit basierend auf bisherigem Fortschritt bestimmen
    const diff = determineCurrentDifficulty()
    if (diff === 'completed') {
      allCompleted.value = true
      currentQuestion.value = null
      currentDifficulty.value = 'hard'
      return
    }
    currentDifficulty.value = diff
    
    loadNextRandomQuestion()
  }
  
  function loadNextRandomQuestion() {
    currentQuestion.value = pickRandomQuestion()
  }
  
  /**
   * Gibt zurück ob ein Level-Up oder Difficulty-Wechsel stattfand
   */
  function submitAnswer(isCorrect: boolean): { 
    recorded: boolean
    leveledUp: boolean
    difficultyChanged: boolean
    newDifficulty: Difficulty | null
    allCompleted: boolean
  } {
    if (!currentQuestion.value) {
      return { recorded: false, leveledUp: false, difficultyChanged: false, newDifficulty: null, allCompleted: false }
    }
    
    const levelBefore = store.level
    const difficultyBefore = currentDifficulty.value
    
    store.recordAnswer(isCorrect, currentQuestion.value)
    questionsAnsweredInRound.value++
    
    const leveledUp = store.level > levelBefore
    
    // Nach korrekter Antwort: Difficulty-Progression prüfen
    let difficultyChanged = false
    let newDifficulty: Difficulty | null = null
    let completed = false
    
    if (isCorrect) {
      const nextDiff = determineCurrentDifficulty()
      if (nextDiff === 'completed') {
        completed = true
        allCompleted.value = true
      } else if (nextDiff !== difficultyBefore) {
        difficultyChanged = true
        newDifficulty = nextDiff
        currentDifficulty.value = nextDiff
      }
    }
    
    return { 
      recorded: true, 
      leveledUp, 
      difficultyChanged, 
      newDifficulty,
      allCompleted: completed
    }
  }
  
  /**
   * Lädt die nächste zufällige Frage.
   * Gibt false zurück wenn keine Fragen mehr verfügbar sind (alle geschafft).
   */
  function nextQuestion(): boolean {
    if (allCompleted.value) {
      return false
    }
    
    loadNextRandomQuestion()
    
    if (!currentQuestion.value) {
      // Sollte nicht passieren wenn allCompleted korrekt gesetzt ist
      allCompleted.value = true
      return false
    }
    
    return true
  }
  
  function resetQuiz() {
    currentTopicId.value = null
    currentQuestion.value = null
    currentDifficulty.value = 'easy'
    questionsAnsweredInRound.value = 0
    allCompleted.value = false
    store.resetAll()
  }
  
  function endQuiz() {
    currentTopicId.value = null
    currentQuestion.value = null
    currentDifficulty.value = 'easy'
    questionsAnsweredInRound.value = 0
    allCompleted.value = false
    store.resetRoundScore()
  }
  
  return {
    // State
    currentTopicId,
    currentQuestion,
    currentDifficulty,
    questionsAnsweredInRound,
    allCompleted,
    // Computed
    currentTopic,
    currentTopicName,
    availableQuestions,
    totalQuestionsForDifficulty,
    remainingQuestions,
    questionNumber,
    difficultyLabel,
    // Actions
    selectTopic,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    endQuiz
  }
}
