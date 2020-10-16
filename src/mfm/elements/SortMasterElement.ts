import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { SPLAT } from "../utils/SPLAT";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Wall } from "./WallElement";
import { Utils } from "../utils/MFMUtils";
import { Empty } from "./EmptyElement";

export class SortMaster extends Element {
  //Define Element Type and Variant Macros
  static BASE_TYPE: IElementType = { name: "SORTMASTER", symbol: "Sm", class: SortMaster, color: 0xd66633 };
  static CREATE = SortMaster.CREATOR();

  //create and translate splat diagrams to maps (do it here, not in exec, because performance)
  static gridCheck: Map<number, string> = SPLAT.splatToMap(`
    _~_
     @
    _~_
  `);

  static wallCheck: Map<number, string> = SPLAT.splatToMap(`
    #~#
     @
    #~#
  `);

  //////////
  //INSTANCE
  //////////

  pGROW: number = 4;
  pWALL: number = 20;

  didInit: boolean = false;
  gridCheck: Map<number, string>;
  wallCheck: Map<number, string>;

  constructor() {
    super(SortMaster.BASE_TYPE);
  }

  exec(ew: EventWindow) {
    if (!this.didInit) {
      if (Utils.oneIn(this.pGROW)) {
        const results = ew.query(SortMaster.gridCheck, 1, SortMaster.SPLAT_MAP);

        if (results) {
          results.get(Empty.BASE_TYPE.name).forEach((emptyIndex) => {
            ew.mutate(emptyIndex, SortMaster.CREATE());
          });
        }
        this.didInit = true;
      } else if (Utils.oneIn(this.pWALL)) {
        const results = ew.query(SortMaster.wallCheck, 0, SortMaster.SPLAT_MAP);

        if (results && results.get(SortMaster.BASE_TYPE.name)) {
          results.get(SortMaster.BASE_TYPE.name).forEach((sortMasterIndex) => {
            ew.mutate(sortMasterIndex, Wall.CREATE());
          });
        }
        this.didInit = true;
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SortMaster.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(SortMaster.BASE_TYPE);
