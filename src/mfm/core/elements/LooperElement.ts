import { EventWindow, EWIndex } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";
import { Utils } from "../../utils/MFMUtils";

export class Looper extends Elem {
  static TYPE_DEF: IElementType = { name: "LOOPER", type: "Lo", class: Looper, color: 0xaaaaff };
  static CREATE = Looper.CREATOR();
  static CREATE_EAST = Looper.CREATOR(["E"]);
  static CREATE_WEST = Looper.CREATOR(["W"]);
  static CREATE_NORTH = Looper.CREATOR(["N"]);
  static CREATE_SOUTH = Looper.CREATOR(["S"]);

  direction: Direction;
  counter: number = 0;
  max: number;

  constructor(_direction?: Direction, _max?: number) {
    super(Looper.TYPE_DEF);

    this.direction = _direction ? _direction : Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS_PRIMARY.length * Math.random()) >> 0];
    this.max = _max ? _max : (3 + Math.random() * 4) >> 0;
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  exec(ew: EventWindow) {
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    const makeWall: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    if (ew.is(makeWall, [Empty.TYPE_DEF, DecayWall.TYPE_DEF])) {
      ew.mutate(makeWall, DecayWall.CREATE([50]));
    }

    const makeWall2: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
    if (ew.is(makeWall2, [Empty.TYPE_DEF, DecayWall.TYPE_DEF])) {
      ew.mutate(makeWall2, DecayWall.CREATE([50]));
    }

    const makeWall3: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.direction), true);
    if (ew.is(makeWall3, [Empty.TYPE_DEF, DecayWall.TYPE_DEF])) {
      ew.mutate(makeWall3, DecayWall.CREATE([50]));
    }

    const makeWall4: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);
    if (ew.is(makeWall4, [Empty.TYPE_DEF, DecayWall.TYPE_DEF])) {
      ew.mutate(makeWall4, DecayWall.CREATE([50]));
    }

    if (ew.is(travelTo, [Empty.TYPE_DEF, DecayWall.TYPE_DEF])) {
      ew.move(travelTo);
    } else {
      this.direction = Wayfinder.veerRight(this.direction);
    }

    this.counter++;

    if (this.counter % this.max == 0) {
      this.counter = 0;
      this.direction = Wayfinder.veerRight(this.direction);
    }

    // if (this.counter % this.max == 0) {
    //   this.counter = 0;
    //   if (Utils.oneIn(2)) {
    //     this.direction = Wayfinder.slightRight(this.direction);
    //   } else {
    //     this.direction = Wayfinder.slightLeft(this.direction);
    //   }
    // }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Looper.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Looper.TYPE_DEF);
