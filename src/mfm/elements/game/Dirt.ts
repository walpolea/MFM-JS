//0x68492d

import { EventWindow } from "../../core/EventWindow";
import { Element } from "../../core/Element";
import { IElementType } from "../../core/IElementType";
import { ElementRegistry } from "../../core/ElementRegistry";

export class Dirt extends Element {
  static BASE_TYPE: IElementType = { name: "Dirt", symbol: "w", class: Dirt, color: 0x68492d };
  static CREATE = Dirt.CREATOR();
  static SOFT_Dirt = Dirt.CREATOR({ params: [100, 0] }, undefined, 0x4499cc);

  constructor(_moveability: number = 0, _destroyability: number = 100) {
    super(Dirt.BASE_TYPE, _moveability, _destroyability);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Dirt.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Dirt.BASE_TYPE);
//Register a SPLAT symbol
ElementRegistry.registerSPLAT("w", Dirt.BASE_TYPE);
