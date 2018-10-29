import { Tile } from "./mfm/classes/Tile";
import { Site } from "./mfm/classes/Site";
import { ElementTypes, IElementType } from "./mfm/classes/ElementTypes";
import { MFMUtils } from "./mfm/utils/utils";
import { Atom } from "./mfm/classes/Atom";
import { MasonElement } from "./mfm/classes/elements/MasonElement";
import { EventWindow } from "./mfm/classes/Eventwindow";

declare var p5: any;
declare var Vue: any;

let app = new Vue({
  el: "#app",
  data: function() {
    return {
      timeSpeed: 2304 as number,
      gridOffset: 20 as number,
      siteSize: 14 as number,
      colors: undefined as Map<IElementType, any>,
      sketch: undefined as any,
      p: undefined as any,
      g: undefined as Tile
    };
  },
  mounted() {
    this.g = new Tile(48, 48);
    this.sketch = this.initMFM;
  },
  methods: {
    initMFM(p: any) {
      this.p = p;
      this.colors = new Map<IElementType, any>();
      this.colors.set(ElementTypes.EMPTY, p.color(64, 64, 64));
      this.colors.set(ElementTypes.DREG, p.color(255, 32, 32));
      this.colors.set(ElementTypes.RES, p.color(32, 255, 64));
      this.colors.set(ElementTypes.WALL, p.color(32, 32, 255));
      this.colors.set(ElementTypes.MASON, p.color(32, 255, 255));
      this.colors.set(ElementTypes.FORK_BOMB, p.color(170, 32, 32));
      this.colors.set(ElementTypes.ANTI_FORK_BOMB, p.color(127, 127, 32));
      this.colors.set(ElementTypes.SENTRY, p.color(127, 127, 255));

      this.p.preload = () => {};

      this.p.setup = () => {
        this.p.createCanvas(700, 700);
      };

      this.p.draw = () => {
        this.p.background(50);

        this.run();
        this.drawGrid(this.g);
      };

      this.p.mouseDragged = this.handleClick;
      this.p.mouseClicked = this.handleClick;
    },

    run() {
      let ew: EventWindow;
      for (var i = 0; i < this.timeSpeed; i++) {
        ew = MFMUtils.GenerateEventWindow(this.g, this.g.width, this.g.height);
        ew.origin.atom.exec(ew);
      }
    },
    drawGrid(t: Tile) {
      //this.p.push();
      //this.p.translate(this.gridOffset, this.gridOffset);
      let sitesArray: Site[] = Array.from(t.sites.values());
      let siteLen: number = sitesArray.length;
      let site: Site;
      for (let i = 0; i < siteLen; i++) {
        site = sitesArray[i];
        this.p.noStroke();
        this.p.fill(this.colors.get(site.atom.type));

        this.p.ellipse(
          site.tilePos.col * this.siteSize + this.gridOffset,
          site.tilePos.row * this.siteSize + this.gridOffset,
          this.siteSize,
          this.siteSize
        );
      }
    },
    getSiteFromCanvasXY(x: number, y: number): Site {
      x = x - this.gridOffset + this.siteSize * 0.5;
      y = y - this.gridOffset + this.siteSize * 0.5;

      x = (x / this.siteSize) >> 0;
      y = (y / this.siteSize) >> 0;

      return this.g.getSiteByCoord({ row: y, col: x });
    },
    handleClick() {
      let site: Site = this.getSiteFromCanvasXY(this.p.mouseX, this.p.mouseY);

      if (site) {
        if (this.p.keyIsPressed) {
          switch (this.p.keyCode) {
            case 114: //r
              site.atom = new Atom(ElementTypes.RES);
              break;
            case 119: //w
              site.atom = new Atom(ElementTypes.WALL);
              break;
            case 90: //Z
              site.atom = new Atom(ElementTypes.MASON, [MasonElement.boxPath(24)]);
              break;
            case 122: //z
              site.atom = new Atom(ElementTypes.MASON, [MasonElement.boxPath(12)]);
              break;
            case 120: //x
              site.atom = new Atom(ElementTypes.MASON, [MasonElement.linePath(48, "E")]);
              break;
            case 99: //c
              site.atom = new Atom(ElementTypes.MASON, [MasonElement.linePath(48, "S")]);
              break;
            case 101: //e
              site.atom = new Atom(ElementTypes.EMPTY);
              break;
            case 98: //b
              site.atom = new Atom(ElementTypes.FORK_BOMB);
              break;
            case 97: //a
              site.atom = new Atom(ElementTypes.ANTI_FORK_BOMB);
              break;
            case 115: //s
              site.atom = new Atom(ElementTypes.SENTRY);
              break;
          }
        } else {
          site.atom = new Atom(ElementTypes.DREG);
        }
      }
    }
  }
});

let sketchP: any = new p5(app.sketch, document.querySelector("#mfm"));
