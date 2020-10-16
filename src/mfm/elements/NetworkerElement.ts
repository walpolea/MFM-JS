import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { Utils } from "../utils/MFMUtils";
import { Atom } from "../core/Atom";
import { Wayfinder, Direction } from "../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";
import { Pathway } from "./Pathway";
import { Wall } from "./WallElement";

export class Networker extends Element {
  static BASE_TYPE: IElementType = { name: "NETWORKER", symbol: "Dt", class: Networker, color: 0xffffaa };
  static CREATE = Networker.CREATOR({ params: [Wall.BASE_TYPE] });
  static CREATE_EAST = Networker.CREATOR({ params: ["E"] });
  static CREATE_WEST = Networker.CREATOR({ params: ["W"] });
  static CREATE_NORTH = Networker.CREATOR({ params: ["N"] });
  static CREATE_SOUTH = Networker.CREATOR({ params: ["S"] });

  direction: Direction;
  counter = 0;
  max = 20;
  lookForType: IElementType;
  constructor(_lookForType: IElementType, _direction: Direction) {
    super(Networker.BASE_TYPE);
    this.lookForType = _lookForType;
    this.direction = Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS.length * Math.random()) >> 0];
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  slightLeft() {
    this.direction = Wayfinder.slightLeft(this.direction);
  }

  slightRight() {
    this.direction = Wayfinder.slightRight(this.direction);
  }

  makeTrail(isTrailHead: boolean = false): Atom {
    return Pathway.CREATE({ params: [this.direction, null, isTrailHead] });
  }

  exec(ew: EventWindow) {
    //look for

    const lookFors = ew.getNearestIndex(EventWindow.ALLADJACENT, this.lookForType);

    if (lookFors) {
      const nearestPathway: number = ew.getNearestIndex(EventWindow.ALLADJACENT, Pathway.BASE_TYPE);
      if (nearestPathway) {
        (ew.getSiteByIndex(nearestPathway).atom.elem as Pathway).isConnected = true;
      }
      ew.origin.die(this.makeTrail(true));
    }

    const nearestPathway: number = ew.getNearestIndex(EventWindow.ADJACENT8WAY, Pathway.BASE_TYPE);

    if (nearestPathway && (ew.getSiteByIndex(nearestPathway).atom.elem as Pathway).isConnected) {
      const p: Pathway = ew.getSiteByIndex(nearestPathway).atom.elem as Pathway;
      this.direction = p.toDirection;
      ew.swap(nearestPathway);
      return;
    }

    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    if (ew.is(travelTo, [Empty.BASE_TYPE, Pathway.BASE_TYPE])) {
      ew.move(travelTo, this.makeTrail(this.age < 1));
    } else {
      ew.origin.die();
      // if (Utils.oneIn(2)) {
      //   this.slightLeft();
      // } else {
      //   this.slightRight();
      // }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Networker.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
