import { EventWindow, EWIndex } from "../../core/EventWindow";
import { Empty } from "../EmptyElement";
import { Utils } from "../../utils/MFMUtils";
import { Quark } from "../../core/Quark";
import { Direction, Wayfinder } from "../../utils/MFMWayfinder";
import { IElementType } from "../../core/IElementType";
import { Atom } from "../../core/Atom";

export class QDirectional extends Quark {
  static CLASS: string = "DIRECTIONAL";

  direction: Direction;
  isDirected: boolean = true;
  isStubborn: boolean = false;

  reverse() {
    if (this.direction) this.direction = Wayfinder.reverse(this.direction);
  }
  slightLeft() {
    if (this.direction) this.direction = Wayfinder.slightLeft(this.direction);
  }
  veerLeft() {
    if (this.direction) this.direction = Wayfinder.veerLeft(this.direction);
  }
  turnLeft() {
    if (this.direction) this.direction = Wayfinder.turnLeft(this.direction);
  }
  slightRight() {
    if (this.direction) this.direction = Wayfinder.slightRight(this.direction);
  }
  veerRight() {
    if (this.direction) this.direction = Wayfinder.veerRight(this.direction);
  }
  turnRight() {
    if (this.direction) this.direction = Wayfinder.turnRight(this.direction);
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

  stop() {
    this.direction = undefined;
  }

  makeStubborn() {
    this.isStubborn = true;
  }

  makeManipulable() {
    this.isStubborn = false;
  }

  setStubborn(stubborn: boolean) {
    this.isStubborn = stubborn;
  }

  moveDirectionally(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE, leavingAtom: Atom = Empty.CREATE()): boolean {
    if (this.direction) {
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

      if (this.isStubborn) {
        this.stop();
      }

      if (ew.is(travelTo, types)) {
        return ew.move(travelTo, leavingAtom);
      }
    }

    return false;
  }

  swapDirectionally(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE): boolean {
    if (this.direction) {
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

      if (this.isStubborn) {
        this.stop();
      }

      if (ew.is(travelTo, types)) {
        return ew.swap(travelTo);
      }
    }

    return false;
  }

  swapIfDirected(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE, chanceToUndirect: number = 1): boolean {
    if (this.direction) {
      this.isDirected = this.isDirected ? (this.swapDirectionally(ew, types) ? true : Utils.oneIn(chanceToUndirect) ? false : true) : false;
      return this.isDirected;
    }
    return false;
  }

  moveIfDirected(ew: EventWindow, types: IElementType | IElementType[] = Empty.BASE_TYPE, leavingAtom = Empty.CREATE(), chanceToUndirect: number = 1): boolean {
    if (this.direction) {
      this.isDirected = this.isDirected ? (this.moveDirectionally(ew, types, leavingAtom) ? true : Utils.oneIn(chanceToUndirect) ? false : true) : false;
      return this.isDirected;
    }
    return false;
  }
}
