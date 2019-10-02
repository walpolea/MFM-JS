import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";
import { MFMUtils } from "../../utils/MFMUtils";
import { Empty } from "./EmptyElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Data extends Elem {

  static TYPE_DEF: IElementType = { name: "DATA", type: "Da", class: Data, color: 0xcccccc };
  static CREATE = Data.CREATOR();

  pPATROL: number = 1;

  constructor() {
    super(Data.TYPE_DEF);
  }
  exec(ew: EventWindow) {
    //patrol
    if (MFMUtils.oneIn(this.pPATROL)) {
      //ew.origin.swapAtoms(ew.getAdjacent8Way(Empty.TYPE_DEF));
      if (MFMUtils.oneIn(2) && ew.is(4, Empty.TYPE_DEF)) {
        ew.move(4);
      } else {
        ew.move(ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF, true)[0]);
      }

    }

    super.exec(ew);
  }
}
