import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Builder } from "./BuilderElement";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";
import { SwapLine } from "./SwapLineElement";
import { ExpertBuilder } from "./ExpertBuilderElement";

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
  static LOOP = Builder.CREATOR([DecayWall.CREATE, Splatish.HLINE, Symmetries.ROTATIONS]);
  static HLINE = Builder.CREATOR([Wall.CREATE, Splatish.HLINE, Symmetries.NORMAL]);
  static VLINE = Builder.CREATOR([Wall.CREATE, Splatish.VLINE, Symmetries.NORMAL]);
  static DLINE_SE = Builder.CREATOR([Wall.CREATE, Splatish.DLINE_SE, Symmetries.NORMAL]);
  static DLINE_NE = Builder.CREATOR([Wall.CREATE, Splatish.DLINE_NE, Symmetries.NORMAL]);
  static VDLINE = Builder.CREATOR([DecayWall.LIVE_100, Splatish.VLINE, Symmetries.NORMAL]);
  static HDLINE = Builder.CREATOR([DecayWall.LIVE_100, Splatish.HLINE, Symmetries.NORMAL]);

  static VLINE_SL_E = Builder.CREATOR([SwapLine.CREATE_EAST, Splatish.VLINE, Symmetries.NORMAL]);
  static VLINE_SL_W = Builder.CREATOR([SwapLine.CREATE_WEST, Splatish.VLINE, Symmetries.NORMAL]);
  static HLINE_SL_N = Builder.CREATOR([SwapLine.CREATE_NORTH, Splatish.HLINE, Symmetries.NORMAL]);
  static HLINE_SL_S = Builder.CREATOR([SwapLine.CREATE_SOUTH, Splatish.HLINE, Symmetries.NORMAL]);
  static DLINE_SL_NW = ExpertBuilder.CREATOR([SwapLine.CREATE_NORTHWEST, [SPLAT.MAP_E, SPLAT.MAP_N, SPLAT.MAP_E, SPLAT.MAP_N]]);
  static DLINE_SL_NE = ExpertBuilder.CREATOR([SwapLine.CREATE_NORTHEAST, [SPLAT.MAP_W, SPLAT.MAP_N, SPLAT.MAP_W, SPLAT.MAP_N]]);
  static DLINE_SL_SW = ExpertBuilder.CREATOR([SwapLine.CREATE_SOUTHWEST, [SPLAT.MAP_E, SPLAT.MAP_S, SPLAT.MAP_E, SPLAT.MAP_S]]);
  static DLINE_SL_SE = ExpertBuilder.CREATOR([SwapLine.CREATE_SOUTHEAST, [SPLAT.MAP_W, SPLAT.MAP_S, SPLAT.MAP_W, SPLAT.MAP_S]]);
}
