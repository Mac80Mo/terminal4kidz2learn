<template>
  <div class="terminal">
    <!-- Header -->
    <div class="terminal-header">
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
      />
      
      <StatsScreen 
        v-else-if="currentScreen === 'stats'"
        @back="navigation.goToMenu"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Terminal.vue - View Layer (MVVM)
 * Reiner Container, delegiert Logik an ViewModels (Composables)
 */
import { computed } from 'vue'
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
  navigation.goToQuiz()
}

function onAnswer(isCorrect: boolean) {
  quiz.submitAnswer(isCorrect)
}

function onNextQuestion() {
  const hasMore = quiz.nextQuestion()
  
  if (!hasMore) {
    alert(`🎉 Thema abgeschlossen! Du hast ${store.score} Punkte!`)
    quiz.endQuiz()
    navigation.goToMenu()
  }
}

function onQuit() {
  alert('Danke fürs Spielen! 👋')
}
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
</style>