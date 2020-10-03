import { Tile } from "./mfm/core/Tile";
import { MFMRenderer } from "./renderer/MFMRenderer";
import { ElementIncludes } from "./mfm/ElementIncludes";
import { DReg } from "./mfm/core/elements/DRegElement";
import { Emitters } from "./mfm/core/elements/Emitters";
import { Levels } from "./mfm/core/elements/game/Levels";
import { Goal } from "./mfm/core/elements/game/Goal";
import { MembraneWall } from "./mfm/core/elements/MembraneWallElement";
import { Site } from "./mfm/core/Site";
import {GridCoord} from "./mfm/core/IGridCoord";
import { Enemy } from "./mfm/core/elements/game/Enemy";

declare var Vue: any;

let app = new Vue({
  el: "#game",
  data: function () {
    return {
      gridSize: "128x64" as string,
      timeSpeed: 5000 as number,
      tenex: false as boolean,
      g: undefined as Tile,
      mfmRenderer: MFMRenderer,
      customSequence: "" as string,
      curSelectedElement: "" as string,
      curSelectedFunc: undefined as Function,
      shouldRender: true as boolean,
      fullScreenMode: false as boolean,
      currentLevel: 0 as number,
    };
  },
  mounted() {
    const params = this.getParams(window.location.href);
    if (params.fullscreen) {
      this.fullScreenMode = true;
    }

    this.initTile();
  },
  methods: {
    initTile() {
      this.g = new Tile(this.gridCols, this.gridRows);
      this.mfmRenderer = new MFMRenderer(this.g, document.querySelector("#mfm"), 1600, 800, false);

      this.mfmRenderer.timeSpeed = this.timeSpeed ? this.timeSpeed : 5000;
      this.curSelectedElement = this.curSelectedElement ? this.curSelectedElement : "Enemy";
      this.curSelectedFunc = this.curSelectedFunc ? this.curSelectedFunc : Enemy.CREATE;
      this.selectElement(this.curSelectedElement, this.curSelectedFunc);


      this.loadLevel();
    },
    loadLevel() {

      const levelData = Levels[this.currentLevel];

      this.g.getSiteByCoord(levelData.playerStart).atom = Emitters.PLAYER();
      this.g.getSiteByCoord(levelData.goal).atom = Goal.CREATE();

      levelData.walls.forEach( (w:GridCoord )=> {
        this.g.getSiteByCoord(w).atom = MembraneWall.SW_XL();
      })

      levelData.enemies.forEach( (e:GridCoord )=> {
        this.g.getSiteByCoord(e).atom = Enemy.CREATE();
      })


    },
    outputWalls() {
      let layout = "";
      let enemies = "";
      const tile = this.g as Tile;
      tile.sites.forEach( (s) => {

        switch(s.atom?.type) {
          case MembraneWall.TYPE_DEF: 
            layout += JSON.stringify(s.tilePos) + ",";
          break;
          case Enemy.TYPE_DEF:
            enemies+= JSON.stringify(s.tilePos) + ",";
          break;
        }
        
      });

      console.log( `enemies:[${enemies}],walls:[${layout}]` );
    },
    selectElement(name: string, func: Function) {
      this.curSelectedElement = name;
      this.curSelectedFunc = func;
      this.mfmRenderer.curSelectedElement = this.curSelectedElement;
      this.mfmRenderer.curSelectedElementFunction = this.curSelectedFunc;
    },
    reload() {
      // this.mfmRenderer.deconstruct();
      // this.initTile();
      this.mfmRenderer.killAll();
    },
    clearAllOfType() {
      this.mfmRenderer.killType(this.curSelectedFunc().type);
    },

    getParams(url: string) {
      var params: any = {};
      var parser = document.createElement("a");
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]) as any;
      }
      return params;
    },
  },
  computed: {
    gridCols() {
      return this.gridSize.split("x")[0];
    },
    gridRows() {
      return this.gridSize.split("x")[1];
    },
    typeMap() {
      return ElementIncludes.ELEMENT_MENU_MAP;
    },
  },
  watch: {
    tenex(val: boolean) {
      this.mfmRenderer.timeSpeed = this.tenex ? 10 * this.mfmRenderer.timeSpeed : this.mfmRenderer.timeSpeed / 10;
    },
    timeSpeed(val: number) {
      this.mfmRenderer.timeSpeed = this.tenex ? 10 * val : val;
    },
    gridSize(val: string) {
      this.mfmRenderer.deconstruct();
      this.initTile();
    },
    customSequence(val: string) {
      this.mfmRenderer.customSequence = this.customSequence;
    },
    shouldRender(val: boolean) {
      console.log("should render", val);
      this.mfmRenderer.shouldRender = val;
    },
  },
});
