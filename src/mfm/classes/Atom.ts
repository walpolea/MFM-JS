import { Elem } from "./Elem";
import { EventWindow } from "./Eventwindow";
import { ElementTypes, IElementType } from "./ElementTypes";

export class Atom {
  type: IElementType;
  elem: Elem;

  constructor(_type: IElementType = ElementTypes.EMPTY) {
    this.type = _type;
    this.elem = new this.type.class();
  }

  exec(ew: EventWindow) {
    this.elem.exec(ew);
  }
}
