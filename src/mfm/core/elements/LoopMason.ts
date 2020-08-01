import { EventWindow, EWIndex } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";
import { SwapLine } from "./SwapLineElement";

export class LoopMason extends Elem {
  static TYPE_DEF: IElementType = { name: "LoopMason", type: "Lm", class: LoopMason, color: 0xaaaaff };
  static CREATE = LoopMason.CREATOR();
  static CREATE_EAST = LoopMason.CREATOR(["E"]);
  static CREATE_WEST = LoopMason.CREATOR(["W"]);
  static CREATE_NORTH = LoopMason.CREATOR(["N"]);
  static CREATE_SOUTH = LoopMason.CREATOR(["S"]);

  direction: Direction;
  counter: number = 0;
  max: number;

  constructor(_direction?: Direction, _max?: number) {
    super(LoopMason.TYPE_DEF);

    this.direction = _direction ? _direction : Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS_PRIMARY.length * Math.random()) >> 0];
    this.max = _max ? _max : (3 + Math.random() * 4) >> 0;
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  exec(ew: EventWindow) {
    if (ew.any(EventWindow.ADJACENT8WAY, SwapLine.TYPE_DEF)) {
      return;
    }

    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    const makeWall: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    if (ew.is(makeWall, [Empty.TYPE_DEF, Wall.TYPE_DEF])) {
      ew.mutate(makeWall, Wall.SOFT_WALL());
    }

    const makeWall2: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
    if (ew.is(makeWall2, [Empty.TYPE_DEF, Wall.TYPE_DEF])) {
      ew.mutate(makeWall2, Wall.SOFT_WALL());
    }

    const makeWall3: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.direction), true);
    if (ew.is(makeWall3, [Empty.TYPE_DEF, Wall.TYPE_DEF])) {
      ew.mutate(makeWall3, Wall.SOFT_WALL());
    }

    const makeWall4: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);
    if (ew.is(makeWall4, [Empty.TYPE_DEF, Wall.TYPE_DEF])) {
      ew.mutate(makeWall4, Wall.SOFT_WALL());
    }

    if (ew.is(travelTo, [LoopMason.TYPE_DEF, Empty.TYPE_DEF, Wall.TYPE_DEF])) {
      const lm = LoopMason.CREATE([this.direction, this.max]);
      (lm.elem as LoopMason).counter = this.counter;

      // ew.move(travelTo, Wall.CREATE([100]));
      ew.move(travelTo, lm);
      this.counter++;

      if (this.counter % this.max == 0) {
        this.counter = 0;
        this.direction = Wayfinder.veerRight(this.direction);
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
LoopMason.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(LoopMason.TYPE_DEF);
