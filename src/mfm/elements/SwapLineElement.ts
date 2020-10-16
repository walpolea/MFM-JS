import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../utils/SPLAT";
import { Symmetries } from "../utils/Symmetries";
import { Utils } from "../utils/MFMUtils";
import { Atom } from "../core/Atom";
import { Site } from "../core/Site";
import { Wayfinder, Direction } from "../utils/MFMWayfinder";

export class SwapLine extends Element {
  static BASE_TYPE: IElementType = { name: "SWAPLINE", symbol: "Sl", class: SwapLine, color: 0xffffaa };
  static CREATE = SwapLine.CREATOR();
  static CREATE_EAST = SwapLine.CREATOR({ params: ["E", 1] });
  static CREATE_WEST = SwapLine.CREATOR({ params: ["W", 1] });
  static CREATE_NORTH = SwapLine.CREATOR({ params: ["N", 2] });
  static CREATE_SOUTH = SwapLine.CREATOR({ params: ["S", 2] });
  static CREATE_NORTHEAST = SwapLine.CREATOR({ params: ["NE", 3] });
  static CREATE_NORTHWEST = SwapLine.CREATOR({ params: ["NW", 3] });
  static CREATE_SOUTHEAST = SwapLine.CREATOR({ params: ["SE", 3] });
  static CREATE_SOUTHWEST = SwapLine.CREATOR({ params: ["SW", 3] });

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
  ~~~@~~#
  `);

  direction: Direction;
  priority: number;
  isReversing: boolean = false;
  blockedCount: number = 0;
  blockedMax: number = 10;

  start: boolean = false;

  constructor(_direction: Direction = "E", _priority: number = 1) {
    super(SwapLine.BASE_TYPE);

    this.direction = _direction;
    this.priority = _priority;
  }

  exec(ew: EventWindow) {
    const higherPrioritySLs: Site[] = ew
      .getSites(EventWindow.ALLADJACENT, SwapLine.BASE_TYPE, false)
      .filter((sl) => sl && (sl.atom.elem as SwapLine).priority > this.priority);

    if (higherPrioritySLs.length) {
      return;
    }

    const toDir: number = Wayfinder.directionToIndex(this.direction, true);
    if (!ew.getSiteByIndex(toDir) || this.blockedCount > this.blockedMax) ew.origin.die();

    const swapsAhead: boolean = ew.any(Wayfinder.getInFront(this.direction), SwapLine.BASE_TYPE);

    if (swapsAhead) {
      // this.blockedCount++;
      this.isReversing = true;
    } else {
      this.isReversing = false;
    }

    let finalToDirection = this.isReversing ? Wayfinder.directionToIndex(Wayfinder.reverse(this.direction)) : toDir;

    if (!this.start && this.age > 10) {
      this.start = true;
    }

    const lookLeft = Wayfinder.directionToIndex(Wayfinder.veerLeft(Wayfinder.veerLeft(Wayfinder.veerLeft(this.direction))), true);
    const lookRight = Wayfinder.directionToIndex(Wayfinder.veerRight(Wayfinder.veerRight(Wayfinder.veerRight(this.direction))), true);
    const shouldMove: boolean = ew.any([lookLeft, lookRight], SwapLine.BASE_TYPE);

    let swapped: boolean = false;
    if (shouldMove) {
      return;
    } else if (this.start && ew.getSiteByIndex(finalToDirection)) {
      swapped = ew.swap(finalToDirection);

      if (!swapped) {
        ew.origin.die();
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SwapLine.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(SwapLine.BASE_TYPE);
