import { IElementType } from "./IElementType";

export class ElementRegistry {
  //This is mostly for the GUI to know all the types it can make
  //user registerType static method to add your element to the list
  static TYPES: Map<string, IElementType> = new Map<string, IElementType>();

  static registerType(type: IElementType) {
    // if (this.TYPES_MAP.has(type.name)) {
    //   throw new TypeError(`Element Registry already has registered element with name: ${type.name}`);
    // }

    this.TYPES.set(type.name, type);
  }

  static getType(type: string | IElementType): IElementType {
    if (typeof type === "string") {
      return this.TYPES.get(type);
    } else {
      return this.TYPES.get(type.name);
    }
  }

  //These are the defaults used for SPLAT notation, Register your element's character today using registerSPLAT!
  static SPLAT_MAP: Map<string, IElementType> = new Map<string, IElementType>();

  static registerSPLAT(char: string, type: IElementType) {
    this.SPLAT_MAP.set(char, type);
  }
}
