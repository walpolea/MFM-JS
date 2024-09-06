import { Build } from "../../capabilities/Build";
import { Swap } from "../../capabilities/Swap";
import { Repel } from "../../capabilities/Repel";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Builder } from "./Builder";

export class Water extends Element {
  static CREATE = Water.CREATOR({ name: "WATER", symbol: "SND", class: Water, color: 0x0011ee, groups: ["Environment"] });
  static BUBBLY_WATER = Water.CREATOR({ name: "BUBBLY WATER", class: Water, color: 0x0011ee, classifications: ["WATER", "BUBBLY"], groups: ["Environment"] });

  static WATER_GRID = Builder.CREATOR(
    { name: "WATER GRID", class: Builder, color: 0x121112, groups: ["Environment"] },
    { buildPath: EventWindow.DIAGONAL4WAY, atomizer: Water.CREATE, totalSteps: 40 }
  );

  static WATER_LINE = Builder.CREATOR(
    { name: "WATER LINE", class: Builder, color: 0x121112, groups: ["Environment"] },
    { buildPath: [1, 4], atomizer: Water.CREATE }
  );

  static DO_BUBBLE = Repel.CREATE("WATER", EventWindow.S_QUADRANT, "EMPTY", EventWindow.N_QUADRANT);

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.classifyAs("WATER");
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    Swap.DOWN(ew) || Swap.SLIP(ew);
    if (ew.selfIs("BUBBLY")) Water.DO_BUBBLE(ew);
  }
}
