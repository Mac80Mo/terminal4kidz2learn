<template>
  <div class="stats-screen">
    <pre class="ascii-art">
╔═══════════════════════════════════════════════════════════╗
║                   DEINE STATISTIKEN                       ║
╚═══════════════════════════════════════════════════════════╝
    </pre>
    
    <div class="stats">
      <p>📊 Fragen beantwortet: {{ store.questionsAnswered }}</p>
      <p>✅ Richtig: {{ store.correctAnswers }} ({{ store.accuracy }}%)</p>
      <p>❌ Falsch: {{ store.questionsAnswered - store.correctAnswers }}</p>
      <p>💎 Gesamt XP: {{ store.totalXP }}</p>
      <p>⭐ Level: {{ store.level }}</p>
      <p>🔥 Aktuelle Streak: {{ store.streak }}</p>
      <p>🎯 Punkte: {{ store.score }}</p>
    </div>
    
    <p class="back-prompt">Drücke Enter um zurück zum Menü zu kommen...</p>
    <div class="input-line">
      <span class="prompt">$</span>
      <input 
        @keyup.enter="handleBack"
        ref="inputField"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useGameStore } from '../../stores/game'

const store = useGameStore()

const emit = defineEmits<{
  back: []
}>()

const inputField = ref<HTMLInputElement | null>(null)

function handleBack() {
  emit('back')
}

onMounted(() => {
  nextTick(() => {
    inputField.value?.focus()
  })
})

defineExpose({
  focus: () => inputField.value?.focus()
})
</script>

<style scoped>
.ascii-art {
  color: var(--terminal-green);
  line-height: 1.2;
  margin: 20px 0;
}

.stats {
  margin: 20px 0;
  font-size: 16px;
  line-height: 2;
}

.back-prompt {
  margin-top: 30px;
  color: var(--terminal-yellow);
}

.input-line {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.prompt {
  color: var(--terminal-green);
  margin-right: 10px;
  font-size: 16px;
}

input {
  background: transparent;
  border: none;
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  font-size: 14px;
  outline: none;
  flex: 1;
  caret-color: var(--terminal-green);
}
</style>
