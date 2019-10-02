import { Site } from "../mfm/classes/Site";
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
    this.visual.interactive = true;
    this.visual.scale = new PIXI.Point(this.siteSize / 14, this.siteSize / 14);
    this.visual.x = this.site.tilePos.col * (this.siteSize + this.siteSpacing);
    this.visual.y = this.site.tilePos.row * (this.siteSize + this.siteSpacing);

    this.update();
  }

  update() {

    if (!this.site.atom.data) {
      this.visual.tint = this.site.atom.elem.color;
      return;
    }


    if (this.site.atom.data && this.site.atom.data.value) {
      this.visual.tint = this.rgbToHex((this.site.atom.data.value) * 5, (this.site.atom.data.value) * 5, (this.site.atom.data.value) * 5);
    }

  }

  rgbToHex(r: number, g: number, b: number) {
    return ((1 << 24) + (r << 16) + (g << 8) + b);
  }
}
