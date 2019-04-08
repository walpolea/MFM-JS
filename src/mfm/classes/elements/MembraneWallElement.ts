import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Atom } from "../Atom";
import { StickyMembraneElement } from "./StickyMembraneElement";

export class MembraneWallElement extends Elem {

  activated: boolean = true;
  density: number;
  deactivationType: IElementType;

  constructor(membraneDensity: number = 1, deactivationType: IElementType = undefined) {
    super(ElementTypes.MEMBRANEWALL.name, ElementTypes.MEMBRANEWALL.type, 0, 100);
    this.density = membraneDensity;
    this.deactivationType = deactivationType;
  }
  exec(ew: EventWindow) {

    if (this.deactivationType && ew.getSites(EventWindow.ALLADJACENT, this.deactivationType)[0]) {
      this.activated = false;
    } else if (this.deactivationType) {
      this.activated = true;
    }

    if (this.activated && ew.getAdjacent8Way(ElementTypes.EMPTY)) {
      ew.origin.mutateSite(ew.getAdjacent8Way(ElementTypes.EMPTY), new Atom(ElementTypes.STICKYMEMBRANE, [ElementTypes.MEMBRANEWALL, this.density, 1]));
    }

    super.exec(ew);
  }
}
