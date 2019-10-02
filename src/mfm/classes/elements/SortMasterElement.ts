import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { SPLAT } from "../../utils/SPLAT";
import { IElementType } from "../ElementTypes";
import { Wall } from "./WallElement";
import { Utils } from "../../utils/MFMUtils";
import { Empty } from "./EmptyElement";

export class SortMaster extends Elem {

  //Define Element Type and Variant Macros
  static TYPE_DEF: IElementType = { name: "SORT MASTER", type: "Sm", class: SortMaster, color: 0xd66633 };
  static CREATE = SortMaster.CREATOR();

  pGROW: number = 4;
  pWALL: number = 20;

  didInit: boolean = false;
  gridCheck: Map<number, string>;
  wallCheck: Map<number, string>;

  constructor() {
    super(SortMaster.TYPE_DEF);

    SortMaster.INITIALIZE_SPLAT_MAP()();

    //translate splat diagrams to maps
    this.gridCheck = SPLAT.splatToMap(`
            _~_
             @
            _~_
  `);

    this.wallCheck = SPLAT.splatToMap(`
            #~#
             @
            #~#
    `);
  }

  exec(ew: EventWindow) {

    if (!this.didInit) {

      if (Utils.oneIn(this.pGROW)) {

        const results = ew.query(this.gridCheck, 1, SortMaster.SPLAT_MAP);

        if (results) {
          results.get(Empty.TYPE_DEF).forEach(emptyIndex => {
            ew.mutate(emptyIndex, SortMaster.CREATE());
          });

        }
        this.didInit = true;
      } else if (Utils.oneIn(this.pWALL)) {
        const results = ew.query(this.wallCheck, 0, SortMaster.SPLAT_MAP);

        if (results && results.get(SortMaster.TYPE_DEF)) {
          console.log(results, results.get(SortMaster.TYPE_DEF));
          results.get(SortMaster.TYPE_DEF).forEach(sortMasterIndex => {
            ew.mutate(sortMasterIndex, Wall.CREATE());
          });
        }
        this.didInit = true;
      }



    }



    super.exec(ew);
  }
}
