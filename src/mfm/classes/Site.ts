import { GridCoord } from "../interfaces/IGridCoord";
import { MFMUtils } from "../utils/utils";
import { Atom } from "./Atom";
import { Elem } from "./Elem";
import { EmptyElement } from "./elements/EmptyElement";
import { ElementTypes } from "./ElementTypes";

export class Site {
  tilePos: GridCoord;
  id: string;

  atom: Atom;

  constructor(_pos: GridCoord) {
    this.tilePos = _pos;
    this.id = MFMUtils.CtoID(this.tilePos);

    this.create();
  }

  //if targetSite is killable
  //kill its atom (replace with empty)
  killAtom(targetSite: Site) {
    let kill: boolean = Math.random() * 100 < targetSite.atom.elem.destroyability;
    if (kill) {
      targetSite.atom = new Atom(ElementTypes.EMPTY);
    }
  }

  killSelf(leavingAtom: Atom = new Atom(ElementTypes.EMPTY)) {
    this.atom = leavingAtom;
  }

  //if target site is killable
  //move this atom to targetSite, and leave behind leavingAtom, which by default is empty
  moveAtom(targetSite: Site, leavingAtom: Atom = new Atom(ElementTypes.EMPTY)) {
    if (targetSite && targetSite.canDestroy()) {
      [this.atom, targetSite.atom] = [leavingAtom, this.atom];
    }
  }

  //if targetSite is moveable
  //swap atoms with this one
  swapAtoms(targetSite: Site): boolean {
    if (targetSite && targetSite.canMove()) {
      [this.atom, targetSite.atom] = [targetSite.atom, this.atom];
      return true;
    }

    return false;
  }

  mutateSite(targetSite: Site, newAtom: Atom) {
    if (targetSite && targetSite.canDestroy()) {
      targetSite.atom = newAtom;
    }
  }

  coordToward(dest: GridCoord): GridCoord {
    let current: GridCoord = this.tilePos;
    let colDist: number = dest.col - current.col;
    let rowDist: number = dest.row - current.row;

    //we made it!
    if (colDist == 0 && rowDist == 0) {
      return undefined;
    }

    let targetCol: number;

    if (colDist < 0) {
      targetCol = -1;
    } else if (colDist > 0) {
      targetCol = 1;
    } else {
      targetCol = 0;
    }

    let targetRow: number;

    if (rowDist < 0) {
      targetRow = -1;
    } else if (rowDist > 0) {
      targetRow = 1;
    } else {
      targetRow = 0;
    }

    return { row: targetRow, col: targetCol };
  }

  canDestroy(): boolean {
    return Math.random() * 100 < this.atom.elem.destroyability;
  }

  canMove(): boolean {
    return Math.random() * 100 < this.atom.elem.moveability;
  }

  create() {
    this.atom = new Atom();
  }
}
