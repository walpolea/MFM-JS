import { Repel } from "../../capabilities/Repel";
import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";
import { Wall } from "../core/Wall";
import { Director } from "./Director";

export class Looper extends Element {
  static CREATE = Looper.CREATOR({ name: "LOOPER", symbol: "LPR", class: Looper, color: 0xff146f, groups: ["Life"] });
  static WONKY = Looper.CREATOR({
    name: "WONKY LOOPER",
    symbol: "LPR",
    class: Looper,
    color: 0xff146f,
    classifications: ["WONKY", "LOOPER"],
    groups: ["Life"],
  });

  //SYSTEM ELEMENTS
  static LOOP_WALL = Wall.CREATOR({ name: "LOOP WALL", class: Wall, color: 0x661199, classifications: ["DECAYABLE", "MOVABLE"] }, { lifeSpan: 150 });
  static LOOP_DIRECTOR = (heading) => {
    return Director.DIRECTORS_MAP.get(Wayfinder.turnRight(heading))({ classifications: ["LOOP DIRECTOR", "DECAYABLE"] }, { lifeSpan: 100 });
  };

  //CAPABILITIES
  static REPEL_DIRECTIONAL = Repel.MAKE_REPELLER(["DIRECTIONAL"], [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 25, 26, 27, 28]);

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.classifyAs("DIRECTIONAL");
  }

  makeBigTail(ew: EventWindow) {
    [
      ...Wayfinder.getLeft(this.state.heading, true),
      Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.state.heading), true),
      Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.state.heading), true),
      Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.state.heading), true),
      Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.state.heading), true),
    ].forEach((s) => {
      if (ew.is(s, "EMPTY")) ew.replace(s, Looper.LOOP_WALL());
    });
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    Looper.REPEL_DIRECTIONAL(ew, this);

    if (ew.selfIs("WONKY")) {
      this.behaveAsWonky(ew);
    } else {
      this.behaveAsLooper(ew);
    }
  }

  behaveAsLooper(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM(Wayfinder.DIRECTIONS_PRIMARY));
      this.state.moves = 0;
    } else {
      const tails = this.state.moves % 2 !== 0;

      let leavingAtom;

      this.makeBigTail(ew);

      if (tails) {
        leavingAtom = Looper.LOOP_DIRECTOR(this.state.heading);
      }
      Wayfinding.MOVE_DIRECTIONALLY(ew, this, ["LOOP WALL", "LOOP DIRECTOR", "EMPTY"], leavingAtom);
      this.state.moves++;

      if (this.state.moves % 8 === 0) {
        Wayfinding.VEER_RIGHT(this);
      }
    }
  }

  behaveAsWonky(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM(Wayfinder.DIRECTIONS));
      this.state.moves = 0;
    } else {
      Wayfinding.MOVE_DIRECTIONALLY(
        ew,
        this,
        ["DECAY WALL", "EMPTY"],
        Director.DIRECTORS_MAP.get(Wayfinder.turnRight(this.state.heading))({ classifications: ["DECAY WALL", "DECAYABLE"] }, { lifeSpan: 50 })
      );

      if (this.state.age % 5 === 0) {
        Wayfinding.SLIGHT_RIGHT(this);
      }
    }
  }
}
