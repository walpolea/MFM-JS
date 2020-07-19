import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../Atom";

export class SwapLine extends Elem {
  static TYPE_DEF: IElementType = { name: "SwapLine", type: "Sl", class: SwapLine, color: 0xffffaa };
  static CREATE = SwapLine.CREATOR();
  static CREATE_EAST = SwapLine.CREATOR(["E"]);
  static CREATE_WEST = SwapLine.CREATOR(["W"]);
  static CREATE_NORTH = SwapLine.CREATOR(["N"]);
  static CREATE_SOUTH = SwapLine.CREATOR(["S"]);

  static CREATE_BLUE = SwapLine.CREATOR(undefined, undefined, 0x0000ff);

  static checkMOVE = SPLAT.splatToMap(`
  #~~  
  ~@~
  #~~
  `);

  static checkANY_NORTH = SPLAT.splatToMap(`
  ###  
  ~@~
  ~~~
  `);

  static checkANY_SOUTH = SPLAT.splatToMap(`
  ~~~  
  ~@~
  ###
  `);

  static checkForeignSL = SPLAT.splatToMap(`
  ~~~~#  
  ~~@##
  ~~~~#
  `);

  direction: string;
  creationLimit: number;
  blockedCount: number = 0;
  blockedMax: number = 10;

  start: boolean = false;

  constructor(_direction: string = "S", _creationLimit: number = 0) {
    super(SwapLine.TYPE_DEF);

    this.direction = _direction;
    this.creationLimit = _creationLimit;
  }

  reverseDirection() {
    const directionMapBounce: Map<string, string> = new Map<string, string>([
      ["E", "W"],
      ["N", "S"],
      ["W", "E"],
      ["S", "N"],
    ]);

    // return directionMapBounce.get(this.direction);
    this.direction = directionMapBounce.get(this.direction);
  }

  getToDirection(ew: EventWindow): number {
    switch (this.direction) {
      case "E":
        return 4;
        break;
      case "W":
        return 1;
        break;
      case "N":
        return 2;
        break;
      case "S":
        return 3;
        break;
    }
  }

  getToSymmetry(ew: EventWindow): Map<number, number>[] {
    switch (this.direction) {
      case "E":
        return Symmetries.NORMAL;
        break;
      case "W":
        return Symmetries.FLIPX;
        break;
      case "N":
        return Symmetries.ROTATE_270L;
        break;
      case "S":
        return Symmetries.ROTATE_90R;
        break;
    }
  }

  shouldStart(ew: EventWindow): boolean {
    switch (this.direction) {
      case "E":
      case "W":
        return !ew.north || !ew.south;
        break;

      case "N":
      case "S":
        return !ew.east || !ew.west;
        break;
    }
  }

  exec(ew: EventWindow) {
    let swapped: boolean = false;
    const toDir = this.getToDirection(ew);
    const toSym = this.getToSymmetry(ew);
    //if (!ew.getSiteByIndex(toDir) || this.blockedCount > this.blockedMax) ew.origin.killSelf();
    if (this.shouldStart(ew)) this.start = true;

    const checkForeignSL = ew.query(SwapLine.checkForeignSL, 2, SwapLine.SPLAT_MAP, toSym);

    if (checkForeignSL) {
      this.blockedCount++;
      //   // this.reverseDirection();
    }

    if (!ew.getSiteByIndex(toDir) || this.blockedCount > this.blockedMax) {
      this.reverseDirection();
      this.blockedCount = 0;
    }

    if (!this.start) {
      const anySLNorth = ew.query(SwapLine.checkANY_NORTH, 1, SwapLine.SPLAT_MAP, toSym);
      const anySLSouth = ew.query(SwapLine.checkANY_SOUTH, 1, SwapLine.SPLAT_MAP, toSym);

      if ((anySLNorth && anySLSouth) || this.age > 10) {
        this.start = true;
      }
    }

    const checkMove = ew.query(SwapLine.checkMOVE, 1, SwapLine.SPLAT_MAP, toSym);
    const SLCount = ew.getIndexes(EventWindow.ALLADJACENT, SwapLine.TYPE_DEF, false).length;

    if (checkMove && SLCount <= 8) {
      const neighborSL = ew.getSiteByIndex(checkMove.get(SwapLine.TYPE_DEF)[0]).atom.elem as SwapLine;
      if (neighborSL.start) {
        this.start = true;
      }

      this.direction = neighborSL.direction;
      return;
    } else if ((this.start && ew.getSiteByIndex(toDir)) || SLCount > 8) {
      swapped = ew.swap(toDir);

      if (!swapped) {
        console.log("rev");
        this.reverseDirection();
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SwapLine.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(SwapLine.TYPE_DEF);
