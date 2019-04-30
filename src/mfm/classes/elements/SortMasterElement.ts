import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";

export class SortMasterElement extends Elem {

  sortVal: number = 0;

  constructor() {
    super(ElementTypes.SORTMASTER.name, ElementTypes.SORTMASTER.type);
  }

  exec(ew: EventWindow) {


    //is there data to the east?
    const availableSite: Site = ew.getSiteByIndex(4);
    if (availableSite.atom.data) {

      const dval: any = availableSite.atom.data;

      if (dval == this.sortVal && ew.is(1, ElementTypes.EMPTY)) {
        ew.swap(1, 4);
      } else if (dval < this.sortVal && ew.is(2, ElementTypes.EMPTY)) {
        ew.swap(2, 4);
        this.sortVal = dval;
      } else if (dval > this.sortVal && ew.is(3, ElementTypes.EMPTY)) {
        ew.swap(3, 4);
        this.sortVal = dval;
      }


    }

    super.exec(ew);
  }
}
