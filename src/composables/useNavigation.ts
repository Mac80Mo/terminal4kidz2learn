import { ref } from 'vue'

export type Screen = 'start' | 'menu' | 'quiz' | 'stats'

/**
 * Navigation ViewModel (MVVM)
 * Verwaltet Screen-Wechsel und Navigation
 */
export function useNavigation() {
  const currentScreen = ref<Screen>('start')
  
  function navigateTo(screen: Screen) {
    currentScreen.value = screen
  }
  
  function goToMenu() {
    currentScreen.value = 'menu'
  }
  
  function goToQuiz() {
    currentScreen.value = 'quiz'
  }
  
  function goToStats() {
    currentScreen.value = 'stats'
  }
  
  function goToStart() {
    currentScreen.value = 'start'
  }
  
  return {
    currentScreen,
    navigateTo,
    goToMenu,
    goToQuiz,
    goToStats,
    goToStart
  }
}
