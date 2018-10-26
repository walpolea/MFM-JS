import { Site } from "./Site";
import { GridCoord } from "../interfaces/IGridCoord";
import { MFMUtils } from "../utils/utils";

export class Tile {
  width: number;
  height: number;
  sites: Map<string, Site>;

  constructor(_width: number = 1, _height: number = 1) {
    this.width = _width;
    this.height = _height;
    this.create();
  }

  getSiteByCoord(c: GridCoord): Site {
    return this.sites.get(MFMUtils.CtoID(c));
  }

  getRandomSite(): Site {
    let rr = (Math.random() * this.height) >> 0;
    let rc = (Math.random() * this.width) >> 0;
    return this.sites.get(`${rr}:${rc}`);
  }

  create() {
    this.sites = new Map<string, Site>();

    for (let i: number = 0; i < this.width; i++) {
      //across columns
      for (let j: number = 0; j < this.height; j++) {
        //down rows
        this.sites.set(`${j}:${i}`, new Site({ row: j, col: i }));
      }
    }
  }
}
