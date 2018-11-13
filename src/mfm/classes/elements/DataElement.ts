import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { GridCoord } from "../../interfaces/IGridCoord";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class DataElement extends Elem {
  pPATROL: number = 10;
  constructor() {
    super(ElementTypes.EMPTY.name, ElementTypes.EMPTY.type);
  }
  exec(ew: EventWindow) {
    //patrol
    if (Math.random() * this.pPATROL < 1) {
      ew.origin.swapAtoms(ew.getAdjacent4Way(true, ElementTypes.EMPTY));
    }

    super.exec(ew);
  }
}
