import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { StickyMembrane } from "./StickyMembraneElement";
import { LoopWorm } from "./LoopWormElement";
import { Res } from "./ResElement";

export class LoopNucleus extends Elem {

  static TYPE_DEF: IElementType = { name: "LOOP NUCLEUS", type: "Ln", class: LoopNucleus, color: 0xcece24 }

  pCREATE_RES: number = 4;
  pCREATE_MEMBRANE: number = 20;
  aloneCount: number = 0;

  constructor() {
    super(LoopNucleus.TYPE_DEF);
  }

  repelType(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, type, true);
    const eightwaypushmap: Map<number, number> = new Map<number, number>([
      [1, 37], [2, 38], [3, 39], [4, 40], [5, 25], [6, 26], [7, 27], [8, 28]
    ]);

    if (sites.length) {
      sites.forEach(dreg => {
        const toSite: number = eightwaypushmap.get(dreg);
        if (ew.is(toSite, Empty.TYPE_DEF)) {
          ew.move(toSite, undefined, dreg);
        }
      });
    }
  }

  eatStickyMembrane(ew: EventWindow) {
    ew.getSites(EventWindow.ADJACENT8WAY, StickyMembrane.TYPE_DEF).forEach(st => {
      if (st) st.killSelf();
    })
  }

  exec(ew: EventWindow) {

    //this.repelType(ew, StickyMembrane.TYPE_DEF);
    this.eatStickyMembrane(ew);

    if (ew.getAll(LoopWorm.TYPE_DEF).length === 0) {
      this.aloneCount++;
    } else {
      this.aloneCount = 0;
    }

    //if the loop dies the nucleus should die at some point, also if the loop gets too big
    if (this.aloneCount > 100) {
      ew.origin.killSelf();
    }


    if (Utils.oneIn(this.pCREATE_RES)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(Empty.TYPE_DEF), new Atom(Res.TYPE_DEF, undefined, undefined, 0x336600));
    }

    //create a new membrane if none are around and chance
    // if (Utils.oneIn(this.pCREATE_MEMBRANE)) {
    //   ew.origin.mutateSite(ew.getAdjacent4Way(Empty.TYPE_DEF), new Atom(StuckMembrane.TYPE_DEF, [LoopWorm.TYPE_DEF, 0.8, 1]));
    // }

    //move
    ew.origin.swapAtoms(ew.getAdjacent4Way(Empty.TYPE_DEF));

    super.exec(ew);
  }
}
