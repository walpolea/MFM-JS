import { Site } from "./Site";
import { GridCoord } from "../interfaces/IGridCoord";
import { MFMUtils } from "../utils/utils";

export class Tile {
  gridPos: GridCoord;
  width: number;
  height: number;
  id: string;

  sites: Map<GridCoord, Site>;

  constructor(_pos: GridCoord, _width: number = 50, _height: number = 50) {
    this.gridPos = _pos;
    this.width = _width;
    this.height = _height;
    this.id = MFMUtils.CtoID(this.gridPos);

    this.create();
  }

  getSiteByCoord(c: GridCoord): Site {
    return;
  }

  create() {
    this.sites = new Map<GridCoord, Site>();

    for (let i: number = 0; i < this.width; i++) {
      //across columns
      for (let j: number = 0; j < this.height; j++) {
        //down rows
        let gc: GridCoord = { row: j, col: i };
        this.sites.set(gc, new Site(this, gc));
      }
    }
  }
}
