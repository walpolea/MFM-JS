import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";

export class ForkBomb extends Element {
  static CREATE = ForkBomb.CREATOR({ name: "FORKBOMB", symbol: "FKB", class: ForkBomb, color: 0xdd0000, groups: ["MFM"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
  }

  behave(ew: EventWindow) {
    super.behave(ew);
    ew.replace(EventWindow.RANDOM(EventWindow.ADJACENT4WAY), ForkBomb.CREATE({ color: (this.rd("color") + 512) % 0xffffff }));
  }
}
