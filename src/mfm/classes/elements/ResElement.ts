import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

export class ResElement extends Elem {
  constructor() {
    super(ElementTypes.RES.name, ElementTypes.RES.type);
  }
  exec(ew: EventWindow) {
    ew.swap(ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, ElementTypes.EMPTY));
    super.exec(ew);
  }
}
