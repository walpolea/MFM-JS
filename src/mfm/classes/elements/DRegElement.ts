import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";
import { MFMUtils } from "../../utils/MFMUtils";
import { Empty } from "./EmptyElement";
import { Res } from "./ResElement";

export class DReg extends Elem {

  static TYPE_DEF: IElementType = { name: "DREG", type: "D", class: DReg, color: 0xff2020 };
  static CREATE = DReg.CREATOR();

  pDREG_CREATE: number;
  pRES_CREATE: number;
  pDREG_DESTROY: number;
  pANY_DESTROY: number;
  pTOTAL_CHANCE: number;

  constructor() {
    super(DReg.TYPE_DEF);

    this.pDREG_CREATE = 1000;
    this.pRES_CREATE = 200;
    this.pDREG_DESTROY = 10;
    this.pANY_DESTROY = 100;
  }

  exec(ew: EventWindow) {

    //get a random NESW
    const availableSite: number = ew.getRandomIndex(EventWindow.ADJACENT4WAY);

    //CREATION
    if (availableSite && ew.is(availableSite, Empty.TYPE_DEF)) {

      const createDReg: boolean = MFMUtils.oneIn(this.pDREG_CREATE);
      const createRes: boolean = MFMUtils.oneIn(this.pRES_CREATE);

      if (createDReg) {
        ew.move(availableSite, DReg.CREATE());
      } else if (createRes) {
        ew.move(availableSite, Res.CREATE());
      } else {
        ew.swap(availableSite);
      }
    } else if (availableSite && (ew.is(availableSite, DReg.TYPE_DEF) && MFMUtils.oneIn(this.pDREG_DESTROY)) || (MFMUtils.oneIn(this.pANY_DESTROY))) {

      ew.move(availableSite);

    }

    super.exec(ew);
  }
}
