import { IElementType } from "../mfm/Element";
import { EventWindow, EWIndex } from "../mfm/EventWindow";

export class Swap {
  static DOWN = Swap.CREATE(EventWindow.S);
  static SIDE = Swap.CREATE([6, 8]);
  static SLIP = Swap.CREATE(EventWindow.EQUATOR);

  static SINK = Swap.CREATE([...EventWindow.S, 6, 8], "WATER");
  static FLOAT = Swap.CREATE([...EventWindow.N, 5, 7], "WATER");

  static PATROL = Swap.CREATE(EventWindow.ADJACENT4WAY);
  static PATROL_8 = Swap.CREATE(EventWindow.ADJACENT8WAY);

  static CREATE(direction: EWIndex[], type: string | IElementType = "EMPTY") {
    return (ew: EventWindow, chance: number = 1): boolean => {
      if (EventWindow.oneIn(chance) && ew.any(direction, type)) {
        const to: EWIndex = ew.filter(direction, type, true)?.[0];
        return ew.swap(to);
      }

      return false;
    };
  }
}
