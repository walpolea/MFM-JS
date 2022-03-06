import { Decay } from "../../capabilities/Decay";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";

export class Swamp extends Element {
  static CREATE = Swamp.CREATOR({
    name: "SWAMP",
    class: Swamp,
    color: 0x2255aa,
    classifications: ["ENV", "OFSWAMP", "DECAYABLE"],
    groups: ["Swamp"],
  });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    const swamplings = ew.filterByType(EventWindow.ALLADJACENT, "SWAMPLING");

    if (swamplings.length) {
      this.state.age = 0;
      if (EventWindow.oneIn(50)) this.grow(ew);
    } else {
      if (ew.selfIs("DECAYABLE")) {
        Decay.DECAY(ew, this, this.state.lifeSpan ?? 1000, 10);
      }
    }
  }

  grow(ew: EventWindow) {
    const empties = ew.filterByType(EventWindow.ADJACENT8WAY, "EMPTY");

    if (empties.length) {
      ew.mutate(ew.random(empties), this.TYPE.CREATE);
    }
  }
}
