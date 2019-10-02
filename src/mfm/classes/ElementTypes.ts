export interface IElementType {
  name: string;
  type: string;
  class: any;
  color?: number;
}

export class ElementTypes {

  //This is mostly for the GUI to know all the types it can make
  //user registerType static method to add your element to the list
  static TYPES_MAP: Map<string, IElementType> = new Map<string, IElementType>();

  static registerType(type: IElementType) {
    this.TYPES_MAP.set(type.name, type);
  }

  //These are the defaults used for SPLAT notation, Register your element's character today using registerSPLAT!
  static SPLAT_MAP: Map<string, IElementType> = new Map<string, IElementType>();


  static registerSPLAT(char: string, type: IElementType) {
    this.SPLAT_MAP.set(char, type);
  }
}


import { Template } from "./elements/TemplateElement";