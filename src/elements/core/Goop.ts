import { Repel } from "../../capabilities/Repel";
import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";
import { Builder } from "./Builder";

export class Goop extends Element {
  static CREATE = Goop.CREATOR({ name: "GOOP", symbol: "GOP", class: Goop, color: 0x5492a2, groups: ["Goopy Stuff"] });

  static WALL_GOOP = Goop.CREATOR(
    { name: "WALL GOOP", class: Goop, color: 0xe692ff, classifications: ["GOOP"], groups: ["Goopy Stuff"] },
    { stickyType: ["WALL"] }
  );
  static LIFE_GOOP = Goop.CREATOR(
    { name: "LIFE GOOP", class: Goop, color: 0x54a997, classifications: ["GOOP", "MOVABLE"], groups: ["Goopy Stuff"] },
    { stickyType: ["DIRECTIONAL", "TAIL"] }
  );

  static GOOP_GRID = Builder.CREATOR(
    { name: "GOOP GRID", class: Builder, color: 0x121112, groups: ["Goopy Stuff"] },
    { buildPath: EventWindow.DIAGONAL4WAY, atomizer: Goop.LIFE_GOOP, totalSteps: 40 }
  );

  static ATTRACT = Repel.MAKE_ATTRACTOR(["GOOP"], [...EventWindow.LAYER2, ...EventWindow.LAYER3, ...EventWindow.LAYER4]);
  static AVOID = Repel.MAKE_AVOIDER(["GOOP"], [...EventWindow.LAYER1], [...EventWindow.LAYER2, ...EventWindow.LAYER3, ...EventWindow.LAYER4]);

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    if (!this.state.stickyType) {
      this.state.stickyType = ["GOOP"];
    }

    this.state.attractor = Repel.MAKE_ATTRACTOR(
      this.state.stickyType,
      [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    );

    this.state.avoider = Repel.MAKE_AVOIDER(this.state.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

    this.state.aloneCount = 0;
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    //stranded, alone, time to die.
    if (!ew.filterByType(EventWindow.ALLADJACENT, [...this.state.stickyType, "GOOP"]).length) {
      this.state.aloneCount++;
      if (this.state.aloneCount > 20) {
        ew.destroy();
        return;
      }
    }

    //attract, else avoid, else attract to self
    !this.state.attractor(ew, this) && !this.state.avoider(ew, this) && !Goop.ATTRACT(ew, this);
  }
}
