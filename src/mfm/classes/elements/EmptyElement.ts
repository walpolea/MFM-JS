import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";

export class EmptyEl extends Elem {
  constructor() {
    super("EMPTY", "E");
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}
