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
    direction: Direction,
    types: string | string[] = "EMPTY",
    leavingAtom: Element = Empty.CREATE()
  ): boolean {
    const { heading } = self.state;

    self.wr("heading", direction);
    const didIt: boolean = this.MOVE_DIRECTIONALLY(ew, self, types, leavingAtom);
    self.wr("heading", heading ?? direction);

    return didIt;
  }

  static MOVE_DIRECTIONALLY(ew: EventWindow, self: Element, types: string | string[] = "EMPTY", leavingAtom: Element = Empty.CREATE()): boolean {
    const { heading } = self.state;
    if (heading) {
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(heading, true);

      if (ew.is(travelTo, types)) {
        return ew.move(travelTo, leavingAtom);
      }
    }

    return false;
  }
  static DIRECT(ew: EventWindow, s: EWIndex, heading: Direction): boolean {
    const { atom } = ew.getSite(s);
    if (atom && atom.state.heading) {
      atom.state.heading = heading;
    }
    return true;
  }
}
