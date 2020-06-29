import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Utils } from "../../utils/MFMUtils";

export class Res extends Elem {
  static TYPE_DEF: IElementType = { name: "RES", type: "R", class: Res, color: 0x0e5100 };
  static CREATE = Res.CREATOR();
  static CREATE_BLUE = Res.CREATOR(undefined, undefined, 0x0000ff);

  static checkEmpty = SPLAT.splatToMap(`  
  ~@_
  `);

  constructor() {
    super(Res.TYPE_DEF);
  }

  exec(ew: EventWindow) {
    //Res the SPLATish way... slightly less performant
    // const q = ew.query(Res.checkEmpty, 0, Res.SPLAT_MAP, Symmetries.ALL);
    // if (q) {
    //   ew.swap(Utils.oneRandom(q.get(Empty.TYPE_DEF)));
    // }

    ew.swap(ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF));
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Res.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Res.TYPE_DEF);
//Register a SPLAT symbol
ElementTypes.registerSPLAT("r", Res.TYPE_DEF);
