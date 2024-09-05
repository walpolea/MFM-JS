<template>
<div class="lemmings-game" v-once></div>
<div class="controls">
  <button @click="togglePause">{{ isPaused ? "PLAY" : "PAUSE" }}</button>
</div>
</template>
<script setup>

import { ref, onMounted, watch } from 'vue';
import { Tile, ElementRegistry } from 'mfm-js';

import {Lemming} from './elements/lemming.ts';

  import { PixiRenderer } from '/src/scripts/renderers/pixi/renderer.ts';

  const GRID_SIZES = [
    {
      w: 96,
      h: 64
    },
  ]

  let tile; 
  let grid;
  let mfms;
  // const mfms = ref(null);
  const elements = ref(Object.fromEntries(ElementRegistry.GROUPS.entries()));
  const activeType = ref(null);

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
    renderSpeed.value = 0.5;
  }

  console.log( elements.value );

  const renderSpeed = ref(0.5);
  const brushSize = ref(1);
  const gridSize = ref('96,64');

  watch( brushSize, (bs) => {
    grid.brushSize = +bs;
  });

  watch( renderSpeed, (rs) => {
    grid.setRenderMultiplier(rs);
  });

  watch( gridSize, (gs) => {
    setGridSize(gs);
  });
  
  onMounted( async () => {
    mfms = document.querySelector('.lemmings-game');
    await init();
  });

  async function init(w = 96, h = 64) {

    tile = new Tile(w, h);
    grid = new PixiRenderer(tile, 3600, 3600 * (tile.height / tile.width));

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
      setActiveElementByName('LEMM');
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