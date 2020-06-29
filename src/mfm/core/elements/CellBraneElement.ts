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

  static CHECK_EDGE = SPLAT.splatToMap(`
     _~~
    _i@o~
     _~~
  `);

  direction: number = 0;
  directions: string[] = ["W", "N", "E", "S"];
  switchInterval: number = 500;
  intervalCounter: number = 0;
  pSwitchDirection = 1000;

  stickyType: IElementType;
  constructor() {
    super(CellBrane.TYPE_DEF);
    this.stickyType = CellBrane.TYPE_DEF;
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
      let swapped: boolean = ew.origin.swapAtoms(ew.getAdjacent8Way(Empty.TYPE_DEF));
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
      // if (!swapped) {
      //   ew.origin.swapAtoms(ew.getAdjacent4Way(Empty.TYPE_DEF));
      // }
    }
  }

  getDirection(): string {
    return this.directions[this.direction];
  }

  repelFrom(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, type, true);

    if (sites[0]) {
      ew.origin.swapAtoms(ew.getSites(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF)[0]);
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

  repelDirection(ew: EventWindow, dir: string) {
    let toMap: number[];

    switch (dir) {
      case "E":
        toMap = [9, 10, 11, 12, 15, 16, 17, 18, 19, 20];
        break;
      case "W":
        toMap = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        break;
      case "N":
        toMap = [9, 10, 11, 12, 13, 14, 15, 17, 19, 20];
        break;
      case "S":
        toMap = [9, 10, 11, 12, 13, 14, 16, 18, 19, 20];
        break;
    }

    Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], toMap);
  }

  exec(ew: EventWindow) {
    // if (++this.intervalCounter % this.switchInterval == 0) {
    //   this.intervalCounter = 0;
    //   this.direction = ++this.direction % this.directions.length;
    // }

    if (Utils.oneIn(this.pSwitchDirection)) {
      this.direction = ++this.direction % this.directions.length;
    } else {
      const nearbyCellBranes = ew.getIndexes(EventWindow.ALLADJACENT, CellBrane.TYPE_DEF, false);

      if (nearbyCellBranes.length > 0 && Utils.oneIn(10)) {
        const otherBrane = ew.getSiteByIndex(Utils.oneRandom(nearbyCellBranes)).atom.elem as CellBrane;

        this.direction = otherBrane.direction;
        // this.intervalCounter = otherBrane.intervalCounter;
      }
    }

    const checkEdge = ew.query(CellBrane.CHECK_EDGE, 0, CellBrane.SPLAT_MAP, Symmetries.ALL);
    if (checkEdge) {
      const empties = checkEdge.get(Empty.TYPE_DEF);
      if (empties.length) {
        ew.swap(Utils.oneRandom(empties));
      }
    }

    if (!this.stickyType || this.stickyType === CellBrane.TYPE_DEF) {
      //glom on to the first thing that's not empty and also maybe don't stick to self if something else is nearby
      const stickSite: Site = ew.getAdjacent8Way(CellBrane.TYPE_DEF);
      if (stickSite && stickSite.atom.type !== Empty.TYPE_DEF) {
        this.stickyType = stickSite.atom.type;
      }
    }

    this.moveToSticker(ew);
    this.moveTo(ew, CellMembrane.TYPE_DEF);
    // this.repelFromSticker(ew);

    //repel DREG as defensive move.
    Actions.repel(ew, DReg.TYPE_DEF);

    //repel RES for experimenting...
    //this.repelType(ew, Res.TYPE_DEF);

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellBrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(CellBrane.TYPE_DEF);
ElementTypes.registerSPLAT("b", CellBrane.TYPE_DEF);
