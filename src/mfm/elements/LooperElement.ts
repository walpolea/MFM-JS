import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { Wayfinder, Direction } from "../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";
import { Utils } from "../utils/MFMUtils";
import { DecayDirector } from "./DecayDirectorElement";
import { Atom } from "../core/Atom";

export class Looper extends Element {
  static BASE_TYPE: IElementType = { name: "LOOPER", symbol: "Lo", class: Looper, color: 0xaaaaff };
  static CREATE = Looper.CREATOR();
  static CREATE_EAST = Looper.CREATOR({ name: "LOOPER EAST", params: ["E"] });
  static CREATE_WEST = Looper.CREATOR({ params: ["W"] });
  static CREATE_NORTH = Looper.CREATOR({ params: ["N"] });
  static CREATE_SOUTH = Looper.CREATOR({ params: ["S"] });

  direction: Direction;
  counter: number = 0;
  max: number;

  constructor(_direction?: Direction, _max?: number) {
    super(Looper.BASE_TYPE);

    this.direction = _direction ? _direction : Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS_PRIMARY.length * Math.random()) >> 0];
    this.max = _max ? _max : (3 + Math.random() * 4) >> 0;
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  exec(ew: EventWindow) {
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);
    const dd: Function = DecayDirector.CREATOR({ params: [Wayfinder.turnRight(this.direction), 30] });

    const makeWall: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    if (ew.is(makeWall, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE])) {
      ew.mutate(makeWall, dd());
    }

    const makeWall2: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
    if (ew.is(makeWall2, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE])) {
      ew.mutate(makeWall2, dd());
    }

    const makeWall3: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.direction), true);
    if (ew.is(makeWall3, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE])) {
      ew.mutate(makeWall3, dd());
    }

    const makeWall4: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);
    if (ew.is(makeWall4, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE])) {
      ew.mutate(makeWall4, dd());
    }

    if (ew.is(travelTo, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE])) {
      ew.move(travelTo, dd());
    } else {
      // this.direction = Wayfinder.veerRight(this.direction);
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
