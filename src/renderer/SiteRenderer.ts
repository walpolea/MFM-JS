import { Site } from "../mfm/core/Site";
import * as PIXI from "pixi.js";

export class SiteRenderer {
  site: Site;
  siteSize: number;
  siteSpacing: number;
  visual: PIXI.Sprite;

  constructor(_site: Site, _siteSize: number, _siteSpacing: number, _texture: PIXI.Texture) {
    this.site = _site;
    this.siteSize = _siteSize;
    this.siteSpacing = _siteSpacing;
    this.visual = new PIXI.Sprite(_texture);

    this.init();
  }

  init() {
    //this.visual = PIXI.Sprite.fromImage("/resources/element.png");
    this.visual.interactive = false;
    this.visual.scale = new PIXI.Point(this.siteSize / 14, this.siteSize / 14);
    this.visual.x = this.site.tilePos.col * (this.siteSize + this.siteSpacing);
    this.visual.y = this.site.tilePos.row * (this.siteSize + this.siteSpacing);

    this.update();

    this.visual.cacheAsBitmap = true;
  }

  update() {
    if (this.visual.tint !== this.site.atom.elem.color) {
      this.visual.tint = this.site.atom.elem.color;
    }
  }
}
