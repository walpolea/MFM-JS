import { EventWindow, EWIndex } from "../mfm/EventWindow";

export class Build {
  static GRID = Build.MAKE_REPEATER(EventWindow.DIAGONAL4WAY);
  static SMALL_GRID = Build.MAKE_REPEATER(EventWindow.DIAGONAL4WAY, 4);
  static H_LINE = Build.MAKE_REPEATER([1, 4]);
  static V_LINE = Build.MAKE_REPEATER([2, 3]);

  static MAKE_REPEATER(destinations: EWIndex[], steps?: number) {
    return (ew: EventWindow, multiplier: Function, creator: Function): boolean => {
      const empties = ew.filterByType(destinations, "EMPTY");
      //PROPAGATE
      if (steps) {
        let step = ew.origin.atom.rd("buildStep") ?? 1;
        ew.origin.atom.wr("buildStep", step);

        if (step < steps) {
          ew.mutateMany(empties, multiplier, [{}, { buildStep: step + 1 }]);
        }
      } else {
        ew.mutateMany(empties, multiplier);
      }

      ew.mutate(0, creator);

      return true;
    };
  }
}
