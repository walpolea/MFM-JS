import { EmptyElement } from "./elements/EmptyElement";
import { DRegElement } from "./elements/DRegElement";

export interface IElementType {
  name: string;
  type: string;
  class: any;
}

export class ElementTypes {
  static EMPTY: IElementType = { name: "EMPTY", type: "E", class: EmptyElement };
  static DREG: IElementType = { name: "D_REG", type: "D", class: DRegElement };

  static TYPES_ARRAY: Array<IElementType> = [ElementTypes.EMPTY, ElementTypes.DREG];

  static registerType(name: string, type: string, c: any) {
    this.TYPES_ARRAY.push({ name, type, class: c });
  }
}
