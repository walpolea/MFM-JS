import { Wayfinding } from "../../capabilities/Wayfinding";
import { Decay } from "../../capabilities/Decay";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";
import { AntiForkBomb } from "../core/AntiForkBomb";

export class Signal extends Element {
  //VARIANTS
  static CREATE = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0x46215c, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: ["MFM"] });

  static N = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "N" });
  static NE = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "NE" });
  static E = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "E" });
  static SE = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "SE" });
  static S = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "S" });
  static SW = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "SW" });
  static W = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "W" });
  static NW = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xa414ff, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: [] }, { heading: "NW" });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
    this.init();
  }

  init() {
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if(ew.selfIs("DECAYABLE")) {
      Decay.DECAY(ew, this, this.state.lifeSpan ?? 40, 2);
    }

    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    }

    const moved = Wayfinding.MOVE_DIRECTIONALLY(ew, this);
    
  }
}
