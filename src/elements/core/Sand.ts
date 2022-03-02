import { Swap } from "../../capabilities/Swap";
import { Repel } from "../../capabilities/Repel";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Builder } from "./Builder";

export class Sand extends Element {
  static CREATE = Sand.CREATOR({ name: "SAND", symbol: "SND", class: Sand, color: 0xffdd00, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] });
  static RED_SAND = Sand.CREATOR({ name: "RED SAND", class: Sand, color: 0xff0000, classifications: ["SAND", "BUBBLY", "MOVABLE"], groups: ["Environment"] });
  static PINK_SAND = Sand.CREATOR({
    name: "PINK SAND",
    class: Sand,
    color: 0xfa86c4,
    classifications: ["BUBBLY", "SAND", "FLOATS", "MOVABLE"],
    groups: ["Environment"],
  });
  static FLOATY_SAND = Sand.CREATOR({
    name: "FLOATY SAND",
    class: Sand,
    color: 0x000000,
    classifications: ["FLOATS", "SAND", "MOVABLE"],
    groups: ["Environment"],
  });

  static SAND_GRID = Builder.CREATOR(
    { name: "SAND GRID", class: Builder, color: 0x121112, groups: ["Environment"] },
    { buildPath: EventWindow.DIAGONAL4WAY, atomizer: Sand.CREATE, totalSteps: 40 }
  );

  //CAPABILITIES
  static BUBBLE = Repel.CREATE("SAND", EventWindow.S_QUADRANT, "EMPTY", EventWindow.N_QUADRANT);

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
    this.init();
  }

  init() {
    this.classifyAs("SAND");
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    Swap.DOWN(ew) || Swap.SIDE(ew);
    if (ew.selfIs("BUBBLY")) Sand.BUBBLE(ew);

    if (ew.selfIs("FLOATS")) {
      Swap.FLOAT(ew, 1.25);
    } else {
      Swap.SINK(ew);
    }
  }
}
