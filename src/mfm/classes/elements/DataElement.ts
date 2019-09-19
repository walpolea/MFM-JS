import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { MFMUtils } from "../../utils/utils";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class DataElement extends Elem {
  pPATROL: number = 1;
  constructor() {
    super(ElementTypes.EMPTY.name, ElementTypes.EMPTY.type);
  }
  exec(ew: EventWindow) {
    //patrol
    if (MFMUtils.oneIn(this.pPATROL)) {
      //ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));
      if (ew.is(1, ElementTypes.EMPTY)) {
        ew.move(1);
      } else {
        ew.move(ew.getIndexes(EventWindow.ADJACENT8WAY, ElementTypes.EMPTY, true)[0]);
      }

    }

    super.exec(ew);
  }
}
