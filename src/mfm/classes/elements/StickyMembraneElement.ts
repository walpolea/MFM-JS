import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";

export class StickyMembraneElement extends Elem {

  stickyType: IElementType;
  idleCount: number = 0;
  roamCount: number = 0;
  membraneDensity: number;
  maxRoam: number;

  constructor(stickyType?: IElementType, membraneDensity?: number, maxRoam?: number) {
    super(ElementTypes.STICKYMEMBRANE.name, ElementTypes.STICKYMEMBRANE.type);
    this.stickyType = stickyType ? stickyType : undefined;
    this.maxRoam = maxRoam ? maxRoam : 200;
    this.setMembraneDensity(membraneDensity);

  }

  setMembraneDensity(density: number = 1) {
    this.membraneDensity = density * 40 >> 0;
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

  repelFromSticker(ew: EventWindow) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, this.stickyType, true);

    if (sites[0]) {
      ew.origin.swapAtoms(ew.getSites(EventWindow.LAYER2, ElementTypes.EMPTY)[0]);
    }
  }

  repelDreg(ew: EventWindow) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, ElementTypes.DREG, true);
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

  uncrowd(ew: EventWindow) {

    if (ew.getAdjacent4Way(this.stickyType) && ew.getSites(EventWindow.ALLADJACENT, ElementTypes.STICKYMEMBRANE, false).filter(site => site).length > this.membraneDensity) {
      console.log("clearing space");
      ew.origin.killSelf();

    }
  }



  exec(ew: EventWindow) {

    if (this.roamCount > this.maxRoam) {
      ew.origin.killSelf();
    }

    if (this.idleCount > 100) {
      ew.origin.killSelf();
    }

    if (!this.stickyType || this.stickyType === ElementTypes.STICKYMEMBRANE) {

      //glom on to the first thing that's not empty and also maybe don't stick to self if something else is nearby

      const stickSite: Site = ew.getAdjacent8Way();
      if (stickSite && stickSite.atom.type !== ElementTypes.EMPTY) {
        this.stickyType = stickSite.atom.type;
      }


    }

    this.moveToSticker(ew);
    this.repelFromSticker(ew);
    this.uncrowd(ew);
    this.repelDreg(ew);




    super.exec(ew);
  }
}
