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
import { QDirectional } from "./quarks/QDirectional";

export interface DirectionalTraveler extends QDirectional {}

export class DirectionalTraveler extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTIONALTRAVELER", symbol: "Dt", class: DirectionalTraveler, color: 0xffffaa };
  static CREATE = DirectionalTraveler.CREATOR();
  static CREATE_EAST = DirectionalTraveler.CREATOR({ name: "DIRECTIONALTRAVELER_E", params: ["E"] });
  static CREATE_WEST = DirectionalTraveler.CREATOR({ name: "DIRECTIONALTRAVELER_W", params: ["W"] });
  static CREATE_NORTH = DirectionalTraveler.CREATOR({ name: "DIRECTIONALTRAVELER_N", params: ["N"] });
  static CREATE_SOUTH = DirectionalTraveler.CREATOR({ name: "DIRECTIONALTRAVELER_S", params: ["S"] });

  counter = 0;
  max = 20;

  constructor(_direction: Direction = "S") {
    super(DirectionalTraveler.BASE_TYPE);

    if (_direction) {
      this.direction = _direction;
    } else {
      this.setRandomDirection();
    }

    this.registerClass(QDirectional);
  }

  makeTrail(color: number = 0x68492d): Atom {
    return DecayWall.CREATE({ params: [5] }, undefined, color);
  }

  makeLeftRightTrails(ew: EventWindow, color: number = 0x68492d) {
    const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);
    if (ew.is(leftSite, Empty.BASE_TYPE)) ew.mutate(leftSite, this.makeTrail(color));
    if (ew.is(rightSite, Empty.BASE_TYPE)) ew.mutate(rightSite, this.makeTrail(color));
  }

  exec(ew: EventWindow) {
    if (this.moveIfDirected(ew, Empty.BASE_TYPE, this.makeTrail(0xcc22b0), 10)) {
      this.makeLeftRightTrails(ew, 0xcc22b0);
      return;
    }

    this.counter++;

    if (this.moveDirectionally(ew, Empty.BASE_TYPE, this.makeTrail())) {
      this.makeLeftRightTrails(ew);
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

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DirectionalTraveler.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

Element.applyMixins(DirectionalTraveler, [QDirectional]);
