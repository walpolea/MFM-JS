import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { QDirectional } from "./quarks/QDirectional";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";
import { Empty } from "./EmptyElement";

export class DirectorSwitch extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTORSWITCH", symbol: "Di", class: DirectorSwitch, color: 0xcc20ff };
  static CREATE = DirectorSwitch.CREATOR();
  static DIRECTORSWITCH_EAST = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_EAST", params: ["E"] });
  static DIRECTORSWITCH_WEST = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_WEST", params: ["W"] });
  static DIRECTORSWITCH_NORTH = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_NORTH", params: ["N"] });
  static DIRECTORSWITCH_SOUTH = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_SOUTH", params: ["S"] });
  static DIRECTORSWITCH_NORTHEAST = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_NORTHEAST", params: ["NE"] });
  static DIRECTORSWITCH_NORTHWEST = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_NORTHWEST", params: ["NW"] });
  static DIRECTORSWITCH_SOUTHEAST = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_SOUTHEAST", params: ["SE"] });
  static DIRECTORSWITCH_SOUTHWEST = DirectorSwitch.CREATOR({ name: "DIRECTORSWITCH_SOUTHWEST", params: ["SW"] });

  direction: Direction;
  originalDirection: Direction;
  directingStrength: number[];
  checkInterval: number = 300;
  checkCounter: number = 0;

  constructor(_direction: Direction = "E", _directingStrength = EventWindow.ALLADJACENT, _emitBeforeAge: number = 0) {
    super(DirectorSwitch.BASE_TYPE);

    this.direction = this.originalDirection = _direction;
    this.directingStrength = _directingStrength;
  }

  setColor() {
    switch (this.direction) {
      case "E":
        this.color = 0x20ccff;
        break;
      case "W":
        this.color = 0xccff20;
        break;
      case "N":
        this.color = 0xcc20ff;
        break;
      case "S":
        this.color = 0x4466aa;
        break;
    }
  }

  getDirectionQuadrant(d: Direction): number[] {
    switch (d) {
      case "W":
        return Wayfinder.W_QUADRANT;
        break;
      case "E":
        return Wayfinder.E_QUADRANT;
        break;
      case "S":
        return Wayfinder.S_QUADRANT;
        break;
      case "SE":
        return Wayfinder.SE_QUADRANT;
        break;
      case "SW":
        return Wayfinder.SW_QUADRANT;
        break;
      case "N":
        return Wayfinder.N_QUADRANT;
        break;
      case "NE":
        return Wayfinder.NE_QUADRANT;
        break;
      case "NW":
        return Wayfinder.NW_QUADRANT;
        break;
    }
  }

  getReverseDirectionQuadrant(d: Direction): number[] {
    return this.getDirectionQuadrant(Wayfinder.reverse(d));
  }

  hasLoad(ew: EventWindow) {
    const checkQuadrant: number[] = this.getDirectionQuadrant(this.direction);
    const reverseCheckQuadrant: number[] = this.getReverseDirectionQuadrant(this.direction);

    if (ew.getClassIndexes(checkQuadrant, QDirectional).length > ew.getClassIndexes(reverseCheckQuadrant, QDirectional).length) {
      return true;
    }

    return false;
  }

  behave(ew: EventWindow) {
    const nearbySwitches = ew.getSites(EventWindow.ALLADJACENT, DirectorSwitch.BASE_TYPE, false);

    if (nearbySwitches.length) {
      const eldest = nearbySwitches.sort((a, b) => (a.atom.elem as DirectorSwitch).age - (b.atom.elem as DirectorSwitch).age)[0].atom.elem as DirectorSwitch;

      this.direction = eldest.direction;
      this.checkCounter = eldest.checkCounter;
      nearbySwitches.forEach((s) => {
        (s.atom.elem as DirectorSwitch).checkCounter = eldest.checkCounter;
        (s.atom.elem as DirectorSwitch).direction = eldest.direction;
      });
    }

    this.checkCounter++;

    if (this.checkCounter % this.checkInterval === 0 /*&& this.hasLoad(ew)*/) {
      this.checkCounter = 0;
      this.direction = Wayfinder.reverse(this.direction);
      console.log("SWITCH", this.direction);
    }

    const directables: number[] = ew.getClassIndexes(this.directingStrength, QDirectional);

    if (directables.length) {
      directables.forEach((d) => {
        ((ew.getSiteByIndex(d).atom.elem as unknown) as QDirectional).direct(this.direction);
      });
    }

    this.setColor();
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DirectorSwitch.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

//Register a SPLAT symbol
ElementRegistry.registerSPLAT("w", DirectorSwitch.BASE_TYPE);
