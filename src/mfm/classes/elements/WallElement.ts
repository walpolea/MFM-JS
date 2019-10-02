import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";

export class Wall extends Elem {

  static TYPE_DEF: IElementType = { name: "WALL", type: "w", class: Wall, color: 0x2020ff };
  static CREATE = Wall.CREATOR();

  constructor() {
    super(Wall.TYPE_DEF, 0, 100);

  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Wall.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Wall.TYPE_DEF);
//Register a SPLAT symbol
ElementTypes.registerSPLAT("w", Wall.TYPE_DEF);