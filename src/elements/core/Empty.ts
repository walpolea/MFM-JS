import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";

export class Empty extends Element {
  static CREATE = Empty.CREATOR({ name: "EMPTY", symbol: "EMT", class: Empty, color: 0x2a2a2a, groups: ["MFM"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.classifyAs("EMPTY");
  }

  behave(ew: EventWindow) {
    super.behave(ew);
  }
}
