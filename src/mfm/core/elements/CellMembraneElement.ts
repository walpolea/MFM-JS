import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Empty } from "./EmptyElement";
import { DReg } from "./DRegElement";
import { Actions } from "../../utils/MFMActions";
import { StuckMembrane } from "./StuckMembraneElement";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { CellOuterMembrane } from "./CellOuterMembraneElement";
import { utils } from "pixi.js";
import { Utils } from "../../utils/MFMUtils";
import { DecayWall } from "./DecayWallElement";
import { CellBrane } from "./CellBraneElement";

export class CellMembrane extends Elem {
  static TYPE_DEF: IElementType = { name: "CELL MEMBRANE", type: "Cm", class: CellMembrane, color: 0x983a75 };
  static CREATE = CellMembrane.CREATOR();

  static MAKE_SHELL = SPLAT.splatToMap(`
      ~
     ~~~
    ~~~__
   ~~~~___
  ~~~~@~~~~
   ~~#~~~~
    ~~~~~
     ~~~
      ~
  `);

  static SHELL_GAP = SPLAT.splatToMap(`
   ~~~s~  
  ~~#@___
   ~~~s~
  `);

  static CHECK_SPLIT = SPLAT.splatToMap(`
    ~~~@o##
  `);

  idleCount: number = 0;
  roamCount: number = 0;
  shouldGrow: boolean = true;
  direction: string = "";
  directed: boolean = false;
  switchInterval: number = 10;
  intervalCounter: number = 0;

  stickyType: IElementType;
  constructor() {
    super(CellMembrane.TYPE_DEF);

    this.stickyType = CellMembrane.TYPE_DEF;
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
      default:
        toMap = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        break;
    }

    Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], toMap);
  }

  exec(ew: EventWindow) {
    this.directed = false;
    this.direction = "";

    if (!this.stickyType || this.stickyType === CellMembrane.TYPE_DEF) {
      //glom on to the first thing that's not empty and also maybe don't stick to self if something else is nearby
      const stickSite: Site = ew.getAdjacent8Way(CellMembrane.TYPE_DEF);
      if (stickSite && stickSite.atom.type !== Empty.TYPE_DEF) {
        this.stickyType = stickSite.atom.type;
      }
    }

    this.moveToSticker(ew);

    const nearbyCellMembranes = ew.getIndexes(EventWindow.ALLADJACENT, CellMembrane.TYPE_DEF, false);
    const nearbyOuterCellMembranes = ew.getIndexes(EventWindow.ALLADJACENT, CellOuterMembrane.TYPE_DEF, false);
    const nearbyEmpties = ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF, false);
    const nearbyBrane = ew.getRandomIndexOfType(EventWindow.ALLADJACENT, CellBrane.TYPE_DEF);

    if (nearbyBrane !== undefined) {
      this.direction = (ew.getSiteByIndex(nearbyBrane).atom.elem as CellBrane).getDirection();
      this.directed = true;
    } else {
      const nearbyDirected = nearbyCellMembranes.filter((cm) => (ew.getSiteByIndex(cm).atom.elem as CellMembrane).directed);

      if (nearbyDirected.length) {
        this.direction = (ew.getSiteByIndex(Utils.oneRandom(nearbyDirected)).atom.elem as CellMembrane).direction;
        this.directed = true;
      } else {
        this.directed = false;
      }
    }

    if (nearbyCellMembranes.length > 26) {
      // Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
      this.repelDirection(ew, this.direction);
    }

    if (this.shouldGrow && nearbyCellMembranes.length < 24 && nearbyOuterCellMembranes.length == 0) {
      ew.mutate(Utils.oneRandom(nearbyEmpties), CellMembrane.CREATE());
      return;
    } else {
      this.shouldGrow = false;
    }

    const checkEdge = ew.query(CellMembrane.MAKE_SHELL, 0, CellMembrane.SPLAT_MAP, Symmetries.ALL);
    if (checkEdge) {
      const edgeEmpties = checkEdge.get(Empty.TYPE_DEF);

      while (edgeEmpties.length) {
        ew.mutate(edgeEmpties.shift(), CellOuterMembrane.CREATE([CellMembrane.TYPE_DEF, 1, 10]));
      }
    }

    const checkSplit = ew.query(CellMembrane.CHECK_SPLIT, 0, CellMembrane.SPLAT_MAP, Symmetries.ALL);
    if (checkSplit) {
      console.log(checkSplit);
      const possibleSticky = checkSplit.get(CellOuterMembrane.TYPE_DEF);
      if (possibleSticky.length) {
        ew.destroy(possibleSticky[0]);
      }
    }

    const checkShellGap = ew.query(CellMembrane.SHELL_GAP, 0, CellMembrane.SPLAT_MAP, Symmetries.ALL);
    if (checkShellGap) {
      const gapEmpties = checkShellGap.get(Empty.TYPE_DEF);

      while (gapEmpties.length) {
        ew.mutate(gapEmpties.shift(), CellOuterMembrane.CREATE([CellMembrane.TYPE_DEF, 1, 10]));
      }
    }

    //repel DREG as defensive move.
    Actions.repel(ew, DReg.TYPE_DEF);

    //repel RES for experimenting...
    //this.repelType(ew, Res.TYPE_DEF);

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellMembrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(CellMembrane.TYPE_DEF);
ElementTypes.registerSPLAT("i", CellOuterMembrane.TYPE_DEF);
