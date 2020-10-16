import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../utils/SPLAT";
import { Symmetries } from "../utils/Symmetries";
import { Utils } from "../utils/MFMUtils";

export class Res extends Element {
  static BASE_TYPE: IElementType = { name: "RES", symbol: "R", class: Res, color: 0x0e5100 };
  static CREATE = Res.CREATOR();
  static CREATE_BLUE = Res.CREATOR(undefined, undefined, 0x0000ff);

  static checkEmpty = SPLAT.splatToMap(`  
  ~@_
  `);

  constructor() {
    super(Res.BASE_TYPE);
  }

  exec(ew: EventWindow) {
    //Res the SPLATish way... slightly less performant
    // const q = ew.query(Res.checkEmpty, 0, Res.SPLAT_MAP, Symmetries.ALL);
    // if (q) {
    //   ew.swap(Utils.oneRandom(q.get(Empty.BASE_TYPE)));
    // }

    ew.swap(ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, Empty.BASE_TYPE));
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Res.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Res.BASE_TYPE);
//Register a SPLAT symbol
ElementRegistry.registerSPLAT("r", Res.BASE_TYPE);
