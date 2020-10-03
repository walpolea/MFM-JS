import { SwapLine } from "./SwapLineElement";
import { Emitter } from "./EmitterElement";
import { EventWindow } from "../EventWindow";
import { Builders } from "./Builders";
import { StickyMembrane } from "./StickyMembraneElement";
import { SwapWorm } from "./SwapWormElement";
import { Data } from "./DataElement";
import { Sorter } from "./SorterElement";
import { Player } from "./game/Player";

export class Emitters {
  //Emitters
  static SWAPLINE_E = Emitter.CREATOR([Builders.VLINE_SL_E, EventWindow.W, 80]);
  static SWAPLINE_W = Emitter.CREATOR([Builders.VLINE_SL_W, EventWindow.E, 80]);
  static SWAPLINE_N = Emitter.CREATOR([Builders.HLINE_SL_N, EventWindow.S, 80]);
  static SWAPLINE_S = Emitter.CREATOR([Builders.HLINE_SL_S, EventWindow.N, 80]);
  static STICKYMEMBRANE = Emitter.CREATOR([StickyMembrane.CREATE, EventWindow.ADJACENT8WAY, 50]);
  static SWAPWORM = Emitter.CREATOR([SwapWorm.CREATE, EventWindow.ADJACENT8WAY, 100]);
  static DATA_STREAM = Emitter.CREATOR([Data.CREATE, EventWindow.ADJACENT8WAY, 1]);
  static SORTER = Emitter.CREATOR([Sorter.CREATE, [5, 6, 7, 8], 1]);
  
  static PLAYER = Emitter.CREATOR([Player.CREATE, [5, 6, 7, 8], 1, 10]);

}
  