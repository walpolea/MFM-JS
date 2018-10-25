import { Tile } from "./mfm/classes/Tile";
import * as p5 from "p5";
import { Site } from "./mfm/classes/Site";
import { ElementTypes } from "./mfm/classes/ElementTypes";
import { MFMUtils } from "./mfm/utils/utils";
import { DRegEl } from "./mfm/classes/elements/DRegElement";

let g: Tile = new Tile(20, 20);

console.log(g);
console.log(g.getRandomSite());
g.getRandomSite().atom.elem = new DRegEl();
g.getRandomSite().atom.elem = new DRegEl();
g.getRandomSite().atom.elem = new DRegEl();
g.getRandomSite().atom.elem = new DRegEl();

var sketch = (p: p5) => {
  let siteSize = 12;

  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(p.windowWidth - 50, p.windowHeight - 50);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth - 50, p.windowHeight - 50);
  };

  let drawGrid = (p: p5, t: Tile) => {
    p.push();
    p.translate(50, 50);
    t.sites.forEach((site: Site) => {
      switch (site.atom.elem.type) {
        case ElementTypes.EMPTY.type:
          p.fill(244);
          break;
        case ElementTypes.D_REG.type:
          p.fill(255, 32, 32);
          break;
      }
      p.stroke(0);
      p.ellipse(site.tilePos.col * siteSize, site.tilePos.row * siteSize, siteSize, siteSize);
    });
    p.pop();
  };

  let run = () => {
    for (var i = 0; i < 100; i++) {
      let ew = MFMUtils.GenerateEventWindow(g, g.width, g.height);
      //console.log(ew);
      ew.origin.exec(ew);
    }
  };

  p.draw = () => {
    p.background(100);
    drawGrid(p, g);

    run();
  };
};

let sketchP: p5 = new p5(sketch);
