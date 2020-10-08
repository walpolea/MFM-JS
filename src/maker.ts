import { Tile } from "./mfm/core/Tile";
import { MFMRenderer } from "./renderer/MFMRenderer";
import { ElementIncludes } from "./mfm/ElementIncludes";
import { Goal } from "./mfm/core/elements/game/Goal";
import { MembraneWall } from "./mfm/core/elements/MembraneWallElement";
import { Site } from "./mfm/core/Site";
import { Enemy } from "./mfm/core/elements/game/Enemy";
import { Player } from "./mfm/core/elements/game/Player";
import { Clearer } from "./mfm/core/elements/game/Clearer";
import { loadLevel } from "./mfm/core/elements/game/Levels";
import { PlayerEmitter } from "./mfm/core/elements/game/PlayerEmitter";
import { FlyingEnemy } from "./mfm/core/elements/game/FlyingEnemy";
import { Wall } from "./mfm/core/elements/WallElement";
import { Dirt } from "./mfm/core/elements/game/Dirt";
import { EventWindow } from "./mfm/core/EventWindow";
import { Water } from "./mfm/core/elements/WaterElement";
import { Sand } from "./mfm/core/elements/SandElement";
import { SwapWorm } from "./mfm/core/elements/SwapWormElement";

declare var Vue: any;
declare var Howl: any;

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
      currentLevel: 0 as number,
      gameLoopInterval: undefined as number,
      totalScore: 0 as number,
      isStarted: false as boolean,
      allDone: false as boolean,
      isCountdown: false as boolean,
      countDownEnded: false as boolean,
      countdownTimer: 0 as number,
      backgroundMusic: undefined as any,
      endingMusic: undefined as any,
      levelData: "[]" as string,
      levelEndSound: new Howl({
        src: ["/gameFiles/levelend.mp3"],
        autoplay: false,
        loop: false,
        volume: 0.08,
      }),
      clockTick: new Howl({
        src: ["/gameFiles/tick.wav"],
        autoplay: false,
        loop: false,
        volume: 0.1,
      }),
    };
  },
  mounted() {
    const params = this.getParams(window.location.href);

    this.backgroundMusic = new Howl({
      src: ["/gameFiles/Dreaming.ogg"],
      autoplay: true,
      loop: true,
      volume: 0.2,
    });

    this.backgroundMusic.play();

    this.initTile();
  },
  methods: {
    initTile() {
      this.g = new Tile(this.gridCols, this.gridRows);

      this.mfmRenderer = new MFMRenderer(this.g, document.querySelector("#mfm"), 1600, 800, true);

      this.mfmRenderer.timeSpeed = this.timeSpeed ? this.timeSpeed : 5000;
      this.curSelectedElement = this.curSelectedElement ? this.curSelectedElement : "Enemy";
      this.curSelectedFunc = this.curSelectedFunc ? this.curSelectedFunc : Enemy.CREATE;
      this.selectElement(this.curSelectedElement, this.curSelectedFunc);
    },

    toggleGridSpeed() {
      this.timeSpeed = this.timeSpeed ? 0 : 5000;
    },

    startGame() {
      this.totalScore = 0;
      this.g.mouseEnabled = false;
      this.storeLevel();
      this.loadLevel();
      this.isStarted = true;
      this.timeSpeed = 5000;
      this.startGameLoop();
    },

    stopGame() {
      this.g.mouseEnabled = true;
      clearInterval(this.gameLoopInterval);
      this.isStarted = false;
      this.loadLevelToEdit();
    },

    startGameLoop() {
      clearInterval(this.gameLoopInterval);
      this.gameLoopInterval = setInterval(this.gameLoop, 100);
    },

    ///COUNTDOWN

    startCountdown() {
      console.log("start countdown");
      if (this.isCountdown && !this.countdownEnded) {
        this.countdownTimer = 30;
        this.tickCountdown();
      }
    },
    tickCountdown() {
      console.log("tick countdown");

      this.countdownTimer -= 1;
      if (this.isCountdown && this.countdownTimer > 0) {
        if (this.countdownTimer < 10) {
          this.clockTick.play();
        }
        setTimeout(this.tickCountdown, 1000);
      }
    },

    loadLevel() {
      loadLevel(this.g, JSON.parse(this.levelData));
    },
    loadLevelToEdit() {
      const editData = JSON.parse(this.levelData);
      editData.atoms.forEach((a: any) => {
        if (a.e === "PLAYER EMITTER" && a.params) {
          a.params[3] = false;
        }
      });
      loadLevel(this.g, editData);
    },

    storeLevel() {
      let atoms: any[] = [];

      const tile = this.g as Tile;
      tile.sites.forEach((s) => {
        switch (s.atom?.type) {
          case Dirt.TYPE_DEF:
          case Wall.TYPE_DEF:
          case MembraneWall.TYPE_DEF:
          case Enemy.TYPE_DEF:
          case FlyingEnemy.TYPE_DEF:
          case Goal.TYPE_DEF:

          case Sand.TYPE_DEF:
          case Water.TYPE_DEF:
            atoms.push({
              e: s.atom.type.name,
              gp: s.tilePos,
            });
            break;
          case PlayerEmitter.TYPE_DEF:
            atoms.push({
              e: s.atom.type.name,
              gp: s.tilePos,
              params: [EventWindow.ADJACENT8WAY, 10, 10, true],
            });
            break;
          case SwapWorm.TYPE_DEF:
            if ((s.atom.elem as SwapWorm).isAtHead()) {
              atoms.push({
                e: s.atom.type.name,
                gp: s.tilePos,
              });
            }
            break;
        }
      });

      console.log(JSON.stringify({ atoms }));
      this.levelData = JSON.stringify({ atoms });
    },
    levelIsDone(): boolean {
      const tile = this.g as Tile;
      let isDone = true;

      if (this.isCountdown && this.countdownTimer <= 0) {
        return true;
      }

      tile.sites.forEach((s) => {
        if (s.atom.type == Player.TYPE_DEF || s.atom.type === PlayerEmitter.TYPE_DEF) {
          isDone = false;
        }

        if (!this.countDownEnded && !this.isCountdown && s.atom.type === Goal.TYPE_DEF && (s.atom.elem as Goal).rescued > 0) {
          this.isCountdown = true;
          this.startCountdown();
        }
      });

      return isDone;
    },

    levelEnded() {
      this.levelEndSound.play();

      let goalCount = 0;
      const tile = this.g as Tile;

      this.countDownEnded = false;
      this.isCountdown = false;
      clearInterval(this.gameLoopInterval);

      tile.sites.forEach((s: Site) => {
        if (s.atom.type === Goal.TYPE_DEF) {
          goalCount += (s.atom.elem as Goal).rescued;
        }
      });

      tile.getRandomSite().atom = Clearer.CREATE();

      if (goalCount > 0) {
        this.totalScore += goalCount;
      }

      const waitInterval: any = setInterval(() => {
        let stillClearing: boolean = false;
        tile.sites.forEach((s: Site) => {
          if (s.atom.type === Clearer.TYPE_DEF) {
            stillClearing = true;
          }
        });

        if (!stillClearing) {
          if (!this.allDone) {
            clearInterval(waitInterval);
            this.stopGame();
          } else {
            //ALL DONE
            clearInterval(waitInterval);
          }
        }
      }, 100);
    },

    gameLoop() {
      if (this.levelIsDone()) {
        console.log("END");
        this.levelEnded();
      }
    },

    turnLeft() {
      const tile = this.g as Tile;
      tile.sites.forEach((s) => {
        if (s.atom?.type === Player.TYPE_DEF) {
          (s.atom.elem as Player).slightLeft();
        }
        // else if(s.atom?.type === SwapWorm.TYPE_DEF && (s.atom.elem as SwapWorm).isAtHead()) {
        //   (s.atom.elem as SwapWorm).slightLeft();
        // }
      });
    },

    turnRight() {
      const tile = this.g as Tile;
      tile.sites.forEach((s) => {
        if (s.atom?.type === Player.TYPE_DEF) {
          (s.atom.elem as Player).slightRight();
        }
        // else if(s.atom?.type === SwapWorm.TYPE_DEF && (s.atom.elem as SwapWorm).isAtHead()) {
        //   (s.atom.elem as SwapWorm).slightRight();
        // }
      });
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
    typeMap(): Map<string, [string, Function][]> {
      return ElementIncludes.ELEMENT_MENU_MAP;
    },
    editorElements() {
      return Array.from(ElementIncludes.ELEMENT_MENU_MAP.values())
        .flat()
        .filter((e) => {
          const name = e[0];
          console.log(name);
          switch (name) {
            case "PlayerEmitter":
            case "Goal":
            case "Enemy":
            case "FlyingEnemy":
            case "Clearer":
            case "Dirt":
            case "Dirt HLine":
            case "Dirt VLine":
            case "Wall":
            case "MembraneWall":
            case "Sand":
            case "Water":
            case "SwapWorm":
            case "Empty":
              return true;
              break;
          }
          return false;
        });
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
