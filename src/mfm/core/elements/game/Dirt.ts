//0x68492d

import { EventWindow } from "../../EventWindow";
import { Elem } from "../../Elem";
import { IElementType } from "../../IElementType";
import { ElementTypes } from "../../ElementTypes";

export class Dirt extends Elem {
  static TYPE_DEF: IElementType = { name: "Dirt", type: "w", class: Dirt, color: 0x68492d };
  static CREATE = Dirt.CREATOR();
  static SOFT_Dirt = Dirt.CREATOR([100, 0], undefined, 0x4499cc);

  constructor(_moveability: number = 0, _destroyability: number = 100) {
    super(Dirt.TYPE_DEF, _moveability, _destroyability);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Dirt.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Dirt.TYPE_DEF);
//Register a SPLAT symbol
ElementTypes.registerSPLAT("w", Dirt.TYPE_DEF);
