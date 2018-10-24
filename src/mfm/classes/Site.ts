import { Tile } from "./Tile";
import { MFMUtils } from "../utils/utils";
import { GridCoord } from "../interfaces/IGridCoord";
import { Atom } from "./Atom";

export class Site {
  tile: Tile;
  id: string;
  tilePos: GridCoord;
  atom: Atom;

  constructor(_tile: Tile, _pos: GridCoord) {
    this.tile = _tile;
    this.tilePos = _pos;
    this.id = MFMUtils.CtoID(this.tilePos);
  }
}
