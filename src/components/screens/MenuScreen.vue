<template>
  <div class="menu-screen">
    <pre class="ascii-art">
╔═══════════════════════════════════════════════════════════╗
║                    THEMEN-AUSWAHL                         ║
╚═══════════════════════════════════════════════════════════╝
    </pre>
    
    <div class="topics">
      <div 
        v-for="(topic, index) in topics" 
        :key="topic.id"
        class="topic-item"
      >
        <span class="topic-number">[{{ index + 1 }}]</span>
        <span class="topic-icon">{{ topic.icon }}</span>
        <span class="topic-name">{{ topic.name }}</span>
        <span class="topic-desc">- {{ topic.description }}</span>
      </div>
    </div>
    
    <div class="menu-options">
      <p>[S] 📊 Statistiken anzeigen</p>
      <p>[Q] ❌ Beenden</p>
    </div>
    
    <div class="input-line">
      <span class="prompt">$</span>
      <input 
        v-model="menuInput" 
        @keyup.enter="handleInput"
        ref="inputField"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { topics } from '../../data/questions'

const emit = defineEmits<{
  selectTopic: [topicId: string]
  showStats: []
  quit: []
}>()

const menuInput = ref('')
const inputField = ref<HTMLInputElement | null>(null)

function handleInput() {
  const input = menuInput.value.toLowerCase().trim()
  menuInput.value = ''
  
  if (input === 'q') {
    emit('quit')
    return
  }
  
  if (input === 's') {
    emit('showStats')
    return
  }
  
  const topicIndex = parseInt(input) - 1
  const topic = topics[topicIndex]
  if (topic) {
    emit('selectTopic', topic.id)
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

.topics {
  margin: 20px 0;
}

.topic-item {
  padding: 10px 0;
  font-size: 16px;
}

.topic-number {
  color: var(--terminal-yellow);
  margin-right: 10px;
}

.topic-icon {
  margin-right: 10px;
}

.topic-name {
  font-weight: bold;
  margin-right: 10px;
}

.topic-desc {
  color: var(--terminal-green-dark);
}

.menu-options {
  margin: 30px 0 20px 0;
  padding-top: 20px;
  border-top: 1px solid var(--terminal-green);
}

.menu-options p {
  padding: 5px 0;
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
