import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { MFMUtils } from "../../utils/utils";
import { Atom } from "../Atom";

export class LoopNucleusElement extends Elem {

  pCREATE_RES: number = 200;

  constructor() {
    super(ElementTypes.LOOPNUCLEUS.name, ElementTypes.LOOPNUCLEUS.type);
  }
  exec(ew: EventWindow) {

    if (MFMUtils.oneIn(this.pCREATE_RES)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(ElementTypes.EMPTY), new Atom(ElementTypes.RES));
    }

    ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));

    super.exec(ew);
  }
}
