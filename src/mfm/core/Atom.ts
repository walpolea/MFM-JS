import { Element } from "./Element";
import { EventWindow } from "./EventWindow";
import { IElementType } from "./IElementType";
import { ElementRegistry } from "./ElementRegistry";
import { Empty } from "../elements/EmptyElement";
import { Quark } from "./Quark";

export class Atom {
  type: IElementType;
  elem: Element;
  data: any;

  constructor(_type: IElementType = Empty.BASE_TYPE, _elementParams?: any[], _atomicData?: any, _colorOverride?: number) {
    this.type = _type;
    this.data = _atomicData;
    this.elem = _elementParams ? new this.type.class(..._elementParams) : new this.type.class();
    this.elem.color = _colorOverride ?? this.type.color ?? 0xffffff;
  }

  is(type: IElementType): boolean {
    return this.type?.name === type?.name;
  }

  isType(type: string | IElementType): boolean {
    return typeof type === "string" ? this.type?.name.toUpperCase() === type.toUpperCase() : this.type?.name === type?.name;
  }

  isClass(c: string | typeof Quark): boolean {
    // console.log(c);
    return typeof c === "string" ? this.elem?.classes.has(c.toUpperCase()) : this.elem?.classes.has(c.CLASS);
  }

  // isOf(type: IElementType): boolean {
  //   return this.elem && this.elem instanceof type.class;
  // }

  // isAny(t: string | IElementType | typeof Quark) {
  //   if (typeof t === "string" || t.hasOwnProperty("CLASS")) {
  //     return this.isType(t) || this.isClass(t);
  //   } else {
  //     return this.isType(t);
  //   }
  // }

  setElement(e: Element) {
    this.elem = e;
    this.type = ElementRegistry.getType(e.name);
  }

  exec(ew: EventWindow) {
    //profile?
    // var t0 = performance.now();

    this.elem.exec(ew);

    // var t1 = performance.now();
    // console.log(this.type.name + " took " + (t1 - t0) + " ms");
  }
}
