import { GridCoord } from "../interfaces/IGridCoord";
import { MFMUtils } from "../utils/utils";
import { Atom } from "./Atom";

export class Site {
  tilePos: GridCoord;
  id: string;

  atom: Atom;

  constructor(_pos: GridCoord) {
    this.tilePos = _pos;
    this.id = MFMUtils.CtoID(this.tilePos);

    this.create();
  }

  swapAtoms(targetSite: Site) {
    [this.atom, targetSite.atom] = [targetSite.atom, this.atom];
  }

  create() {
    this.atom = new Atom();
  }
}
