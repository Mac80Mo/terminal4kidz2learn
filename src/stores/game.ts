import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import type { Question } from '../types/quiz'
import { XP_PER_LEVEL } from '../constants/game'

/**
 * Game Store - Model Layer (MVVM)
 * Enthält nur Spiellogik und persistente Daten, keine UI-State
 */
export const useGameStore = defineStore('game', () => {
  // === PLAYER DATA ===
  const userName = ref('Spieler')
  
  // === GAME STATISTICS ===
  const score = ref(0)
  const totalXP = ref(0)
  const streak = ref(0)
  const questionsAnswered = ref(0)
  const correctAnswers = ref(0)
  
  // === FRAGEN-POOL TRACKING ===
  // Set aller korrekt beantworteten Fragen-IDs (pro Topic)
  const answeredCorrectly = reactive(new Map<string, Set<string>>())
  
  // === COMPUTED (abgeleitete Werte) ===
  const level = computed(() => Math.floor(totalXP.value / XP_PER_LEVEL) + 1)
  const xpToNextLevel = computed(() => (level.value * XP_PER_LEVEL) - totalXP.value)
  const accuracy = computed(() => {
    if (questionsAnswered.value === 0) return 0
    return Math.round((correctAnswers.value / questionsAnswered.value) * 100)
  })
  
  // === ACTIONS (Business Logic) ===
  function setUserName(name: string) {
    userName.value = name
  }
  
  function recordAnswer(isCorrect: boolean, question: Question) {
    questionsAnswered.value++
    
    if (isCorrect) {
      score.value += question.points
      totalXP.value += question.xp
      correctAnswers.value++
      streak.value++
      // Frage als korrekt beantwortet markieren
      markAsCorrect(question.topic, question.id)
    } else {
      streak.value = 0
    }
  }
  
  /**
   * Markiert eine Frage als korrekt beantwortet für ein Topic
   */
  function markAsCorrect(topicId: string, questionId: string) {
    if (!answeredCorrectly.has(topicId)) {
      answeredCorrectly.set(topicId, new Set())
    }
    answeredCorrectly.get(topicId)!.add(questionId)
  }
  
  /**
   * Prüft ob eine Frage bereits korrekt beantwortet wurde
   */
  function isAnsweredCorrectly(topicId: string, questionId: string): boolean {
    return answeredCorrectly.get(topicId)?.has(questionId) ?? false
  }
  
  /**
   * Gibt die Anzahl korrekt beantworteter Fragen für ein Topic zurück
   */
  function getCorrectCountForTopic(topicId: string): number {
    return answeredCorrectly.get(topicId)?.size ?? 0
  }
  
  /**
   * Setzt nur den Runden-Score zurück (Punkte + Streak).
   * Gesamt-Fortschritt (XP, Level, Antworten, Pool) bleibt erhalten.
   */
  function resetRoundScore() {
    score.value = 0
    streak.value = 0
  }

  /**
   * Setzt alles zurück (komplett neues Spiel).
   */
  function resetAll() {
    score.value = 0
    totalXP.value = 0
    streak.value = 0
    questionsAnswered.value = 0
    correctAnswers.value = 0
    answeredCorrectly.clear()
  }
  
  return {
    // State
    userName,
    score,
    totalXP,
    streak,
    questionsAnswered,
    correctAnswers,
    answeredCorrectly,
    // Computed
    level,
    xpToNextLevel,
    accuracy,
    // Actions
    setUserName,
    recordAnswer,
    markAsCorrect,
    isAnsweredCorrectly,
    getCorrectCountForTopic,
    resetRoundScore,
    resetAll
  }
})