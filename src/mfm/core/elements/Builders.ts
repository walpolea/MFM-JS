import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Builder } from "./BuilderElement";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";

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


}