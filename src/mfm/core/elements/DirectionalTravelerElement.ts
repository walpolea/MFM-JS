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

export class DirectionalTraveler extends Elem {
  static TYPE_DEF: IElementType = { name: "DirectionalTraveler", type: "Dt", class: DirectionalTraveler, color: 0xffffaa };
  static CREATE = DirectionalTraveler.CREATOR();
  static CREATE_EAST = DirectionalTraveler.CREATOR(["E"]);
  static CREATE_WEST = DirectionalTraveler.CREATOR(["W"]);
  static CREATE_NORTH = DirectionalTraveler.CREATOR(["N"]);
  static CREATE_SOUTH = DirectionalTraveler.CREATOR(["S"]);

  direction: Direction;
  counter = 0;
  max = 3;

  constructor(_direction: Direction = "S") {
    super(DirectionalTraveler.TYPE_DEF);
    this.direction = Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS.length * Math.random()) >> 0];
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  exec(ew: EventWindow) {
    this.counter++;
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    if (ew.is(travelTo, Empty.TYPE_DEF)) {
      ew.swap(travelTo);
      console.log(this.direction);
    } else {
      this.direction = Wayfinder.slightRight(this.direction);
    }

    // if (this.counter % this.max == 0) {
    //   this.counter = 0;
    //   this.direction = Utils.oneIn(2) ? Wayfinder.veerRight(this.direction) : Wayfinder.veerLeft(this.direction);
    // }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DirectionalTraveler.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(DirectionalTraveler.TYPE_DEF);
