import { ICapability, CapabilityRegistry } from "./Capability";
import { ElementRegistry } from "./ElementRegistry";
import { EventWindow } from "./EventWindow";

export interface IElementType {
  name: string;
  class: any;
  symbol?: string;
  color?: number;
  CREATE?: Function;
  classifications?: string[];
  groups?: string[];
}

export interface IElementTypePartial {
  symbol?: string;
  name?: string;
  class?: any;
  color?: number;
  CREATE?: Function;
  classifications?: string[];
  groups?: string[];
}

export interface IElement {
  TYPE: IElementType;
  behave: Function;
  state?: any;
}

export abstract class Element implements IElement {
  //creator creates an atom of element creation function with the ability to override BASE_TYPE element properties
  static CREATOR(typeDefinition: IElementType, state: any = {}) {
    let type: IElementType = { ...typeDefinition };

    //the create function can also take in IElementType properties to override on the fly.
    const CREATE = (_typeDefinition: IElementTypePartial = {}, _state: any = {}): Element => {
      const newtype = { ...type, ..._typeDefinition };
      const newstate = { ...state, ..._state };
      const atom = newstate ? new newtype.class(newtype, newstate) : new newtype.class(newtype);
      return atom;
    };

    type.CREATE = CREATE;

    ElementRegistry.registerType({ ...type, CREATE });

    return CREATE;
  }

  TYPE: IElementType;
  state: any;
  classes: Set<string>;

  constructor(_type: IElementType, initialState?: any) {
    this.TYPE = _type;
    this.classes = new Set<string>();
    this.initializeState(initialState ?? undefined);
    this.classifyAs(this.TYPE);

    if (this.TYPE.classifications) {
      this.TYPE.classifications.forEach((c) => {
        this.classifyAs(c);
      });
    }
  }

  initializeState(state?: any) {
    this.state = {};
    this.wr("age", state.age ?? 0);
    this.wr("color", this.TYPE.color ?? 0xffffff);
    this.state = state ? { ...this.state, ...state } : { ...this.state };
  }

  behave(ew: EventWindow): void {
    this.state.age++;
  }

  rd(key: string): any {
    return this.state[key];
  }

  wr(key: string, value: any): any {
    this.state[key] = value;
  }

  classifyAs(c: string | IElementType): void {
    const t: string = typeof c === "string" ? c : c.name;
    this.classes.add(t.toUpperCase());
  }

  declassify(c: string | IElementType): void {
    if(!c) return;
    const t: string = typeof c === "string" ? c : c?.name;
    this.classes.delete(t.toUpperCase());
  }

  is(type: string | IElementType | string[] | IElementType[]): boolean {
    if (Array.isArray(type)) {
      return type.some((ty) => {
        const t: string = typeof ty === "string" ? ty : ty.name;
        return this.classes.has(t.toUpperCase());
      });
    }
    const t: string = typeof type === "string" ? type : type.name;
    return this.classes.has(t.toUpperCase());
  }

  isCore(type: string | IElementType): boolean {
    const t: string = typeof type === "string" ? type : type.name;
    return t.toUpperCase() === this.TYPE.name.toUpperCase();
  }
}
