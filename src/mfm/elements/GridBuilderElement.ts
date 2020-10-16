import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Sorter } from "./SorterElement";
import { SPLAT } from "../utils/SPLAT";
import { Wall } from "./WallElement";
import { Sand } from "./SandElement";
import { Data } from "./DataElement";
import { Builder } from "./BuilderElement";

export class GridBuilder extends Builder {
  static BASE_TYPE: IElementType = { name: "GRIDBUILDER", symbol: "Gb", class: GridBuilder, color: 0x44ccaa };
  static CREATE = GridBuilder.CREATOR();

  static GRID_WALL = GridBuilder.CREATOR({ params: [Wall.CREATE] });
  static GRID_SORTER = GridBuilder.CREATOR({ params: [Sorter.CREATE] });
  static GRID_SAND = GridBuilder.CREATOR({ params: [Sand.CREATE] });
  static GRID_DATA = GridBuilder.CREATOR({ params: [Data.CREATE] });

  static gridPath: Map<number, string> = SPLAT.splatToMap(`
  _~_
  ~@~
  _~_
`);

  constructor(_atomizer: Function = undefined) {
    super(_atomizer, GridBuilder.gridPath);
    this.setType(GridBuilder.BASE_TYPE);
  }

  exec(ew: EventWindow) {
    super.exec(ew);
  }
}

GridBuilder.INITIALIZE_SPLAT_MAP()();
ElementRegistry.registerType(GridBuilder.BASE_TYPE);
