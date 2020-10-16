import { EventWindow, EWIndex } from "../../core/EventWindow";
import { Empty } from "../EmptyElement";
import { Utils } from "../../utils/MFMUtils";
import { Quark } from "../../core/Quark";
import { Direction, Wayfinder } from "../../utils/MFMWayfinder";
import { IElementType } from "../../core/IElementType";

export class QDirectional extends Quark {
  static CLASS: string = "DIRECTIONAL";

  direction: Direction;
  isDirected: boolean = true;

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }
  slightLeft() {
    this.direction = Wayfinder.slightLeft(this.direction);
  }
  veerLeft() {
    this.direction = Wayfinder.veerLeft(this.direction);
  }
  turnLeft() {
    this.direction = Wayfinder.turnLeft(this.direction);
  }
  slightRight() {
    this.direction = Wayfinder.slightRight(this.direction);
  }
  veerRight() {
    this.direction = Wayfinder.veerRight(this.direction);
  }
  turnRight() {
    this.direction = Wayfinder.turnRight(this.direction);
  }
  slightRandomly() {
    Utils.oneIn(2) ? this.slightLeft() : this.slightRight();
  }
  veerRandomly() {
    Utils.oneIn(2) ? this.veerLeft() : this.veerRight();
  }
  turnRandomly() {
    Utils.oneIn(2) ? this.turnLeft() : this.turnRight();
  }

  setDirection(d: Direction) {
    this.direction = d;
  }
  setRandomDirection(possibleDirections: Direction[] = Wayfinder.DIRECTIONS_SECONDARY) {
    this.direction = possibleDirections[(possibleDirections.length * Math.random()) >> 0];
  }

  direct(d: Direction) {
    this.direction = d;
    this.isDirected = true;
  }

  moveDirectionally(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE) {
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    if (ew.is(travelTo, types)) {
      return ew.move(travelTo, Empty.CREATE());
    }

    return false;
  }

  swapDirectionally(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE) {
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    if (ew.is(travelTo, types)) {
      return ew.swap(travelTo);
    }

    return false;
  }

  swapIfDirected(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE): boolean {
    this.isDirected = this.isDirected ? (this.swapDirectionally(ew, types) ? true : false) : false;
    return this.isDirected;
  }

  moveIfDirected(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE): boolean {
    this.isDirected = this.isDirected ? (this.moveDirectionally(ew, types) ? true : false) : false;
    return this.isDirected;
  }
}
