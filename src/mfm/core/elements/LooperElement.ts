import { EventWindow, EWIndex } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../Atom";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";

export class Looper extends Elem {
  static TYPE_DEF: IElementType = { name: "Looper", type: "Lo", class: Looper, color: 0xaaaaff };
  static CREATE = Looper.CREATOR();
  static CREATE_EAST = Looper.CREATOR(["E"]);
  static CREATE_WEST = Looper.CREATOR(["W"]);
  static CREATE_NORTH = Looper.CREATOR(["N"]);
  static CREATE_SOUTH = Looper.CREATOR(["S"]);

  direction: Direction;
  counter = 0;
  max = 3;

  constructor(_direction: Direction = "S") {
    super(Looper.TYPE_DEF);
    this.direction = Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS_PRIMARY.length * Math.random()) >> 0];

    this.max = (4 + Math.random() * 4) >> 0;
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  exec(ew: EventWindow) {
    this.counter++;
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    const makeWall: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    if (ew.is(makeWall, Empty.TYPE_DEF)) {
      ew.mutate(makeWall, DecayWall.CREATE([150]));
    }

    const makeWall2: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
    if (ew.is(makeWall2, Empty.TYPE_DEF)) {
      ew.mutate(makeWall2, DecayWall.CREATE([150]));
    }

    if (ew.is(travelTo, [Empty.TYPE_DEF, DecayWall.TYPE_DEF])) {
      ew.move(travelTo, DecayWall.CREATE([150]));

      console.log(this.direction);
    } else {
      this.direction = Wayfinder.veerRight(this.direction);
    }

    if (this.counter % this.max == 0) {
      this.counter = 0;
      this.direction = Wayfinder.veerRight(this.direction);
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Looper.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Looper.TYPE_DEF);
