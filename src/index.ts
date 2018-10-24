import { Tile } from "./mfm/classes/Tile";
import * as p5 from "p5";
import { Site } from "./mfm/classes/Site";

let g: Tile = new Tile(10, 10);
console.log(g);

var sketch = (p: p5) => {
  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(p.windowWidth - 50, p.windowHeight - 50);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth - 50, p.windowHeight - 50);
  };

  p.draw = () => {
    p.background(100);
    p.push();
    p.translate(50, 50);
    g.sites.forEach((site: Site) => {
      p.ellipse(site.tilePos.col * site.width, site.tilePos.row * site.height, site.width, site.height);
    });
  };
};

let sketchP: p5 = new p5(sketch);
