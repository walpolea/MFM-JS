import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { MFMUtils } from "../../utils/utils";

export class StickyMembraneElement extends Elem {

  pKILL_NEIGHBOR: number = 5000;
  stickyType: IElementType;
  idleCount: number = 0;
  roamCount: number = 0;

  constructor(stickyType?: IElementType) {
    super(ElementTypes.STICKYMEMBRANE.name, ElementTypes.STICKYMEMBRANE.type);
    this.stickyType = stickyType ? stickyType : undefined;
  }

  moveToSticker(ew: EventWindow) {

    const sites: number[] = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], this.stickyType, true);

    if (sites[0]) {
      const targetSiteIndex: number = sites[0];
      const toSiteIndex: number = ew.getIndexToward(targetSiteIndex);

      const toSite: Site = ew.getSiteByIndex(toSiteIndex);

      if (toSite && toSite.atom.type === ElementTypes.EMPTY) {
        const swapped: boolean = ew.origin.swapAtoms(toSite);

        if (!swapped) {
          this.idleCount++;
        } else {
          this.idleCount = 0;
        }

        this.roamCount = 0;
      }
    } else {
      //roam
      const swapped: boolean = ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));

      if (!swapped) {
        this.idleCount++;
      } else {
        this.idleCount = 0;

        this.roamCount++;
      }

    }


  }

  killThyNeighbor(ew: EventWindow) {
    if (ew.getAdjacent4Way(ElementTypes.STICKYMEMBRANE)) {
      ew.origin.killAtom(ew.getAdjacent4Way(ElementTypes.STICKYMEMBRANE));
    }

  }


  exec(ew: EventWindow) {

    if (this.roamCount > 200) {
      ew.origin.killSelf();
    }

    if (this.idleCount > 100) {
      ew.origin.killSelf();
    }

    if (!this.stickyType) {

      //glom on to anything (not empty);

    } else {

      this.moveToSticker(ew);

    }

    if (MFMUtils.oneIn(this.pKILL_NEIGHBOR)) {
      //this.killThyNeighbor(ew);
    }

    super.exec(ew);
  }
}
