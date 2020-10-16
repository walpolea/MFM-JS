import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { Wayfinder, Direction } from "../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";
import { SwapLine } from "./SwapLineElement";
import { Director } from "./DirectorElement";
import { Atom } from "../core/Atom";
import { QDirectional } from "./quarks/QDirectional";
import { QDecayable } from "./quarks/QDecayable";

export interface LoopMason extends QDirectional, QDecayable {}

export class LoopMason extends Element {
  static BASE_TYPE: IElementType = { name: "LOOPMASON", symbol: "Lm", class: LoopMason, color: 0xaaaaff };
  static CREATE = LoopMason.CREATOR();
  static CREATE_EAST = LoopMason.CREATOR({ params: ["E"] });
  static CREATE_WEST = LoopMason.CREATOR({ params: ["W"] });
  static CREATE_NORTH = LoopMason.CREATOR({ params: ["N"] });
  static CREATE_SOUTH = LoopMason.CREATOR({ params: ["S"] });

  counter: number = 0;
  max: number;

  constructor(_direction?: Direction, _max?: number) {
    super(LoopMason.BASE_TYPE);

    this.setRandomDirection();
    this.max = _max ? _max : (3 + Math.random() * 4) >> 0;

    //we actually DON'T want this to identify as a QDirectional
    // this.registerClass(QDirectional);
  }

  exec(ew: EventWindow) {
    if (ew.any(EventWindow.ADJACENT8WAY, SwapLine.BASE_TYPE)) {
      return;
    }

    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);
    const makeDirector: Function = Director.CREATOR({ params: [Wayfinder.turnRight(this.direction)] });

    const makeWall: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    if (ew.is(makeWall, [Empty.BASE_TYPE, Director.BASE_TYPE])) {
      ew.mutate(makeWall, makeDirector());
    }

    const makeWall2: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
    if (ew.is(makeWall2, [Empty.BASE_TYPE, Director.BASE_TYPE])) {
      ew.mutate(makeWall2, makeDirector());
    }

    const makeWall3: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.direction), true);
    if (ew.is(makeWall3, [Empty.BASE_TYPE, Director.BASE_TYPE])) {
      ew.mutate(makeWall3, makeDirector());
    }

    const makeWall4: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);
    if (ew.is(makeWall4, [Empty.BASE_TYPE, Director.BASE_TYPE])) {
      ew.mutate(makeWall4, makeDirector());
    }

    if (ew.is(travelTo, [LoopMason.BASE_TYPE, Empty.BASE_TYPE, Director.BASE_TYPE])) {
      const lm = LoopMason.CREATE({ params: [this.direction, this.max] });
      (lm.elem as LoopMason).counter = this.counter;

      // ew.move(travelTo, Wall.CREATE({params: [100]}));
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

Element.applyMixins(LoopMason, [QDirectional, QDecayable]);
