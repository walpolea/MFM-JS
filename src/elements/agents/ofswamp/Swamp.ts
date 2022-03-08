import { Decay } from "../../../capabilities/Decay";
import { Element, IElementType } from "../../../mfm/Element";
import { EventWindow } from "../../../mfm/EventWindow";
import { SwampWorker } from "./SwampWorker";

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

  init() {
    this.state.lifeSpan = this.state.lifeSpan ?? 10;
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    const swamplings = ew.filterByType(EventWindow.ADJACENT8WAY, "SWAMPLING");
    const ofswamps = ew.filterByType(EventWindow.ADJACENT8WAY, "OFSWAMP");
    const swamps = ew.filterByType(EventWindow.ALLADJACENT, "SWAMP");

    if (swamps.length === EventWindow.ALLADJACENT.length) {
      ew.mutate(0, SwampWorker.CREATE);
      return;
    }

    if (swamplings.length > 0) {
      this.state.age = 0;
      if (EventWindow.oneIn(4)) this.grow(ew);
    } else {
      if (ew.selfIs("DECAYABLE") && ofswamps.length < 7) {
        Decay.DECAY(ew, this, this.state.lifeSpan);
      } else {
        this.state.age = 0;
      }
    }
  }

  grow(ew: EventWindow) {
    const empties = ew.filterByType(EventWindow.ADJACENT8WAY, "EMPTY");

    if (empties.length) {
      // ew.mutateMany(empties, this.TYPE.CREATE);
      ew.mutate(ew.random(empties), this.TYPE.CREATE, [{}, {}]);
    }
  }
}
