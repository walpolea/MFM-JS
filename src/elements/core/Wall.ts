import { Decay } from "../../capabilities/Decay";
import { Repel } from "../../capabilities/Repel";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Builder } from "./Builder";

export class Wall extends Element {
  static CREATE = Wall.CREATOR({ name: "WALL", class: Wall, color: 0x3311cc, groups: ["Structural", "MFM"] });
  static MOVABLE_WALL = Wall.CREATOR({ name: "MOVABLE WALL", class: Wall, color: 0x8811cc, classifications: ["MOVABLE"], groups: ["Structural", "MFM"] });
  static DECAY_WALL = Wall.CREATOR({ name: "DECAY WALL", class: Wall, color: 0x0000ee, classifications: ["DECAYABLE", "WALL"], groups: ["Structural"] });
  static DECAY_WALL_10 = Wall.CREATOR(
    { name: "DECAY WALL 10", class: Wall, color: 0x0000ee, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
    { lifeSpan: 10 }
  );
  static DECAY_WALL_25 = Wall.CREATOR(
    { name: "DECAY WALL 25", class: Wall, color: 0x0000ee, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
    { lifeSpan: 25 }
  );
  static DECAY_WALL_50 = Wall.CREATOR(
    { name: "DECAY WALL 50", class: Wall, color: 0x0000ee, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
    { lifeSpan: 50 }
  );

  static MOVABLE_WALL_GRID = Builder.CREATOR(
    { name: "MOVABLE WALL GRID", class: Builder, color: 0x121112, groups: ["Structural"] },
    { buildPath: EventWindow.DIAGONAL4WAY, atomizer: Wall.MOVABLE_WALL }
  );

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    if (ew.selfIs("DECAYABLE")) {
      Decay.DECAY(ew, this, this.state.lifeSpan ?? 100, 2);
    }
  }
}
