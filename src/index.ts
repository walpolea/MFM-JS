import { Tile } from "./mfm/classes/Tile";
import { Site } from "./mfm/classes/Site";
import { ElementTypes, IElementType } from "./mfm/classes/ElementTypes";
import { MFMUtils } from "./mfm/utils/utils";
import { Atom } from "./mfm/classes/Atom";

declare var p5: any;

let g: Tile = new Tile(48, 48);

var sketch = (p: any) => {
  let siteSize = 14;
  let gridOffset = 20;

  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(700, 700);
  };

  //   p.windowResized = () => {
  //     p.resizeCanvas(p.windowWidth - 50, p.windowHeight - 50);
  //   };

  //Establish the elment colors here
  let colors: Map<IElementType, any> = new Map<IElementType, any>();
  colors.set(ElementTypes.EMPTY, p.color(32, 32, 32, 127));
  colors.set(ElementTypes.DREG, p.color(255, 32, 32));
  colors.set(ElementTypes.RES, p.color(32, 255, 64));
  colors.set(ElementTypes.WALL, p.color(32, 32, 255));
  colors.set(ElementTypes.MASON, p.color(32, 255, 255));
  colors.set(ElementTypes.FORK_BOMB, p.color(170, 32, 32));

  let drawGrid = (p: any, t: Tile) => {
    p.push();
    p.translate(gridOffset, gridOffset);
    t.sites.forEach((site: Site) => {
      p.stroke(0, 0, 0, 0);
      p.fill(colors.get(site.atom.type));
      p.ellipse(site.tilePos.col * siteSize, site.tilePos.row * siteSize, siteSize, siteSize);
    });
    p.pop();
  };

  let run = () => {
    let speed = 1000;
    for (var i = 0; i < speed; i++) {
      let ew = MFMUtils.GenerateEventWindow(g, g.width, g.height);
      ew.origin.atom.exec(ew);
    }
  };

  let getSiteFromCanvasXY = (x: number, y: number): Site => {
    x = x - gridOffset + siteSize * 0.5;
    y = y - gridOffset + siteSize * 0.5;

    x = (x / siteSize) >> 0;
    y = (y / siteSize) >> 0;

    return g.getSiteByCoord({ row: y, col: x });
  };

  p.draw = () => {
    p.background(100);
    drawGrid(p, g);

    run();
  };

  let handleClick = () => {
    let site: Site = getSiteFromCanvasXY(p.mouseX, p.mouseY);
    if (site) {
      if (p.keyIsPressed) {
        switch (p.keyCode) {
          case 114: //r
            site.atom = new Atom(ElementTypes.RES);
            break;
          case 119: //w
            site.atom = new Atom(ElementTypes.WALL);
            break;
          case 113: //q
            site.atom = new Atom(ElementTypes.MASON);
            break;
          case 101: //e
            site.atom = new Atom(ElementTypes.EMPTY);
            break;
          case 98: //b
            site.atom = new Atom(ElementTypes.FORK_BOMB);
            break;
        }
      } else {
        site.atom = new Atom(ElementTypes.DREG);
      }
    }
  };
  p.mouseDragged = handleClick;
  p.mouseClicked = handleClick;
};

let sketchP: any = new p5(sketch);
