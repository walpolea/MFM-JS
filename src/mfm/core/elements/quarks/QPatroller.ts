import { EventWindow } from "../../EventWindow";
import { Empty } from "../EmptyElement";
import { Utils } from "../../../utils/MFMUtils";

export class QPatroller {

  patrol(ew: EventWindow, withinSites: number[] = EventWindow.ADJACENT4WAY, chanceToPatrol: number = 1) {
    if (Utils.oneIn(chanceToPatrol)) {
      const emptyIndex: number = ew.getIndexes(withinSites, Empty.TYPE_DEF, true)[0];
      emptyIndex !== undefined ? ew.move(emptyIndex) : null;
    }
  }
}