import { EventWindow } from "./EventWindow";
import { IElementType, ElementTypes } from "./ElementTypes";
import { Atom } from "./Atom";

export abstract class Elem {

  static TYPE_DEF: IElementType;
  static SPLAT_MAP: Map<string, IElementType> = new Map<string, IElementType>();

  static INITIALIZE_SPLAT_MAP() {
    return () => {
      this.SPLAT_MAP = new Map<string, IElementType>(ElementTypes.SPLAT_MAP);
      this.SPLAT_MAP.set("#", this.TYPE_DEF);
    }
  }

  static CREATOR(params?: any[], atomicData?: any, colorOverride?: number) {
    return (_params?: any[], _atomicData?: any, _colorOverride?: number): Atom => {
      return new Atom(this.TYPE_DEF, _params || params, _atomicData || atomicData, _colorOverride || colorOverride);
    };
  }

  name: string;
  type: string;
  color: number;

  moveability: number;
  destroyability: number;
  age: number;


  constructor(_typeDef: IElementType, _moveability: number = 100, _destroyability: number = 100) {

    this.setType(_typeDef);

    this.moveability = _moveability;
    this.destroyability = _destroyability;
    this.age = 0;
  }

  setType(_typeDef: IElementType) {
    this.name = _typeDef.name;
    this.type = _typeDef.type;
    this.color = _typeDef.color;
  }

  exec(ew: EventWindow) {
    this.age++;
  }
}
