import { Element } from "mfm-js";
import { EventWindow } from "mfm-js";
import { Lemming } from "./Lemming";

export class LemmingEmitter extends Element {
  static CREATE = LemmingEmitter.CREATOR({ name: "LEMIT", symbol: "LME", class: LemmingEmitter, color: 0x89f24e, groups: ["LEMMINGS"] }, { emitCount: 10});

  constructor(type, state = {}) {
    super(type, state);

    this.init();
  }

  init() {

    if(!this.state.emitCount) {
      this.state.emitCount = 10;
    }
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if(this.state.emitCount <= 0) {
      ew.destroy();
      return;
    }

    if(this.state.emitCount > 0 && ew.is(3, "EMPTY")) {
      ew.mutate(3, Lemming.CREATE);
      this.state.emitCount--;
    }
  }
}
