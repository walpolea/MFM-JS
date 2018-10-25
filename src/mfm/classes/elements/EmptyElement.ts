import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

export class EmptyEl extends Elem {
  constructor() {
    super(ElementTypes.EMPTY.name, ElementTypes.EMPTY.type);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}
