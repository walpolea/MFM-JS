import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { MFMUtils } from "../../utils/utils";
import { Atom } from "../Atom";
import { Site } from "../Site";

export class LoopNucleusElement extends Elem {

  pCREATE_RES: number = 2;
  pCREATE_MEMBRANE: number = 20;
  aloneCount: number = 0;

  constructor() {
    super(ElementTypes.LOOPNUCLEUS.name, ElementTypes.LOOPNUCLEUS.type);
  }

  repelType(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, type, true);
    const eightwaypushmap: Map<number, number> = new Map<number, number>([
      [1, 37], [2, 38], [3, 39], [4, 40], [5, 25], [6, 26], [7, 27], [8, 28]
    ]);

    if (sites.length) {
      sites.forEach(dreg => {
        const toSite: number = eightwaypushmap.get(dreg);
        if (ew.is(toSite, ElementTypes.EMPTY)) {
          ew.move(toSite, undefined, dreg);
        }
      });
    }
  }

  eatStickyMembrane(ew: EventWindow) {
    ew.getSites(EventWindow.ADJACENT8WAY, ElementTypes.STICKYMEMBRANE).forEach(st => {
      if (st) st.killSelf();
    })
  }

  exec(ew: EventWindow) {

    //this.repelType(ew, ElementTypes.STICKYMEMBRANE);
    this.eatStickyMembrane(ew);

    if (ew.getAll(ElementTypes.LOOPWORM).length === 0) {
      this.aloneCount++;
    } else {
      this.aloneCount = 0;
    }

    //if the loop dies the nucleus should die at some point, also if the loop gets too big
    if (this.aloneCount > 100) {
      ew.origin.killSelf();
    }


    if (MFMUtils.oneIn(this.pCREATE_RES)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(ElementTypes.EMPTY), new Atom(ElementTypes.RES, undefined, undefined, 0x336600));
    }

    //create a new membrane if none are around and chance
    // if (MFMUtils.oneIn(this.pCREATE_MEMBRANE)) {
    //   ew.origin.mutateSite(ew.getAdjacent4Way(ElementTypes.EMPTY), new Atom(ElementTypes.STUCKMEMBRANE, [ElementTypes.LOOPWORM, 0.8, 1]));
    // }

    //move
    ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));

    super.exec(ew);
  }
}
