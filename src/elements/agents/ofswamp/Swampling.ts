import { Wayfinding } from "../../../capabilities/Wayfinding";
import { Element, IElementType } from "../../../mfm/Element";
import { EventWindow } from "../../../mfm/EventWindow";
import { Wayfinder } from "../../../mfm/Wayfinder";
import { Swamp } from "./Swamp";

export class Swampling extends Element {
  //VARIANTS
  static CREATE = Swampling.CREATOR({
    name: "SWAMPLING",
    class: Swampling,
    color: 0x22cc88,
    // color: 0x3d5b31,
    classifications: ["OFSWAMP", "DIRECTIONAL", "DIRECTABLE"],
    groups: ["Swamp"],
  });

  //SYSTEM ELEMENTS

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
      const empties = ew.filterByType(EventWindow.ADJACENT8WAY, "EMPTY");
      if (empties.length) {
        ew.mutateMany(empties, Swamp.CREATE);
      }
    } else {
      const empties = ew.filterByType(EventWindow.ADJACENT8WAY, "EMPTY");
      if (empties.length > 1) {
        Wayfinding.SLIGHT_RIGHT(this);
        // Wayfinding.REVERSE(this);
      }
      Wayfinding.SWAP_DIRECTIONALLY(ew, this, "SWAMP");
      if (EventWindow.oneIn(1.5)) {
        Wayfinding.SLIGHT_RIGHT(this);
      }

      // if (!Wayfinding.MOVE_DIRECTIONALLY(ew, this, "SWAMP", Swamp.CREATE())) {
      //   Wayfinding.VEER_RIGHT(this);
      // }
    }
  }
}
