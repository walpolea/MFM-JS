import { EventWindow } from "./EventWindow";
import { IElementType, IElementTypePartial } from "./IElementType";
import { ElementRegistry } from "./ElementRegistry";
import { Atom } from "./Atom";
import { SPLATEval } from "../utils/SPLAT";
import { Quark } from "./Quark";

export abstract class Element {
  ///////////// Static Stuff

  static BASE_TYPE: IElementType;
  static SPLAT_MAP: Map<string, IElementType | SPLATEval> = new Map<string, IElementType>();

  static INITIALIZE_SPLAT_MAP() {
    return () => {
      this.SPLAT_MAP = new Map<string, IElementType>(ElementRegistry.SPLAT_MAP);
      this.SPLAT_MAP.set("#", this.BASE_TYPE);
    };
  }

  //creator creates an atom of element creation function with the ability to override BASE_TYPE element properties
  static CREATOR(newElementType: IElementTypePartial = {}, atomicData?: any, colorOverride?: number) {
    //the create function can also take in IElementType properties to override on the fly.
    const CREATE = (_newElementType: IElementTypePartial = {}, _atomicData?: any, _colorOverride?: number): Atom => {
      const type: IElementType = { ...this.BASE_TYPE, ...newElementType, ..._newElementType };
      const atom = new Atom(type, type.params, _atomicData ?? atomicData, _colorOverride ?? colorOverride);
      atom.elem.TYPE = type;
      return atom;
    };

    ElementRegistry.registerType({ ...this.BASE_TYPE, ...newElementType, CREATE });

    return CREATE;
  }

  static applyMixins(derivedConstructor: any, baseConstructors: any[]) {
    baseConstructors.forEach((baseConstructor) => {
      Object.getOwnPropertyNames(baseConstructor.prototype).forEach((name) => {
        Object.defineProperty(derivedConstructor.prototype, name, Object.getOwnPropertyDescriptor(baseConstructor.prototype, name));
      });
    });
  }

  ////////Instance Stuff

  TYPE: IElementType;
  name: string;
  symbol: string;
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
    this.symbol = _typeDef.symbol;
    this.color = _typeDef.color;
  }

  behave(ew: EventWindow) {}

  exec(ew: EventWindow) {
    this.age++;
  }

  classes: Set<string> = new Set<string>();
  registerClass(q: typeof Quark): any {
    this.classes.add(q.CLASS);
  }
}
