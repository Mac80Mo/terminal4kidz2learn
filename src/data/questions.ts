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
  // ===== EASY – Zahlenraum bis 10 (7 Fragen) =====

  // Addition (easy)
  {
    id: 'math-001',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Bei der Addition zählen wir Zahlen zusammen. Das Ergebnis heißt "Summe".',
    question: 'Was ist 3 + 5?',
    answers: [
      { id: 'a', text: '7' },
      { id: 'b', text: '8' },
      { id: 'c', text: '9' },
      { id: 'd', text: '6' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '3 + 5 = 8. Stell dir vor, du hast 3 Äpfel und bekommst 5 dazu – dann hast du 8 Äpfel!',
    points: 10,
    xp: 15
  },
  {
    id: 'math-003',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Addition bedeutet zusammenzählen.',
    question: 'Was ist 2 + 7?',
    answers: [
      { id: 'a', text: '8' },
      { id: 'b', text: '10' },
      { id: 'c', text: '7' },
      { id: 'd', text: '9' }
    ],
    correctAnswer: 'd',
    detailedExplanation: '2 + 7 = 9. Zähle von 7 einfach 2 weiter: 8, 9!',
    points: 10,
    xp: 15
  },

  // Subtraktion (easy)
  {
    id: 'math-005',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Bei der Subtraktion ziehen wir eine Zahl von einer anderen ab. Das Ergebnis heißt "Differenz".',
    question: 'Was ist 9 - 4?',
    answers: [
      { id: 'a', text: '4' },
      { id: 'b', text: '6' },
      { id: 'c', text: '5' },
      { id: 'd', text: '3' }
    ],
    correctAnswer: 'c',
    detailedExplanation: '9 - 4 = 5. Wenn du von 9 rückwärts zählst: 8, 7, 6, 5!',
    points: 10,
    xp: 15
  },
  {
    id: 'math-007',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Beim Abziehen wird die Zahl kleiner.',
    question: 'Was ist 8 - 2?',
    answers: [
      { id: 'a', text: '5' },
      { id: 'b', text: '6' },
      { id: 'c', text: '7' },
      { id: 'd', text: '4' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '8 - 2 = 6. Von 8 zwei zurückzählen: 7, 6!',
    points: 10,
    xp: 15
  },

  // Multiplikation (easy)
  {
    id: 'math-009',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Multiplikation heißt "mal nehmen". 2 × 3 bedeutet "2 mal die 3" = 3 + 3 = 6.',
    question: 'Was ist 2 × 3?',
    answers: [
      { id: 'a', text: '5' },
      { id: 'b', text: '6' },
      { id: 'c', text: '7' },
      { id: 'd', text: '8' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '2 × 3 = 6. Das bedeutet: 3 + 3 = 6.',
    points: 10,
    xp: 15
  },
  {
    id: 'math-011',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Multiplikation ist wiederholtes Addieren.',
    question: 'Was ist 5 × 2?',
    answers: [
      { id: 'a', text: '7' },
      { id: 'b', text: '10' },
      { id: 'c', text: '12' },
      { id: 'd', text: '8' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '5 × 2 = 10. Das bedeutet: 2 + 2 + 2 + 2 + 2 = 10.',
    points: 10,
    xp: 15
  },

  // Division (easy)
  {
    id: 'math-014',
    topic: 'math',
    difficulty: 'easy',
    explanation: 'Division bedeutet "teilen". 8 ÷ 2 heißt: "Wie oft passt die 2 in die 8?"',
    question: 'Was ist 8 ÷ 2?',
    answers: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '8 ÷ 2 = 4. Die 2 passt genau 4 mal in die 8 (2 + 2 + 2 + 2 = 8).',
    points: 10,
    xp: 15
  },

  // ===== MEDIUM – Zahlenraum bis 50 (7 Fragen) =====

  // Addition (medium)
  {
    id: 'math-018',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Bei größeren Zahlen kann man erst die Zehner und dann die Einer addieren.',
    question: 'Was ist 15 + 27?',
    answers: [
      { id: 'a', text: '42' },
      { id: 'b', text: '41' },
      { id: 'c', text: '43' },
      { id: 'd', text: '40' }
    ],
    correctAnswer: 'a',
    detailedExplanation: '15 + 27 = 42. Tipp: Rechne erst 15 + 20 = 35, dann + 7 = 42.',
    points: 15,
    xp: 20
  },
  {
    id: 'math-021',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Beim Addieren kannst du die Zahlen auch tauschen – das Ergebnis bleibt gleich!',
    question: 'Was ist 29 + 11?',
    answers: [
      { id: 'a', text: '38' },
      { id: 'b', text: '39' },
      { id: 'c', text: '41' },
      { id: 'd', text: '40' }
    ],
    correctAnswer: 'd',
    detailedExplanation: '29 + 11 = 40. Tipp: 29 + 1 = 30, dann + 10 = 40. Eine schöne runde Zahl!',
    points: 15,
    xp: 20
  },

  // Subtraktion (medium)
  {
    id: 'math-022',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Bei größeren Subtraktionen kann man schrittweise rechnen.',
    question: 'Was ist 45 - 18?',
    answers: [
      { id: 'a', text: '27' },
      { id: 'b', text: '23' },
      { id: 'c', text: '37' },
      { id: 'd', text: '29' }
    ],
    correctAnswer: 'a',
    detailedExplanation: '45 - 18 = 27. Rechne: 45 - 10 = 35, dann - 8 = 27.',
    points: 15,
    xp: 20
  },
  {
    id: 'math-024',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Beim Subtrahieren mit Zehnerübergang musst du aufpassen!',
    question: 'Was ist 47 - 29?',
    answers: [
      { id: 'a', text: '22' },
      { id: 'b', text: '18' },
      { id: 'c', text: '16' },
      { id: 'd', text: '28' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '47 - 29 = 18. Rechne: 47 - 30 = 17, dann + 1 = 18.',
    points: 15,
    xp: 20
  },

  // Multiplikation (medium)
  {
    id: 'math-026',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Multiplikation: 7 × 6 bedeutet "7 mal die 6" oder "6 mal die 7".',
    question: 'Was ist 7 × 6?',
    answers: [
      { id: 'a', text: '36' },
      { id: 'b', text: '42' },
      { id: 'c', text: '48' },
      { id: 'd', text: '44' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '7 × 6 = 42. Das ist aus der 7er-Reihe: 7, 14, 21, 28, 35, 42!',
    points: 15,
    xp: 20
  },
  {
    id: 'math-029',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Eine Zahl mit sich selbst multiplizieren nennt man "quadrieren".',
    question: 'Was ist 6 × 6?',
    answers: [
      { id: 'a', text: '30' },
      { id: 'b', text: '36' },
      { id: 'c', text: '42' },
      { id: 'd', text: '32' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '6 × 6 = 36. Aus der 6er-Reihe: 6, 12, 18, 24, 30, 36!',
    points: 15,
    xp: 20
  },

  // Division (medium)
  {
    id: 'math-031',
    topic: 'math',
    difficulty: 'medium',
    explanation: 'Division ist die Umkehrung der Multiplikation. Wenn 4 × 9 = 36, dann 36 ÷ 4 = 9.',
    question: 'Was ist 36 ÷ 4?',
    answers: [
      { id: 'a', text: '8' },
      { id: 'b', text: '7' },
      { id: 'c', text: '6' },
      { id: 'd', text: '9' }
    ],
    correctAnswer: 'd',
    detailedExplanation: '36 ÷ 4 = 9. Denn 4 × 9 = 36!',
    points: 15,
    xp: 20
  },

  // ===== HARD – Zahlenraum 50 bis 100 (7 Fragen) =====

  // Addition (hard)
  {
    id: 'math-035',
    topic: 'math',
    difficulty: 'hard',
    explanation: 'Bei großen Zahlen hilft es, erst auf den nächsten Zehner aufzurunden.',
    question: 'Was ist 48 + 37?',
    answers: [
      { id: 'a', text: '83' },
      { id: 'b', text: '85' },
      { id: 'c', text: '87' },
      { id: 'd', text: '75' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '48 + 37 = 85. Tipp: 48 + 2 = 50, dann + 35 = 85.',
    points: 20,
    xp: 25
  },
  {
    id: 'math-037',
    topic: 'math',
    difficulty: 'hard',
    explanation: 'Große Additionen schaffst du, wenn du schrittweise rechnest!',
    question: 'Was ist 67 + 28?',
    answers: [
      { id: 'a', text: '85' },
      { id: 'b', text: '93' },
      { id: 'c', text: '95' },
      { id: 'd', text: '97' }
    ],
    correctAnswer: 'c',
    detailedExplanation: '67 + 28 = 95. Rechne: 67 + 30 = 97, dann - 2 = 95.',
    points: 20,
    xp: 25
  },

  // Subtraktion (hard)
  {
    id: 'math-039',
    topic: 'math',
    difficulty: 'hard',
    explanation: 'Von 100 abzuziehen ist besonders nützlich – man nennt es "Ergänzen zum Hunderter".',
    question: 'Was ist 100 - 37?',
    answers: [
      { id: 'a', text: '73' },
      { id: 'b', text: '63' },
      { id: 'c', text: '67' },
      { id: 'd', text: '77' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '100 - 37 = 63. Tipp: 100 - 40 = 60, dann + 3 = 63.',
    points: 20,
    xp: 25
  },
  {
    id: 'math-040',
    topic: 'math',
    difficulty: 'hard',
    explanation: 'Bei großen Subtraktionen hilft es, schrittweise vorzugehen.',
    question: 'Was ist 87 - 29?',
    answers: [
      { id: 'a', text: '68' },
      { id: 'b', text: '56' },
      { id: 'c', text: '58' },
      { id: 'd', text: '62' }
    ],
    correctAnswer: 'c',
    detailedExplanation: '87 - 29 = 58. Rechne: 87 - 30 = 57, dann + 1 = 58.',
    points: 20,
    xp: 25
  },

  // Multiplikation (hard)
  {
    id: 'math-043',
    topic: 'math',
    difficulty: 'hard',
    explanation: 'Die großen Malaufgaben kommen aus den Reihen 7, 8 und 9.',
    question: 'Was ist 8 × 8?',
    answers: [
      { id: 'a', text: '56' },
      { id: 'b', text: '64' },
      { id: 'c', text: '72' },
      { id: 'd', text: '68' }
    ],
    correctAnswer: 'b',
    detailedExplanation: '8 × 8 = 64. Das ist "8 zum Quadrat"! 8er-Reihe: 8, 16, 24, 32, 40, 48, 56, 64.',
    points: 20,
    xp: 25
  },
  {
    id: 'math-044',
    topic: 'math',
    difficulty: 'hard',
    explanation: 'Die 7er- und 9er-Reihe sind etwas schwieriger, aber mit Übung schaffst du das!',
    question: 'Was ist 7 × 9?',
    answers: [
      { id: 'a', text: '56' },
      { id: 'b', text: '67' },
      { id: 'c', text: '63' },
      { id: 'd', text: '72' }
    ],
    correctAnswer: 'c',
    detailedExplanation: '7 × 9 = 63. Tipp: 7 × 10 = 70, dann - 7 = 63.',
    points: 20,
    xp: 25
  },

  // Division (hard)
  {
    id: 'math-047',
    topic: 'math',
    difficulty: 'hard',
    explanation: 'Bei großen Divisionsaufgaben hilft dir das Einmaleins!',
    question: 'Was ist 72 ÷ 9?',
    answers: [
      { id: 'a', text: '7' },
      { id: 'b', text: '9' },
      { id: 'c', text: '8' },
      { id: 'd', text: '6' }
    ],
    correctAnswer: 'c',
    detailedExplanation: '72 ÷ 9 = 8. Denn 9 × 8 = 72!',
    points: 20,
    xp: 25
  }
]

export const geographyQuestions: Question[] = [
  // ===== EASY – Grundwissen für 2. Klässler =====
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
  },
  {
    id: 'geo-002',
    topic: 'geography',
    difficulty: 'easy',
    explanation: 'Auf der Erde gibt es große Wasserflächen – die Ozeane – und große Landflächen – die Kontinente.',
    question: 'Wie viele Kontinente gibt es auf der Erde?',
    answers: [
      { id: 'a', text: '5' },
      { id: 'b', text: '7' },
      { id: 'c', text: '6' },
      { id: 'd', text: '4' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Es gibt 7 Kontinente: Europa, Asien, Afrika, Nordamerika, Südamerika, Australien und die Antarktis.',
    points: 10,
    xp: 15
  },
  {
    id: 'geo-003',
    topic: 'geography',
    difficulty: 'easy',
    explanation: 'Die Erde dreht sich um die Sonne. Sie ist keine Scheibe, sondern hat eine bestimmte Form.',
    question: 'Welche Form hat die Erde?',
    answers: [
      { id: 'a', text: 'Würfel' },
      { id: 'b', text: 'Scheibe' },
      { id: 'c', text: 'Kugel' },
      { id: 'd', text: 'Dreieck' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Die Erde hat die Form einer Kugel – genau genommen ist sie leicht abgeflacht an den Polen.',
    points: 10,
    xp: 15
  },
  {
    id: 'geo-004',
    topic: 'geography',
    difficulty: 'easy',
    explanation: 'Deutschland hat viele Nachbarländer. Es liegt mitten in Europa.',
    question: 'Welches Land liegt direkt neben Deutschland im Süden?',
    answers: [
      { id: 'a', text: 'Schweden' },
      { id: 'b', text: 'Österreich' },
      { id: 'c', text: 'Spanien' },
      { id: 'd', text: 'England' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Österreich liegt südlich von Deutschland. Von Bayern aus ist man schnell dort!',
    points: 10,
    xp: 15
  },
  {
    id: 'geo-005',
    topic: 'geography',
    difficulty: 'easy',
    explanation: 'Jedes Land hat eine eigene Flagge mit besonderen Farben.',
    question: 'Welche Farben hat die deutsche Flagge?',
    answers: [
      { id: 'a', text: 'Rot, Weiß, Blau' },
      { id: 'b', text: 'Schwarz, Rot, Gold' },
      { id: 'c', text: 'Grün, Weiß, Rot' },
      { id: 'd', text: 'Blau, Weiß, Rot' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Die deutsche Flagge hat drei Streifen: Schwarz oben, Rot in der Mitte und Gold unten.',
    points: 10,
    xp: 15
  },
  {
    id: 'geo-006',
    topic: 'geography',
    difficulty: 'easy',
    explanation: 'Auf einer Weltkarte siehst du blaue Flächen – das ist Wasser.',
    question: 'Was ist auf der Erde mehr – Wasser oder Land?',
    answers: [
      { id: 'a', text: 'Land' },
      { id: 'b', text: 'Gleich viel' },
      { id: 'c', text: 'Wasser' },
      { id: 'd', text: 'Das weiß niemand' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Ungefähr 70 % der Erde sind mit Wasser bedeckt – also viel mehr Wasser als Land!',
    points: 10,
    xp: 15
  },
  {
    id: 'geo-007',
    topic: 'geography',
    difficulty: 'easy',
    explanation: 'Wir haben vier Himmelsrichtungen, die uns helfen, uns zu orientieren.',
    question: 'Wo geht die Sonne auf?',
    answers: [
      { id: 'a', text: 'Im Westen' },
      { id: 'b', text: 'Im Süden' },
      { id: 'c', text: 'Im Osten' },
      { id: 'd', text: 'Im Norden' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Die Sonne geht im Osten auf und im Westen unter. Merkspruch: "Im Osten geht die Sonne auf, im Süden nimmt sie ihren Lauf, im Westen will sie untergehn, im Norden ist sie nie zu sehn."',
    points: 10,
    xp: 15
  },

  // ===== MEDIUM – Europa & Natur =====
  {
    id: 'geo-008',
    topic: 'geography',
    difficulty: 'medium',
    explanation: 'Frankreich ist unser Nachbarland im Westen. Es ist bekannt für den Eiffelturm.',
    question: 'Was ist die Hauptstadt von Frankreich?',
    answers: [
      { id: 'a', text: 'Lyon' },
      { id: 'b', text: 'Marseille' },
      { id: 'c', text: 'Paris' },
      { id: 'd', text: 'Nizza' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Paris ist die Hauptstadt von Frankreich. Dort steht der berühmte Eiffelturm!',
    points: 15,
    xp: 20
  },
  {
    id: 'geo-009',
    topic: 'geography',
    difficulty: 'medium',
    explanation: 'In Deutschland gibt es große Flüsse, die durch viele Städte fließen.',
    question: 'Welcher ist der längste Fluss in Deutschland?',
    answers: [
      { id: 'a', text: 'Elbe' },
      { id: 'b', text: 'Donau' },
      { id: 'c', text: 'Rhein' },
      { id: 'd', text: 'Main' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Der Rhein ist mit ca. 865 km der längste Fluss, der durch Deutschland fließt.',
    points: 15,
    xp: 20
  },
  {
    id: 'geo-010',
    topic: 'geography',
    difficulty: 'medium',
    explanation: 'Deutschland hat 16 Bundesländer – wie kleine Teile eines großen Puzzle.',
    question: 'Wie viele Bundesländer hat Deutschland?',
    answers: [
      { id: 'a', text: '12' },
      { id: 'b', text: '14' },
      { id: 'c', text: '16' },
      { id: 'd', text: '18' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Deutschland hat genau 16 Bundesländer, z. B. Bayern, Hessen und Sachsen.',
    points: 15,
    xp: 20
  },
  {
    id: 'geo-011',
    topic: 'geography',
    difficulty: 'medium',
    explanation: 'Europa hat viele Länder mit unterschiedlichen Sprachen und Kulturen.',
    question: 'In welchem Land steht der schiefe Turm von Pisa?',
    answers: [
      { id: 'a', text: 'Spanien' },
      { id: 'b', text: 'Frankreich' },
      { id: 'c', text: 'Griechenland' },
      { id: 'd', text: 'Italien' }
    ],
    correctAnswer: 'd',
    detailedExplanation: 'Der schiefe Turm von Pisa steht in Italien. Er ist schief, weil der Boden auf einer Seite weicher war!',
    points: 15,
    xp: 20
  },
  {
    id: 'geo-012',
    topic: 'geography',
    difficulty: 'medium',
    explanation: 'Berge sind sehr hohe Erhebungen der Erde. Die höchsten Berge sind in Gebirgen.',
    question: 'Wie heißt das höchste Gebirge in Europa?',
    answers: [
      { id: 'a', text: 'Himalaya' },
      { id: 'b', text: 'Alpen' },
      { id: 'c', text: 'Pyrenäen' },
      { id: 'd', text: 'Karpaten' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Die Alpen sind das höchste Gebirge in Europa. Der höchste Berg dort ist der Mont Blanc mit 4.808 Metern.',
    points: 15,
    xp: 20
  },
  {
    id: 'geo-013',
    topic: 'geography',
    difficulty: 'medium',
    explanation: 'Nord- und Südpol sind die kältesten Orte der Erde.',
    question: 'Welche Tiere leben am Nordpol?',
    answers: [
      { id: 'a', text: 'Pinguine' },
      { id: 'b', text: 'Eisbären' },
      { id: 'c', text: 'Löwen' },
      { id: 'd', text: 'Kängurus' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Am Nordpol (Arktis) leben Eisbären. Pinguine leben am Südpol (Antarktis) – nicht verwechseln!',
    points: 15,
    xp: 20
  },
  {
    id: 'geo-014',
    topic: 'geography',
    difficulty: 'medium',
    explanation: 'Inseln sind Landstücke, die von allen Seiten von Wasser umgeben sind.',
    question: 'Welche Insel gehört zu Deutschland und liegt in der Ostsee?',
    answers: [
      { id: 'a', text: 'Mallorca' },
      { id: 'b', text: 'Sizilien' },
      { id: 'c', text: 'Rügen' },
      { id: 'd', text: 'Kreta' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Rügen ist die größte Insel Deutschlands und liegt in der Ostsee. Sie gehört zu Mecklenburg-Vorpommern.',
    points: 15,
    xp: 20
  },

  // ===== HARD – Welt & besonderes Wissen =====
  {
    id: 'geo-015',
    topic: 'geography',
    difficulty: 'hard',
    explanation: 'Auf der Erde gibt es einige besonders große Länder, die riesige Flächen bedecken.',
    question: 'Welches ist das größte Land der Welt?',
    answers: [
      { id: 'a', text: 'China' },
      { id: 'b', text: 'USA' },
      { id: 'c', text: 'Kanada' },
      { id: 'd', text: 'Russland' }
    ],
    correctAnswer: 'd',
    detailedExplanation: 'Russland ist das größte Land der Welt. Es ist so groß, dass es auf zwei Kontinenten liegt: Europa und Asien!',
    points: 20,
    xp: 25
  },
  {
    id: 'geo-016',
    topic: 'geography',
    difficulty: 'hard',
    explanation: 'Afrika ist ein riesiger Kontinent mit der größten Wüste der Welt.',
    question: 'Wie heißt die größte Wüste in Afrika?',
    answers: [
      { id: 'a', text: 'Gobi' },
      { id: 'b', text: 'Atacama' },
      { id: 'c', text: 'Sahara' },
      { id: 'd', text: 'Kalahari' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Die Sahara ist die größte heiße Wüste der Welt. Sie ist fast so groß wie ganz Europa!',
    points: 20,
    xp: 25
  },
  {
    id: 'geo-017',
    topic: 'geography',
    difficulty: 'hard',
    explanation: 'Auf jedem Kontinent gibt es besonders hohe Berge.',
    question: 'Wie heißt der höchste Berg der Welt?',
    answers: [
      { id: 'a', text: 'Mont Blanc' },
      { id: 'b', text: 'Kilimandscharo' },
      { id: 'c', text: 'Mount Everest' },
      { id: 'd', text: 'Zugspitze' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Der Mount Everest ist mit 8.849 Metern der höchste Berg der Welt. Er liegt im Himalaya-Gebirge in Asien.',
    points: 20,
    xp: 25
  },
  {
    id: 'geo-018',
    topic: 'geography',
    difficulty: 'hard',
    explanation: 'Der Äquator ist eine unsichtbare Linie, die die Erde in eine Nordhälfte und eine Südhälfte teilt.',
    question: 'Wie heißt die gedachte Linie um die Mitte der Erde?',
    answers: [
      { id: 'a', text: 'Wendekreis' },
      { id: 'b', text: 'Breitengrad' },
      { id: 'c', text: 'Äquator' },
      { id: 'd', text: 'Meridian' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Der Äquator verläuft genau um die Mitte der Erde. Dort ist es immer besonders warm!',
    points: 20,
    xp: 25
  },
  {
    id: 'geo-019',
    topic: 'geography',
    difficulty: 'hard',
    explanation: 'Der Amazonas ist ein riesiger Fluss in Südamerika, umgeben von einem großen Regenwald.',
    question: 'Auf welchem Kontinent fließt der Amazonas?',
    answers: [
      { id: 'a', text: 'Afrika' },
      { id: 'b', text: 'Asien' },
      { id: 'c', text: 'Südamerika' },
      { id: 'd', text: 'Nordamerika' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Der Amazonas fließt in Südamerika, hauptsächlich durch Brasilien. Er ist einer der längsten Flüsse der Welt!',
    points: 20,
    xp: 25
  },
  {
    id: 'geo-020',
    topic: 'geography',
    difficulty: 'hard',
    explanation: 'Australien ist ein besonderer Kontinent – es ist gleichzeitig auch ein Land!',
    question: 'Welches Tier ist das Wahrzeichen von Australien?',
    answers: [
      { id: 'a', text: 'Elefant' },
      { id: 'b', text: 'Känguru' },
      { id: 'c', text: 'Adler' },
      { id: 'd', text: 'Bär' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Das Känguru ist das Wappentier von Australien. Es lebt fast nur dort! Kängurus können bis zu 9 Meter weit springen.',
    points: 20,
    xp: 25
  },
  {
    id: 'geo-021',
    topic: 'geography',
    difficulty: 'hard',
    explanation: 'Manche Bauwerke sind so besonders, dass die ganze Welt sie kennt.',
    question: 'In welchem Land stehen die Pyramiden von Gizeh?',
    answers: [
      { id: 'a', text: 'Indien' },
      { id: 'b', text: 'Mexiko' },
      { id: 'c', text: 'Ägypten' },
      { id: 'd', text: 'Griechenland' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Die berühmten Pyramiden von Gizeh stehen in Ägypten, in Afrika. Sie wurden vor über 4.500 Jahren gebaut!',
    points: 20,
    xp: 25
  }
]

export const scienceQuestions: Question[] = [
  // ===== EASY – Alltags-Naturwissenschaft =====
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
  },
  {
    id: 'sci-002',
    topic: 'science',
    difficulty: 'easy',
    explanation: 'Alle Lebewesen brauchen etwas Bestimmtes zum Atmen.',
    question: 'Was brauchen Menschen zum Atmen?',
    answers: [
      { id: 'a', text: 'Stickstoff' },
      { id: 'b', text: 'Sauerstoff' },
      { id: 'c', text: 'Kohlenstoff' },
      { id: 'd', text: 'Wasserstoff' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Menschen brauchen Sauerstoff zum Atmen. Den produzieren Bäume und Pflanzen – deshalb sind Wälder so wichtig!',
    points: 10,
    xp: 15
  },
  {
    id: 'sci-003',
    topic: 'science',
    difficulty: 'easy',
    explanation: 'Unser Körper hat viele Sinne, um die Welt wahrzunehmen.',
    question: 'Wie viele Sinne hat der Mensch?',
    answers: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Der Mensch hat 5 Sinne: Sehen, Hören, Riechen, Schmecken und Fühlen (Tasten).',
    points: 10,
    xp: 15
  },
  {
    id: 'sci-004',
    topic: 'science',
    difficulty: 'easy',
    explanation: 'Es gibt verschiedene Tierarten. Manche legen Eier, andere bringen lebende Babys zur Welt.',
    question: 'Welches Tier legt Eier?',
    answers: [
      { id: 'a', text: 'Hund' },
      { id: 'b', text: 'Katze' },
      { id: 'c', text: 'Huhn' },
      { id: 'd', text: 'Pferd' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Hühner legen Eier. Auch Vögel, Reptilien (wie Eidechsen) und Fische legen Eier!',
    points: 10,
    xp: 15
  },
  {
    id: 'sci-005',
    topic: 'science',
    difficulty: 'easy',
    explanation: 'Pflanzen brauchen verschiedene Dinge zum Wachsen.',
    question: 'Was braucht eine Pflanze NICHT zum Wachsen?',
    answers: [
      { id: 'a', text: 'Wasser' },
      { id: 'b', text: 'Licht' },
      { id: 'c', text: 'Erde' },
      { id: 'd', text: 'Schokolade' }
    ],
    correctAnswer: 'd',
    detailedExplanation: 'Pflanzen brauchen Wasser, Licht und Erde (mit Nährstoffen) zum Wachsen – aber keine Schokolade! 😄',
    points: 10,
    xp: 15
  },
  {
    id: 'sci-006',
    topic: 'science',
    difficulty: 'easy',
    explanation: 'In der Natur gibt es einen Kreislauf von Regen, Flüssen und Wolken.',
    question: 'Woraus bestehen Wolken?',
    answers: [
      { id: 'a', text: 'Aus Rauch' },
      { id: 'b', text: 'Aus Watte' },
      { id: 'c', text: 'Aus winzigen Wassertröpfchen' },
      { id: 'd', text: 'Aus Staub' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Wolken bestehen aus ganz vielen winzigen Wassertröpfchen. Wenn sie zu schwer werden, fällt das Wasser als Regen herunter!',
    points: 10,
    xp: 15
  },
  {
    id: 'sci-007',
    topic: 'science',
    difficulty: 'easy',
    explanation: 'Tiere werden in Gruppen eingeteilt, z. B. Säugetiere, Vögel, Fische und Insekten.',
    question: 'Wie viele Beine hat ein Insekt?',
    answers: [
      { id: 'a', text: '4' },
      { id: 'b', text: '8' },
      { id: 'c', text: '6' },
      { id: 'd', text: '10' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Alle Insekten haben genau 6 Beine. Spinnen haben 8 Beine – sie sind keine Insekten!',
    points: 10,
    xp: 15
  },

  // ===== MEDIUM – Natur & Körper =====
  {
    id: 'sci-008',
    topic: 'science',
    difficulty: 'medium',
    explanation: 'Unser Sonnensystem besteht aus der Sonne und den Planeten, die um sie kreisen.',
    question: 'Welcher Planet ist der Erde am nächsten?',
    answers: [
      { id: 'a', text: 'Mars' },
      { id: 'b', text: 'Jupiter' },
      { id: 'c', text: 'Venus' },
      { id: 'd', text: 'Saturn' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Die Venus ist unser nächster Nachbar-Planet. Sie wird auch "Abendstern" oder "Morgenstern" genannt, weil man sie manchmal am Himmel sehen kann.',
    points: 15,
    xp: 20
  },
  {
    id: 'sci-009',
    topic: 'science',
    difficulty: 'medium',
    explanation: 'Unser Körper hat ein Skelett, das uns stützt und schützt.',
    question: 'Wie viele Knochen hat ein erwachsener Mensch ungefähr?',
    answers: [
      { id: 'a', text: 'Etwa 100' },
      { id: 'b', text: 'Etwa 206' },
      { id: 'c', text: 'Etwa 50' },
      { id: 'd', text: 'Etwa 350' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Ein erwachsener Mensch hat etwa 206 Knochen. Babys haben sogar noch mehr – über 300! Einige wachsen im Laufe der Zeit zusammen.',
    points: 15,
    xp: 20
  },
  {
    id: 'sci-010',
    topic: 'science',
    difficulty: 'medium',
    explanation: 'Licht besteht aus verschiedenen Farben, die man manchmal sehen kann.',
    question: 'Wie entsteht ein Regenbogen?',
    answers: [
      { id: 'a', text: 'Durch Wind' },
      { id: 'b', text: 'Durch Blitze' },
      { id: 'c', text: 'Durch Sonnenlicht und Regentropfen' },
      { id: 'd', text: 'Durch Wolken' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Ein Regenbogen entsteht, wenn Sonnenlicht auf Regentropfen trifft. Die Tropfen spalten das Licht in seine Farben auf!',
    points: 15,
    xp: 20
  },
  {
    id: 'sci-011',
    topic: 'science',
    difficulty: 'medium',
    explanation: 'In der Natur gibt es verschiedene Materialien, die Strom leiten können – und solche, die das nicht tun.',
    question: 'Welches Material leitet Strom?',
    answers: [
      { id: 'a', text: 'Holz' },
      { id: 'b', text: 'Gummi' },
      { id: 'c', text: 'Metall' },
      { id: 'd', text: 'Plastik' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Metall leitet Strom sehr gut. Deshalb sind Kabel innen aus Metall (Kupfer). Gummi und Plastik leiten keinen Strom – sie schützen uns davor!',
    points: 15,
    xp: 20
  },
  {
    id: 'sci-012',
    topic: 'science',
    difficulty: 'medium',
    explanation: 'Tiere bereiten sich unterschiedlich auf den Winter vor.',
    question: 'Was macht ein Igel im Winter?',
    answers: [
      { id: 'a', text: 'Er fliegt in den Süden' },
      { id: 'b', text: 'Er hält Winterschlaf' },
      { id: 'c', text: 'Er sammelt Nüsse' },
      { id: 'd', text: 'Er baut ein Nest im Baum' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Der Igel hält Winterschlaf! Er rollt sich zusammen und schläft den ganzen Winter über. Dabei verbraucht er kaum Energie.',
    points: 15,
    xp: 20
  },
  {
    id: 'sci-013',
    topic: 'science',
    difficulty: 'medium',
    explanation: 'Magnete haben besondere Eigenschaften – sie können andere Dinge anziehen.',
    question: 'Was zieht ein Magnet an?',
    answers: [
      { id: 'a', text: 'Papier' },
      { id: 'b', text: 'Holz' },
      { id: 'c', text: 'Eisen' },
      { id: 'd', text: 'Glas' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Magnete ziehen Eisen und einige andere Metalle an. Papier, Holz und Glas sind nicht magnetisch.',
    points: 15,
    xp: 20
  },
  {
    id: 'sci-014',
    topic: 'science',
    difficulty: 'medium',
    explanation: 'Bäume verlieren im Herbst ihre Blätter – aber nicht alle!',
    question: 'Welcher Baum verliert im Winter seine Blätter NICHT?',
    answers: [
      { id: 'a', text: 'Eiche' },
      { id: 'b', text: 'Birke' },
      { id: 'c', text: 'Tanne' },
      { id: 'd', text: 'Buche' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Die Tanne ist ein Nadelbaum und behält ihre Nadeln das ganze Jahr. Deshalb heißen Nadelbäume auch "immergrün"!',
    points: 15,
    xp: 20
  },

  // ===== HARD – Spannendes Wissen =====
  {
    id: 'sci-015',
    topic: 'science',
    difficulty: 'hard',
    explanation: 'Unser Sonnensystem hat mehrere Planeten, die sich um die Sonne drehen.',
    question: 'Wie viele Planeten hat unser Sonnensystem?',
    answers: [
      { id: 'a', text: '7' },
      { id: 'b', text: '8' },
      { id: 'c', text: '9' },
      { id: 'd', text: '10' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Unser Sonnensystem hat 8 Planeten: Merkur, Venus, Erde, Mars, Jupiter, Saturn, Uranus und Neptun. Pluto zählt seit 2006 nicht mehr als Planet!',
    points: 20,
    xp: 25
  },
  {
    id: 'sci-016',
    topic: 'science',
    difficulty: 'hard',
    explanation: 'Im Körper gibt es ein Organ, das wie eine Pumpe arbeitet und Blut durch den Körper transportiert.',
    question: 'Welches Organ pumpt das Blut durch den Körper?',
    answers: [
      { id: 'a', text: 'Lunge' },
      { id: 'b', text: 'Gehirn' },
      { id: 'c', text: 'Herz' },
      { id: 'd', text: 'Magen' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Das Herz pumpt das Blut durch den ganzen Körper. Es schlägt etwa 100.000 Mal am Tag – und das ganz von allein!',
    points: 20,
    xp: 25
  },
  {
    id: 'sci-017',
    topic: 'science',
    difficulty: 'hard',
    explanation: 'Manche Tiere fressen Pflanzen, andere fressen Fleisch, und manche fressen beides.',
    question: 'Wie nennt man Tiere, die nur Pflanzen fressen?',
    answers: [
      { id: 'a', text: 'Fleischfresser' },
      { id: 'b', text: 'Allesfresser' },
      { id: 'c', text: 'Pflanzenfresser' },
      { id: 'd', text: 'Insektenfresser' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Tiere, die nur Pflanzen fressen, heißen Pflanzenfresser (Herbivoren). Zum Beispiel Kühe, Pferde und Kaninchen!',
    points: 20,
    xp: 25
  },
  {
    id: 'sci-018',
    topic: 'science',
    difficulty: 'hard',
    explanation: 'Dinosaurier lebten vor sehr langer Zeit auf der Erde, sind aber ausgestorben.',
    question: 'Vor wie vielen Jahren sind die Dinosaurier ausgestorben?',
    answers: [
      { id: 'a', text: 'Vor 1.000 Jahren' },
      { id: 'b', text: 'Vor 1 Million Jahren' },
      { id: 'c', text: 'Vor 65 Millionen Jahren' },
      { id: 'd', text: 'Vor 500 Jahren' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Die Dinosaurier sind vor etwa 65 Millionen Jahren ausgestorben. Wahrscheinlich durch einen riesigen Meteoriten, der auf die Erde einschlug!',
    points: 20,
    xp: 25
  },
  {
    id: 'sci-019',
    topic: 'science',
    difficulty: 'hard',
    explanation: 'Schall breitet sich durch die Luft aus. Bei Gewitter sieht man erst den Blitz und hört dann den Donner.',
    question: 'Was ist schneller – Licht oder Schall?',
    answers: [
      { id: 'a', text: 'Schall' },
      { id: 'b', text: 'Beide gleich schnell' },
      { id: 'c', text: 'Licht' },
      { id: 'd', text: 'Keins von beiden' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Licht ist viel schneller als Schall! Deshalb siehst du bei Gewitter erst den Blitz und hörst dann den Donner.',
    points: 20,
    xp: 25
  },
  {
    id: 'sci-020',
    topic: 'science',
    difficulty: 'hard',
    explanation: 'Unser Körper besteht zu einem großen Teil aus Wasser.',
    question: 'Wie viel Prozent des menschlichen Körpers besteht ungefähr aus Wasser?',
    answers: [
      { id: 'a', text: 'Etwa 20 %' },
      { id: 'b', text: 'Etwa 50 %' },
      { id: 'c', text: 'Etwa 70 %' },
      { id: 'd', text: 'Etwa 90 %' }
    ],
    correctAnswer: 'c',
    detailedExplanation: 'Der menschliche Körper besteht zu etwa 70 % aus Wasser. Deshalb ist es so wichtig, genug zu trinken!',
    points: 20,
    xp: 25
  },
  {
    id: 'sci-021',
    topic: 'science',
    difficulty: 'hard',
    explanation: 'Pflanzen haben eine besondere Fähigkeit: Sie können aus Sonnenlicht Nahrung herstellen.',
    question: 'Wie heißt der Vorgang, bei dem Pflanzen Sonnenlicht in Nahrung umwandeln?',
    answers: [
      { id: 'a', text: 'Verdunstung' },
      { id: 'b', text: 'Fotosynthese' },
      { id: 'c', text: 'Verbrennung' },
      { id: 'd', text: 'Gärung' }
    ],
    correctAnswer: 'b',
    detailedExplanation: 'Fotosynthese heißt der Vorgang! Pflanzen nehmen Sonnenlicht, Wasser und CO₂ auf und machen daraus Zucker und Sauerstoff. Toll, oder?',
    points: 20,
    xp: 25
  }
]

export const allQuestions: Record<string, Question[]> = {
  math: mathQuestions,
  geography: geographyQuestions,
  science: scienceQuestions
}