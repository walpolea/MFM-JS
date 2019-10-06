import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Builder } from "./BuilderElement";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";


export class Builders {


  static LOOP = Builder.CREATOR([DecayWall.CREATE, SPLAT.splatToMap(`_@_`), Symmetries.ROTATIONS]);
  static HLINE = Builder.CREATOR([Wall.CREATE, SPLAT.splatToMap(`_@_`), Symmetries.NORMAL]);
  static VLINE = Builder.CREATOR([Wall.CREATE, SPLAT.splatToMap(`
  _
  @
  _
  `), Symmetries.NORMAL]);


}