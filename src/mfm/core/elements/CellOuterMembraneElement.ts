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
import { CellBrane } from "./CellBraneElement";
import { Data } from "./DataElement";

export class CellOuterMembrane extends Elem {
  static TYPE_DEF: IElementType = { name: "CELLOUTERMEMBRANE", type: "Co", class: CellOuterMembrane, color: 0x5c8a5c };
  static CREATE = CellOuterMembrane.CREATOR();

  static CHECK_THIN = SPLAT.splatToMap(`
    ~i@_
  `);

  static CHECK_THIN2 = SPLAT.splatToMap(`
    ~i@o_
  `);

  static CHECK_THIN3 = SPLAT.splatToMap(`
  ~i_@~~~
  `);

  static CHECK_THIN4 = SPLAT.splatToMap(`
    ~~@_i
  `);

  static CHECK_FOREIGNCELL = SPLAT.splatToMap(`
    mmmm@~~_o
  `);

  static CHECK_OUTERMOST = SPLAT.splatToMap(`
    immm@~~~~
  `);

  static HOLD_IN1 = SPLAT.splatToMap(`
    ~~~~@f~~i
  `);

  static HOLD_IN2 = SPLAT.splatToMap(`
    ~~~~@f~i~
  `);

  static HOLD_IN3 = SPLAT.splatToMap(`
    ~~~~@fi~
  `);

  stickyType: IElementType;
  idleCount: number = 0;
  roamCount: number = 0;
  membraneDensity: number;
  maxRoam: number;
  suggestedDirection: string = "";
  showColors: boolean = true;

  constructor(stickyType: IElementType = CellMembrane.TYPE_DEF, membraneDensity: number = 1, maxRoam: number = 1, _showColors: boolean = true) {
    super(CellMembrane.TYPE_DEF);

    CellOuterMembrane.SPLAT_MAP.set("i", CellMembrane.TYPE_DEF);
    CellOuterMembrane.SPLAT_MAP.set("o", CellOuterMembrane.TYPE_DEF);

    CellOuterMembrane.SPLAT_MAP.set("m", (t: IElementType) => {
      return t === CellOuterMembrane.TYPE_DEF || t === CellMembrane.TYPE_DEF || t === CellBrane.TYPE_DEF ? t : undefined;
    });

    CellOuterMembrane.SPLAT_MAP.set("x", (t: IElementType) => {
      return t !== Empty.TYPE_DEF && t !== CellOuterMembrane.TYPE_DEF ? t : undefined;
    });

    CellOuterMembrane.SPLAT_MAP.set("f", (t: IElementType) => {
      return t !== Empty.TYPE_DEF && t !== CellOuterMembrane.TYPE_DEF && t !== CellMembrane.TYPE_DEF && t !== CellBrane.TYPE_DEF ? t : undefined;
    });

    this.stickyType = stickyType;
    this.maxRoam = maxRoam;
    this.setMembraneDensity(membraneDensity);
    this.showColors = _showColors;
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

  setDirectionColor() {
    switch (this.suggestedDirection) {
      case "E":
        this.color = 0x3f6fb6;
        break; //pink
      case "W":
        this.color = 0xf26823;
        break; //green
      case "N":
        this.color = 0x55ba5b;
        break; //blue
      case "S":
        this.color = 0xcc2a6b;
        break; //yellow
      default:
        this.color = CellOuterMembrane.TYPE_DEF.color;
        break;
    }
  }

  reverseDirection() {
    const opps: { [key: string]: string } = {
      N: "S",
      S: "N",
      E: "W",
      W: "E",
    };

    this.suggestedDirection = this.suggestedDirection !== "" ? opps[this.suggestedDirection] : this.suggestedDirection;
  }

  calculateSuggestedDirection(ew: EventWindow, nearbyEmpties: number[]) {
    let smallestDir: number = 40;
    let smallestDirKey: string = "";
    const directionMap: {} = {
      N: ew.getIntersection(nearbyEmpties, EventWindow.N_QUADRANT).length,
      S: ew.getIntersection(nearbyEmpties, EventWindow.S_QUADRANT).length,
      E: ew.getIntersection(nearbyEmpties, EventWindow.E_QUADRANT).length,
      W: ew.getIntersection(nearbyEmpties, EventWindow.W_QUADRANT).length,
    };

    if (nearbyEmpties.length > 10) {
      //get open directions
      let biggestDir: number = 0;
      this.suggestedDirection = "";

      for (const [key, value] of Object.entries(directionMap)) {
        if (value > 2 && value >= biggestDir) {
          biggestDir = value as number;
          this.suggestedDirection = key;
        }
      }
    } else if (nearbyEmpties.length < 4) {
      //try to see suggest going in the opposite direction - too much chaos here
      for (const [key, value] of Object.entries(directionMap)) {
        if (value < smallestDir) {
          smallestDir = value as number;
          smallestDirKey = key;
        }
      }
      this.suggestedDirection = smallestDirKey;
    }
  }

  holdStuffInside(ew: EventWindow) {
    const hold1 = ew.query(CellOuterMembrane.HOLD_IN1, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ALL);
    if (hold1) {
      ew.swap(hold1.get(Array.from(hold1.keys()).filter((type) => type !== CellMembrane.TYPE_DEF)[0])[0], hold1.get(CellMembrane.TYPE_DEF)[0]);
    }

    const hold2 = ew.query(CellOuterMembrane.HOLD_IN2, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ALL);
    if (hold2) {
      ew.swap(hold2.get(Array.from(hold2.keys()).filter((type) => type !== CellMembrane.TYPE_DEF)[0])[0], hold2.get(CellMembrane.TYPE_DEF)[0]);
    }

    const hold3 = ew.query(CellOuterMembrane.HOLD_IN3, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ALL);
    if (hold3) {
      ew.swap(hold3.get(Array.from(hold3.keys()).filter((type) => type !== CellMembrane.TYPE_DEF)[0])[0], hold3.get(CellMembrane.TYPE_DEF)[0]);
    }
  }

  exec(ew: EventWindow) {
    if (this.roamCount > this.maxRoam) {
      ew.origin.die();
      return;
    }

    this.holdStuffInside(ew);

    if (Utils.oneIn(8)) this.moveToSticker(ew);

    if (Utils.oneIn(50)) {
      //Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4], [5, 6, 7, 8]);
      //Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11, 12]);
      Actions.repelFrom(ew, this.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
      return;
    }

    const nearbyCM = ew.getIndexes(EventWindow.ADJACENT8WAY, CellMembrane.TYPE_DEF, false);
    const nearbyCOM = ew.getIndexes(EventWindow.ALLADJACENT, CellOuterMembrane.TYPE_DEF, false);
    const nearbyEmpties = ew.getIndexes(EventWindow.ALLADJACENT, Empty.TYPE_DEF, false);

    /////////////////////
    //Life is Short

    //too many surrounding Empties - die
    if (ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF, false).length > 5) {
      ew.origin.die();
      return;
    }

    //too many surrounding CellMembrane - die
    if (nearbyCM.length > 3) {
      ew.origin.die();
      return;
    }

    // too many nearby OuterMembrane - die
    if (nearbyCOM.length > 28) {
      ew.origin.die();
      return;
    }
    //////////////////////

    ///////////////////////
    //Check for situations where the OuterMembrane wall is thin
    const checkThin = ew.query(CellOuterMembrane.CHECK_THIN, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ROTATIONS);
    if (checkThin) {
      ew.mutate(checkThin.get(Empty.TYPE_DEF)[0], CellOuterMembrane.CREATE([this.stickyType, this.membraneDensity, this.maxRoam, this.showColors]));
    }

    const checkThin2 = ew.query(CellOuterMembrane.CHECK_THIN2, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ROTATIONS);
    if (checkThin2) {
      ew.mutate(checkThin2.get(Empty.TYPE_DEF)[0], CellOuterMembrane.CREATE([this.stickyType, this.membraneDensity, this.maxRoam, this.showColors]));
    }

    const checkThin3 = ew.query(CellOuterMembrane.CHECK_THIN3, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ROTATIONS);
    if (checkThin3) {
      ew.mutate(checkThin3.get(Empty.TYPE_DEF)[0], CellOuterMembrane.CREATE([this.stickyType, this.membraneDensity, this.maxRoam, this.showColors]));
    }

    const checkThin4 = ew.query(CellOuterMembrane.CHECK_THIN4, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ALL);
    if (checkThin4) {
      ew.mutate(checkThin4.get(Empty.TYPE_DEF)[0], CellOuterMembrane.CREATE([this.stickyType, this.membraneDensity, this.maxRoam, this.showColors]));
    }
    ////////////////////////

    //Check for a nearby CellOuterMembrane that has a direction
    const nearbyDirected = (Utils.oneRandom(ew.getSites(EventWindow.ADJACENT8WAY, CellOuterMembrane.TYPE_DEF, false).filter((s) => s))?.atom
      ?.elem as CellOuterMembrane)?.suggestedDirection;

    //go with the flow
    if (nearbyDirected) {
      this.suggestedDirection = nearbyDirected;
      //sense outside for stuff
    } else if (ew.query(CellOuterMembrane.CHECK_OUTERMOST, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ALL)) {
      this.calculateSuggestedDirection(ew, nearbyEmpties);
      ew.mutateMany(ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF), CellOuterMembrane.CREATE, [
        this.stickyType,
        1,
        this.membraneDensity,
        this.showColors,
      ]);
    }

    //
    if (
      ew.getAll().filter((s) => {
        return s && !ew.is(s, [Empty.TYPE_DEF, CellBrane.TYPE_DEF, CellOuterMembrane.TYPE_DEF, CellMembrane.TYPE_DEF, Data.TYPE_DEF, Res.TYPE_DEF]);
      }).length > 0
    ) {
      this.suggestedDirection = "";
      nearbyCOM.forEach((i) => {
        (ew.getSiteByIndex(i).atom.elem as CellOuterMembrane).suggestedDirection = "";
      });
    }

    // const checkForeign = ew.query(CellOuterMembrane.CHECK_FOREIGNCELL, 0, CellOuterMembrane.SPLAT_MAP, Symmetries.ALL);
    // if (checkForeign) {
    //   // this.reverseDirection();
    //   this.suggestedDirection = "";
    //   nearbyCOM.forEach((i) => {
    //     (ew.getSiteByIndex(i).atom.elem as CellOuterMembrane).suggestedDirection = "";
    //   });
    // }

    if (this.showColors) this.setDirectionColor();

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
CellOuterMembrane.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(CellOuterMembrane.TYPE_DEF);
ElementTypes.registerSPLAT("o", CellOuterMembrane.TYPE_DEF);
