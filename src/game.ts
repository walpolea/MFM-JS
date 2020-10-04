import { Tile } from "./mfm/core/Tile";
import { MFMRenderer } from "./renderer/MFMRenderer";
import { ElementIncludes } from "./mfm/ElementIncludes";
import { loadLevel, Levels, EndScreen, StartScreen } from "./mfm/core/elements/game/Levels";
import { Goal } from "./mfm/core/elements/game/Goal";
import { MembraneWall } from "./mfm/core/elements/MembraneWallElement";
import { Site } from "./mfm/core/Site";
import { Enemy } from "./mfm/core/elements/game/Enemy";
import { Player } from "./mfm/core/elements/game/Player";
import { Clearer } from "./mfm/core/elements/game/Clearer";

import { PlayerEmitter } from "./mfm/core/elements/game/PlayerEmitter";
import { FlyingEnemy } from "./mfm/core/elements/game/FlyingEnemy";
import { Wall } from "./mfm/core/elements/WallElement";

declare var Vue: any;
declare var Howl:any;

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
      gameLoopInterval:undefined as number,
      totalScore: 0 as number,
      isStarted:false as boolean,
      allDone: false as boolean,
      isDebug: false as boolean,
      backgroundMusic: undefined as any,
      endingMusic:undefined as any,

    };
  },
  mounted() {
    const params = this.getParams(window.location.href);
    if (params.fullscreen) {
      this.fullScreenMode = true;
    }

    if( params.debug ) {
      this.isDebug = true;
    }

    this.backgroundMusic = new Howl({
      src: ['/gameFiles/Dreaming.ogg'],
      autoplay: true,
      loop: true,
      volume: 0.3
    });

    this.backgroundMusic.play();

    

    this.initTile();
  },
  methods: {
    initTile() {
      this.g = new Tile(this.gridCols, this.gridRows);
      if( this.isDebug ) {
        this.mfmRenderer = new MFMRenderer(this.g, document.querySelector("#mfm"), 1600, 800, true);
      } else {
        this.mfmRenderer = new MFMRenderer(this.g, document.querySelector("#mfm"), 1600, 800, false);
      }

      this.mfmRenderer.timeSpeed = this.timeSpeed ? this.timeSpeed : 5000;
      this.curSelectedElement = this.curSelectedElement ? this.curSelectedElement : "Enemy";
      this.curSelectedFunc = this.curSelectedFunc ? this.curSelectedFunc : Enemy.CREATE;
      this.selectElement(this.curSelectedElement, this.curSelectedFunc);


      this.loadStartScreen();
    },

    startGame() {
      // this.loadLevel();

      // setTimeout( () => {
      //   this.startGameLoop();
      // }, 500)

      this.isStarted = true;
      this.levelEnded();
      
    },
    startGameLoop() {
      clearInterval(this.gameLoopInterval);
      this.gameLoopInterval = setInterval( this.gameLoop, 100 ); 
    },

    loadLevel() {

      const levelData = Levels[this.currentLevel];
      loadLevel(this.g, levelData);

    },

    loadStartScreen() {
      loadLevel(this.g, StartScreen);
    },

    loadEndScreen() {
      this.backgroundMusic.fade(.3, 0, 1500);
      setTimeout(
        ()=> {
          this.backgroundMusic = new Howl({
            src: ['/gameFiles/VoicesFromHeaven.ogg'],
            autoplay: true,
            loop: true,
            volume: 0.2
          });
          this.backgroundMusic.play();
        }, 1500
      )
      
      loadLevel(this.g, EndScreen);
    },
    outputWalls() {


      let atoms:any[] = [];

      const tile = this.g as Tile;
      tile.sites.forEach( (s) => {
        
        switch(s.atom?.type) {
          case Wall.TYPE_DEF:
          case MembraneWall.TYPE_DEF: 
          case Enemy.TYPE_DEF:
          case FlyingEnemy.TYPE_DEF:
          case PlayerEmitter.TYPE_DEF:
          case Goal.TYPE_DEF:
            atoms.push({
              element: s.atom.type.name,
              gridPos: s.tilePos
            });
          break;
        }
        
      });

      console.log( JSON.stringify(atoms) );

    },
    levelIsDone():boolean {
      
      const tile = this.g as Tile;
      let isDone = true;

      tile.sites.forEach( (s) => {
        if( s.atom.type == Player.TYPE_DEF || s.atom.type === PlayerEmitter.TYPE_DEF ) {
          isDone = false;
        }
      });

      console.log(isDone);
      return isDone;

    },

    levelEnded() {
      let goalCount = 0;
      const tile = this.g as Tile;

      tile.sites.forEach( (s:Site) => {
        if( s.atom.type === Goal.TYPE_DEF ) {
          goalCount += (s.atom.elem as Goal).rescued;
        }
      });

      tile.getRandomSite().atom = Clearer.CREATE();

      if( goalCount > 0 ) {
        this.totalScore += goalCount;

        if( this.currentLevel < Levels.length-1 ) {
        this.currentLevel++;
        } else {
          this.allDone = true;
        }
      } else {
        // if( this.currentLevel > 0 ) {
        //   this.currentLevel--;
        // }
      }

      const waitInterval:number = setInterval( () => {
        let stillClearing:boolean = false;
        tile.sites.forEach( (s:Site) => {
          if( s.atom.type === Clearer.TYPE_DEF ) {
            stillClearing = true;
          }
        });

        if( !stillClearing) {
          if(!this.allDone ) {

            clearInterval(waitInterval);
            this.loadLevel();
            this.startGameLoop();
          } else {
            //ALL DONE
            clearInterval(waitInterval);
            this.loadEndScreen();
          }
        }
      }, 100)
    },

    gameLoop() {
      if( this.levelIsDone() ) {
        clearInterval(this.gameLoopInterval);
        console.log("END");
        this.levelEnded();
      }
    },

    turnLeft() {
      
  
      const tile = this.g as Tile;
      tile.sites.forEach( s => {
        if( s.atom?.type === Player.TYPE_DEF ) {
          (s.atom.elem as Player).slightLeft();
        }
      })
    },

    turnRight() {
      const tile = this.g as Tile;
      tile.sites.forEach( s => {
        if( s.atom?.type === Player.TYPE_DEF ) {
          (s.atom.elem as Player).slightRight();
        }
      })
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
    actualLevel() {
      return this.currentLevel+1;
    },
    totalLevels() {
      return Levels.length;
    }
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
