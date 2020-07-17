import { Elem } from "./Elem";
import { EventWindow } from "./EventWindow";
import { IElementType } from "./IElementType";
import { ElementTypes } from "./ElementTypes";
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
    //profile?
    // var t0 = performance.now();

    this.elem.exec(ew);

    // var t1 = performance.now();
    // console.log(this.type.name + " took " + (t1 - t0) + " ms");
  }
}
