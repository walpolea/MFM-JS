import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { QDirectional } from "./quarks/QDirectional";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";
import { Empty } from "./EmptyElement";
import { Director } from "./DirectorElement";
import { QDirector } from "./quarks/QDirector";

export interface DirectorSwitch extends QDirector {}

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

  checkInterval: number = 150;
  checkCounter: number = 0;
  isReady: boolean = false;

  constructor(_direction: Direction = "E", _directingStrength = EventWindow.ALLADJACENT, _emitBeforeAge: number = 0) {
    super(DirectorSwitch.BASE_TYPE);

    this.direction = _direction;
    this.directingStrength = _directingStrength;

    this.registerClass(QDirector);
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

    if (ew.getClassIndexes(reverseCheckQuadrant, QDirectional).length > 2) {
      return true;
    }

    return false;
  }

  behave(ew: EventWindow) {
    // this.checkCounter++;

    // if (this.checkCounter % this.checkInterval === 0) {
    //   this.isReady = true;
    //   this.checkCounter = 0;
    //   this.direction = Wayfinder.reverse(this.direction);
    // }

    // if (this.hasLoad(ew)) {
    //   this.isReady = true;
    //   this.checkCounter = 0;
    //   this.direction = Wayfinder.reverse(this.direction);
    // }

    // if (this.isReady) {
    //   this.isReady = false;

    //   const nearbySwitches = ew.getSites(EventWindow.ALLADJACENT, this.TYPE, false);

    //   console.log("switching", nearbySwitches.length);
    //   nearbySwitches.forEach((s) => {
    //     const ds: DirectorSwitch = s.atom.elem as DirectorSwitch;
    //     ds.checkCounter = this.checkCounter;
    //     ds.direction = this.direction;
    //   });
    // }

    // const emitMap = [37, 9, 12, 40];

    // const emits = [...ew.getIndexes(emitMap, Empty.BASE_TYPE, false), ...ew.getClassIndexes(emitMap, QDirector, false)];

    // emits.forEach((e) => {
    //   ew.mutate(e, Director.CREATE({ params: [this.direction, this.directingStrength] }));
    // });
    this.setColor();

    if (this.hasLoad(ew)) {
      this.directDirectionals(ew);
    } else {
      this.color = 0x000000;
    }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DirectorSwitch.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

Element.applyMixins(DirectorSwitch, [QDirector]);
