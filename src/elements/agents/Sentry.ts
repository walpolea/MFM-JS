import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";
import { AntiForkBomb } from "../core/AntiForkBomb";

export class Sentry extends Element {
  //VARIANTS
  static CREATE = Sentry.CREATOR({ name: "SENTRY", class: Sentry, color: 0xa414ff, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["MFM"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      Wayfinding.MOVE_DIRECTIONALLY(ew, this);
      Wayfinding.SLIGHT_RANDOMLY(this);
    }

    const forkbombs = ew.filter(EventWindow.ALLADJACENT, "FORKBOMB", true);

    if (forkbombs.length) {
      ew.mutate(forkbombs[0], AntiForkBomb.CREATE);
    }
  }
}
