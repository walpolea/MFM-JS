import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Site } from "../core/Site";
import { Empty } from "./EmptyElement";
import { DReg } from "./DRegElement";
import { Actions } from "../utils/MFMActions";
import { CellOuterMembrane } from "./CellOuterMembraneElement";
import { CellMembrane } from "./CellMembraneElement";
import { SPLAT } from "../utils/SPLAT";
import { Symmetries } from "../utils/Symmetries";
import { Utils } from "../utils/MFMUtils";

export class CellBrane extends Element {
  static BASE_TYPE: IElementType = { name: "CELLBRANE", symbol: "Cb", class: CellBrane, color: 0x128575 };
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

  static CHECK_FOREIGN = SPLAT.splatToMap(`
    ~~~~@xxxx
  `);

  showColors: boolean;
  direction: number = 0;
  directions: string[] = ["W", "N", "E", "S"];
  pSwitchDirection = 1;
  changeDelay = 10;
  changeCounter = 0;

  stickyType: IElementType;
  constructor(_showColors: boolean = true) {
    super(CellBrane.BASE_TYPE);

    CellBrane.SPLAT_MAP.set("i", CellMembrane.BASE_TYPE);
    CellBrane.SPLAT_MAP.set("o", CellOuterMembrane.BASE_TYPE);

    CellBrane.SPLAT_MAP.set("m", (t: IElementType) => {
      return t === CellOuterMembrane.BASE_TYPE || t === CellMembrane.BASE_TYPE || t === CellBrane.BASE_TYPE ? t : undefined;
    });

    CellBrane.SPLAT_MAP.set("x", (t: IElementType) => {
      return t !== Empty.BASE_TYPE && t !== CellOuterMembrane.BASE_TYPE && t !== CellMembrane.BASE_TYPE && t !== CellBrane.BASE_TYPE ? t : undefined;
    });

    this.stickyType = CellBrane.BASE_TYPE;
    this.direction = Utils.oneRandom([0, 1, 2, 3]);
    this.showColors = _showColors;
  }

  moveTo(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], type, true);

    if (sites[0]) {
      const targetSiteIndex: number = sites[0];
      const toSiteIndex: number = ew.getIndexToward(targetSiteIndex);

      const toSite: Site = ew.getSiteByIndex(toSiteIndex);

      if (toSite && toSite.atom.is(Empty.BASE_TYPE)) {
        const swapped: boolean = ew.origin.swapAtoms(toSite);
      }
    } else {
      //roam
      let swapped: boolean = ew.origin.swapAtoms(ew.getAdjacent8Way(CellMembrane.BASE_TYPE));
    }
  }

  moveToSticker(ew: EventWindow) {
    const sites: number[] = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], this.stickyType, true);

    if (sites[0]) {
      const targetSiteIndex: number = sites[0];
      const toSiteIndex: number = ew.getIndexToward(targetSiteIndex);

      const toSite: Site = ew.getSiteByIndex(toSiteIndex);

      if (toSite && toSite.atom.is(Empty.BASE_TYPE)) {
        const swapped: boolean = ew.origin.swapAtoms(toSite);
      }
    } else {
      //roam
      let swapped: boolean = ew.origin.swapAtoms(ew.getAdjacent8Way(CellMembrane.BASE_TYPE));
    }
  }

  getDirection(): string {
    return this.directions[this.direction];
  }

  repelFrom(ew: EventWindow, type: IElementType) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, type, true);

    if (sites[0]) {
      ew.origin.swapAtoms(ew.getSites(EventWindow.ADJACENT8WAY, CellMembrane.BASE_TYPE)[0]);
    }
  }

  repelFromSticker(ew: EventWindow) {
    const sites: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, this.stickyType, true);

    if (sites[0]) {
      ew.origin.swapAtoms(ew.getSites(EventWindow.LAYER2, CellMembrane.BASE_TYPE)[0]);
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
        if (ew.is(toSite, Empty.BASE_TYPE)) {
          ew.move(toSite, undefined, dreg);
        }
      });
    }
  }

  getReverse(dir: number): number {
    const opps: { [key: string]: string } = {
      N: "S",
      S: "N",
      E: "W",
      W: "E",
    };

    return this.directions.indexOf(opps[this.directions[this.direction]]);
  }

  repelDirection(ew: EventWindow, dir: string) {
    let toMap = new Map<string, Array<number>>([
      ["E", [12, 19, 20]],
      ["W", [9, 13, 14]],
      ["N", [10, 15, 17]],
      ["S", [11, 16, 18]],
      ["empty", [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]],
    ]);

    Actions.repelFrom(ew, Empty.BASE_TYPE, [1, 2, 3, 4], [5, 6, 7, 8, ...toMap.get(dir)]);
  }

  getDirectionFromOuters(ew: EventWindow, nearbyOuters: number[]) {
    const suggestedDirections = ew
      .getSites(nearbyOuters, CellOuterMembrane.BASE_TYPE, false)
      .map((co) => (co.atom.elem as CellOuterMembrane).suggestedDirection);
    // .filter((sd) => sd !== "");

    if (suggestedDirections.length > 0) {
      const directionMap: {} = {
        N: suggestedDirections.filter((sd) => sd == "N").length,
        S: suggestedDirections.filter((sd) => sd == "S").length,
        E: suggestedDirections.filter((sd) => sd == "E").length,
        W: suggestedDirections.filter((sd) => sd == "W").length,
        empty: suggestedDirections.filter((sd) => sd == "").length,
      };

      let biggestDir: number = 0;

      for (const [key, value] of Object.entries(directionMap)) {
        if (value > 0 && value >= biggestDir) {
          biggestDir = value as number;
          this.direction = key == "empty" ? this.getReverse(this.directions.indexOf(key)) : this.directions.indexOf(key);
        }
      }
    }
  }

  getDirectionFromBranes(ew: EventWindow, nearbyCellBranes: number[]) {
    const otherBrane = ew.getSiteByIndex(Utils.oneRandom(nearbyCellBranes)).atom.elem as CellBrane;
    this.direction = otherBrane.direction % this.directions.length;
    // this.direction = (otherBrane.direction + 2) % this.directions.length; //Mitosis
  }

  exec(ew: EventWindow) {
    //the Big Bang
    const nearbyMembranes = ew.getIndexes(EventWindow.ALLADJACENT, CellMembrane.BASE_TYPE, false);
    if (nearbyMembranes.length == 0) {
      ew.mutate(ew.getNearestIndex(EventWindow.ADJACENT8WAY, Empty.BASE_TYPE), CellMembrane.CREATE({ params: [this.showColors] }));
      return;
    }

    this.changeCounter = ++this.changeCounter % this.changeDelay;

    //Possible Direction Change
    if (this.changeCounter == 0) {
      const nearbyCellBranes = ew.getIndexes(EventWindow.ALLADJACENT, CellBrane.BASE_TYPE, false);
      const nearbyOuters = ew.getIndexes(EventWindow.ALLADJACENT, CellOuterMembrane.BASE_TYPE, false);

      if (nearbyCellBranes.length > 0) {
        this.getDirectionFromBranes(ew, nearbyCellBranes);
      } else if (nearbyOuters.length > 13) {
        //console.log("get from outer", nearbyOuters.length);
        this.getDirectionFromOuters(ew, nearbyOuters);
      } else if (nearbyOuters.length < 2) {
        //console.log("switch");
        this.repelDirection(ew, this.directions[(this.direction + 2) % this.directions.length]);
      }
    }

    const checkOuter = ew.query(CellBrane.CHECK_OUTER, 3, CellBrane.SPLAT_MAP, Symmetries.ALL);
    if (checkOuter) {
      ew.swap(Utils.oneRandom(nearbyMembranes));
      return;
    }

    const checkOutside = ew.query(CellBrane.CHECK_OUTSIDE, 0, CellBrane.SPLAT_MAP, Symmetries.ALL);
    if (checkOutside) {
      const cms = ew.getIndexes(EventWindow.ALLADJACENT, CellMembrane.BASE_TYPE, false);

      if (cms.length) {
        ew.swap(Utils.oneRandom(cms));
        return;
      }
    }

    const checkEdge = ew.query(CellBrane.CHECK_EDGE, 0, CellBrane.SPLAT_MAP, Symmetries.ALL);
    if (checkEdge) {
      const cms = checkEdge.get(CellMembrane.BASE_TYPE.name);
      if (cms.length) {
        ew.swap(Utils.oneRandom(cms));
        return;
      }
    }

    // const checkForeign = ew.query(CellBrane.CHECK_FOREIGN, 1, CellBrane.SPLAT_MAP, Symmetries.ALL);
    // if (checkForeign) {
    //   this.direction = (this.direction + 2) % this.directions.length;
    // }

    this.repelDirection(ew, this.directions[this.direction]);

    // this.moveToSticker(ew);
    //this.moveTo(ew, CellOuterMembrane.BASE_TYPE);
    // this.repelFrom(ew, CellBrane.BASE_TYPE);

    Actions.patrol(ew);

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellBrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

ElementRegistry.registerSPLAT("b", CellBrane.BASE_TYPE);
