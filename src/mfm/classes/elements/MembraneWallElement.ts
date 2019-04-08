import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Atom } from "../Atom";
import { StickyMembraneElement } from "./StickyMembraneElement";

export class MembraneWallElement extends Elem {

  activated: boolean = true;
  density: number;
  constructor(membraneDensity: number = 1) {
    super(ElementTypes.MEMBRANEWALL.name, ElementTypes.MEMBRANEWALL.type, 0, 100);
    this.density = membraneDensity;
  }
  exec(ew: EventWindow) {

    if (this.activated && ew.getAdjacent8Way(ElementTypes.EMPTY)) {
      ew.origin.mutateSite(ew.getAdjacent8Way(ElementTypes.EMPTY), new Atom(ElementTypes.STICKYMEMBRANE, [ElementTypes.MEMBRANEWALL, this.density, 1]));
    }

    super.exec(ew);
  }
}
