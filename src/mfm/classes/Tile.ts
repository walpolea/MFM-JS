import { Site } from "./Site";
import { GridCoord } from "../interfaces/IGridCoord";

export class Tile {
  width: number;
  height: number;
  sites: Site[];

  constructor(_width: number = 1, _height: number = 1) {
    this.width = _width;
    this.height = _height;

    this.create();
  }

  getSiteByCoord(c: GridCoord): Site {
    return;
  }

  create() {
    this.sites = new Array<Site>();

    for (let i: number = 0; i < this.width; i++) {
      //across columns
      for (let j: number = 0; j < this.height; j++) {
        //down rows
        this.sites.push(new Site({ row: j, col: i }));
      }
    }
  }
}
