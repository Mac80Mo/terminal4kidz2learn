// Timing
export const ANSWER_DELAY_MS = 20000
export const COUNTDOWN_SECONDS_WRONG = 20
export const COUNTDOWN_SECONDS_CORRECT = 5

// Leveling
export const XP_PER_LEVEL = 100

// Scoring
export const STREAK_BONUS_MULTIPLIER = 1.5

// Difficulty-Stufen in Reihenfolge
export const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'] as const
export type Difficulty = (typeof DIFFICULTY_ORDER)[number]
