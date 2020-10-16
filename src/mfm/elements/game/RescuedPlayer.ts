import { EventWindow } from "../../core/EventWindow";
import { Element } from "../../core/Element";
import { IElementType } from "../../core/IElementType";
import { ElementRegistry } from "../../core/ElementRegistry";

export class RescuedPlayer extends Element {
  static BASE_TYPE: IElementType = { name: "RescuedPlayer", symbol: "Rp", class: RescuedPlayer, color: 0x4499cc };
  static CREATE = RescuedPlayer.CREATOR();

  constructor() {
    super(RescuedPlayer.BASE_TYPE);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
RescuedPlayer.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

//Register a SPLAT symbol
ElementRegistry.registerSPLAT("w", RescuedPlayer.BASE_TYPE);
