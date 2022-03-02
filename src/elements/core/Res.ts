import { Swap } from "../../capabilities/Swap";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";

export class Res extends Element {
  static CREATE = Res.CREATOR({ name: "RES", class: Res, color: 0x0e5100, groups: ["MFM"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    Swap.PATROL(ew);
  }
}
