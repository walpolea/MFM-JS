import { Element } from "../core/Element";
import { EventWindow } from "../core/EventWindow";
import { IElementType } from "../core/IElementType";
import { Direction } from "../utils/MFMWayfinder";
import { Director } from "./DirectorElement";
import { QDecayable } from "./quarks/QDecayable";

export interface DecayDirector extends QDecayable {}

export class DecayDirector extends Director {
  static BASE_TYPE: IElementType = { name: "DECAYDIRECTOR", symbol: "Ddi", class: DecayDirector, color: 0xccffff };
  static CREATE = DecayDirector.CREATOR();
  static DECAYDIRECTOR_EAST = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_EAST", params: ["E"] });
  static DECAYDIRECTOR_WEST = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_WEST", params: ["W"] });
  static DECAYDIRECTOR_NORTH = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_NORTH", params: ["N"] });
  static DECAYDIRECTOR_SOUTH = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_SOUTH", params: ["S"] });
  static DECAYDIRECTOR_NORTHEAST = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_EAST", params: ["NE"] });
  static DECAYDIRECTOR_NORTHWEST = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_WEST", params: ["NW"] });
  static DECAYDIRECTOR_SOUTHEAST = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_NORTH", params: ["SE"] });
  static DECAYDIRECTOR_SOUTHWEST = DecayDirector.CREATOR({ name: "DECAYDIRECTOR_SOUTH", params: ["SW"] });

  constructor(_direction: Direction, _lifeSpan: number = 10, _directingStrength: number[] = EventWindow.ALLADJACENT) {
    super(_direction, _directingStrength);

    this.lifeSpan = _lifeSpan;

    this.registerClass(QDecayable);
  }

  behave(ew: EventWindow) {
    super.behave(ew);
  }

  exec(ew: EventWindow) {
    if (!this.decay(ew)) {
      super.exec(ew);
    }
  }
}

Element.applyMixins(DecayDirector, [QDecayable]);
