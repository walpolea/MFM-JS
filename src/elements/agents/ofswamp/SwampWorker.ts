import { Wayfinding } from "../../../capabilities/Wayfinding";
import { Element, IElementType } from "../../../mfm/Element";
import { EventWindow } from "../../../mfm/EventWindow";
import { Wayfinder } from "../../../mfm/Wayfinder";
import { Swamp } from "./Swamp";

export class SwampWorker extends Element {
  static CREATE = SwampWorker.CREATOR({
    name: "SWAMP WORKER",
    symbol: "SWK",
    class: SwampWorker,
    color: 0x03460f,
    // color: 0x3d5b31,
    // color: 0x3d6242,
    classifications: ["OFSWAMP", "DIRECTIONAL", "SWAMPLING"],
    groups: ["Swamp"],
  });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    const swampworkers = ew.filterByType(EventWindow.ADJACENT8WAY, "SWAMP WORKER");
    const ofswamps = ew.filterByType(EventWindow.ALLADJACENT, "OFSWAMP");

    if (ofswamps.length < EventWindow.ALLADJACENT.length * 0.4) {
      ew.mutate(0, Swamp.CREATE);
      return;
    }

    if (swampworkers.length) {
      ew.mutate(0, Swamp.CREATE);
      return;
    }

    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM(Wayfinder.DIRECTIONS_PRIMARY));
    } else {
      if (Wayfinding.SWAP_DIRECTIONALLY(ew, this, "SWAMP")) {
        Wayfinding.VEER_RIGHT(this);
      } else {
        Wayfinding.SLIGHT_RIGHT(this);
      }
    }
  }
}
