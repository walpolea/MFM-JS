import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { QDirectional } from "./quarks/QDirectional";
import { Direction } from "../utils/MFMWayfinder";

export class Director extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTOR", symbol: "Di", class: Director, color: 0xcc20ff };
  static CREATE = Director.CREATOR();
  static DIRECTOR_EAST = Director.CREATOR({ name: "DIRECTOR_EAST", params: ["E"] });
  static DIRECTOR_WEST = Director.CREATOR({ name: "DIRECTOR_WEST", params: ["W"] });
  static DIRECTOR_NORTH = Director.CREATOR({ name: "DIRECTOR_NORTH", params: ["N"] });
  static DIRECTOR_SOUTH = Director.CREATOR({ name: "DIRECTOR_SOUTH", params: ["S"] });

  direction: Direction;

  constructor(_direction: Direction = "E") {
    super(Director.BASE_TYPE);

    this.direction = _direction;
  }

  behave(ew: EventWindow) {
    const directables: number[] = ew.getClassIndexes(EventWindow.ALLADJACENT, QDirectional);

    if (directables.length) {
      directables.forEach((d) => {
        ((ew.getSiteByIndex(d).atom.elem as unknown) as QDirectional).direct(this.direction);
      });
    }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Director.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

//Register a SPLAT symbol
ElementRegistry.registerSPLAT("w", Director.BASE_TYPE);
