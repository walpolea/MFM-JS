import { EventWindow } from "../EventWindow";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Elem } from "../Elem";

export class Empty extends Elem {

  static TYPE_DEF: IElementType = { name: "EMPTY", type: "E", class: Empty, color: 0x2a2a2a };
  static CREATE = Empty.CREATOR();

  constructor() {
    super(Empty.TYPE_DEF);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Empty.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Empty.TYPE_DEF);
//Register a SPLAT symbol
ElementTypes.registerSPLAT("_", Empty.TYPE_DEF);