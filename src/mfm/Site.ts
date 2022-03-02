import { Empty } from "../elements/core/Empty";
import { Element } from "./Element";
import { EventWindow } from "./EventWindow";
import { TileCoordinate } from "./TileCoordinate";

export class Site {
  location: TileCoordinate;
  id: string;

  atom: Element;
  baseAtom: Element;
  //the tile needs to seed the EventWindow
  ew: EventWindow;

  constructor(_loc: TileCoordinate) {
    this.location = _loc;
    this.id = this.location.id;
    this.create();
  }

  create() {
    this.atom = Empty.CREATE();
    this.baseAtom = Empty.CREATE();
  }

  swapAtoms(targetSite: Site): boolean {
    [this.atom, targetSite.atom] = [targetSite.atom, this.atom];
    return true;
  }

  mutate(atom: Element) {
    this.atom = atom;
  }

  mutateBase(atom: Element) {
    this.baseAtom = atom;
  }
}
