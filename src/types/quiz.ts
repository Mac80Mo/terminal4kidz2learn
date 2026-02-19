export interface Answer {
  id: string
  text: string
}

export interface Question {
  id: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  explanation: string
  question: string
  answers: Answer[]
  correctAnswer: string
  detailedExplanation: string
  points: number
  xp: number
}

export interface Topic {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

export interface UserProgress {
  topicId: string
  questionsAnswered: number
  correctAnswers: number
  totalXP: number
  currentStreak: number
  lastPlayed: Date | null
}

export interface GameState {
  currentTopic: string | null
  currentDifficulty: 'easy' | 'medium' | 'hard'
  currentQuestion: Question | null
  score: number
  totalXP: number
  streak: number
  wrongAnswers: Question[]
  answeredCorrectly: Map<string, Set<string>>
}