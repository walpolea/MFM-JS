import { Empty } from "../elements/core/Empty";
import { Element } from "../mfm/Element";
import { EventWindow, EWIndex } from "../mfm/EventWindow";
import { Direction, Wayfinder } from "../mfm/Wayfinder";

export class Wayfinding {
  static NAME: string = "WAYFINDING";

  static REVERSE(self: Element) {
    const { heading } = self.state;
    if (heading) {
      self.wr("heading", Wayfinder.reverse(heading));
    }
  }
  static SLIGHT_LEFT(self: Element) {
    const { heading } = self.state;
    if (heading) {
      self.wr("heading", Wayfinder.slightLeft(heading));
    }
  }
  static VEER_LEFT(self: Element) {
    const { heading } = self.state;
    if (heading) {
      self.wr("heading", Wayfinder.veerLeft(heading));
    }
  }
  static TURN_LEFT(self: Element) {
    const { heading } = self.state;
    if (heading) {
      self.wr("heading", Wayfinder.turnLeft(heading));
    }
  }
  static SLIGHT_RIGHT(self: Element) {
    const { heading } = self.state;
    if (heading) {
      self.wr("heading", Wayfinder.slightRight(heading));
    }
  }
  static VEER_RIGHT(self: Element) {
    const { heading } = self.state;
    if (heading) {
      self.wr("heading", Wayfinder.veerRight(heading));
    }
  }
  static TURN_RIGHT(self: Element) {
    const { heading } = self.state;
    if (heading) {
      self.wr("heading", Wayfinder.turnRight(heading));
    }
  }
  static SLIGHT_RANDOMLY(self: Element) {
    EventWindow.oneIn(2) ? this.SLIGHT_LEFT(self) : this.SLIGHT_RIGHT(self);
  }
  static VEER_RANDOMLY(self: Element) {
    EventWindow.oneIn(2) ? this.VEER_LEFT(self) : this.VEER_RIGHT(self);
  }
  static TURN_RANDOMLY(self: Element) {
    EventWindow.oneIn(2) ? this.TURN_RIGHT(self) : this.TURN_RIGHT(self);
  }

  static SET_DIRECTION(self: Element, d: Direction) {
    self.wr("heading", d);
  }

  static MOVE_IN_DIRECTION(
    ew: EventWindow,
    self: Element,
    direction: Direction | Direction[],
    types: string | string[] = "EMPTY",
    leavingAtom: Element = Empty.CREATE(),
  ): boolean {

    if (typeof direction === "string") {
      direction = [direction];
    }

    const possibleMoves = direction.map((d) => Wayfinder.getDirectionalMove(d, true));

    if(!possibleMoves.length) {
      return false;
    }

    for (const travelTo of possibleMoves) {
      if (types === "ANY" || ew.is(travelTo, types)) {
        const moved = ew.move(travelTo, leavingAtom);
        if( moved ) self.wr('location', travelTo);
        return moved;
      }
    }
  }

  static MOVE_DIRECTIONALLY(ew: EventWindow, self: Element, types: string | string[] = "EMPTY", leavingAtom: Element = Empty.CREATE()): boolean {
    const { heading } = self.state;
    if (heading) {
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(heading, true);

      if (types === "ANY" || ew.is(travelTo, types)) {
        const moved = ew.move(travelTo, leavingAtom);
        if( moved ) self.wr('location', travelTo);
        return moved;
      }
    }

    return false;
  }

  static SWAP_IN_DIRECTION(
    ew: EventWindow,
    self: Element,
    direction: Direction | Direction[],
    types: string | string[] = "EMPTY",
  ): boolean {
    const { heading } = self.state;

    if (typeof direction === "string") {
      direction = [direction];
    }

    const possibleMoves = direction.map((d) => Wayfinder.getDirectionalMove(d, true));

    for (const travelTo of possibleMoves) {
      if (types === "ANY" || ew.is(travelTo, types)) {
        const swapped = ew.swap(travelTo);
        if( swapped ) self.wr('location', travelTo);
        return swapped;
      }
    }
  }

  static SWAP_DIRECTIONALLY(ew: EventWindow, self: Element, types: string | string[] = "EMPTY"): boolean {
    const { heading } = self.state;
    if (heading) {
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(heading, true);

      if (types === "ANY" || ew.is(travelTo, types)) {
        const swapped = ew.swap(travelTo);
        if( swapped ) self.wr('location', travelTo);
        return swapped;
      }
    }

    return false;
  }
  static DIRECT(ew: EventWindow, s: EWIndex, heading: Direction): boolean {
    const { atom } = ew.getSite(s);
    if (atom && atom.state.heading) {
      atom.state.heading = heading;
      return true;
    }
    return false;
  }
}
