import { Tile } from "./mfm/classes/Tile";
import { Site } from "./mfm/classes/Site";
import { ElementTypes } from "./mfm/classes/ElementTypes";
import { MFMUtils } from "./mfm/utils/utils";
import { DRegElement } from "./mfm/classes/elements/DRegElement";

declare var p5: any;

let g: Tile = new Tile(30, 30);

console.log(g);
console.log(g.getRandomSite());
g.getRandomSite().atom.elem = new DRegElement();
g.getRandomSite().atom.elem = new DRegElement();
g.getRandomSite().atom.elem = new DRegElement();
g.getRandomSite().atom.elem = new DRegElement();

var sketch = (p: any) => {
  let siteSize = 12;

  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(600, 600);
  };

  //   p.windowResized = () => {
  //     p.resizeCanvas(p.windowWidth - 50, p.windowHeight - 50);
  //   };

  let drawGrid = (p: any, t: Tile) => {
    p.push();
    p.translate(50, 50);
    t.sites.forEach((site: Site) => {
      switch (site.atom.elem.type) {
        case ElementTypes.EMPTY.type:
          p.fill(32);
          break;
        case ElementTypes.DREG.type:
          p.fill(255, 32, 32);
          break;
        case ElementTypes.RES.type:
          p.fill(32, 255, 64);
          break;
      }
      p.stroke(0);
      p.ellipse(site.tilePos.col * siteSize, site.tilePos.row * siteSize, siteSize, siteSize);
    });
    p.pop();
  };

  let run = () => {
    let speed = 2500;
    for (var i = 0; i < speed; i++) {
      let ew = MFMUtils.GenerateEventWindow(g, g.width, g.height);
      ew.origin.atom.exec(ew);
    }
  };

  p.draw = () => {
    p.background(100);
    drawGrid(p, g);

    run();
  };
};

let sketchP: any = new p5(sketch);
