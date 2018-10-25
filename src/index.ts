import { Tile } from "./mfm/classes/Tile";
import { Site } from "./mfm/classes/Site";
import { ElementTypes } from "./mfm/classes/ElementTypes";
import { MFMUtils } from "./mfm/utils/utils";
import { DRegElement } from "./mfm/classes/elements/DRegElement";
import { Atom } from "./mfm/classes/Atom";

declare var p5: any;

let g: Tile = new Tile(32, 32);

var sketch = (p: any) => {
  let siteSize = 14;
  let gridOffset = 25;

  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(700, 700);
  };

  //   p.windowResized = () => {
  //     p.resizeCanvas(p.windowWidth - 50, p.windowHeight - 50);
  //   };

  let drawGrid = (p: any, t: Tile) => {
    p.push();
    p.translate(gridOffset, gridOffset);
    t.sites.forEach((site: Site) => {
      switch (site.atom.elem.type) {
        case ElementTypes.EMPTY.type:
          p.stroke(0, 0, 0, 0);
          p.fill(32, 32, 32, 127);
          break;
        case ElementTypes.DREG.type:
          p.stroke(0, 0, 0, 127);
          p.fill(255, 32, 32);
          break;
        case ElementTypes.RES.type:
          p.stroke(0, 0, 0, 127);
          p.fill(32, 255, 64);
          break;
      }

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

    x = Math.floor(x / siteSize);
    y = Math.floor(y / siteSize);

    return g.getSiteByCoord({ row: y, col: x });
  };

  p.draw = () => {
    p.background(100);
    drawGrid(p, g);

    run();
  };

  p.mouseClicked = () => {
    let site: Site = getSiteFromCanvasXY(p.mouseX, p.mouseY);
    if (site) site.atom = new Atom(ElementTypes.DREG);
  };
};

let sketchP: any = new p5(sketch);
