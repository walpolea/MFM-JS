import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Atom } from "../Atom";
import { StickyMembraneElement } from "./StickyMembraneElement";

export class MembraneWallElement extends Elem {

  activated: boolean = true;
  density: number;
  deactivationType: IElementType;

  constructor(membraneDensity: number = 1, deactivationType: IElementType = ElementTypes.SWAPWORM) {

    super(ElementTypes.MEMBRANEWALL.name, ElementTypes.MEMBRANEWALL.type, 0, 100);

    this.density = membraneDensity;
    this.deactivationType = deactivationType;
  }
  exec(ew: EventWindow) {

    if (this.deactivationType && ew.getRandomIndexOfType(EventWindow.ALLADJACENT, this.deactivationType)) {
      this.activated = false;
    } else if (this.deactivationType) {

      this.activated = true;
    }

    if (this.activated && ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, ElementTypes.EMPTY)) {
      ew.mutate(ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, ElementTypes.EMPTY), new Atom(ElementTypes.STICKYMEMBRANE, [ElementTypes.MEMBRANEWALL, this.density, 1]));
    } else if (!this.activated) {
      ew.getIndexes(EventWindow.ALLADJACENT, ElementTypes.STICKYMEMBRANE, false).forEach(site => {
        if (site) {
          ew.destroy(site);
        }
      })

    }

    super.exec(ew);
  }
}
