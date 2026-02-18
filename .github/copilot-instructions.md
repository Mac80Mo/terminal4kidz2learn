# Lern-Terminal - Copilot Instructions

## Projektübersicht
Eine Vue 3 + TypeScript Quiz-App für Kinder mit Terminal-Look. Vorbereitet für Tauri Desktop-App.

## Architektur: MVVM (Model-View-ViewModel)

### Schichten-Trennung

**Model** (`stores/`, `data/`, `types/`)
- Pinia Store nur für Geschäftslogik (Score, XP, Stats)
- Keine UI-State im Store
- Typen in `types/quiz.ts`

**ViewModel** (`composables/`)
- UI-Logik und State-Management
- Navigation: `useNavigation.ts`
- Quiz-Ablauf: `useQuizController.ts`
- Neue Features als Composables

**View** (`components/`)
- Reine Präsentation, keine Logik
- Events nach oben emittieren
- Props von oben empfangen
- Screen-Komponenten in `components/screens/`

### Regeln

1. **Views greifen NIE direkt auf Model zu** - immer über ViewModel
2. **Keine `.value` in Templates** - computed Properties verwenden
3. **Intervalle/Timer immer in `onUnmounted` aufräumen**
4. **CSS-Variablen nutzen**: `var(--terminal-green)`, `var(--terminal-yellow)`
5. **Konstanten in `constants/game.ts`** - keine Magic Numbers
6. **Type-Imports mit `import type`** (verbatimModuleSyntax)

### Code-Style

```typescript
// ✅ Richtig: ViewModel
export function useFeature() {
  const store = useGameStore()
  const state = ref(...)
  const computed = computed(() => ...)
  
  function action() { ... }
  
  return { state, computed, action }
}

// ✅ Richtig: View
const viewModel = useFeature()
const displayValue = computed(() => viewModel.state.value)

// ❌ Falsch: Direct Store in Template
v-if="store.someValue"

// ✅ Richtig: Via Computed
v-if="displayValue"
```

### Neue Features

1. Composable in `composables/` erstellen
2. In `composables/index.ts` exportieren
3. In Container-Komponente (Terminal.vue) einbinden
4. Screen-Komponente in `components/screens/` falls nötig
