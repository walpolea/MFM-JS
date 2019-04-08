import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { MFMUtils } from "../../utils/utils";
import { Atom } from "../Atom";
import { Site } from "../Site";

export class LoopNucleusElement extends Elem {

  pCREATE_RES: number = 10;
  pCREATE_MEMBRANE: number = 10;
  aloneCount: number = 0;

  constructor() {
    super(ElementTypes.LOOPNUCLEUS.name, ElementTypes.LOOPNUCLEUS.type);
  }

  exec(ew: EventWindow) {

    if (ew.getAll(ElementTypes.LOOPWORM).length === 0) {
      this.aloneCount++;
    } else {
      this.aloneCount = 0;
    }

    //if the loop dies the nucleus should die at some point, also if the loop gets too big
    if (this.aloneCount > 100) {
      ew.origin.killSelf();
    }


    if (MFMUtils.oneIn(this.pCREATE_RES)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(ElementTypes.EMPTY), new Atom(ElementTypes.RES));
    }

    //create a new membrane if none are around and chance
    if (MFMUtils.oneIn(this.pCREATE_MEMBRANE)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(ElementTypes.EMPTY), new Atom(ElementTypes.STICKYMEMBRANE, [ElementTypes.LOOPWORM, 0.8, 1]));
    }

    //move
    ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));

    super.exec(ew);
  }
}
