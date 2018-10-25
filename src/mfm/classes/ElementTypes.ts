import { EmptyElement } from "./elements/EmptyElement";
import { DRegElement } from "./elements/DRegElement";
import { ResElement } from "./elements/ResElement";

export interface IElementType {
  name: string;
  type: string;
  class: any;
}

export class ElementTypes {
  static EMPTY: IElementType = { name: "EMPTY", type: "E", class: EmptyElement };
  static DREG: IElementType = { name: "DREG", type: "D", class: DRegElement };
  static RES: IElementType = { name: "RES", type: "R", class: ResElement };

  static TYPES_ARRAY: Array<IElementType> = [ElementTypes.EMPTY, ElementTypes.DREG, ElementTypes.RES];

  static registerType(name: string, type: string, c: any) {
    this.TYPES_ARRAY.push({ name, type, class: c });
  }
}
