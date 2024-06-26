import { Decay } from "../../capabilities/Decay";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";

export class AntiForkBomb extends Element {
  static CREATE = AntiForkBomb.CREATOR({ name: "ANTIFORKBOMB", symbol: "AFK", class: AntiForkBomb, color: 0x00aadd, groups: ["MFM"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    const forkbombs = ew.filterByType(EventWindow.ADJACENT8WAY, "FORKBOMB");

    if (forkbombs.length) {
      ew.mutateMany(forkbombs, AntiForkBomb.CREATE, [{ color: (this.rd("color") + 2048) % 0xffffff }, {}]);
    }

    Decay.DECAY(ew, this, 40);

    const afks = ew.filterByType(EventWindow.ADJACENT8WAY, "ANTIFORKBOMB");

    if (afks.length && EventWindow.oneIn(2)) {
      ew.mutateMany(afks, AntiForkBomb.CREATE, [{ color: (this.rd("color") + 1024) % 0xaaffff }, { age: this.state.age - 1 }]);
    }
  }
}
