<template>
  <div class="mfms" :class="{ pinned }">
    <div ref="mfms" class="mfms-grid" v-once></div>

    <div class="controls">
      <button class="controls-toggle" @click="toggleControls()">Controls</button>
      <div class="control-panel" :class="{open: showControls}">
        <div class="panel-items">
          <div class="grid-tools">
            <div style="grid-column:1 / -1;width:max-content;max-height:40px;">
                <label style="display:flex;">
                  <input style="max-width:20px;" type="checkbox" v-model="pinned">
                  <span style="flex:1;">pin controls</span>
                </label>
              </div>
            <label>
              Render Speed ({{renderSpeed}}x, {{~~grid?.fixedRenderSpeed}} updates per frame)<br>
              <input type="range" min="0" :max="20" value="1" :step="0.001" v-model="renderSpeed">
            </label>
            <fieldgroup>
              <label>
                Brush Size ({{brushSize}})<br>
                <input style="width:auto;" type="range" min="1" max="5" value="1" step="1" v-model="brushSize">
              </label>
              <label style="margin-left:16px;">
                <span>Grid size:</span>
                <select v-model="gridSize">
                  <option v-for="gs in GRID_SIZES" :value="`${gs.w},${gs.h}`">{{gs.w}} x {{gs.h}}</option>
                </select>
              </label>
              <br>
              
              <button @click="tile.clear()">CLEAR GRID</button>
              <button @click="tile.clear( activeType );">CLEAR TYPE</button>
            </fieldgroup>

          </div>
        

        <ul class="element-btns">
          <li v-for="(group,key) in elements" class="element-btn-group">
            <h3>{{key}}</h3>
            <button class="element-btn" v-for="e in group" :class="{active: activeType === e}"
              @click="setActiveElement(e)" :ref="e.name">
              {{e.name}}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>

  import { ref, onMounted, watch } from 'vue';
  import { Tile, ElementRegistry } from 'mfm-js';

  import { PixiRenderer } from '/src/scripts/renderers/pixi/renderer.ts';

  const showControls = ref(true);
  const toggleControls = () => showControls.value = !showControls.value;

  const GRID_SIZES = [
    {
      w: 64,
      h: 64
    },
    {
      w: 128,
      h: 64
    },
    {
      w: 128,
      h: 128
    },
    {
      w: 196,
      h: 128
    },
    {
      w: 256,
      h: 128
    },
    {
      w: 256,
      h: 256
    },
    {
      w: 512,
      h: 256
    }
  ]

  let tile; 
  let grid;
  let mfms;
  // const mfms = ref(null);
  const elements = ref(Object.fromEntries(ElementRegistry.GROUPS.entries()));
  const activeType = ref(null);

  const renderSpeed = ref(1);
  const brushSize = ref(1);
  const gridSize = ref('256,128');
  const pinned = ref(true);

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
    mfms = document.querySelector('.mfms-grid');
    await init();
  });

  async function init(w = 256, h = 128) {

    tile = new Tile(w, h);
    grid = new PixiRenderer(tile, 3600, 3600 * (tile.height / tile.width));
    // mfms.value.style.setProperty('aspect-ratio', `${tile.width}/${tile.height}`);

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
      setActiveElementByName('DREG');
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

<style lang='scss' scoped >

button {
  cursor:pointer;
}

.mfms.pinned {
  .mfms-grid {
    margin-bottom:5px;
  }

  .controls {
    position:static;
  }
}

.mfms-grid {
  display: grid;
  place-items: center;
  margin-bottom:500px;
  width:100%;

  :global(canvas) {
    display:block;
    image-rendering: smooth;
    width:100%;
    max-height: 100vh;
  }
}

.element-btns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

@media screen and (max-width:500px) {
  .element-btns {
    grid-template-columns: 1fr;
  }
}

.element-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.element-btn-group {
  display: block;
}

.element-btn {
  color: white;
  padding: 4px 6px;
  background: #444;
  border: 1px solid #111;
  border-radius: 4px;
  font-size: 0.7rem;
}

.element-btn.active {
  background-color: rebeccapurple;
}

.controls {

  padding: 25px;
  width:100%;
  background: rgb( 0 0 0 / 0.6 );


  position:fixed;
  bottom:0;
  left:0;
  display:grid;
  padding:0;

  input {
    width: 100%;
  }

  .controls-toggle {
    width:100%;
    display:block;
    min-height:45px;

    border:none;
    background-color:#343434;
    color:lightsalmon;
    font-weight:bold;
    font-size:1.6rem;
  }

  .grid-tools {
    display:grid;
    grid-template-columns: repeat( 2, 1fr);
    gap:1rem;
  }

  .control-panel {
    display:grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s;
    overflow:hidden;

    .panel-items {
      padding-inline:2rem;
      visibility:hidden;
      transition: visibility 1s, padding-block 0.2s;
      min-height: 0;
    }

    &.open {
      grid-template-rows: 1fr;

      .panel-items {
        visibility:visible;
        padding-block:2rem;

      }
    }
  }

}

</style>


