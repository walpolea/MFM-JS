import { EventWindow } from "../classes/EventWindow";
import { Utils } from "./MFMUtils";
import { Empty } from "../classes/elements/EmptyElement";
import { IElementType } from "../classes/ElementTypes";

export class Actions {


  static patrol(ew: EventWindow, withinSet: number[] = EventWindow.ADJACENT4WAY, pChance: number = 1): boolean {

    if (Utils.oneIn(pChance)) {
      const ei: number = ew.getIndexes(withinSet, Empty.TYPE_DEF, true)[0];

      if (ei) {
        ew.move(ei);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  static repel(ew: EventWindow, type: IElementType, fromSet: number[] = [1, 2, 3, 4, 5, 6, 7, 8], toSet: number[] = [37, 38, 39, 40, 25, 26, 27, 28]) {

    if (fromSet.length > toSet.length) {
      throw (new Error("fromSet must be less than or equal to length of toSet"))
    }

    const sites: number[] = ew.getIndexes(fromSet, type);
    if (sites.length) {

      //make Repel Map
      const repelMap: Map<number, number> = new Map<number, number>();
      for (let i = 0; i < fromSet.length; i++) {
        repelMap.set(fromSet[i], toSet[i]);
      }

      sites.forEach(target => {
        const toSite: number = repelMap.get(target);
        //try to repel in the opposing direction
        if (ew.is(toSite, Empty.TYPE_DEF)) {
          ew.move(toSite, undefined, target);
        }
        //otherwise just repel it anywhere available in the toSet!
        else if (ew.getIndexes(toSet, type).length) {
          ew.move(ew.getIndexes(toSet, type, true)[0], undefined, target);
        }
      });
    }

  }

  static repelFrom(ew: EventWindow, type: IElementType, fromSet: number[] = [1, 2, 3, 4, 5, 6, 7, 8], toSet: number[] = [9, 10, 11, 12, 25, 26, 27, 28], repellingTarget: number = 0): boolean {

    if (fromSet.length > toSet.length) {
      throw (new Error("fromSet must be less than or equal to length of toSet"))
    }

    const repellent: number = ew.getIndexes(fromSet, type, true)[0];

    if (repellent) {

      //make Repel Map
      const repelMap: Map<number, number> = new Map<number, number>();
      for (let i = 0; i < fromSet.length; i++) {
        repelMap.set(fromSet[i], toSet[i]);
      }

      const targetIndexFromRepellent = ew.getRelativeIndexFromSiteToSite(repellingTarget, repellent);
      const destinationIndex: number = repelMap.get(targetIndexFromRepellent);

      //try to repel in the opposing direction
      if (destinationIndex !== undefined && ew.is(destinationIndex, Empty.TYPE_DEF)) {
        ew.move(repelMap.get(destinationIndex), undefined, repellingTarget);
        return true;
      }
      //otherwise just repel it anywhere available in the toSet!
      else if (ew.getIndexes(toSet, Empty.TYPE_DEF).length) {
        ew.move(ew.getIndexes(toSet, Empty.TYPE_DEF, true)[0], undefined, repellingTarget)
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }

  }
}