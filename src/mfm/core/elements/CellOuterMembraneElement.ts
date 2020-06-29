import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Empty } from "./EmptyElement";
import { DReg } from "./DRegElement";
import { Actions } from "../../utils/MFMActions";
import { Res } from "./ResElement";
import { CellMembrane } from "./CellMembraneElement";

export class CellOuterMembrane extends Elem {
  static TYPE_DEF: IElementType = { name: "STICKY MEMBRANE", type: "Sm", class: CellOuterMembrane, color: 0x983acc };
  static CREATE = CellOuterMembrane.CREATOR();

  stickyType: IElementType;
  idleCount: number = 0;
  roamCount: number = 0;
  membraneDensity: number;
  maxRoam: number;

  constructor(stickyType?: IElementType, membraneDensity?: number, maxRoam?: number) {
    super(CellMembrane.TYPE_DEF);

    this.stickyType = stickyType ? stickyType : undefined;
    this.maxRoam = maxRoam ? maxRoam : 200;
    this.setMembraneDensity(membraneDensity);
  }

  setMembraneDensity(density: number = 1) {
    this.membraneDensity = (density * 40) >> 0;
  }

  moveToSticker(ew: EventWindow) {
    const sites: number[] = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], this.stickyType, true);

    if (sites[0]) {
      const targetSiteIndex: number = sites[0];
      const toSiteIndex: number = ew.getIndexToward(targetSiteIndex);

      const toSite: Site = ew.getSiteByIndex(toSiteIndex);

      if (toSite && toSite.atom.type === Empty.TYPE_DEF) {
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
      const swapped: boolean = ew.origin.swapAtoms(ew.getAdjacent4Way(Empty.TYPE_DEF));

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
      ew.origin.swapAtoms(ew.getSites(EventWindow.LAYER2, Empty.TYPE_DEF)[0]);
    }
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
        if (ew.is(toSite, Empty.TYPE_DEF)) {
          ew.move(toSite, undefined, dreg);
        }
      });
    }
  }

  uncrowd(ew: EventWindow) {
    if (
      ew.getAdjacent4Way(this.stickyType) &&
      ew.getSites(EventWindow.ALLADJACENT, CellOuterMembrane.TYPE_DEF, false).filter((site) => site).length > this.membraneDensity
    ) {
      ew.origin.killSelf();
    }
  }

  exec(ew: EventWindow) {
    if (this.roamCount > this.maxRoam) {
      ew.origin.killSelf();
    }

    if (this.idleCount > 100) {
      // ew.origin.killSelf();
    }

    if (!this.stickyType || this.stickyType === CellOuterMembrane.TYPE_DEF) {
      //glom on to the first thing that's not empty and also maybe don't stick to self if something else is nearby
      const stickSite: Site = ew.getAdjacent8Way(CellOuterMembrane.TYPE_DEF);
      if (stickSite && stickSite.atom.type !== Empty.TYPE_DEF) {
        this.stickyType = stickSite.atom.type;
      }
    }

    this.moveToSticker(ew);
    Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4], [5, 6, 7, 8]);

    //repel DREG as defensive move.
    Actions.repel(ew, DReg.TYPE_DEF);

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellOuterMembrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(CellOuterMembrane.TYPE_DEF);
ElementTypes.registerSPLAT("o", CellOuterMembrane.TYPE_DEF);