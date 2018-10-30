import { Site } from "../mfm/classes/Site";
import * as PIXI from "pixi.js";

export class SiteRenderer {
  site: Site;
  siteSize: number;
  visual: PIXI.Sprite;
  graphics: PIXI.Graphics;

  constructor(_site: Site, _siteSize: number) {
    this.site = _site;
    this.siteSize = _siteSize;
    this.init();
  }

  init() {
    this.visual = PIXI.Sprite.fromImage("/resources/element.png");
    this.visual.interactive = true;
    this.visual.x = this.site.tilePos.col * this.siteSize;
    this.visual.y = this.site.tilePos.row * this.siteSize;
    // this.graphics = new PIXI.Graphics();

    // this.graphics.beginFill(this.site.atom.type.color);
    // this.graphics.drawCircle(
    //   this.site.tilePos.col * this.siteSize,
    //   this.site.tilePos.row * this.siteSize,
    //   this.siteSize * 0.5
    // );
    // this.graphics.endFill();

    // this.visual.addChild(this.graphics);
  }

  update() {
    this.visual.tint = this.site.atom.type.color;
  }
}
