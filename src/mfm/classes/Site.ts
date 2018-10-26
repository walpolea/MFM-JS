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
  swapAtoms(targetSite: Site) {
    if (targetSite && targetSite.canMove()) {
      [this.atom, targetSite.atom] = [targetSite.atom, this.atom];
    }
  }

  mutateSite(targetSite: Site, newAtom: Atom) {
    if (targetSite && targetSite.canDestroy()) {
      targetSite.atom = newAtom;
    }
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
