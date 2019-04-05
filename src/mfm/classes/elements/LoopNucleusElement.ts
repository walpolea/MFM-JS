import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { MFMUtils } from "../../utils/utils";
import { Atom } from "../Atom";
import { Site } from "../Site";

export class LoopNucleusElement extends Elem {

  pCREATE_RES: number = 100;
  pCREATE_MEMBRANE: number = 10;
  reproductionConditionCount: number = 0;

  constructor() {
    super(ElementTypes.LOOPNUCLEUS.name, ElementTypes.LOOPNUCLEUS.type);
  }

  couldReproduce(ew: EventWindow): boolean {
    const wormSites: Site[] = ew.getSites(EventWindow.ALLADJACENT, ElementTypes.LOOPWORM, false).filter(site => site);
    const nucleusSites: Site[] = ew.getSites(EventWindow.ADJACENT8WAY, ElementTypes.LOOPNUCLEUS, false).filter(site => site);

    if (wormSites.length === 0 && nucleusSites.length === 2) {
      this.reproductionConditionCount++;
      return true;
    } else {
      this.reproductionConditionCount = 0;
      return false;
    }
  }

  reproduce(ew: EventWindow) {

    const nucleusSites: Site[] = ew.getSites(EventWindow.ALLADJACENT, ElementTypes.LOOPNUCLEUS, false).filter(site => site);
    nucleusSites.forEach(site => {
      site.killSelf();
    })
    ew.origin.mutateSite(ew.origin, new Atom(ElementTypes.LOOPSEED));

  }

  exec(ew: EventWindow) {

    if (MFMUtils.oneIn(this.pCREATE_RES)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(ElementTypes.EMPTY), new Atom(ElementTypes.RES));
    }

    //create a new membrane if none are around and chance
    if (!ew.getAdjacent8Way(ElementTypes.STICKYMEMBRANE) && MFMUtils.oneIn(this.pCREATE_MEMBRANE)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(ElementTypes.EMPTY), new Atom(ElementTypes.STICKYMEMBRANE, [ElementTypes.LOOPWORM]));
    }

    ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));

    //make a loop inside the loop... kinda sketch
    // if (this.couldReproduce(ew) && this.reproductionConditionCount > 11) {
    //   this.reproductionConditionCount = 0;
    //   this.reproduce(ew);
    // }




    super.exec(ew);
  }
}
