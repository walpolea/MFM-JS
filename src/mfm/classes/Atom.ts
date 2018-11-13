import { Elem } from "./Elem";
import { EventWindow } from "./Eventwindow";
import { ElementTypes, IElementType } from "./ElementTypes";

export class Atom {
  type: IElementType;
  elem: Elem;
  data: any;

  constructor(_type: IElementType = ElementTypes.EMPTY, _elementParams?: any[], _atomicData?: any) {
    this.type = _type;
    this.data = _atomicData;

    if (_elementParams) {
      this.elem = new this.type.class(..._elementParams);
    } else {
      this.elem = new this.type.class();
    }
  }

  exec(ew: EventWindow) {
    this.elem.exec(ew);
  }
}
