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
  static TYPE_DEF: IElementType = { name: "SwapLine", type: "Sl", class: SwapLine, color: 0xffffff };
  static CREATE = SwapLine.CREATOR();
  static CREATE_BLUE = SwapLine.CREATOR(undefined, undefined, 0x0000ff);

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

  static checkMove_NORTH = SPLAT.splatToMap(`
  ~##  
  ~@~
  ~~~
  `);

  static checkMove_SOUTH = SPLAT.splatToMap(`
  ~~~  
  ~@~
  ~##
  `);

  static checkForeignSL = SPLAT.splatToMap(`
  ~~~~#  
  ~~@~#
  ~~~~#
  `);

  direction: string;
  creationLimit: number;
  readyToMove: boolean = false;
  blockedCount: number = 0;
  blockedMax: number = 100;

  constructor(_direction: string = "E", _creationLimit: number = 0) {
    super(SwapLine.TYPE_DEF);

    this.direction = _direction;
    this.creationLimit = _creationLimit;
  }

  exec(ew: EventWindow) {
    if (!ew.east || this.blockedCount > this.blockedMax) ew.origin.killSelf();

    const anySLNorth = ew.query(SwapLine.checkANY_NORTH, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);
    const anySLSouth = ew.query(SwapLine.checkANY_SOUTH, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);

    if (this.creationLimit > 0) {
      if (!anySLNorth) {
        ew.mutate(2, SwapLine.CREATE([this.direction, this.creationLimit]));
      }

      if (!anySLSouth) {
        ew.mutate(3, SwapLine.CREATE([this.direction, this.creationLimit]));
      }

      this.creationLimit--;
    } else {
      this.readyToMove = true;

      if (!anySLNorth && !anySLSouth) {
        ew.origin.killSelf();
      }
    }

    if (this.readyToMove) {
      const checkMoveNorth = ew.query(SwapLine.checkMove_NORTH, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);
      const checkMoveSouth = ew.query(SwapLine.checkMove_SOUTH, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);
      const checkForeignSL = ew.query(SwapLine.checkForeignSL, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);

      if (!checkForeignSL && (!ew.north || checkMoveNorth) && (!ew.south || checkMoveSouth)) {
        const swapped = ew.swap(4);

        if (!swapped) {
          this.blockedCount++;
        } else {
          this.blockedCount = 0;
        }
      } else {
        this.blockedCount++;
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SwapLine.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(SwapLine.TYPE_DEF);
