import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { Utils } from "../utils/MFMUtils";
import { Atom } from "../core/Atom";
import { Empty } from "./EmptyElement";
import { StickyMembrane } from "./StickyMembraneElement";
import { LoopWorm } from "./LoopWormElement";
import { Res } from "./ResElement";

export class LoopNucleus extends Element {
  static BASE_TYPE: IElementType = { name: "LOOPNUCLEUS", symbol: "Ln", class: LoopNucleus, color: 0xcece24 };

  pCREATE_RES: number = 4;
  pCREATE_MEMBRANE: number = 20;
  aloneCount: number = 0;

  constructor() {
    super(LoopNucleus.BASE_TYPE);
  }

  repelType(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, type, true);
    const eightwaypushmap: Map<number, number> = new Map<number, number>([
      [1, 37],
      [2, 38],
      [3, 39],
      [4, 40],
      [5, 25],
      [6, 26],
      [7, 27],
      [8, 28],
    ]);

    if (sites.length) {
      sites.forEach((dreg) => {
        const toSite: number = eightwaypushmap.get(dreg);
        if (ew.is(toSite, Empty.BASE_TYPE)) {
          ew.move(toSite, undefined, dreg);
        }
      });
    }
  }

  eatStickyMembrane(ew: EventWindow) {
    ew.getSites(EventWindow.ADJACENT8WAY, StickyMembrane.BASE_TYPE).forEach((st) => {
      if (st) st.die();
    });
  }

  exec(ew: EventWindow) {
    //this.repelType(ew, StickyMembrane.BASE_TYPE);
    this.eatStickyMembrane(ew);

    if (ew.getAll(LoopWorm.BASE_TYPE).length === 0) {
      this.aloneCount++;
    } else {
      this.aloneCount = 0;
    }

    //if the loop dies the nucleus should die at some point, also if the loop gets too big
    if (this.aloneCount > 100) {
      ew.origin.die();
    }

    if (Utils.oneIn(this.pCREATE_RES)) {
      ew.origin.mutateSite(ew.getAdjacent4Way(Empty.BASE_TYPE), new Atom(Res.BASE_TYPE, undefined, undefined, 0x336600));
    }

    //create a new membrane if none are around and chance
    // if (Utils.oneIn(this.pCREATE_MEMBRANE)) {
    //   ew.origin.mutateSite(ew.getAdjacent4Way(Empty.BASE_TYPE), new Atom(StuckMembrane.BASE_TYPE, [LoopWorm.BASE_TYPE, 0.8, 1]));
    // }

    //move
    ew.origin.swapAtoms(ew.getAdjacent4Way(Empty.BASE_TYPE));

    super.exec(ew);
  }
}
