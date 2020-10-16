import { EventWindow } from "../core/EventWindow";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Element } from "../core/Element";

export class Empty extends Element {
  static BASE_TYPE: IElementType = { name: "EMPTY", symbol: "E", class: Empty, color: 0x2a2a2a };
  static CREATE = Empty.CREATOR();

  constructor() {
    super(Empty.BASE_TYPE);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Empty.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

//Register a SPLAT symbol
ElementRegistry.registerSPLAT("_", Empty.BASE_TYPE);
