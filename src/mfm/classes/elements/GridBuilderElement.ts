import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Sorter } from "./SorterElement";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Wall } from "./WallElement";
import { Sand } from "./SandElement";
import { Data } from "./DataElement";

export class GridBuilder extends Elem {

  static TYPE_DEF: IElementType = { name: "GRID BUILDER", type: "Gb", class: GridBuilder, color: 0x44ccaa };
  static CREATE = GridBuilder.CREATOR();

  static GRID_WALL = GridBuilder.CREATOR([Wall.CREATE]);
  static GRID_SORTER = GridBuilder.CREATOR([Sorter.CREATE]);
  static GRID_SAND = GridBuilder.CREATOR([Sand.CREATE]);
  static GRID_DATA = GridBuilder.CREATOR([Data.CREATE]);


  static gridOut = SPLAT.splatToMap(`
  _~_
  ~@~
  _~_
`)

  atomizer: Function;

  constructor(_atomizer = Wall.CREATE) {
    super(GridBuilder.TYPE_DEF);
    this.atomizer = _atomizer;
  }

  exec(ew: EventWindow) {

    const result = ew.query(GridBuilder.gridOut, 1, GridBuilder.SPLAT_MAP);

    if (result) {
      result.get(Empty.TYPE_DEF).forEach(empty => {
        //replace empties with more of me
        ew.mutate(empty, GridBuilder.CREATE([this.atomizer]));
      });
    }
    //replace myself with the thing I build
    ew.mutate(0, this.atomizer());
  }

}

GridBuilder.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(GridBuilder.TYPE_DEF);
