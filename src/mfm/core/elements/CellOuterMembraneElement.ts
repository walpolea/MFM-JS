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
import { Utils } from "../../utils/MFMUtils";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { DecayWall } from "./DecayWallElement";
import { StickyMembrane } from "./StickyMembraneElement";

export class CellOuterMembrane extends Elem {
  static TYPE_DEF: IElementType = { name: "CELL OUTER MEMBRANE", type: "Co", class: CellOuterMembrane, color: 0x983acc };
  static CREATE = CellOuterMembrane.CREATOR();

  static CHECK_THIN = SPLAT.splatToMap(`
    ~_@ii
  `);

  static CHECK_THIN2 = SPLAT.splatToMap(`
    ~i@o_
  `);

  static CHECK_FOREIGNCELL = SPLAT.splatToMap(`
    i~~~@___o
  `);

  stickyType: IElementType;
  idleCount: number = 0;
  roamCount: number = 0;
  membraneDensity: number;
  maxRoam: number;

  constructor(stickyType?: IElementType, membraneDensity?: number, maxRoam?: number) {
    super(CellMembrane.TYPE_DEF);

    this.stickyType = stickyType ? stickyType : undefined;
    this.maxRoam = maxRoam ? maxRoam : 1;
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
      ew.origin.killSelf();
    }

    if (!this.stickyType || this.stickyType === CellOuterMembrane.TYPE_DEF) {
      //glom on to the first thing that's not empty and also maybe don't stick to self if something else is nearby
      const stickSite: Site = ew.getAdjacent8Way(CellOuterMembrane.TYPE_DEF);
      if (stickSite && stickSite.atom.type !== Empty.TYPE_DEF) {
        this.stickyType = stickSite.atom.type;
      }
    }

    this.moveToSticker(ew);

    if (Utils.oneIn(50)) {
      // Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4], [5, 6, 7, 8]);
      Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
      return;
    }

    //repel DREG as defensive move.
    Actions.repel(ew, DReg.TYPE_DEF);

    const nearbyRes = ew.getIndexes(EventWindow.ADJACENT8WAY, Res.TYPE_DEF, false);
    const nearbyCM = ew.getIndexes(EventWindow.ADJACENT8WAY, CellMembrane.TYPE_DEF, false);
    const nearbyCOM = ew.getIndexes(EventWindow.ALLADJACENT, CellOuterMembrane.TYPE_DEF, false);

    //too many surrounding CellMembrane - die
    if (nearbyCM.length > 6) {
      ew.origin.killSelf();
      return;
    }

    //too many surrounding CellMembrane - die
    if (ew.getIndexes(EventWindow.LAYER2, CellMembrane.TYPE_DEF, false).length > 6) {
      ew.origin.killSelf();
      return;
    }

    //too many nearby OuterMembrane - die
    if (nearbyCOM.length > 25) {
      ew.origin.killSelf();
      return;
    }

    const checkThin = ew.query(CellOuterMembrane.CHECK_THIN, 0, ElementTypes.SPLAT_MAP, Symmetries.ALL);
    if (checkThin) {
      ew.mutate(checkThin.get(Empty.TYPE_DEF)[0], CellOuterMembrane.CREATE());
    }

    const checkThin2 = ew.query(CellOuterMembrane.CHECK_THIN2, 0, ElementTypes.SPLAT_MAP, Symmetries.ALL);
    if (checkThin2) {
      ew.mutate(checkThin2.get(Empty.TYPE_DEF)[0], CellOuterMembrane.CREATE());
    }

    // if (nearbyCM.length == 0 && nearbyEmpty.length < 3) {
    //   ew.origin.killSelf();
    // }

    while (nearbyRes.length) {
      ew.mutate(nearbyRes.shift(), CellOuterMembrane.CREATE());
    }

    // const checkForeign = ew.query(CellOuterMembrane.CHECK_FOREIGNCELL, 0, ElementTypes.SPLAT_MAP, Symmetries.ALL);
    // if (checkForeign) {
    //   // ew.mutate(checkForeign.get(CellOuterMembrane.TYPE_DEF)[0], DecayWall.CREATE([100]));
    //   ew.mutate(checkForeign.get(Empty.TYPE_DEF)[0], DecayWall.CREATE());
    //   ew.mutate(checkForeign.get(Empty.TYPE_DEF)[1], DecayWall.CREATE());
    //   ew.mutate(checkForeign.get(Empty.TYPE_DEF)[2], DecayWall.CREATE());
    // }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellOuterMembrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(CellOuterMembrane.TYPE_DEF);
ElementTypes.registerSPLAT("o", CellOuterMembrane.TYPE_DEF);
