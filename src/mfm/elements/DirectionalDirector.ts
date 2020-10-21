import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { QDirectional } from "./quarks/QDirectional";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";
import { QDecayable } from "./quarks/QDecayable";

export interface DirectionalDirector extends QDirectional, QDecayable {}

export class DirectionalDirector extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTIONALDIRECTOR", symbol: "Ddi", class: DirectionalDirector, color: 0xaa44ff };
  static CREATE = DirectionalDirector.CREATOR();
  static DIRECTIONALDIRECTOR_EAST = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_EAST", params: ["E"] });
  static DIRECTIONALDIRECTOR_WEST = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_WEST", params: ["W"] });
  static DIRECTIONALDIRECTOR_NORTH = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_NORTH", params: ["N"] });
  static DIRECTIONALDIRECTOR_SOUTH = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_SOUTH", params: ["S"] });
  static DIRECTIONALDIRECTOR_NORTHEAST = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_EAST", params: ["NE"] });
  static DIRECTIONALDIRECTOR_NORTHWEST = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_WEST", params: ["NW"] });
  static DIRECTIONALDIRECTOR_SOUTHEAST = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_NORTH", params: ["SE"] });
  static DIRECTIONALDIRECTOR_SOUTHWEST = DirectionalDirector.CREATOR({ name: "DIRECTIONALDIRECTOR_SOUTH", params: ["SW"] });

  directingStrength: number[];

  constructor(_direction: Direction = "E", _directingStrength = EventWindow.ALLADJACENT) {
    super(DirectionalDirector.BASE_TYPE);

    this.directingStrength = _directingStrength;
    this.direction = _direction;
    this.lifeSpan = 100;
  }

  behave(ew: EventWindow) {
    const directables: number[] = ew.getClassIndexes(this.directingStrength, QDirectional);

    if (directables.length) {
      directables.forEach((d) => {
        ((ew.getSiteByIndex(d).atom.elem as unknown) as QDirectional).direct(Wayfinder.reverse(this.direction));
      });
      // ew.destroy();
    }

    if (!this.moveDirectionally(ew)) {
      ew.destroy();
    }
  }

  exec(ew: EventWindow) {
    if (!this.decay(ew)) {
      this.behave(ew);
      super.exec(ew);
    }
  }
}

//Initialize Splat Map maps the # to to the self type
DirectionalDirector.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

//Register a SPLAT symbol
ElementRegistry.registerSPLAT("w", DirectionalDirector.BASE_TYPE);

Element.applyMixins(DirectionalDirector, [QDirectional, QDecayable]);
