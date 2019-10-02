import { Elem } from "./Elem";
import { EventWindow } from "./EventWindow";
import { ElementTypes, IElementType } from "./ElementTypes";
import { Empty } from "./elements/EmptyElement";

export class Atom {

  type: IElementType;
  elem: Elem;
  data: any;

  constructor(_type: IElementType = Empty.TYPE_DEF, _elementParams?: any[], _atomicData?: any, _colorOverride?: number) {
    this.type = _type;
    this.data = _atomicData;

    if (_elementParams) {
      this.elem = new this.type.class(..._elementParams);
    } else {
      this.elem = new this.type.class();
    }

    if (_colorOverride !== undefined) {
      this.elem.color = _colorOverride;
    } else {
      this.elem.color = this.type.color;
    }
  }

  is(type: IElementType): boolean {
    return this.type && this.type === type;
  }

  isOf(type: IElementType): boolean {
    return this.elem && this.elem instanceof type.class;
  }

  setElement(e: Elem) {
    this.elem = e;
    this.type = ElementTypes.TYPES_MAP.get(e.name);
  }

  exec(ew: EventWindow) {
    this.elem.exec(ew);
  }
}
