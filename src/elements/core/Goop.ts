import { Repel } from "../../capabilities/Repel";
import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";

export class Goop extends Element {
  static CREATE = Goop.CREATOR({ name: "GOOP", symbol: "GOP", class: Goop, color: 0x5492a2, groups: ["MFM"] });

  static ATTRACT = Repel.MAKE_ATTRACTOR(["GOOP", "WALL"], [...EventWindow.LAYER3, ...EventWindow.LAYER4]);

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    Goop.ATTRACT(ew, this);
  }
}
