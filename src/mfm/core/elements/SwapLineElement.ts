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

  constructor(_direction: string = "E", _creationLimit: number = 0) {
    super(SwapLine.TYPE_DEF);

    this.direction = _direction;
    this.creationLimit = _creationLimit;
  }

  exec(ew: EventWindow) {
    if (!ew.east || this.blockedCount > this.blockedMax) ew.origin.killSelf();
    if (!ew.north || !ew.south) this.start = true;

    const checkForeignSL = ew.query(SwapLine.checkForeignSL, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);

    if (checkForeignSL) {
      this.blockedCount++;
    }

    if (!this.start) {
      const anySLNorth = ew.query(SwapLine.checkANY_NORTH, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);
      const anySLSouth = ew.query(SwapLine.checkANY_SOUTH, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);

      if ((anySLNorth && anySLSouth) || this.age > 10) {
        this.start = true;
      }
    }

    const checkMove = ew.query(SwapLine.checkMOVE, 1, SwapLine.SPLAT_MAP, Symmetries.NORMAL);

    if (checkMove) {
      if ((ew.getSiteByIndex(checkMove.get(SwapLine.TYPE_DEF)[0]).atom.elem as SwapLine).start) {
        this.start = true;
      }
      return;
    } else if (this.start && ew.getSiteByIndex(4)) {
      ew.swap(4);
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SwapLine.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(SwapLine.TYPE_DEF);
