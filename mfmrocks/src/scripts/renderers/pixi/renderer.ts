import { Sprite, Container, Application, Assets, Texture, Point, Rectangle, ObservablePoint, FederatedPointerEvent } from "pixi.js";
import { EventWindow, Site, Tile, ElementRegistry } from "mfm-js";
//@ts-ignore
import url from "./element.png";

export interface IRenderer {
  tile: Tile;
  render: Function;
  view;
}

export interface ISiteRenderer {}

export class PixiRenderer implements IRenderer {
  rendererWidth: number;
  rendererHeight: number;

  tile: Tile;
  tileWidth: number;
  tileHeight: number;
  totalSites: number;

  siteSize: number;
  siteTexture: Texture;//Texture.from(url);

  particleContainer: Container;
  pixiApplication: Application;

  siteVisuals: Map<Site, Sprite>;

  subdivisions: number = 1;
  gridDivisions: number[][];
  gridDivisionTotal: number;

  siteArray: Site[];

  renderSpeed: number = 1;
  fixedRenderSpeed: number = 1;
  renderMultiplier: number = 1;
  view;

  clickArea: Container;
  pointerDown: boolean = false;
  curSelectedElementFunction: Function;
  selectedSite: Site;
  mouseEnabled: boolean = true;
  brushSize: number = 1;

  constructor(t: Tile, rendererW: number, rendererH: number) {
    this.tile = t;

    this.rendererHeight = rendererH;
    this.rendererWidth = rendererW;

    this.tileWidth = this.tile.width;
    this.tileHeight = this.tile.height;
    this.totalSites = this.tileWidth * this.tileHeight;

    this.siteSize = ~~(this.maxValue(this.rendererHeight, this.rendererWidth) / this.maxValue(this.tileHeight, this.tileWidth));
    this.siteArray = Array.from(t.sites.values()).sort((s) => Math.random() - 0.5);
  }

  async init() {
    await this.initializePIXI();
    await this.initializeVisuals();

    const subs = this.calculateSubdivisions();
    this.setSubdivisions(subs);

    this.initializeClickArea();

    this.startRendering();
  }

  calculateSubdivisions(): number {
    let subs = Math.sqrt(this.tileWidth) * 0.25;

    if ((this.tileWidth / subs) % 1 !== 0) {
      subs = ~~subs;

      do {
        subs--;
      } while ((this.tileWidth / subs) % 1 !== 0);
    }

    if (subs < 1) {
      subs = 1;
    }

    return subs;
  }

  setSubdivisions(subs: number) {
    this.subdivisions = subs;
    this.createSubdivisions(this.subdivisions);
    this.setRenderMultiplier(this.renderMultiplier);
  }

  setRenderMultiplier(mult: number) {
    this.renderMultiplier = mult;
    this.renderSpeed = (this.totalSites / this.gridDivisions.length) * this.renderMultiplier;
    this.fixedRenderSpeed = this.totalSites * this.renderMultiplier;
  }

  async initializePIXI() {
    this.particleContainer = new Container({
      isRenderGroup:true
    });

    this.pixiApplication = new Application();
    
    await this.pixiApplication.init({
      width: this.rendererWidth,
      height: this.rendererHeight,
      antialias: false,
      backgroundAlpha: 0xffffff,
      backgroundColor: 0x222222,
      resolution: 1,
    });

    this.pixiApplication.stage.addChild(this.particleContainer);
    this.view = this.pixiApplication.canvas;
  }

  async initializeVisuals() {
    this.siteTexture = await Assets.load(url);
    const textureSize = 14; //this.siteTexture._frame.width;
    this.siteVisuals = new Map<Site, Sprite>();

    // Create the sprite and add it to the stage
    for (let i = 0; i < this.tileHeight; i++) {
      for (let j = 0; j < this.tileWidth; j++) {
        let viz = Sprite.from(this.siteTexture);
        viz.interactive = false;

        // viz.scale = new ObservablePoint(undefined, undefined, this.siteSize / textureSize, this.siteSize / textureSize);
        viz.scale = new Point(this.siteSize / textureSize, this.siteSize / textureSize) as ObservablePoint;

        viz.x = j * this.siteSize;
        viz.y = i * this.siteSize;
        // viz.cacheAsBitmap = true;

        
        viz.tint = this.tile.sites.get(`${i}:${j}`).atom.rd("color");
        this.particleContainer.addChild(viz);

        this.siteVisuals.set(this.tile.sites.get(`${i}:${j}`), viz);
      }
    }
  }

  createSubdivisions(subdivisions) {
    let ww = ~~(this.tileWidth / subdivisions);
    let wh = ~~(this.tileHeight / subdivisions);

    this.gridDivisions = new Array<Array<number>>();

    for (let row = 0; row < this.tileHeight; row += wh) {
      for (let col = 0; col < this.tileWidth; col += ww) {
        const rowmax = row + wh;
        const colmax = col + ww;

        this.gridDivisions.push([row, rowmax, col, colmax]);
      }
    }

    this.gridDivisionTotal = this.gridDivisions.length;
  }

  startRendering() {
    this.pixiApplication.ticker.add((delta) => {
      this.render();
    });
  }

  deconstruct() {
    Assets.load(url);
    this.particleContainer.destroy(true);
    this.pixiApplication.stop();
    this.pixiApplication.destroy(true);
  }

  render() {
    // console.time();

    let i = 0,
      j = 0,
      rs = this.fixedRenderSpeed;
    for (i; i < rs; i++) {
      const { atom, ew } = this.tile.getRandomSiteSeeded();
      atom.behave(ew);
    }

    for (j; j < this.totalSites; j++) {
      const s = this.siteArray[j];
      const v = this.siteVisuals.get(s);
      const color = s.atom.state.color;
      if (v.tint !== color) {
        v.tint = color;
      }
    }

    // console.timeEnd();
  }

  initializeClickArea() {
    this.clickArea = new Container();
    this.clickArea.hitArea = new Rectangle(0, 0, this.rendererWidth, this.rendererHeight);
    this.clickArea.interactive = true;
    this.pixiApplication.stage.addChild(this.clickArea);

    this.clickArea.on("pointerdown", (e) => {
      this.pointerDown = true;
      this.handleClick(e);
    });

    this.clickArea.on("pointerup", (e) => {
      this.pointerDown = false;
    });

    this.clickArea.on("pointermove", this.handleClick, this);
  }

  getSitesFromCanvasXY(x: number, y: number, size: number = 1): Site[] {
    let sites = new Array<Site>();
    const overSite = this.getSiteFromCanvasXY(x, y);
    if (!overSite) {
      return sites;
    }
    let sx = overSite.location.coordinate.x;
    let sy = overSite.location.coordinate.y;

    switch (size) {
      case 5:
        sites.push(...EventWindow.LAYER4.map((i) => overSite.ew.getSite(i)));
      case 4:
        sites.push(...EventWindow.LAYER3.map((i) => overSite.ew.getSite(i)));
      case 3:
        sites.push(...EventWindow.LAYER2.map((i) => overSite.ew.getSite(i)));
      case 2:
        sites.push(...EventWindow.LAYER1.map((i) => overSite.ew.getSite(i)));
      case 1:
        sites.push(overSite);
    }

    return sites.filter((s) => s);
  }

  getSiteFromCanvasXY(x: number, y: number): Site {
    x = (x / this.siteSize) >> 0;
    y = (y / this.siteSize) >> 0;

    return this.tile.getSiteByCoordinate({ x, y });
  }

  handleClick(e:FederatedPointerEvent) {
    if (this.mouseEnabled && this.pointerDown && e.target) {
      let p: Point = (this.pixiApplication.stage).toLocal(e.global);//e.data.getLocalPosition(this.pixiApplication.stage);
      let sites: Site[] = this.getSitesFromCanvasXY(p.x, p.y, this.brushSize);
      sites.forEach((site) => {
        this.addAtom(site);
      });
    }
  }

  addAtom(site: Site) {
    this.selectedSite = site;

    if (site && this.curSelectedElementFunction) {
      site.atom = this.curSelectedElementFunction();
    }
  }

  setAllAtoms( type = "EMPTY" ) {
    this.tile.sites.forEach( (s) => {
      s.atom = ElementRegistry.getType(type).CREATE();
    });
  }

  setAtomAt( x, y, type = "EMPTY", {params = undefined, state = undefined} = {} ) {
    this.tile.sites.get(`${y}:${x}`).atom = ElementRegistry.getType(type).CREATE(params, state);
  }

  setAtomicMap( map ) {

    this.setAllAtoms();

    map.atoms.forEach( atom => {

      if( atom.from && atom.to ) {
        const {from, to} = atom;

        const xdist = Math.abs(to.x - from.x);
        const ydist = Math.abs(to.y - from.y);

        const steps = Math.max(xdist, ydist);

        for( let i = 0; i < steps; i++ ) {
          const x = ~~(from.x + (xdist / steps) * i);
          const y = ~~(from.y + (ydist / steps) * i);

          this.setAtomAt( x, y, atom.t, atom?.settings );
        }

        this.setAtomAt(to.x, to.y, atom.t, atom?.settings );

      } else {
        const {x, y} = atom;
        this.setAtomAt(x, y, atom.t, atom?.settings );
      }
    });

    if( map.emitter ) {
      this.setAtomAt(map.emitter.x, map.emitter.y, map.emitter.t, map.emitter.settings);
    }

  }

  getAtomicMap( asString = false ) {
    const atoms = [];

    this.tile.sites.forEach( (s) => {
      if( !s.atom.is("EMPTY") ) {
        atoms.push({
          x: s.location.coordinate.x,
          y: s.location.coordinate.y,
          t: s.atom.TYPE.name,
          // settings: { params: {}, state: s.atom.state }
        });
      }
    });

    if( asString ) {
      return JSON.stringify(atoms);
    }

    return atoms;
  }

  minValue(v1, v2) {
    return v1 < v2 ? v1 : v2;
  }

  maxValue(v1, v2) {
    return v1 > v2 ? v1 : v2;
  }

  clear() {
    this.tile.clear();
  }
}
