import { EventWindow } from "../../EventWindow";
import { Elem } from "../../Elem";
import { IElementType } from "../../IElementType";
import { ElementTypes } from "../../ElementTypes";

export class RescuedPlayer extends Elem {
  static TYPE_DEF: IElementType = { name: "RescuedPlayer", type: "Rp", class: RescuedPlayer, color: 0x4499cc };
  static CREATE = RescuedPlayer.CREATOR();

  constructor() {
    super(RescuedPlayer.TYPE_DEF);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
RescuedPlayer.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(RescuedPlayer.TYPE_DEF);
//Register a SPLAT symbol
ElementTypes.registerSPLAT("w", RescuedPlayer.TYPE_DEF);
