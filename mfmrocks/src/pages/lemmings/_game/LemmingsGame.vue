<template>
  <div class="top-hud">
    <span>{{ currentLevel.name }}</span>
    <span>Lemmings Saved: {{ currentSavedLemmings }} / {{ currentLevel.saveGoal ?? "?" }}</span>
  </div>
<div class="lemmings-game" v-once></div>
<div class="controls">
  <div class="user-contro">
    <button @click="togglePause()">{{ isPaused ? "PLAY" : "PAUSE" }}</button>
    <button @click="pause();loadLevel(currentLevel);initLevel();">RESTART LEVEL</button>
    <input type="range" min="0" :max="4" value="1" :step="0.001" v-model="renderSpeed">
    <div class="resources">
      <button v-for="resource in currentLevel.resources" @click="setActiveElementByName(resource.type)">{{ resource.type }} - {{ resource.count }}</button>
    </div>
  </div>

  <div class="editor-controls" v-if="mode === 'EDIT'">
    <p>Editor Controls</p>
    <div class="menu">
      <button @click="prevLevel()">Prev Level</button>
      <button @click="nextLevel()">Next Level</button>
    </div>
    <div class="elements">
      <button @click="setActiveElementByName('EMPTY')">EMPTY</button>
      <button v-for="element in elements" @click="setActiveElement(element)">{{ element.name }}</button>
      <input type="range" v-model="brushSize" min="1" max="5"> {{ brushSize }}
    </div>
    <button @click="console.log(grid.getAtomicMap(true))">LOG MAP</button>
  </div>
</div>
</template>
<script setup>

  import { ref, onMounted, watch } from 'vue';
  import { Tile, ElementRegistry } from 'mfm-js';
  import { PixiRenderer } from '/src/scripts/renderers/pixi/renderer.ts';

  import {Lemming} from './elements/Lemming.ts';
  import {LemmingEmitter} from './elements/LemmingEmitter.ts';
  import {Power} from './elements/Power.ts';
  import {Dirt} from './elements/Dirt.ts';
  import {Exit} from './elements/Exit.ts';

  import {useGameState} from './useGameState';

  let tile; 
  let grid;
  let mfms;

  const { currentLevel, currentSavedLemmings, currentSaveGoal, nextLevel, prevLevel, loadLevel, levelPassed } = useGameState();

  const elements = ref(Object.fromEntries(ElementRegistry.GROUPS.entries()).LEMMINGS);
  const activeType = ref(null);
  const mode = ref('EDIT');

  const isPaused = ref(true);
  const togglePause = () => {
    isPaused.value ? play() : pause();
  }
  const pause = () => {
    isPaused.value = true;
    renderSpeed.value = 0;
  }
  const play = () => {
    isPaused.value = false;
    renderSpeed.value = 1;
  }

  const INITIAL_RENDER_SPEED = 0.0;
  const renderSpeed = ref(INITIAL_RENDER_SPEED);
  const brushSize = ref(1);

  watch( brushSize, (bs) => {
    grid.brushSize = +bs;
  });

  watch( () => renderSpeed.value, (rs) => {
    grid.setRenderMultiplier(rs);
  });

  watch( currentLevel , () => {
    pause();
    initLevel();
  });
  
  onMounted( async () => {
    mfms = document.querySelector('.lemmings-game');
    initLevel();

    if( window ) {
      window.addEventListener('PLACED_ATOM', (e) => {
        const site = e.detail;
        console.log( 'placed', site, currentLevel.value );
        if( currentLevel.value && site?.atom) {
          currentLevel.value.resources.forEach( r => {
            console.log( r.type, site.atom.type );
            if( r.type === site.atom.TYPE.name ) {
              r.count--;

              if( r.count < 0 ) {
                r.count = 0;
                site.create();
              }
            }
          });
        }
      });
    }
  });

  async function initLevel() {
    if( grid ) {
      grid.deconstruct();
    }
    await init( currentLevel.value.map.width, currentLevel.value.map.height );
    grid.setAtomicMap( currentLevel.value.map );
  }

  async function init(w = 128, h = 64) {

    const sizeFactor = 3600;
    tile = new Tile(w, h);
    grid = new PixiRenderer(tile, sizeFactor, sizeFactor * (tile.height / tile.width));

    await grid.init();
    
    while (mfms.firstChild) {
      mfms.removeChild(mfms.firstChild);
    }
    mfms.appendChild(grid.view);

    setDefaults();
  }

  function setDefaults() {
    grid.brushSize = +brushSize.value;
    grid.setRenderMultiplier(renderSpeed.value);
    if( activeType.value ) {
      setActiveElement(activeType.value);
    } else {
      setActiveElementByName('POWER');
    }
  }

  async function setGridSize(v) {
    v = v.split(',').map(px => parseInt(px));

    grid.deconstruct();
    await init(v[0], v[1]);
    
  }

  function findElement(name) {
    return ElementRegistry.getType(name);
  }

  function setActiveElementByName(name) {
    if(findElement(name)) {
      setActiveElement(findElement(name));
    }
  }

 function setActiveElement(e) {
    grid.curSelectedElementFunction = e.CREATE;
    activeType.value = e;
  }

</script>
<style lang="scss">

.lemmings-game {
  width:100%;

  canvas {
    display:block;
    image-rendering: smooth;
    width:100%;
    max-height: 60vh;
  }

}

.top-hud {
  display:flex;
  gap:1rem;
}
</style>