import { Element, EventWindow } from "mfm-js";

export class Dirt extends Element {
  static CREATE = Dirt.CREATOR({ name: "DIRT", class: Dirt, color: 0xcf932b, classifications: ["DIGGABLE"], groups: ["LEMMINGS"] });
  static ROCK = Dirt.CREATOR({ name: "ROCK", class: Dirt, color: 0xa14e06, classifications: ["SOLID"], groups: ["LEMMINGS"] });
  static MOSS = Dirt.CREATOR({ name: "MOSS", class: Dirt, color: 0x0ac765, classifications: ["SOLID"], groups: ["LEMMINGS"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);
  }
}
