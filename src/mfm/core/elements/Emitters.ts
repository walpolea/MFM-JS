import { SwapLine } from "./SwapLineElement";
import { Emitter } from "./EmitterElement";
import { EventWindow } from "../EventWindow";
import { Builders } from "./Builders";
import { StickyMembrane } from "./StickyMembraneElement";
import { SwapWorm } from "./SwapWormElement";

export class Emitters {
  //Emitters
  static SWAPLINE = Emitter.CREATOR([Builders.VLINE_SL, EventWindow.E, 80]);
  static STICKYMEMBRANE = Emitter.CREATOR([StickyMembrane.CREATE, EventWindow.ADJACENT8WAY, 50]);
  static SWAPWORM = Emitter.CREATOR([SwapWorm.CREATE, EventWindow.ADJACENT8WAY, 100]);
}
