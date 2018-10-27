import { Elem } from "./Elem";
import { EventWindow } from "./Eventwindow";
import { ElementTypes, IElementType } from "./ElementTypes";

export class Atom {
  type: IElementType;
  elem: Elem;

  constructor(_type: IElementType = ElementTypes.EMPTY, params?: any[]) {
    this.type = _type;
    if (params) {
      this.elem = new this.type.class(...params);
    } else {
      this.elem = new this.type.class();
    }
  }

  exec(ew: EventWindow) {
    this.elem.exec(ew);
  }
}
