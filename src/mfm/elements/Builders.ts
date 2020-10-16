import { SPLAT } from "../utils/SPLAT";
import { Symmetries } from "../utils/Symmetries";
import { Builder } from "./BuilderElement";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";
import { SwapLine } from "./SwapLineElement";
import { ExpertBuilder } from "./ExpertBuilderElement";
import { Dirt } from "./game/Dirt";

export class Splatish {
  static ELINE = SPLAT.splatToMap(`~@_`);
  static WLINE = SPLAT.splatToMap(`_@~`);
  static HLINE = SPLAT.splatToMap(`_@_`);
  static NLINE = SPLAT.splatToMap(`
  _
  @
  ~
`);
  static SLINE = SPLAT.splatToMap(`
  ~
  @
  _
`);
  static VLINE = SPLAT.splatToMap(`
  _
  @
  _
`);
  static DLINE_SE = SPLAT.splatToMap(`
  _~~
  ~@~
  ~~_
`);
  static DLINE_NE = SPLAT.splatToMap(`
  ~~_
  ~@~
  _~~
  `);
}

export class Builders {
  //RULES

  //BUILDERS
  static LOOP = Builder.CREATOR({ name: "LOOP", params: [DecayWall.CREATE, Splatish.HLINE, Symmetries.ROTATIONS] });
  static HLINE = Builder.CREATOR({ name: "HLINE", params: [Wall.CREATE, Splatish.HLINE, Symmetries.NORMAL] });
  static VLINE = Builder.CREATOR({ name: "VLINE", params: [Wall.CREATE, Splatish.VLINE, Symmetries.NORMAL] });
  static DLINE_SE = Builder.CREATOR({ name: "DLINE_SE", params: [Wall.CREATE, Splatish.DLINE_SE, Symmetries.NORMAL] });
  static DLINE_NE = Builder.CREATOR({ name: "DLINE_NE", params: [Wall.CREATE, Splatish.DLINE_NE, Symmetries.NORMAL] });
  static VDLINE = Builder.CREATOR({ name: "VDLINE", params: [DecayWall.LIVE_100, Splatish.VLINE, Symmetries.NORMAL] });
  static HDLINE = Builder.CREATOR({ name: "HDLINE", params: [DecayWall.LIVE_100, Splatish.HLINE, Symmetries.NORMAL] });

  static VLINE_SL_E = Builder.CREATOR({ name: "VLINE_SL_E", params: [SwapLine.CREATE_EAST, Splatish.VLINE, Symmetries.NORMAL] });
  static VLINE_SL_W = Builder.CREATOR({ name: "VLINE_SL_W", params: [SwapLine.CREATE_WEST, Splatish.VLINE, Symmetries.NORMAL] });
  static HLINE_SL_N = Builder.CREATOR({ name: "HLINE_SL_N", params: [SwapLine.CREATE_NORTH, Splatish.HLINE, Symmetries.NORMAL] });
  static HLINE_SL_S = Builder.CREATOR({ name: "HLINE_SL_S", params: [SwapLine.CREATE_SOUTH, Splatish.HLINE, Symmetries.NORMAL] });
  static DLINE_SL_NW = ExpertBuilder.CREATOR({ name: "DLINE_SL_NW", params: [SwapLine.CREATE_NORTHWEST, [SPLAT.MAP_E, SPLAT.MAP_N]] });
  static DLINE_SL_NE = ExpertBuilder.CREATOR({ name: "DLINE_SL_NE", params: [SwapLine.CREATE_NORTHEAST, [SPLAT.MAP_W, SPLAT.MAP_N]] });
  static DLINE_SL_SW = ExpertBuilder.CREATOR({ name: "DLINE_SL_SW", params: [SwapLine.CREATE_SOUTHWEST, [SPLAT.MAP_E, SPLAT.MAP_S]] });
  static DLINE_SL_SE = ExpertBuilder.CREATOR({ name: "DLINE_SL_SE", params: [SwapLine.CREATE_SOUTHEAST, [SPLAT.MAP_W, SPLAT.MAP_S]] });

  // static CA = ExpertBuilder.CREATOR({name:"", params:[Wall.CREATE, [SPLAT.MAP_NSEW, SPLAT.MAP_NE, SPLAT.MAP_NSEW, SPLAT.MAP_SW]]);
  static CA = ExpertBuilder.CREATOR({
    name: "CA",
    params: [DecayWall.CREATE, [SPLAT.MAP_NSEW, SPLAT.MAP_NSEW, SPLAT.MAP_N, SPLAT.MAP_NSEW, SPLAT.MAP_E, SPLAT.MAP_NSEW]],
  });

  static DIRT_HLINE = Builder.CREATOR({ name: "DIRT_HLINE", params: [Dirt.CREATE, Splatish.HLINE, Symmetries.NORMAL] });
  static DIRT_VLINE = Builder.CREATOR({ name: "DIRT_VLINE", params: [Dirt.CREATE, Splatish.VLINE, Symmetries.NORMAL] });
}
