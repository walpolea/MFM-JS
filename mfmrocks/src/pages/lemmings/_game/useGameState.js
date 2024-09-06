import { computed, ref } from 'vue';
import {LEVEL1} from './levels/level1';
import {LEVEL2} from './levels/level2';

const levels = [LEVEL1, LEVEL2];
let currentLevelIndex = 0;

const currentLevel = ref(levels[currentLevelIndex]);
const currentSavedLemmings = ref(0);
const currentSaveGoal = ref(50);

const levelPassed = computed(() => {
  return currentSavedLemmings.value >= currentSaveGoal.value;
});

loadLevel(LEVEL1);
// loadLevel(LEVEL2);

export function useGameState() {

  return {
    currentLevel,
    currentSavedLemmings,
    currentSaveGoal,
    levelPassed,
    loadLevel,
    nextLevel,
    prevLevel,
  }
}

export function loadLevel(level) {
  currentLevel.value = level;
  currentSavedLemmings.value = 0;
  currentSaveGoal.value = level.saveGoal;
}

export function nextLevel() {
  if(levels.length > currentLevelIndex + 1) {
    currentLevelIndex++;
    loadLevel(levels[currentLevelIndex]);
  }
}

export function prevLevel() {
  if(currentLevelIndex > 0) {
    currentLevelIndex--;
    loadLevel(levels[currentLevelIndex]);
  }
}