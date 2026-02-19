<template>
  <div class="quiz-screen">
    <QuizQuestion 
      v-if="question"
      :key="question.id"
      :question="question"
      :question-number="questionNumber"
      :topic-name="topicName"
      @answer="handleAnswer"
      @next="handleNext"
      @quit="handleQuit"
      @show-stats="handleShowStats"
    />
  </div>
</template>

<script setup lang="ts">
import QuizQuestion from '../QuizQuestion.vue'
import type { Question } from '../../types/quiz'

defineProps<{
  question: Question | null
  questionNumber: number
  topicName?: string
}>()

const emit = defineEmits<{
  answer: [isCorrect: boolean]
  next: []
  quit: []
  showStats: []
}>()

function handleAnswer(isCorrect: boolean) {
  emit('answer', isCorrect)
}

function handleNext() {
  emit('next')
}

function handleQuit() {
  emit('quit')
}

function handleShowStats() {
  emit('showStats')
}
</script>
