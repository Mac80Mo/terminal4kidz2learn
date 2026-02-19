<template>
  <div class="stats-screen">
    <!-- Space Invaders Vollbild -->
    <SpaceInvadersGame
      v-if="showSpaceInvaders"
      :time-limit="gameTimeLimit"
      @exit="onSpaceInvadersExit"
    />

    <!-- Normaler Stats-Screen -->
    <template v-else>
      <!-- Alle Fragen geschafft Banner -->
      <pre v-if="allCompleted" class="all-completed-art">
╔═══════════════════════════════════════════════════════════╗
║            🏆  GRANDIOS! ALLES GESCHAFFT!  🏆             ║
║                                                           ║
║     Du hast ALLE Fragen korrekt beantwortet!             ║
║              Du bist ein wahrer Meister! 🎓               ║
╚═══════════════════════════════════════════════════════════╝
      </pre>

      <!-- Difficulty-Up Banner -->
      <pre v-if="difficultyUp" class="difficulty-up-art">
╔═══════════════════════════════════════════════════════════╗
║          🚀  SCHWIERIGKEIT ERHÖHT!  🚀                    ║
║                                                           ║
║    Alle Fragen der vorherigen Stufe geschafft!           ║
║    Neue Schwierigkeit: {{ (newDifficulty || '').padEnd(30) }}║
║                  Weiter so! 💪                            ║
╚═══════════════════════════════════════════════════════════╝
      </pre>

      <!-- Level-Up Banner -->
      <pre v-if="levelUp" class="level-up-art">
╔═══════════════════════════════════════════════════════════╗
║                  🎉  LEVEL UP!  🎉                        ║
║                                                           ║
║          Du hast Level {{ store.level }} erreicht!        ║
║                  Weiter so! 🚀                            ║
╚═══════════════════════════════════════════════════════════╝
      </pre>

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

      <!-- Space Invaders Belohnung bei Schwierigkeits-Wechsel oder alle geschafft -->
      <div v-if="hasReward && !spaceInvadersPlayed" class="space-invaders-unlock">
        <pre class="unlock-art">
╔═══════════════════════════════════════════════════════════╗
║        🎮  BELOHNUNG FREIGESCHALTET!  🎮                  ║
║                                                           ║
║     Du darfst Space Invaders spielen!                     ║
║     ⏱️  Spielzeit: {{ gameTimeLimitText.padEnd(34) }}     ║
║                                                           ║
║          Tippe "play" und drücke Enter! 🚀                ║
╚═══════════════════════════════════════════════════════════╝
        </pre>
      </div>

      <p v-if="spaceInvadersPlayed" class="played-info">
        🎮 Space Invaders gespielt! Score: {{ lastSpaceInvadersScore }} Punkte
      </p>
      
      <p class="back-prompt">
        {{ hasReward && !spaceInvadersPlayed 
          ? 'Tippe "play" für Space Invaders oder Enter zum Weitermachen...' 
          : (levelUp || difficultyUp)
              ? 'Drücke Enter um weiterzumachen...'
              : 'Drücke Enter um zurück zum Menü zu kommen...' }}
      </p>
      <div class="input-line">
        <span class="prompt">$</span>
        <input 
          @keyup.enter="handleInput"
          v-model="userInput"
          ref="inputField"
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useGameStore } from '../../stores/game'
import SpaceInvadersGame from '../SpaceInvaders/SpaceInvadersGame.vue'

const props = defineProps<{
  levelUp?: boolean
  difficultyUp?: boolean
  newDifficulty?: string
  allCompleted?: boolean
}>()

const store = useGameStore()

const emit = defineEmits<{
  back: []
  'game-active': [active: boolean]
}>()

const inputField = ref<HTMLInputElement | null>(null)
const userInput = ref('')
const showSpaceInvaders = ref(false)
const spaceInvadersPlayed = ref(false)
const lastSpaceInvadersScore = ref(0)

/**
 * Belohnung NUR bei Level-Up oder alle Fragen geschafft
 * (Difficulty-Wechsel allein gibt keine Belohnung)
 */
const hasReward = computed(() => props.levelUp || props.allCompleted)

/**
 * Spielzeit basierend auf aktuellem Level:
 * Level 2 (1. Level-Up) = 60 Sekunden
 * Level 3 (2. Level-Up) = 120 Sekunden
 * Level 4+ (3.+ Level-Up) = 0 (kein Limit, bis Game Over)
 */
const gameTimeLimit = computed(() => {
  const level = store.level
  if (level <= 2) return 60   // 1 Minute
  if (level === 3) return 120 // 2 Minuten
  return 0                    // Kein Limit
})

const gameTimeLimitText = computed(() => {
  const limit = gameTimeLimit.value
  if (limit === 60) return '1 Minute'
  if (limit === 120) return '2 Minuten'
  return 'bis zum Game Over'
})

function handleInput() {
  const input = userInput.value.trim().toLowerCase()
  
  // "play" eingeben startet Space Invaders (bei Belohnung und noch nicht gespielt)
  if (input === 'play' && hasReward.value && !spaceInvadersPlayed.value) {
    userInput.value = ''
    showSpaceInvaders.value = true
    emit('game-active', true)
    return
  }
  
  // Alles andere → zurück
  handleBack()
}

function handleBack() {
  emit('back')
}

function onSpaceInvadersExit(score: number) {
  showSpaceInvaders.value = false
  spaceInvadersPlayed.value = true
  lastSpaceInvadersScore.value = score
  emit('game-active', false)
  nextTick(() => {
    inputField.value?.focus()
  })
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
.all-completed-art {
  color: #ff44ff;
  line-height: 1.2;
  margin: 20px 0;
  animation: completedPulse 1.5s ease-in-out 3;
}

@keyframes completedPulse {
  0%, 100% { color: #ff44ff; }
  50% { color: var(--terminal-yellow); }
}

.difficulty-up-art {
  color: #00ffaa;
  line-height: 1.2;
  margin: 20px 0;
  animation: difficultyPulse 1s ease-in-out 3;
}

@keyframes difficultyPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.level-up-art {
  color: var(--terminal-yellow);
  line-height: 1.2;
  margin: 20px 0;
  animation: levelUpPulse 1s ease-in-out 3;
}

@keyframes levelUpPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

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

.space-invaders-unlock {
  margin: 20px 0;
}

.unlock-art {
  color: #ff44ff;
  line-height: 1.2;
  animation: unlockPulse 1.5s ease-in-out infinite;
}

@keyframes unlockPulse {
  0%, 100% { color: #ff44ff; }
  50% { color: var(--terminal-yellow); }
}

.played-info {
  color: #44ff44;
  font-size: 16px;
  margin: 15px 0;
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
