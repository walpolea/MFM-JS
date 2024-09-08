import { Element, EventWindow, Sand } from "mfm-js";

export class Dirt extends Element {
  static CREATE = Dirt.CREATOR({ name: "DIRT", class: Dirt, color: 0xcf932b, classifications: ["DIGGABLE"], groups: ["LEMMINGS"] });
  static ROCK = Dirt.CREATOR({ name: "ROCK", class: Dirt, color: 0xa14e06, classifications: ["SOLID"], groups: ["LEMMINGS"] });
  static MOSS = Dirt.CREATOR({ name: "MOSS", class: Dirt, color: 0x0ac765, classifications: ["SOLID"], groups: ["LEMMINGS"] });
  
  static TODE_RED = Dirt.CREATOR({ name: "TODE_RED", class: Dirt, color: 0xfe4646, classifications: ["SOLID"], groups: ["LEMMINGS"] });
  static TODE_GREEN = Dirt.CREATOR({ name: "TODE_GREEN", class: Dirt, color: 0x00fe81, classifications: ["SOLID"], groups: ["LEMMINGS"] });
  static TODE_BLACK = Dirt.CREATOR({ name: "TODE_BLACK", class: Dirt, color: 0x161c28, classifications: ["SOLID"], groups: ["LEMMINGS"] });

  static SAND = Sand.CREATOR({ name: "SAND", symbol: "SND", class: Sand, color: 0xffdd00, classifications: ["SAND", "MOVABLE"], groups: ["LEMMINGS"] });
  


  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);
  }
}
