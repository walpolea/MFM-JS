import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Empty } from "./EmptyElement";
import { DReg } from "./DRegElement";
import { Actions } from "../../utils/MFMActions";
import { CellOuterMembrane } from "./CellOuterMembraneElement";
import { CellMembrane } from "./CellMembraneElement";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Utils } from "../../utils/MFMUtils";

export class CellBrane extends Elem {
  static TYPE_DEF: IElementType = { name: "CELL BRANE", type: "Cb", class: CellBrane, color: 0x128575 };
  static CREATE = CellBrane.CREATOR();

  static CHECK_OUTER = SPLAT.splatToMap(`
    ~o~
    o@o
    ~o~
  `);

  static CHECK_EDGE = SPLAT.splatToMap(`
    ~~~
    o@i
    ~~~
  `);

  static CHECK_OUTSIDE = SPLAT.splatToMap(`
    ~~~
    _@_
    ~_~
  `);

  direction: number = 0;
  directions: string[] = ["W", "N", "E", "S"];
  pSwitchDirection = 500;

  stickyType: IElementType;
  constructor() {
    super(CellBrane.TYPE_DEF);
    this.stickyType = CellBrane.TYPE_DEF;
    this.direction = Utils.oneRandom([0, 1, 2, 3]);
  }

  moveTo(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], type, true);

    if (sites[0]) {
      const targetSiteIndex: number = sites[0];
      const toSiteIndex: number = ew.getIndexToward(targetSiteIndex);

      const toSite: Site = ew.getSiteByIndex(toSiteIndex);

      if (toSite && toSite.atom.type === Empty.TYPE_DEF) {
        const swapped: boolean = ew.origin.swapAtoms(toSite);
      }
    } else {
      //roam
      let swapped: boolean = ew.origin.swapAtoms(ew.getAdjacent8Way(CellMembrane.TYPE_DEF));
    }
  }

  moveToSticker(ew: EventWindow) {
    const sites: number[] = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], this.stickyType, true);

    if (sites[0]) {
      const targetSiteIndex: number = sites[0];
      const toSiteIndex: number = ew.getIndexToward(targetSiteIndex);

      const toSite: Site = ew.getSiteByIndex(toSiteIndex);

      if (toSite && toSite.atom.type === Empty.TYPE_DEF) {
        const swapped: boolean = ew.origin.swapAtoms(toSite);
      }
    } else {
      //roam
      let swapped: boolean = ew.origin.swapAtoms(ew.getAdjacent8Way(CellMembrane.TYPE_DEF));
    }
  }

  getDirection(): string {
    return this.directions[this.direction];
  }

  repelFrom(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, type, true);

    if (sites[0]) {
      ew.origin.swapAtoms(ew.getSites(EventWindow.ADJACENT8WAY, CellMembrane.TYPE_DEF)[0]);
    }
  }

  repelFromSticker(ew: EventWindow) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, this.stickyType, true);

    if (sites[0]) {
      ew.origin.swapAtoms(ew.getSites(EventWindow.LAYER2, CellMembrane.TYPE_DEF)[0]);
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

  repelDirection(ew: EventWindow, dir: string) {
    let toMap = new Map<string, Array<number>>([
      ["E", [12]],
      ["W", [9]],
      ["N", [10]],
      ["S", [11]],
    ]);

    Actions.repelFrom(ew, Empty.TYPE_DEF, [1, 2, 3, 4], [5, 6, 7, 8, ...toMap.get(dir)]);
  }

  getDirectionFromOuters(ew: EventWindow, nearbyOuters: number[]) {
    const suggestedDirections = ew.getSites(nearbyOuters).map((co) => (co.atom.elem as CellOuterMembrane).suggestedDirection);

    if (suggestedDirections.filter((sd) => sd === "").length > 2) {
      return;
    } else {
      const directionMap: {} = {
        N: suggestedDirections.filter((sd) => sd == "N").length,
        S: suggestedDirections.filter((sd) => sd == "S").length,
        E: suggestedDirections.filter((sd) => sd == "E").length,
        W: suggestedDirections.filter((sd) => sd == "W").length,
      };

      let biggestDir: number = 0;

      for (const [key, value] of Object.entries(directionMap)) {
        if (value > 0 && value >= biggestDir) {
          biggestDir = value as number;
          this.direction = this.directions.indexOf(key);
        }
      }
    }
  }

  getDirectionFromBranes(ew: EventWindow, nearbyCellBranes: number[]) {
    const otherBrane = ew.getSiteByIndex(Utils.oneRandom(nearbyCellBranes)).atom.elem as CellBrane;
    this.direction = otherBrane.direction % this.directions.length;
    // this.direction = (otherBrane.direction +2) % this.directions.length; //Mitosis
  }

  exec(ew: EventWindow) {
    //the Big Bang
    const nearbyMembranes = ew.getIndexes(EventWindow.ALLADJACENT, CellMembrane.TYPE_DEF, false);
    if (nearbyMembranes.length == 0) {
      ew.mutate(ew.getNearestIndex(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF), CellMembrane.CREATE());
      return;
    }

    //Possible Direction Change
    if (Utils.oneIn(this.pSwitchDirection)) {
      // this.direction = ++this.direction % this.directions.length;
      //this.direction = Utils.oneRandom([0, 1, 2, 3]);
    } else {
      const nearbyCellBranes = ew.getIndexes(EventWindow.ALLADJACENT, CellBrane.TYPE_DEF, false);
      const nearbyOuters = ew.getIndexes(EventWindow.ALLADJACENT, CellOuterMembrane.TYPE_DEF, false);

      if (nearbyCellBranes.length > 0) {
        this.getDirectionFromBranes(ew, nearbyCellBranes);
      } else if (nearbyOuters.length > 0) {
        this.getDirectionFromOuters(ew, nearbyOuters);
      }
    }

    const checkOuter = ew.query(CellBrane.CHECK_OUTER, 3, CellBrane.SPLAT_MAP, Symmetries.ALL);
    if (checkOuter) {
      ew.swap(Utils.oneRandom(nearbyMembranes));
      return;
    }

    const checkOutside = ew.query(CellBrane.CHECK_OUTSIDE, 0, CellBrane.SPLAT_MAP, Symmetries.ALL);
    if (checkOutside) {
      const cms = ew.getIndexes(EventWindow.ALLADJACENT, CellMembrane.TYPE_DEF, false);

      if (cms.length) {
        ew.swap(Utils.oneRandom(cms));
        return;
      }
    }

    const checkEdge = ew.query(CellBrane.CHECK_EDGE, 0, CellBrane.SPLAT_MAP, Symmetries.ALL);
    if (checkEdge) {
      const cms = checkEdge.get(CellMembrane.TYPE_DEF);
      if (cms.length) {
        ew.swap(Utils.oneRandom(cms));
        return;
      }
    }

    this.repelDirection(ew, this.directions[this.direction]);

    // this.moveToSticker(ew);
    // this.moveTo(ew, CellBrane.TYPE_DEF);
    // this.repelFrom(ew, CellOuterMembrane.TYPE_DEF);

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellBrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(CellBrane.TYPE_DEF);
ElementTypes.registerSPLAT("b", CellBrane.TYPE_DEF);
