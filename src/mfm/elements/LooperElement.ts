import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { Empty } from "./EmptyElement";
import { Wayfinder, Direction } from "../utils/MFMWayfinder";
import { DecayDirector } from "./DecayDirectorElement";
import { QDirectional } from "./quarks/QDirectional";

export interface Looper extends QDirectional {}

export class Looper extends Element {
  static BASE_TYPE: IElementType = { name: "LOOPER", symbol: "Lo", class: Looper, color: 0x574b31 };
  static CREATE = Looper.CREATOR();
  static CREATE_EAST = Looper.CREATOR({ name: "LOOPER EAST", params: ["E"] });
  static CREATE_WEST = Looper.CREATOR({ params: ["W"] });
  static CREATE_NORTH = Looper.CREATOR({ params: ["N"] });
  static CREATE_SOUTH = Looper.CREATOR({ params: ["S"] });

  counter: number = 0;
  turns: number = 0;
  rotations: number = 0;
  max: number;
  pulse: number;

  constructor(_direction?: Direction, _max?: number, _pulse: number = 0) {
    super(Looper.BASE_TYPE);

    this.setRandomDirection();
    this.max = _max ? _max : 3 + 2 * ((Math.random() * 4) >> 0);
    this.pulse = _pulse;
  }

  exec(ew: EventWindow) {
    let forceDirection: Direction = Wayfinder.turnRight(this.direction);
    let directorLifeSpan: number = 100;
    let directorColor: number = 0xf2c25a;
    let emitBeforeAge: number = 1;

    if (this.counter % 2) {
      directorLifeSpan = 5;
    }

    if (this.pulse && this.rotations % this.pulse) {
      directorColor = 0x574b31;
      directorLifeSpan = 1;
      emitBeforeAge = 0;
      forceDirection = Wayfinder.turnLeft(this.direction);
    }

    const makeDecayDirector: Function = DecayDirector.CREATOR(
      { params: [forceDirection, directorLifeSpan, EventWindow.ALLADJACENT, emitBeforeAge] },
      undefined,
      directorColor
    );

    if (!this.moveDirectionally(ew, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE], makeDecayDirector())) {
      return;
    }

    this.counter++;

    if (this.counter % this.max === 0) {
      this.turns++;
      this.counter = 0;
      this.direction = Wayfinder.veerRight(this.direction);
    }

    if (this.turns % (this.pulse * 8) === 0) {
      this.rotations++;
      this.turns = 0;
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Looper.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

Element.applyMixins(Looper, [QDirectional]);
