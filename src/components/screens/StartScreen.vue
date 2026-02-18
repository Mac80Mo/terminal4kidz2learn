<template>
  <div class="start-screen">
    <pre class="ascii-art">
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🎓  WILLKOMMEN IM LERN-TERMINAL!                      ║
║                                                           ║
║     Lerne spielerisch und sammle Punkte!                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    </pre>
    
    <p class="prompt-text">Wie heißt du?</p>
    <div class="input-line">
      <span class="prompt">$</span>
      <input 
        v-model="nameInput" 
        @keyup.enter="handleSubmit"
        ref="inputField"
        autofocus
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const emit = defineEmits<{
  submit: [name: string]
}>()

const nameInput = ref('')
const inputField = ref<HTMLInputElement | null>(null)

function handleSubmit() {
  const name = nameInput.value.trim()
  if (name) {
    emit('submit', name)
  }
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

.prompt-text {
  margin: 20px 0 10px 0;
  font-size: 16px;
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
