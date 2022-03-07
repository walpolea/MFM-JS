import { Repel } from "../../capabilities/Repel";
import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";
import { Wall } from "../core/Wall";
import { Swamp } from "./Swamp";

export class Wanderer extends Element {
  //VARIANTS
  static CREATE = Wanderer.CREATOR({ name: "WANDERER", class: Wanderer, color: 0xbe146f, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });
  static FLY = Wanderer.CREATOR({ name: "FLY", class: Wanderer, color: 0xccaaff, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });
  static MOSQUITO = Wanderer.CREATOR({ name: "MOSQUITO", class: Wanderer, color: 0xccff55, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });
  static BIRD = Wanderer.CREATOR({ name: "BIRD", class: Wanderer, color: 0x4a9bef, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });

  static SWAMPLING = Wanderer.CREATOR({
    name: "SWAMPLING",
    class: Wanderer,
    color: 0x22cc88,
    classifications: ["OFSWAMP", "DIRECTIONAL", "DIRECTABLE"],
    groups: ["Swamp"],
  });

  //SYSTEM ELEMENTS
  static BIRD_WING = Wall.CREATOR({ name: "BIRD WING", class: Wall, color: 0x3a8bdf, classifications: ["DECAYABLE", "BIRD", "DIRECTABLE"] }, { lifeSpan: 2 });
  static FLY_TAIL = Wall.CREATOR({ name: "FLY TAIL", class: Wall, color: 0x991144, classifications: ["DECAYABLE"] }, { lifeSpan: 10 });
  static MOSQUITO_TAIL = Wall.CREATOR({ name: "MOSQUITO TAIL", class: Wall, color: 0x557700, classifications: ["DECAYABLE"] }, { lifeSpan: 10 });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    if (this.state.heading) {
      const front = [Wayfinder.getInFront(this.state.heading)[0]];
      const others = [...Wayfinder.getBehind(this.state.heading), Wayfinder.getLeft(this.state.heading)[0], Wayfinder.getRight(this.state.heading)[0]];

      // if (!ew.is(front[0], "EMPTY")) {
      //   const move = Wayfinder.veerRandom(this.state.heading);
      //   const moveSite = Wayfinder.getDirectionalMove(move, true);

      //   if (ew.is(moveSite, "EMPTY")) {
      //     this.state.heading = move;
      //   } else if (Repel.MAKE_REPELLER(["MOVABLE"], front, [9, 10, 11, 12, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])(ew, this)) {
      //     return;
      //   }
      // }

      if (Repel.MAKE_REPELLER(["MOVABLE"], front, others)(ew, this)) {
        return;
      }
    }

    if (ew.selfIs("FLY")) {
      this.behaveAsFly(ew);
    } else if (ew.selfIs("MOSQUITO")) {
      this.behaveAsMosquito(ew);
    } else if (ew.selfIs("BIRD")) {
      this.behaveAsBird(ew);
    } else if (ew.selfIs("SWAMPLING")) {
      this.behaveAsSwampling(ew);
    } else {
      if (!this.state.heading) {
        Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
      } else if (!Wayfinding.MOVE_DIRECTIONALLY(ew, this) && EventWindow.oneIn(10)) {
        Wayfinding.SLIGHT_RANDOMLY(this);
      }
    }
  }

  behaveAsFly(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      [
        Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.state.heading), true),
        Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.state.heading), true),
      ].forEach((s) => {
        if (ew.is(s, "EMPTY")) ew.replace(s, Wanderer.FLY_TAIL());
      });

      Wayfinding.MOVE_DIRECTIONALLY(ew, this, "EMPTY", Wanderer.FLY_TAIL());
      if (EventWindow.oneIn(2)) Wayfinding.SLIGHT_RANDOMLY(this);
    }
  }

  behaveAsMosquito(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      Wayfinding.MOVE_DIRECTIONALLY(ew, this, "EMPTY", Wanderer.MOSQUITO_TAIL());
      Wayfinding.SLIGHT_RANDOMLY(this);
    }
  }

  behaveAsBird(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      const neighborBird = ew.filter(EventWindow.ALLADJACENT, "BIRD", true)[0];
      if (neighborBird) {
        this.state.heading = ew.getSite(neighborBird).atom.state.heading ?? this.state.heading;
      }

      [
        Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.state.heading), true),
        Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.state.heading), true),
      ].forEach((s) => {
        if (ew.is(s, "EMPTY")) ew.replace(s, Wanderer.BIRD_WING({}, { heading: this.state.heading }));
      });

      if (!Wayfinding.MOVE_DIRECTIONALLY(ew, this, "EMPTY")) {
        Wayfinding.REVERSE(this);
      } else if (EventWindow.oneIn(4)) {
        Wayfinding.SLIGHT_RANDOMLY(this);
      }
    }
  }

  behaveAsSwampling(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
      const empties = ew.filterByType(EventWindow.ADJACENT8WAY, "EMPTY");
      if (empties.length) {
        ew.mutateMany(empties, Swamp.CREATE);
      }
    } else {
      Wayfinding.MOVE_DIRECTIONALLY(ew, this, "SWAMP", Swamp.CREATE());
      if (EventWindow.oneIn(2)) {
        Wayfinding.SLIGHT_RIGHT(this);
      }
    }
  }
}
