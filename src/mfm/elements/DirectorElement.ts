import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";
import { DirectionalDirector } from "./DirectionalDirector";
import { Empty } from "./EmptyElement";
import { QDirector } from "./quarks/QDirector";

export interface Director extends QDirector {}

export class Director extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTOR", symbol: "Di", class: Director, color: 0xcc20ff };
  static CREATE = Director.CREATOR();
  static DIRECTOR_EAST = Director.CREATOR({ name: "DIRECTOR_EAST", params: ["E"] });
  static DIRECTOR_WEST = Director.CREATOR({ name: "DIRECTOR_WEST", params: ["W"] });
  static DIRECTOR_NORTH = Director.CREATOR({ name: "DIRECTOR_NORTH", params: ["N"] });
  static DIRECTOR_SOUTH = Director.CREATOR({ name: "DIRECTOR_SOUTH", params: ["S"] });
  static DIRECTOR_NORTHEAST = Director.CREATOR({ name: "DIRECTOR_NORTHEAST", params: ["NE"] });
  static DIRECTOR_NORTHWEST = Director.CREATOR({ name: "DIRECTOR_NORTHWEST", params: ["NW"] });
  static DIRECTOR_SOUTHEAST = Director.CREATOR({ name: "DIRECTOR_SOUTHEAST", params: ["SE"] });
  static DIRECTOR_SOUTHWEST = Director.CREATOR({ name: "DIRECTOR_SOUTHWEST", params: ["SW"] });

  emitBeforeAge: number;

  constructor(_direction: Direction = "E", _directingStrength = EventWindow.ALLADJACENT, _emitBeforeAge: number = 0) {
    super(Director.BASE_TYPE);

    this.direction = _direction;
    this.directingStrength = _directingStrength;
    this.emitBeforeAge = _emitBeforeAge;

    this.registerClass(QDirector);
  }

  behave(ew: EventWindow) {
    if (this.age < this.emitBeforeAge) {
      const nearbyEmpties = ew.getIndexes(Array.from(Wayfinder.DIRECTIONS_INDEX_MAP.values()), Empty.BASE_TYPE);

      if (nearbyEmpties.length) {
        nearbyEmpties.forEach((e) => {
          const dir: Direction = Wayfinder.indexToDirection(e as EWIndex);
          ew.mutate(e, DirectionalDirector.CREATE({ params: [dir] }));
        });
      }
    }

    this.directDirectionals(ew);

    this.setColor();
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Director.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

Element.applyMixins(Director, [QDirector]);
