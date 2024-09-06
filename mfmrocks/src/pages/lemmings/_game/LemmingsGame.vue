<template>
<div class="lemmings-game" v-once></div>
<div class="controls">
  <button @click="togglePause">{{ isPaused ? "PLAY" : "PAUSE" }}</button>
  <input type="range" min="0" :max="1" value="1" :step="0.001" v-model="renderSpeed">
  <div class="editor-controls" v-if="mode === 'EDIT'">
    <button @click="setActiveElementByName('EMPTY')">EMPTY</button>
    <button v-for="element in elements" @click="setActiveElement(element)">{{ element.name }}</button>
    <input type="range" v-model="brushSize" min="1" max="10"> {{ brushSize }}
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
  import { Dirt } from './elements/Dirt.ts';
  import {Exit} from './elements/Exit.ts';

  import {LEVEL1} from './levels/level1';

  let tile; 
  let grid;
  let mfms;
  let currentLevel = LEVEL1;


  const elements = ref(Object.fromEntries(ElementRegistry.GROUPS.entries()).LEMMINGS);
  const activeType = ref(null);
  const mode = ref('EDIT');

  const isPaused = ref(false);
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
  const brushSize = ref(2);

  watch( brushSize, (bs) => {
    grid.brushSize = +bs;
  });

  watch( renderSpeed, (rs) => {
    grid.setRenderMultiplier(rs);
  });
  
  onMounted( async () => {
    mfms = document.querySelector('.lemmings-game');

    loadLevel();
  });

  async function loadLevel( level ) {

    if(level) {
      currentLevel = level;
    }

    if( grid ) {
      grid.deconstruct();
    }
    await init( currentLevel.map.width, currentLevel.map.height );
    grid.setAtomicMap( currentLevel.map );
  }

  function onReInit({ w, h }) {
    // init(w, h);
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
</style>