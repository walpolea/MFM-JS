import { Element } from "../mfm/Element";
import { EventWindow } from "../mfm/EventWindow";

export class Decay {
  static MAKE_DECAY(lifeSpan: number, deathChance: number = 1) {
    return (ew: EventWindow, self: Element) => {
      const { age } = self.state;

      if (age > lifeSpan) {
        if (EventWindow.oneIn(deathChance)) {
          ew.destroy();
        }
      }
    };
  }

  static DECAY(ew: EventWindow, self: Element, lifeSpan: number, deathChance: number = 1): boolean {
    const { age } = self.state;
      

    if (age > lifeSpan) {
      if (EventWindow.oneIn(deathChance)) {
        ew.destroy();
        return true;
      }
    }
    return false;
  }
}
