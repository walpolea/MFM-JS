import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { Empty } from "./EmptyElement";
import { Res } from "./ResElement";
import { SPLAT } from "../../utils/SPLAT";

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

      const createDReg: boolean = Utils.oneIn(this.pDREG_CREATE);
      const createRes: boolean = Utils.oneIn(this.pRES_CREATE);

      if (createDReg) {
        ew.move(availableSite, DReg.CREATE());
      } else if (createRes) {
        ew.move(availableSite, Res.CREATE_BLUE(undefined, undefined, 0x00ff00));
      } else {
        ew.swap(availableSite);
      }
    } else if (availableSite && (ew.is(availableSite, DReg.TYPE_DEF) && Utils.oneIn(this.pDREG_DESTROY)) || (Utils.oneIn(this.pANY_DESTROY))) {

      ew.move(availableSite);

    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DReg.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(DReg.TYPE_DEF);
//Register a SPLAT symbol
ElementTypes.registerSPLAT("d", DReg.TYPE_DEF);