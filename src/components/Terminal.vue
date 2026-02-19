<template>
  <div class="terminal">
    <!-- Header (ausgeblendet während Space Invaders) -->
    <div v-show="!spaceInvadersActive" class="terminal-header">
      <div class="header-left">
        <span class="terminal-title">🎓 LERN-TERMINAL v1.0</span>
      </div>
      <div class="header-right">
        <span>👤 {{ store.userName }}</span>
        <span>⭐ Level: {{ store.level }}</span>
        <span>💎 XP: {{ store.totalXP }}</span>
        <span>🔥 Streak: {{ store.streak }}</span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="terminal-content">
      <StartScreen 
        v-if="currentScreen === 'start'"
        @submit="onNameSubmit"
      />
      
      <MenuScreen 
        v-else-if="currentScreen === 'menu'"
        @select-topic="onTopicSelect"
        @show-stats="navigation.goToStats"
        @quit="onQuit"
      />
      
      <QuizScreen 
        v-else-if="currentScreen === 'quiz'"
        :question="currentQuestion"
        :question-number="questionNumber"
        :topic-name="topicName"
        @answer="onAnswer"
        @next="onNextQuestion"
        @quit="onQuizQuit"
        @show-stats="onQuizStats"
      />
      
      <StatsScreen 
        v-else-if="currentScreen === 'stats'"
        :level-up="showLevelUp"
        :difficulty-up="showDifficultyUp"
        :new-difficulty="newDifficultyLabel"
        :all-completed="showAllCompleted"
        @back="onStatsBack"
        @game-active="onGameActive"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Terminal.vue - View Layer (MVVM)
 * Reiner Container, delegiert Logik an ViewModels (Composables)
 */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/game'
import { useNavigation } from '../composables/useNavigation'
import { useQuizController } from '../composables/useQuizController'

// Screens (Views)
import StartScreen from './screens/StartScreen.vue'
import MenuScreen from './screens/MenuScreen.vue'
import QuizScreen from './screens/QuizScreen.vue'
import StatsScreen from './screens/StatsScreen.vue'

// === MODEL ===
const store = useGameStore()

// === VIEWMODELS ===
const navigation = useNavigation()
const quiz = useQuizController()

// Track ob wir aus dem Quiz zur Statistik gegangen sind
let cameFromQuiz = false
// Track ob ein Level-Up angezeigt werden soll
let pendingLevelUp = false
// Track ob ein Difficulty-Wechsel stattgefunden hat
let pendingDifficultyChange = false
let pendingNewDifficulty: string | null = null
// Track ob alle Fragen komplett beantwortet sind
let pendingAllCompleted = false
const showLevelUp = ref(false)
const showDifficultyUp = ref(false)
const newDifficultyLabel = ref('')
const showAllCompleted = ref(false)
// Space Invaders aktiv (Header ausblenden)
const spaceInvadersActive = ref(false)

// === COMPUTED (ViewModel → View Binding) ===
const currentScreen = computed(() => navigation.currentScreen.value)
const currentQuestion = computed(() => quiz.currentQuestion.value)
const questionNumber = computed(() => quiz.questionNumber.value)
const topicName = computed(() => quiz.currentTopicName.value)

// === EVENT HANDLERS (View → ViewModel) ===
function onNameSubmit(name: string) {
  store.setUserName(name)
  navigation.goToMenu()
}

function onTopicSelect(topicId: string) {
  quiz.selectTopic(topicId)
  
  // Falls Topic bereits komplett beantwortet
  if (quiz.allCompleted.value) {
    showAllCompleted.value = true
    cameFromQuiz = false
    quiz.endQuiz()
    navigation.goToStats()
    return
  }
  
  navigation.goToQuiz()
}

function onAnswer(isCorrect: boolean) {
  const result = quiz.submitAnswer(isCorrect)
  
  if (result.allCompleted) {
    pendingAllCompleted = true
  } else if (result.difficultyChanged) {
    pendingDifficultyChange = true
    pendingNewDifficulty = result.newDifficulty
  }
  
  if (result.leveledUp) {
    pendingLevelUp = true
  }
}

function onNextQuestion() {
  // Alle Fragen geschafft?
  if (pendingAllCompleted) {
    pendingAllCompleted = false
    showAllCompleted.value = true
    // Difficulty-Info mitnehmen falls vorhanden
    applyPendingDifficultyInfo()
    cameFromQuiz = false
    quiz.endQuiz()
    navigation.goToStats()
    return
  }
  
  // Level-Up → zur Statistik (Difficulty-Info wird mitgenommen falls vorhanden)
  if (pendingLevelUp) {
    pendingLevelUp = false
    showLevelUp.value = true
    applyPendingDifficultyInfo()
    cameFromQuiz = true
    navigation.goToStats()
    return
  }

  // Difficulty-Wechsel unterbricht NICHT das Quiz,
  // Info wird beim nächsten StatsScreen angezeigt

  const hasMore = quiz.nextQuestion()
  
  if (!hasMore) {
    showAllCompleted.value = true
    applyPendingDifficultyInfo()
    cameFromQuiz = false
    quiz.endQuiz()
    navigation.goToStats()
  }
}

/**
 * Übernimmt gespeicherte Difficulty-Info in die Anzeige-Refs,
 * falls ein Difficulty-Wechsel ausstehend ist.
 */
function applyPendingDifficultyInfo() {
  if (pendingDifficultyChange) {
    pendingDifficultyChange = false
    const diffLabels: Record<string, string> = {
      easy: '⭐ Leicht',
      medium: '⭐⭐ Mittel',
      hard: '⭐⭐⭐ Schwer'
    }
    showDifficultyUp.value = true
    newDifficultyLabel.value = diffLabels[pendingNewDifficulty || ''] || pendingNewDifficulty || ''
    pendingNewDifficulty = null
  }
}

function onQuit() {
  alert('Danke fürs Spielen! 👋')
}

function onQuizQuit() {
  const confirmed = confirm('⚠️ Quiz wirklich abbrechen? Dein Fortschritt in diesem Thema geht verloren.')
  if (confirmed) {
    quiz.endQuiz()
    navigation.goToMenu()
  }
}

function onQuizStats() {
  cameFromQuiz = true
  navigation.goToStats()
}

function onStatsBack() {
  const wasFromQuiz = cameFromQuiz
  // Alle Flags zurücksetzen
  showLevelUp.value = false
  showDifficultyUp.value = false
  newDifficultyLabel.value = ''
  showAllCompleted.value = false
  spaceInvadersActive.value = false
  cameFromQuiz = false
  
  if (wasFromQuiz) {
    navigation.goToQuiz()
  } else {
    navigation.goToMenu()
  }
}

function onGameActive(active: boolean) {
  spaceInvadersActive.value = active
}

// === GLOBALER ESC-HANDLER ===
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && currentScreen.value === 'quiz') {
    onQuizQuit()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.terminal {
  width: 100%;
  height: 100vh;
  background: var(--terminal-bg);
  color: var(--terminal-green);
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.terminal-header {
  border-bottom: 2px solid var(--terminal-green);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-right {
  display: flex;
  gap: 20px;
}

.terminal-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* Wenn Space Invaders aktiv: kein Padding, volle Höhe */
.terminal-content:has(.space-invaders-container.fullscreen) {
  padding: 0;
  overflow: hidden;
}
</style>