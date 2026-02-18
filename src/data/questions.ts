import type { Question, Topic } from '../types/quiz'

export const topics: Topic[] = [
  {
    id: 'math',
    name: 'Mathematik',
    icon: '🔢',
    description: 'Grundrechenarten und mehr',
    color: '#00ff00'
  },
  {
    id: 'geography',
    name: 'Geographie',
    icon: '🌍',
    description: 'Länder, Hauptstädte und mehr',
    color: '#00aaff'
  },
  {
    id: 'science',
    name: 'Naturwissenschaft',
    icon: '🧪',
    description: 'Physik, Chemie, Biologie',
    color: '#ff6600'
  }
]

export const mathQuestions: Question[] = [
  {
    id: 'math-001',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Bei der Multiplikation werden Zahlen miteinander "mal genommen". 3 × 4 bedeutet "3 mal die 4" oder "4+4+4" = 12',
    question: 'Was ist das Ergebnis von 7 × 8?',
    answers: [
      { id: 'a', text: '54' },
      { id: 'b', text: '56' },
      { id: 'c', text: '64' },
      { id: 'd', text: '48' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '7 × 8 = 56. Du kannst es auch so rechnen: 8+8+8+8+8+8+8 = 56',
    points: 10,
    xp: 15
  },
  {
    id: 'math-002',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Addition bedeutet Zahlen zusammenzählen. Das Ergebnis wird "Summe" genannt.',
    question: 'Was ist 15 + 27?',
    answers: [
      { id: 'a', text: '42' },
      { id: 'b', text: '41' },
      { id: 'c', text: '43' },
      { id: 'd', text: '40' }
    ],
    correctAnswer: 'a',
    detailedExplanation: '15 + 27 = 42. Du kannst auch erst 15 + 20 = 35 rechnen, dann + 7 = 42',
    points: 10,
    xp: 15
  },
  {
    id: 'math-003',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Subtraktion bedeutet abziehen. Du nimmst von einer Zahl etwas weg.',
    question: 'Was ist 100 - 37?',
    answers: [
      { id: 'a', text: '73' },
      { id: 'b', text: '63' },
      { id: 'c', text: '67' },
      { id: 'd', text: '77' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '100 - 37 = 63. Tipp: 100 - 40 = 60, dann + 3 = 63',
    points: 15,
    xp: 20
  }
]

export const geographyQuestions: Question[] = [
  {
    id: 'geo-001',
    topic: 'geography',
    difficulty: 'easy',
    explanation: 'Deutschland ist ein Land in Mitteleuropa. Die Hauptstadt ist der Regierungssitz.',
    question: 'Was ist die Hauptstadt von Deutschland?',
    answers: [
      { id: 'a', text: 'München' },
      { id: 'b', text: 'Hamburg' },
      { id: 'c', text: 'Berlin' },
      { id: 'd', text: 'Frankfurt' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Berlin ist die Hauptstadt von Deutschland. Hier ist der Bundestag und die Regierung.',
    points: 10,
    xp: 15
  }
]

export const scienceQuestions: Question[] = [
  {
    id: 'sci-001',
    topic: 'science',
    difficulty: 'easy',
    explanation: 'Wasser kann in drei Zuständen vorkommen: flüssig, fest (Eis) und gasförmig (Dampf).',
    question: 'Bei welcher Temperatur gefriert Wasser?',
    answers: [
      { id: 'a', text: '0°C' },
      { id: 'b', text: '-10°C' },
      { id: 'c', text: '10°C' },
      { id: 'd', text: '100°C' }
    ],
    correctAnswer: 'a',
    detailedExplanation: 'Wasser gefriert bei 0°C (null Grad Celsius) und wird zu Eis.',
    points: 10,
    xp: 15
  }
]

export const allQuestions: Record<string, Question[]> = {
  math: mathQuestions,
  geography: geographyQuestions,
  science: scienceQuestions
}