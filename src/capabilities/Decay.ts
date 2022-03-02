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

  static DECAY(ew: EventWindow, self: Element, lifeSpan: number, deathChance: number = 1) {
    const { age } = self.state;

    if (age > lifeSpan) {
      if (EventWindow.oneIn(deathChance)) {
        ew.destroy();
      }
    }
  }

  static FAR_NORTH(ew: EventWindow, repelType: string | string[], escapeType: string | string[] = "EMPTY"): boolean {
    if (EventWindow.oneIn(5) && ew.is(3, repelType) && ew.is(10, escapeType)) {
      ew.swap(10);
    }
    return true;
  }
}
