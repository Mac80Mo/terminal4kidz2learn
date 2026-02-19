/**
 * Space Invaders - Type Definitions
 */

export interface Position {
  x: number
  y: number
}

export interface GameConfig {
  width: number
  height: number
  enemyCount: number
  enemySpeedX: number
  enemyDropY: number
  bulletSpeed: number
  shipSpeed: number
  /** Zeitlimit in Sekunden. 0 = kein Limit (bis Game Over) */
  timeLimit: number
}

export const DEFAULT_CONFIG: GameConfig = {
  width: 800,
  height: 600,
  enemyCount: 12,
  enemySpeedX: 5,
  enemyDropY: 60,
  bulletSpeed: 10,
  shipSpeed: 10,
  timeLimit: 0,
}

export interface GameCallbacks {
  onScoreChange: (score: number) => void
  onGameOver: (finalScore: number) => void
  onTimeUp?: (finalScore: number) => void
}
