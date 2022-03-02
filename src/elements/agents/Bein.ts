import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";

export class Bein extends Element {
  static CREATE = Bein.CREATOR({ name: "BEIN", symbol: "BNG", class: Bein, color: 0xbe146f, groups: ["MFM"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);
  }
}
