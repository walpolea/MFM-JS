import { SwapLine } from "./SwapLineElement";
import { Emitter } from "./EmitterElement";
import { EventWindow } from "../core/EventWindow";
import { Builders } from "./Builders";
import { StickyMembrane } from "./StickyMembraneElement";
import { SwapWorm } from "./SwapWormElement";
import { Data } from "./DataElement";
import { Sorter } from "./SorterElement";
import { Player } from "./game/Player";
import { DecayDirector } from "./DecayDirectorElement";

export class Emitters {
  //Emitters
  static SWAPLINE_E = Emitter.CREATOR({ params: [Builders.VLINE_SL_E, EventWindow.W, 80] });
  static SWAPLINE_W = Emitter.CREATOR({ params: [Builders.VLINE_SL_W, EventWindow.E, 80] });
  static SWAPLINE_N = Emitter.CREATOR({ params: [Builders.HLINE_SL_N, EventWindow.S, 80] });
  static SWAPLINE_S = Emitter.CREATOR({ params: [Builders.HLINE_SL_S, EventWindow.N, 80] });
  static STICKYMEMBRANE = Emitter.CREATOR({ params: [StickyMembrane.CREATE, EventWindow.ADJACENT8WAY, 50] });
  static SWAPWORM = Emitter.CREATOR({ params: [SwapWorm.CREATE, EventWindow.ADJACENT8WAY, 100] });
  static DATA_STREAM = Emitter.CREATOR({ params: [Data.CREATE, EventWindow.ADJACENT8WAY, 1] });
  static SORTER = Emitter.CREATOR({ params: [Sorter.CREATE, [5, 6, 7, 8], 1] });
  static DECAY_DIRECTOR = Emitter.CREATOR({ params: [DecayDirector.CREATOR({ params: ["E", 10, EventWindow.ALLADJACENT, 1] }), EventWindow.ADJACENT8WAY, 10] });

  static PLAYER = Emitter.CREATOR({ params: [Player.CREATE, [5, 6, 7, 8], 1, 10] });
}
