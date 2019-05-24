import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class DataElement extends Elem {
  pPATROL: number = 1;
  constructor() {
    super(ElementTypes.EMPTY.name, ElementTypes.EMPTY.type);
  }
  exec(ew: EventWindow) {
    //patrol
    if (Math.random() * this.pPATROL < 1) {
      //ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));
      if (ew.is(1, ElementTypes.EMPTY)) {
        ew.move(1);
      } else {
        ew.move(ew.getIndexes(EventWindow.ADJACENT4WAY, ElementTypes.EMPTY, true)[0]);
      }

    }

    super.exec(ew);
  }
}
