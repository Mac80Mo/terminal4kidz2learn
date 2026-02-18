import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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
    } else {
      streak.value = 0
    }
  }
  
  function resetStats() {
    score.value = 0
    streak.value = 0
  }
  
  return {
    // State
    userName,
    score,
    totalXP,
    streak,
    questionsAnswered,
    correctAnswers,
    // Computed
    level,
    xpToNextLevel,
    accuracy,
    // Actions
    setUserName,
    recordAnswer,
    resetStats
  }
})