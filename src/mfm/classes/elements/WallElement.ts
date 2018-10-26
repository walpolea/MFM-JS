import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

export class WallElement extends Elem {
  constructor() {
    super(ElementTypes.WALL.name, ElementTypes.WALL.type, 0, 100);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}
