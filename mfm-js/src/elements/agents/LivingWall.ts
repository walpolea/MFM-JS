import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";

export class LivingWall extends Element {
  static CREATE = LivingWall.CREATOR({ name: "LIVING WALL", class: LivingWall, color: 0x2255aa, groups: ["Structural", "MFM"] });
  static MOVABLE_LIVING_WALL = LivingWall.CREATOR({
    name: "MOVABLE LIVING WALL",
    class: LivingWall,
    color: 0x2255aa,
    classifications: ["MOVABLE", "LIVING WALL"],
    groups: ["Structural", "MFM"],
  });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    this.regen(ew);
    this.populateRegenMap(ew);
  }

  populateRegenMap(ew: EventWindow) {
    const otherLivingWalls = ew.filterByType(EventWindow.ALLADJACENT, "LIVING WALL");
    if (otherLivingWalls.length > (this.state.regenMap?.length ?? 0)) {
      this.state.regenMap = otherLivingWalls.map((i) => {
        return [i, ew.getSite(i).atom.TYPE.CREATE];
      });

      this.state.color = this.TYPE.color - this.state.regenMap.length * 6;
    }
  }

  regen(ew: EventWindow) {
    if (this.state.regenMap?.length) {
      this.state.regenMap.forEach((w) => {
        if (ew.is(w[0], "EMPTY")) {
          ew.mutate(w[0], w[1]);
        }
      });
    }
  }
}
