import { Decay } from "../../capabilities/Decay";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";

export class Swamp extends Element {
  static CREATE = Swamp.CREATOR({
    name: "SWAMP",
    class: Swamp,
    color: 0x3d5b31,
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

    const swamplings = ew.filterByType(EventWindow.ADJACENT8WAY, "SWAMPLING");
    const swamp = ew.filterByType(EventWindow.ADJACENT8WAY, "OFSWAMP");

    if (swamplings.length > 0) {
      this.state.age = 0;
      if (EventWindow.oneIn(10)) this.grow(ew);
    } else {
      if (ew.selfIs("DECAYABLE") && swamp.length < 7) {
        Decay.DECAY(ew, this, this.state.lifeSpan ?? 500);
      } else {
        this.state.age = 0;
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
