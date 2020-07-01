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
import { StickyMembrane } from "./StickyMembraneElement";

export class CellMembrane extends Elem {
  static TYPE_DEF: IElementType = { name: "CELL MEMBRANE", type: "Cm", class: CellMembrane, color: 0xc2c2c2 };
  static CREATE = CellMembrane.CREATOR();

  static MAKE_SHELL = SPLAT.splatToMap(`
      ~
     ~~_
    ~~~__
   ~~~~___
  ~~~~@~~~~
   ~~i~~~~
    ~~~~~
     ~~~
      ~
  `);

  // static MAKE_SHELL = SPLAT.splatToMap(`
  //   ~~~~___
  //  ~iii@____
  //   ~~~~~~~
  // `);

  // static MAKE_SHELL = SPLAT.splatToMap(`
  //  iii@___
  // `);

  static SHELL_GAP = SPLAT.splatToMap(`
   ~~~o~  
  ~~i@__~
   ~~~o~
  `);

  static CHECK_SPLIT = SPLAT.splatToMap(`
    ~~~@oii
  `);

  idleCount: number = 0;
  roamCount: number = 0;
  shouldGrow: boolean = true;
  direction: string = "";
  directed: boolean = false;
  switchInterval: number = 10;
  intervalCounter: number = 0;
  showColors: boolean;

  stickyType: IElementType;
  constructor(_showColors: boolean = true) {
    super(CellMembrane.TYPE_DEF);

    this.stickyType = CellMembrane.TYPE_DEF;
    this.showColors = _showColors;
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
    let toMap = new Map<string, Array<number>>([
      ["E", [15, 16, 17, 18, 19, 20, 24]],
      ["W", [13, 14, 15, 16, 17, 18, 21]],
      ["N", [13, 14, 15, 17, 19, 20, 22]],
      ["S", [13, 14, 16, 18, 19, 20, 23]],
      ["", [13, 14, 15, 16, 17, 18, 19, 20]],
    ]);

    // let toMap = new Map<string, Array<number>>([
    //   ["E", [17, 18, 19, 20, 24]],
    //   ["W", [13, 14, 15, 16, 21]],
    //   ["N", [13, 15, 17, 19, 22]],
    //   ["S", [14, 16, 18, 20, 23]],
    //   ["", [13, 14, 15, 16, 17, 18, 19, 20]],
    // ]);

    Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, ...toMap.get(dir)]);
  }

  uncrowd(ew: EventWindow) {
    if (ew.getAdjacent8Way(this.stickyType) && ew.getSites(EventWindow.ALLADJACENT, CellMembrane.TYPE_DEF, false).filter((site) => site).length > 38) {
      ew.origin.killSelf();
    }
  }

  setDirectionColor() {
    switch (this.direction) {
      case "E":
        this.color = 0x1c5183;
        break; //pink
      case "W":
        this.color = 0xb73a26;
        break; //green
      case "N":
        this.color = 0x2a8240;
        break; //blue
      case "S":
        this.color = 0x961c54;
        break; //yellow
      default:
        this.color = CellMembrane.TYPE_DEF.color;
        break;
    }
  }

  getDirectionFromOuters(ew: EventWindow, nearbyOuters: number[]) {
    const suggestedDirections = ew
      .getSites(nearbyOuters, CellOuterMembrane.TYPE_DEF, false)
      .map((co) => (co.atom.elem as CellOuterMembrane).suggestedDirection)
      .filter((sd) => sd !== "");

    if (suggestedDirections.length > 0) {
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
          this.direction = key;
        }
      }
    }
  }

  exec(ew: EventWindow) {
    //this.directed = false;
    //this.direction = "";

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

    //am I small and undeveloped? grow!
    if (this.shouldGrow && nearbyCellMembranes.length < 24 && nearbyOuterCellMembranes.length == 0) {
      ew.mutate(nearbyEmpties.shift(), CellMembrane.CREATE([this.showColors]));
      return;
    } else {
      this.shouldGrow = false;
    }

    //grow if no empties around and outer is around - possibly too small to get moving.
    // if (nearbyEmpties.length == 0 && nearbyOuterCellMembranes.length > 0) {
    //   this.shouldGrow = true;
    // }

    const nearbyBrane = ew.getRandomIndexOfType(EventWindow.ALLADJACENT, CellBrane.TYPE_DEF);

    //find a direction to travel
    if (nearbyBrane !== undefined) {
      this.direction = (ew.getSiteByIndex(nearbyBrane).atom.elem as CellBrane).getDirection();
      this.directed = true;
    } else {
      const nearbyDirected = nearbyCellMembranes.filter((cm) => (ew.getSiteByIndex(cm).atom.elem as CellMembrane).directed);

      if (nearbyOuterCellMembranes.length > 23) {
        this.getDirectionFromOuters(ew, nearbyOuterCellMembranes);
        this.directed = true;
      } else if (nearbyDirected.length) {
        this.direction = (ew.getSiteByIndex(Utils.oneRandom(nearbyDirected)).atom.elem as CellMembrane).direction;
        this.directed = true;
      } else {
        this.directed = false;
      }
    }

    if (this.showColors) this.setDirectionColor();

    //These should be closer to the center of the cell
    if (nearbyCellMembranes.length > 20) {
      this.repelDirection(ew, this.direction);
    }

    //am I an edge? Make some outer membrane please
    const checkEdge = ew.query(CellMembrane.MAKE_SHELL, 0, ElementTypes.SPLAT_MAP, Symmetries.ALL);
    if (checkEdge) {
      const edgeEmpties = checkEdge.get(Empty.TYPE_DEF);
      while (edgeEmpties.length) {
        ew.mutate(edgeEmpties.shift(), CellOuterMembrane.CREATE([CellMembrane.TYPE_DEF, 1, 3, this.showColors]));
      }
    }

    //there's a gap in the outer membrane, help boost it up
    const checkShellGap = ew.query(CellMembrane.SHELL_GAP, 0, ElementTypes.SPLAT_MAP, Symmetries.ALL);
    if (checkShellGap) {
      const gapEmpties = checkShellGap.get(Empty.TYPE_DEF);
      while (gapEmpties.length) {
        ew.mutate(gapEmpties.shift(), CellOuterMembrane.CREATE([CellMembrane.TYPE_DEF, 1, 3, this.showColors]));
      }
    }

    //eat outermembrane that got too close inside
    const checkSplit = ew.query(CellMembrane.CHECK_SPLIT, 0, ElementTypes.SPLAT_MAP, Symmetries.ALL);
    if (checkSplit) {
      const possibleSticky = checkSplit.get(CellOuterMembrane.TYPE_DEF);
      if (possibleSticky.length) {
        ew.destroy(possibleSticky[0]);
      }
    }

    //repel DREG as defensive move.
    // Actions.repel(ew, DReg.TYPE_DEF);

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellMembrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(CellMembrane.TYPE_DEF);
ElementTypes.registerSPLAT("i", CellMembrane.TYPE_DEF);
