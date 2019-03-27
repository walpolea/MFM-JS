import { Site } from "../mfm/classes/Site";
import * as PIXI from "pixi.js";
import { ElementTypes } from "../mfm/classes/ElementTypes";
import { SwapWormElement } from "../mfm/classes/elements/SwapWormElement";
import { SuperSwapWormElement } from "../mfm/classes/elements/SuperSwapWormElement";

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

    if( this.site.atom.type === ElementTypes.SWAPWORM ) {
      
      switch( (this.site.atom.elem as SwapWormElement).segmentType ) {
        case "SWAPPER":
          this.visual.tint = 0xfe7f9c;
        break;
        case "HEAD":
          this.visual.tint = 0xccffff;
          break;
        case "END":
          this.visual.tint = 0xff33ff;
        break;
        default:
          this.visual.tint = this.site.atom.type.color;
        break;
      }
    } else if( this.site.atom.type === ElementTypes.SUPERSWAPWORM ) {
      
      switch( (this.site.atom.elem as SuperSwapWormElement).segmentType ) {
        case "SWAPPER":
          this.visual.tint = 0xfe7f9c;
        break;
        case "HEAD":
          this.visual.tint = 0xccffff;
          break;
        case "END":
          this.visual.tint = 0xff33ff;
        break;
        default:
          this.visual.tint = this.site.atom.type.color;
        break;
      }
    } else {

      this.visual.tint = this.site.atom.type.color;

    }
    
  }
}
