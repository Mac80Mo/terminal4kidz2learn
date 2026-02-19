<template>
  <div :class="['space-invaders-container', { fullscreen: state === 'playing' || state === 'gameover' }]">
    <pre v-if="state !== 'playing'" class="game-title">
╔═══════════════════════════════════════════════════════════╗
║            🚀  SPACE INVADERS  👾                         ║
║         Deine Belohnung für Level-Up!                     ║
╚═══════════════════════════════════════════════════════════╝
    </pre>

    <div v-if="state === 'loading'" class="loading">
      <p>Lade Spiel...</p>
    </div>

    <div v-if="state === 'ready'" class="instructions">
      <p>⬅️ ➡️  Pfeiltasten = Bewegen</p>
      <p>🔫  Leertaste = Schießen</p>
      <p v-if="timeLimitValue > 0" class="time-info">
        ⏱️  Spielzeit: {{ timeLimitMinutes }} {{ timeLimitValue === 60 ? 'Minute' : 'Minuten' }}
      </p>
      <p v-else class="time-info">
        🎮  Spielen bis Game Over!
      </p>
      <p class="start-prompt">Drücke Enter um zu starten!</p>
      <div class="input-line">
        <span class="prompt">$</span>
        <input
          @keyup.enter="startGame"
          ref="startInput"
          placeholder="Enter drücken..."
        >
      </div>
    </div>

    <canvas
      v-show="state === 'playing' || state === 'gameover'"
      ref="gameCanvas"
      class="game-canvas"
    />

    <div v-if="state === 'playing'" class="score-display">
      <span>🎯 Punkte: {{ currentScore }}</span>
    </div>

    <div v-if="state === 'gameover'" class="gameover-screen">
      <pre :class="['gameover-art', { 'timeup-art': timeUpEnded }]">
╔═══════════════════════════════════════════════════════════╗
║            {{ endMessage.padStart(30).padEnd(43) }}       ║
║                                                           ║
║            Dein Score: {{ paddedScore }}                   ║
║                                                           ║
║          Weiter lernen für die nächste Runde! 📚          ║
╚═══════════════════════════════════════════════════════════╝
      </pre>
      <p class="back-prompt">Drücke Enter um zurückzukehren...</p>
      <div class="input-line">
        <span class="prompt">$</span>
        <input
          @keyup.enter="handleExit"
          ref="exitInput"
          placeholder="Enter drücken..."
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { Game } from './game/Game'

type GameState = 'loading' | 'ready' | 'playing' | 'gameover'

const props = defineProps<{
  /** Zeitlimit in Sekunden. 0 = kein Limit (bis Game Over) */
  timeLimit?: number
}>()

const emit = defineEmits<{
  exit: [score: number]
}>()

const state = ref<GameState>('loading')
const currentScore = ref(0)
const finalScore = ref(0)

const gameCanvas = ref<HTMLCanvasElement | null>(null)
const startInput = ref<HTMLInputElement | null>(null)
const exitInput = ref<HTMLInputElement | null>(null)

let game: Game | null = null

const timeLimitValue = computed(() => props.timeLimit ?? 0)
const timeLimitMinutes = computed(() => Math.floor(timeLimitValue.value / 60))
const timeUpEnded = ref(false)

const paddedScore = computed(() => {
  return String(finalScore.value).padStart(6, ' ')
})

const endMessage = computed(() => {
  return timeUpEnded.value ? '⏰ ZEIT ABGELAUFEN!' : '💥 GAME OVER 💥'
})

/**
 * Berechnet die optimale Canvas-CSS-Größe passend zum verfügbaren Viewport.
 * Interne Auflösung bleibt 800x600, nur CSS skaliert.
 */
function fitCanvasToViewport() {
  if (!gameCanvas.value) return

  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  // Verfügbare Höhe: gesamter Viewport (Header ist ausgeblendet)
  // Kleiner Puffer für Score-Anzeige unter dem Canvas
  const availableHeight = viewportHeight - 10
  const availableWidth = viewportWidth - 20

  const gameAspect = 800 / 600

  let cssWidth: number
  let cssHeight: number

  // Proportion beibehalten, in den verfügbaren Platz einpassen
  if (availableWidth / availableHeight > gameAspect) {
    // Höhe ist der limitierende Faktor
    cssHeight = availableHeight
    cssWidth = cssHeight * gameAspect
  } else {
    // Breite ist der limitierende Faktor
    cssWidth = availableWidth
    cssHeight = cssWidth / gameAspect
  }

  gameCanvas.value.style.width = `${cssWidth}px`
  gameCanvas.value.style.height = `${cssHeight}px`
}

async function initGame() {
  if (!gameCanvas.value) return

  game = new Game(gameCanvas.value, {
    onScoreChange: (score: number) => {
      currentScore.value = score
    },
    onGameOver: (score: number) => {
      finalScore.value = score
      timeUpEnded.value = false
      state.value = 'gameover'
      nextTick(() => {
        exitInput.value?.focus()
      })
    },
    onTimeUp: (score: number) => {
      finalScore.value = score
      timeUpEnded.value = true
      state.value = 'gameover'
      nextTick(() => {
        exitInput.value?.focus()
      })
    },
  }, timeLimitValue.value > 0 ? { timeLimit: timeLimitValue.value } : {})

  try {
    await game.init()
    state.value = 'ready'
    nextTick(() => {
      startInput.value?.focus()
    })
  } catch (err) {
    console.error('Space Invaders konnte nicht geladen werden:', err)
  }
}

function startGame() {
  if (!game) return
  state.value = 'playing'
  currentScore.value = 0
  nextTick(() => {
    fitCanvasToViewport()
    game!.start()
  })
}

function handleExit() {
  game?.stop()
  emit('exit', finalScore.value)
}

// Canvas bei Fenstergröße neu anpassen
function onResize() {
  if (state.value === 'playing' || state.value === 'gameover') {
    fitCanvasToViewport()
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  nextTick(() => {
    initGame()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  game?.stop()
  game = null
})
</script>

<style scoped>
.space-invaders-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.space-invaders-container.fullscreen {
  height: 100vh;
  justify-content: center;
  overflow: hidden;
}

.game-title {
  color: var(--terminal-yellow);
  line-height: 1.2;
  margin: 10px 0;
  text-align: center;
  animation: titlePulse 2s ease-in-out infinite;
}

@keyframes titlePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.loading {
  color: var(--terminal-green);
  font-size: 16px;
  margin: 20px 0;
}

.instructions {
  color: var(--terminal-green);
  font-size: 16px;
  margin: 20px 0;
  line-height: 2;
  text-align: center;
}

.start-prompt {
  color: var(--terminal-yellow);
  margin-top: 15px;
  animation: blink 1s infinite;
}

.game-canvas {
  border: 2px solid var(--terminal-green);
  border-radius: 4px;
  margin: 0;
  image-rendering: pixelated;
  /* Größe wird dynamisch per JS gesetzt */
}

.score-display {
  display: none; /* Score wird direkt im Canvas gezeichnet */
}

.gameover-screen {
  text-align: center;
  margin-top: 15px;
}

.gameover-art {
  color: #ff4444;
  line-height: 1.2;
  margin: 10px 0;
  animation: gameoverFlash 0.5s ease-in-out 3;
}

.timeup-art {
  color: var(--terminal-yellow);
  animation: timeupFlash 0.5s ease-in-out 3;
}

@keyframes gameoverFlash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes timeupFlash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.time-info {
  color: var(--terminal-yellow);
  font-size: 18px;
  margin-top: 10px;
}

.back-prompt {
  color: var(--terminal-yellow);
  margin-top: 15px;
}

.input-line {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
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
  width: 200px;
  caret-color: var(--terminal-green);
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
