import { computed, ref, watch } from 'vue';
import {LEVEL1} from './levels/level1';
import {LEVEL2} from './levels/level2';
import {LEVEL3} from './levels/level3';

const levels = [LEVEL1, LEVEL2, LEVEL3];
let currentLevelIndex = 0;

const currentLevel = ref(levels[currentLevelIndex]);
const currentSavedLemmings = ref(0);
const currentSaveGoal = ref(50);
const currentResources = ref(currentLevel.value.resources);
const csi = ref(null); //CurrentSelectedResourceIndex

const levelPassed = computed(() => {
  return currentSavedLemmings.value >= currentSaveGoal.value;
});

watch( () => levelPassed.value, () => {
  if( levelPassed.value ) {
    nextLevel();
  }
});

watch( () => levelPassed.value, () => {
  if( levelPassed.value ) {
    nextLevel();
  }
});

loadLevel(LEVEL1);

export function useGameState() {

  return {
    currentLevel,
    currentSavedLemmings,
    currentSaveGoal,
    currentResources,
    csi,
    levelPassed,
    loadLevel,
    nextLevel,
    prevLevel,
    selectResource,
    deselectResource,
  }
}

export function resetLevel() {
  currentSavedLemmings.value = 0;
  currentSaveGoal.value = currentLevel.value.saveGoal;
  currentResources.value = [...currentLevel.value.resources];
}

export function loadLevel(level) {
  currentLevel.value = level;
  resetLevel();
}

export function nextLevel() {
  currentLevelIndex = currentLevelIndex >= levels.length - 1 ? 0 : currentLevelIndex+1;
  loadLevel(levels[currentLevelIndex]);
}

export function prevLevel() {
  currentLevelIndex = currentLevelIndex <= 0 ? levels.length - 1 : currentLevelIndex-1;
  loadLevel(levels[currentLevelIndex]);
}

export function selectResource(type) {
  const resIndex = currentResources.value.findIndex(r => r.type === type);

  if( resIndex !== -1 ) {
    csi.value = resIndex;
  } else {
    csi.value = null;
  }

}

export function deselectResource() {
  csi.value = null;
}