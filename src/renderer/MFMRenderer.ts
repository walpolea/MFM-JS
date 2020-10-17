///<reference types="pixi.js"/>

import { ParticleContainer, Container, Texture, Sprite, Application, utils, Point, Rectangle, TYPES } from "pixi.js";
import "../mfm/ElementIncludes";
import { Tile } from "../mfm/core/Tile";
import { EventWindow } from "../mfm/core/EventWindow";
import { Site } from "../mfm/core/Site";
import { SiteRenderer } from "./SiteRenderer";
import { Atom } from "../mfm/core/Atom";
import { Mason } from "../mfm/elements/MasonElement";
import { GridCoord } from "../mfm/core/IGridCoord";
import { Empty } from "../mfm/elements/EmptyElement";
import { SwapWorm } from "../mfm/elements/SwapWormElement";
import { StickyMembrane } from "../mfm/elements/StickyMembraneElement";
import { Res } from "../mfm/elements/ResElement";
import { DReg } from "../mfm/elements/DRegElement";
import { Wall } from "../mfm/elements/WallElement";
import { ForkBomb } from "../mfm/elements/ForkBombElement";
import { SuperForkBomb } from "../mfm/elements/SuperForkBomb";
import { AntiForkBomb } from "../mfm/elements/AntiForkBombElement";
import { Sentry } from "../mfm/elements/SentryElement";
import { Data } from "../mfm/elements/DataElement";
import { Reducer } from "../mfm/elements/ReducerElement";
import { LoopWorm } from "../mfm/elements/LoopWormElement";
import { LoopSeed } from "../mfm/elements/LoopSeedElement";
import { Writer } from "../mfm/elements/WriterElement";
import { SortMaster } from "../mfm/elements/SortMasterElement";
import { OnewayDoor } from "../mfm/elements/OnewayDoorElement";
import { IElementType } from "../mfm/core/IElementType";
import { Player } from "../mfm/elements/game/Player";

export class MFMRenderer {
  static SITE_TEXTURE: Texture = Texture.from("/resources/element.png");
  appX: number = 800;
  appY: number = 800;
  selectedSite: Site;
  timeSpeed: number = 5000;
  siteSize: number = 8;
  siteSpacing: number = 0;
  gridOffset: number = 10;
  srContainer: ParticleContainer = new ParticleContainer(50000, { tint: true });
  siteRenderers: Map<Sprite, SiteRenderer> = new Map<Sprite, SiteRenderer>();
  rendererMap: Map<Site, SiteRenderer> = new Map<Site, SiteRenderer>();
  container: Element;
  keysHeld: Set<string>;
  pointerDown: boolean = false;
  shouldRender: boolean = true;
  clickArea: Container;
  curSelectedElement: string;
  curSelectedElementFunction: Function;
  webGLSupported: boolean = utils.isWebGLSupported();
  mouseEnabled: boolean = true;

  ewCache: Map<GridCoord, EventWindow> = new Map<GridCoord, EventWindow>();

  customSequence: string;

  tile: Tile;

  pixiapp: Application;

  constructor(_tile: Tile, _container: Element, appX: number = 800, appY: number = 800, _mouseEnabled: boolean = true) {
    this.tile = _tile;
    this.container = _container;
    this.appX = appX;
    this.appY = appY;
    this.mouseEnabled = _mouseEnabled;
    this.siteSize = this.appX / this.tile.width;

    console.log(this.siteSize * this.tile.width);

    this.init();
  }

  deconstruct() {
    this.srContainer.destroy();
    this.ewCache.clear();
    this.siteRenderers.clear();
    this.rendererMap.clear();
    this.pixiapp.stop();
    this.pixiapp.destroy(true);
  }

  killAll() {
    this.tile.sites.forEach((site) => {
      site.die();
      this.rendererMap.get(site).update();
    });
  }

  killType(type: IElementType) {
    Array.from(this.tile.sites.values())
      .filter((site: Site) => site?.atom?.type.name !== Empty.BASE_TYPE.name)
      .forEach((site: Site) => {
        if (site?.atom?.type.name == type.name) {
          site.die();
          this.rendererMap.get(site).update();
        }
      });
  }

  init() {
    this.keysHeld = new Set<string>();

    this.pixiapp = new Application({
      width: this.appX,
      height: this.appY,
      antialias: false,
      transparent: false,
      backgroundColor: 0x222222,
      resolution: 1,
    });

    this.srContainer.x = 0; //this.gridOffset;
    this.srContainer.y = 0; //his.gridOffset;
    this.pixiapp.stage.addChild(this.srContainer);

    this.clickArea = new Container();
    this.clickArea.hitArea = new Rectangle(0, 0, this.appX, this.appY);
    this.clickArea.interactive = true;
    this.pixiapp.stage.addChild(this.clickArea);

    this.clickArea.on("pointerdown", (e: PIXI.InteractionEvent) => {
      this.pointerDown = true;
      this.handleClick(e);
    });

    this.clickArea.on("pointerup", (e: PIXI.InteractionEvent) => {
      this.pointerDown = false;
    });

    this.clickArea.on("pointermove", this.handleClick, this);

    document.addEventListener("keydown", (key: any) => {
      this.onKeyDown(key);
    });
    document.addEventListener("keyup", (key: any) => {
      this.onKeyUp(key);
    });

    this.initSites();

    console.log("added game loop");
    this.pixiapp.ticker.add((delta: number) => this.gameLoop(delta));
    this.container.appendChild(this.pixiapp.view);
  }

  initSites() {
    let sitesArray: Site[] = Array.from(this.tile.sites.values());
    let siteLen: number = sitesArray.length;
    let site: Site;

    for (let i = 0; i < siteLen; i++) {
      site = sitesArray[i];
      let sr: SiteRenderer = new SiteRenderer(site, this.siteSize, this.siteSpacing, MFMRenderer.SITE_TEXTURE);

      this.srContainer.addChild(sr.visual);
      this.siteRenderers.set(sr.visual, sr);
      this.rendererMap.set(site, sr);

      //cached event windows ++
      this.ewCache.set(site.tilePos, new EventWindow(this.tile, site.tilePos));
    }
  }

  gameLoop(delta: number) {
    // console.log("CM", Array.from(this.tile.sites).filter((s) => s[1]?.atom?.type == CellMembrane.BASE_TYPE).length);
    let ew: EventWindow,
      renders: Set<SiteRenderer> = new Set<SiteRenderer>(),
      i = 0,
      j = 0;

    for (i; i < this.timeSpeed; i++) {
      //get a random cached event window
      ew = this.ewCache.get(this.tile.getRandomSite().tilePos);

      //if the window exists and origin is not an empty site
      if (ew.window && !ew.origin.atom?.is(Empty.BASE_TYPE)) {
        //element behaves
        ew.origin.atom.exec(ew);

        if (this.shouldRender) {
          const allSites = ew.getAll(),
            len = allSites.length;
          for (j = 0; j < len; j++) {
            if (allSites[j]) renders.add(this.rendererMap.get(allSites[j]));
          }
        }
      }
    }

    if (this.shouldRender) {
      const arr = [...renders],
        len = arr.length;
      let k = 0;

      for (k; k < len; k++) {
        arr[k].update();
      }
    }
  }

  onKeyDown(key: any) {
    this.keysHeld.add(key.key);

    if (key.key === "ArrowRight") {
      this.tile.sites.forEach((s) => {
        if (s.atom?.is(Player.BASE_TYPE) || s.atom?.is(SwapWorm.BASE_TYPE)) {
          (s.atom.elem as Player).slightRight();
        }
      });
    }

    if (key.key === "ArrowLeft") {
      this.tile.sites.forEach((s) => {
        if (s.atom?.is(Player.BASE_TYPE) || s.atom?.is(SwapWorm.BASE_TYPE)) {
          (s.atom.elem as Player).slightLeft();
        }
      });
    }
  }

  onKeyUp(key: any) {
    this.keysHeld.delete(key.key);
    this.keysHeld.delete(key.key.toUpperCase());
  }

  getSiteFromCanvasXY(x: number, y: number): Site {
    //x = x - this.gridOffset; //+ this.siteSize * 0.5;
    //y = y - this.gridOffset; //+ this.siteSize * 0.5;

    x = (x / this.siteSize) >> 0;
    y = (y / this.siteSize) >> 0;

    return this.tile.getSiteByCoord({ row: y, col: x });
  }

  handleClick(e: PIXI.InteractionEvent) {
    if (this.mouseEnabled && this.pointerDown && e.target) {
      let p: Point = e.data.getLocalPosition(this.pixiapp.stage);
      let site: Site = this.getSiteFromCanvasXY(p.x, p.y); //this.siteRenderers.get(e.target as Sprite);
      this.selectedSite = site;

      if (site) {
        if (this.keysHeld.has("r")) {
          site.atom = Res.CREATE();
        } else if (this.keysHeld.has("t")) {
          site.atom = new Atom(DReg.BASE_TYPE);
        } else if (this.keysHeld.has("w")) {
          site.atom = new Atom(Wall.BASE_TYPE);
        } else if (this.keysHeld.has("z")) {
          site.atom = new Atom(Mason.BASE_TYPE, [Mason.boxPath(12)]);
        } else if (this.keysHeld.has("Z")) {
          site.atom = new Atom(Mason.BASE_TYPE, [Mason.boxPath(24)]);
        } else if (this.keysHeld.has("x")) {
          site.atom = new Atom(Mason.BASE_TYPE, [Mason.linePath(48, "E")]);
        } else if (this.keysHeld.has("c")) {
          site.atom = new Atom(Mason.BASE_TYPE, [Mason.linePath(48, "S")]);
        } else if (this.keysHeld.has("e")) {
          site.atom = new Atom(Empty.BASE_TYPE);
        } else if (this.keysHeld.has("b")) {
          site.atom = new Atom(ForkBomb.BASE_TYPE);
        } else if (this.keysHeld.has("B")) {
          site.atom = new Atom(SuperForkBomb.BASE_TYPE);
        } else if (this.keysHeld.has("a")) {
          site.atom = new Atom(AntiForkBomb.BASE_TYPE);
        } else if (this.keysHeld.has("s")) {
          site.atom = new Atom(Sentry.BASE_TYPE);
        } else if (this.keysHeld.has("d")) {
          const rval = (Math.random() * 40) >> 0;
          site.atom = Data.CREATE(undefined, {
            value: rval,
          });
        } else if (this.keysHeld.has("i")) {
          site.atom = new Atom(Reducer.BASE_TYPE);
        } else if (this.keysHeld.has("n")) {
          site.atom = new Atom(SwapWorm.BASE_TYPE, [7]);
        } else if (this.keysHeld.has("N")) {
          site.atom = new Atom(SwapWorm.BASE_TYPE, [16]);
        } else if (this.keysHeld.has("l")) {
          site.atom = new Atom(LoopWorm.BASE_TYPE, [7]);
        } else if (this.keysHeld.has("L")) {
          site.atom = new Atom(LoopWorm.BASE_TYPE, [16]);
        } else if (this.keysHeld.has("k")) {
          site.atom = new Atom(LoopSeed.BASE_TYPE);
        } else if (this.keysHeld.has("m")) {
          site.atom = new Atom(StickyMembrane.BASE_TYPE);
        } else if (this.keysHeld.has("u")) {
          site.atom = SortMaster.CREATE();
        } else if (this.keysHeld.has("q")) {
          console.log("DEBUG SITE:", site);
        } else if (this.keysHeld.has("C")) {
          site.atom = new Atom(Writer.BASE_TYPE, ["FIRST BE ROBUST  THEN AS CORRECT AS POSSIBLE  AND AS EFFICIENT AS NEEDED"]);
        } else if (this.keysHeld.has("1")) {
          site.atom = OnewayDoor.E_W();
        } else if (this.keysHeld.has("2")) {
          site.atom = OnewayDoor.N_S();
        } else if (this.keysHeld.has("3")) {
          site.atom = OnewayDoor.W_E();
        } else if (this.keysHeld.has("4")) {
          site.atom = OnewayDoor.S_N();
        } else if (this.keysHeld.has("5")) {
          site.atom = OnewayDoor.E_S();
        } else if (this.keysHeld.has("6")) {
          site.atom = OnewayDoor.N_E();
        } else if (this.keysHeld.has("7")) {
          site.atom = OnewayDoor.W_N();
        } else if (this.keysHeld.has("8")) {
          site.atom = OnewayDoor.S_W();
        } else if (this.keysHeld.has("9")) {
          site.atom = OnewayDoor.W_NE();
        } else if (this.keysHeld.has("0")) {
          site.atom = OnewayDoor.W_NS();
        } else {
          if (this.curSelectedElementFunction) {
            site.atom = this.curSelectedElementFunction();
          }
        }
      }

      if (site) {
        this.rendererMap.get(site).update();
      }
    }
  }
}
