<template>
  <div class="quiz-question">
    <div class="question-header">
      <p>📚 {{ displayTopicName }} - Frage {{ questionNumber }}</p>
      <p>Schwierigkeit: {{ difficultyLabel }}</p>
    </div>
    
    <!-- Erklärung -->
    <div v-if="!answered" class="explanation-box">
      <p class="explanation-title">ℹ️  KURZE ERKLÄRUNG:</p>
      <p class="explanation-text">{{ question.explanation }}</p>
    </div>
    
    <!-- Frage -->
    <div v-if="!answered" class="question-box">
      <p class="question-title">❓ FRAGE:</p>
      <p class="question-text">{{ question.question }}</p>
    </div>
    
    <!-- Antworten -->
    <div v-if="!answered" class="answers">
      <div 
        v-for="answer in question.answers" 
        :key="answer.id"
        class="answer-option"
      >
        <span class="answer-id">[{{ answer.id.toUpperCase() }}]</span>
        <span class="answer-text">{{ answer.text }}</span>
      </div>
    </div>
    
    <!-- Eingabe -->
    <div v-if="!answered" class="input-line">
      <span class="prompt">$ Deine Antwort:</span>
      <input 
        v-model="userAnswer" 
        @keyup.enter="submitAnswer"
        ref="answerInput"
        autofocus
        maxlength="1"
      >
    </div>
    
    <!-- Ergebnis -->
    <div v-if="answered" class="result-box">
      <div v-if="isCorrect" class="correct-result">
        <pre class="result-art">
╔═══════════════════════════════════════════════════════════╗
║                    ✅ RICHTIG!                            ║
╚═══════════════════════════════════════════════════════════╝
        </pre>
        <p class="result-text">{{ question.detailedExplanation }}</p>
        <p class="points">🎉 +{{ question.points }} Punkte!</p>
        <p class="xp">📈 +{{ question.xp }} XP</p>
      </div>
      
      <div v-else class="wrong-result">
        <pre class="result-art">
╔═══════════════════════════════════════════════════════════╗
║                  ❌ LEIDER FALSCH!                        ║
╚═══════════════════════════════════════════════════════════╝
        </pre>
        <p class="correct-answer">✅ Richtige Antwort: {{ correctAnswerText }}</p>
        <p class="result-text">💡 {{ question.detailedExplanation }}</p>
        <p class="retry">📝 Diese Frage kommt später nochmal!</p>
      </div>
      
      <p class="continue">Weiter in {{ countdown }} Sekunden...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { Question } from '../types/quiz'
import { COUNTDOWN_SECONDS } from '../constants/game'

const props = defineProps<{
  question: Question
  questionNumber?: number
  topicName?: string
}>()

const emit = defineEmits<{
  answer: [isCorrect: boolean]
  next: []
}>()

const userAnswer = ref('')
const answered = ref(false)
const isCorrect = ref(false)
const countdown = ref(COUNTDOWN_SECONDS)
const answerInput = ref<HTMLInputElement | null>(null)
let countdownInterval: ReturnType<typeof setInterval> | null = null

const displayTopicName = computed(() => props.topicName || 'Quiz')

const difficultyLabel = computed(() => {
  const labels = {
    easy: '⭐ Leicht',
    medium: '⭐⭐ Mittel',
    hard: '⭐⭐⭐ Schwer'
  }
  return labels[props.question.difficulty]
})

const correctAnswerText = computed(() => {
  const correctAnswer = props.question.answers.find(
    a => a.id === props.question.correctAnswer
  )
  return correctAnswer ? `${correctAnswer.id.toUpperCase()} (${correctAnswer.text})` : ''
})

function submitAnswer() {
  if (!userAnswer.value.trim()) return
  
  const answer = userAnswer.value.toLowerCase().trim()
  isCorrect.value = answer === props.question.correctAnswer
  answered.value = true
  
  emit('answer', isCorrect.value)
  
  // Countdown
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      if (countdownInterval) clearInterval(countdownInterval)
      countdownInterval = null
      emit('next')
    }
  }, 1000)
}

onMounted(() => {
  nextTick(() => {
    answerInput.value?.focus()
  })
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
})
</script>

<style scoped>
.quiz-question {
  max-width: 800px;
}

.question-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--terminal-green);
}

.question-header p {
  margin: 5px 0;
}

.explanation-box,
.question-box {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid var(--terminal-green);
  border-radius: 5px;
}

.explanation-title,
.question-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--terminal-yellow);
}

.explanation-text,
.question-text {
  line-height: 1.6;
  color: var(--terminal-green);
}

.answers {
  margin: 20px 0;
}

.answer-option {
  padding: 10px;
  margin: 5px 0;
  border-left: 3px solid var(--terminal-green);
  padding-left: 15px;
}

.answer-id {
  color: var(--terminal-yellow);
  font-weight: bold;
  margin-right: 10px;
}

.input-line {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.input-line input {
  background: transparent;
  border: none;
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  font-size: 14px;
  outline: none;
  flex: 1;
  caret-color: var(--terminal-green);
}

.prompt {
  color: var(--terminal-green);
  margin-right: 10px;
}

.result-box {
  margin-top: 20px;
}

.result-art {
  color: var(--terminal-green);
  margin: 20px 0;
}

.correct-result {
  color: var(--terminal-green);
}

.wrong-result {
  color: var(--terminal-orange);
}

.correct-answer {
  color: var(--terminal-green);
  font-weight: bold;
  margin: 15px 0;
}

.result-text {
  margin: 15px 0;
  line-height: 1.6;
  color: var(--terminal-green);
}

.points,
.xp {
  color: var(--terminal-yellow);
  font-weight: bold;
  margin: 10px 0;
  font-size: 16px;
}

.retry {
  color: var(--terminal-yellow);
  margin: 15px 0;
}

.continue {
  margin-top: 30px;
  color: var(--terminal-yellow);
  font-size: 16px;
}
</style>