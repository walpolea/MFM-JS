import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Sorter } from "./SorterElement";
import { SPLAT } from "../../utils/SPLAT";
import { Wall } from "./WallElement";
import { Sand } from "./SandElement";
import { Data } from "./DataElement";
import { Builder } from "./BuilderElement";

export class GridBuilder extends Builder {

  static TYPE_DEF: IElementType = { name: "GRID BUILDER", type: "Gb", class: GridBuilder, color: 0x44ccaa };
  static CREATE = GridBuilder.CREATOR();

  static GRID_WALL = GridBuilder.CREATOR([Wall.CREATE]);
  static GRID_SORTER = GridBuilder.CREATOR([Sorter.CREATE]);
  static GRID_SAND = GridBuilder.CREATOR([Sand.CREATE]);
  static GRID_DATA = GridBuilder.CREATOR([Data.CREATE]);


  static gridPath: Map<number, string> = SPLAT.splatToMap(`
  _~_
  ~@~
  _~_
`);

  constructor(_atomizer: Function = undefined) {
    super(_atomizer, GridBuilder.gridPath);
    this.setType(GridBuilder.TYPE_DEF);
  }

  exec(ew: EventWindow) {
    super.exec(ew);
  }

}

GridBuilder.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(GridBuilder.TYPE_DEF);
