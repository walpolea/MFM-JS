import { EventWindow, EWIndex } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../Atom";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";

export class DirectionalTraveler extends Elem {
  static TYPE_DEF: IElementType = { name: "DIRECTIONALTRAVELER", type: "Dt", class: DirectionalTraveler, color: 0xffffaa };
  static CREATE = DirectionalTraveler.CREATOR();
  static CREATE_EAST = DirectionalTraveler.CREATOR(["E"]);
  static CREATE_WEST = DirectionalTraveler.CREATOR(["W"]);
  static CREATE_NORTH = DirectionalTraveler.CREATOR(["N"]);
  static CREATE_SOUTH = DirectionalTraveler.CREATOR(["S"]);

  direction: Direction;
  counter = 0;
  max = 20;
  constructor(_direction: Direction = "S") {
    super(DirectionalTraveler.TYPE_DEF);
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
    return DecayWall.CREATE([5], undefined, 0x68492d);
  }

  exec(ew: EventWindow) {
    this.counter++;
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);

    if (ew.is(travelTo, Empty.TYPE_DEF)) {
      if (ew.is(leftSite, Empty.TYPE_DEF)) ew.mutate(leftSite, this.makeTrail());
      if (ew.is(rightSite, Empty.TYPE_DEF)) ew.mutate(rightSite, this.makeTrail());

      ew.move(travelTo, this.makeTrail());
    } else {
      const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
      const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);

      if (ew.is(rightSite, Empty.TYPE_DEF)) {
        this.slightRight();
      } else if (ew.is(leftSite, Empty.TYPE_DEF)) {
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
ElementTypes.registerType(DirectionalTraveler.TYPE_DEF);
