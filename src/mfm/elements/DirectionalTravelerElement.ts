import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../utils/SPLAT";
import { Symmetries } from "../utils/Symmetries";
import { Utils } from "../utils/MFMUtils";
import { Atom } from "../core/Atom";
import { Wayfinder, Direction } from "../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";

export class DirectionalTraveler extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTIONALTRAVELER", symbol: "Dt", class: DirectionalTraveler, color: 0xffffaa };
  static CREATE = DirectionalTraveler.CREATOR();
  static CREATE_EAST = DirectionalTraveler.CREATOR({ params: ["E"] });
  static CREATE_WEST = DirectionalTraveler.CREATOR({ params: ["W"] });
  static CREATE_NORTH = DirectionalTraveler.CREATOR({ params: ["N"] });
  static CREATE_SOUTH = DirectionalTraveler.CREATOR({ params: ["S"] });

  direction: Direction;
  counter = 0;
  max = 20;
  constructor(_direction: Direction = "S") {
    super(DirectionalTraveler.BASE_TYPE);
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

  makeTrail(): Atom {
    return DecayWall.CREATE({ params: [5] }, undefined, 0x68492d);
  }

  exec(ew: EventWindow) {
    this.counter++;
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);

    if (ew.is(travelTo, Empty.BASE_TYPE)) {
      if (ew.is(leftSite, Empty.BASE_TYPE)) ew.mutate(leftSite, this.makeTrail());
      if (ew.is(rightSite, Empty.BASE_TYPE)) ew.mutate(rightSite, this.makeTrail());

      ew.move(travelTo, this.makeTrail());
    } else {
      const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
      const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);

      if (ew.is(rightSite, Empty.BASE_TYPE)) {
        this.slightRight();
      } else if (ew.is(leftSite, Empty.BASE_TYPE)) {
        this.slightLeft();
      } else if (Utils.oneIn(2)) {
        this.slightLeft();
      } else {
        this.slightRight();
      }
    }

    // if (this.counter % this.max == 0) {
    //   this.counter = 0;
    //   this.direction = Utils.oneIn(2) ? Wayfinder.slightRight(this.direction) : Wayfinder.slightLeft(this.direction);
    // }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DirectionalTraveler.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(DirectionalTraveler.BASE_TYPE);
