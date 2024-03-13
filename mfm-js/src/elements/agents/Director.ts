import { Decay } from "../../capabilities/Decay";
import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow, EWIndex } from "../../mfm/EventWindow";
import { Direction, Wayfinder } from "../../mfm/Wayfinder";

export class Director extends Element {
  static N = Director.CREATOR(
    { name: "DIRECTOR N", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "N", directableTypes: ["DIRECTABLE"] }
  );

  static S = Director.CREATOR(
    { name: "DIRECTOR S", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "S", directableTypes: ["DIRECTABLE"] }
  );

  static E = Director.CREATOR(
    { name: "DIRECTOR E", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "E", directableTypes: ["DIRECTABLE"] }
  );

  static W = Director.CREATOR(
    { name: "DIRECTOR W", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "W", directableTypes: ["DIRECTABLE"] }
  );

  static NE = Director.CREATOR(
    { name: "DIRECTOR NE", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "NE", directableTypes: ["DIRECTABLE"] }
  );

  static NW = Director.CREATOR(
    { name: "DIRECTOR NW", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "NW", directableTypes: ["DIRECTABLE"] }
  );

  static SW = Director.CREATOR(
    { name: "DIRECTOR SW", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "SW", directableTypes: ["DIRECTABLE"] }
  );

  static SE = Director.CREATOR(
    { name: "DIRECTOR SE", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "SE", directableTypes: ["DIRECTABLE"] }
  );

  static NNE = Director.CREATOR(
    { name: "DIRECTOR NNE", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "NNE", directableTypes: ["DIRECTABLE"] }
  );

  static NNW = Director.CREATOR(
    { name: "DIRECTOR NNW", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "NNW", directableTypes: ["DIRECTABLE"] }
  );

  static ENE = Director.CREATOR(
    { name: "DIRECTOR ENE", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "ENE", directableTypes: ["DIRECTABLE"] }
  );

  static WNW = Director.CREATOR(
    { name: "DIRECTOR WNW", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "WNW", directableTypes: ["DIRECTABLE"] }
  );

  static SSE = Director.CREATOR(
    { name: "DIRECTOR SSE", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "SSE", directableTypes: ["DIRECTABLE"] }
  );
  static SSW = Director.CREATOR(
    { name: "DIRECTOR SSW", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "SSW", directableTypes: ["DIRECTABLE"] }
  );

  static ESE = Director.CREATOR(
    { name: "DIRECTOR ESE", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "ESE", directableTypes: ["DIRECTABLE"] }
  );
  static WSW = Director.CREATOR(
    { name: "DIRECTOR WSW", symbol: "DTR", class: Director, color: 0x670239, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { pointing: "WSW", directableTypes: ["DIRECTABLE"] }
  );

  static DIRECTORS_MAP: Map<Direction, Function> = new Map<Direction, Function>([
    ["N", Director.N],
    ["E", Director.E],
    ["S", Director.S],
    ["W", Director.W],
    ["NE", Director.NE],
    ["NW", Director.NW],
    ["SE", Director.SE],
    ["SW", Director.SW],
    ["NNE", Director.NNE],
    ["NNW", Director.NNW],
    ["ENE", Director.ENE],
    ["WNW", Director.WNW],
    ["SSE", Director.SSE],
    ["SSW", Director.SSW],
    ["ESE", Director.ESE],
    ["WSW", Director.WSW],
  ]);

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);
    if (this.state.directableTypes) {
      this.state.directableTypes.forEach((type) => {
        const directables: EWIndex[] = ew.filter(EventWindow.ALLADJACENT, type);
        directables.forEach((s) => {
          Wayfinding.DIRECT(ew, s, this.state.pointing);
        });
      });
    }

    if (ew.selfIs("DECAYABLE")) {
      Decay.DECAY(ew, this, this.state.lifeSpan ?? 100, 2);
    }
  }
}
