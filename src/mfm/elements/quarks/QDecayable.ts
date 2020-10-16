import { EventWindow } from "../../core/EventWindow";
import { Quark } from "../../core/Quark";

export class QDecayable extends Quark {
  static CLASS: string = "DECAYABLE";
  lifeSpan: number;
  age: number;

  decay(ew: EventWindow): boolean {
    if (this.age > this.lifeSpan) {
      return ew.destroy();
    }

    return false;
  }
}
