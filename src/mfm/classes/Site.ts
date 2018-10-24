import { GridCoord } from "../interfaces/IGridCoord";
import { MFMUtils } from "../utils/utils";
import { Atom } from "./Atom";

export class Site {
  tilePos: GridCoord;
  width: number;
  height: number;
  id: string;

  atom: Atom;

  constructor(_pos: GridCoord, _width: number = 15, _height: number = 15) {
    this.tilePos = _pos;
    this.width = _width;
    this.height = _height;
    this.id = MFMUtils.CtoID(this.tilePos);

    this.create();
  }

  getAtomByCoord(c: GridCoord): Atom {
    return;
  }

  create() {
    this.atom = new Atom(this, this.tilePos);
  }
}
