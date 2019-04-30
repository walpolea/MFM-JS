import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { ResElement } from "./ResElement";
import { Atom } from "../Atom";
import { MFMUtils } from "../../utils/utils";

export class DRegElement extends Elem {
  pDREG_CREATE: number;
  pRES_CREATE: number;
  pDREG_DESTROY: number;
  pANY_DESTROY: number;
  pTOTAL_CHANCE: number;

  constructor() {
    super(ElementTypes.DREG.name, ElementTypes.DREG.type);

    this.pDREG_CREATE = 1000;
    this.pRES_CREATE = 300;
    this.pDREG_DESTROY = 10;
    this.pANY_DESTROY = 100;
  }

  exec(ew: EventWindow) {

    //get a random NESW Empty site
    const availableSite: number = ew.getRandomIndex(EventWindow.ADJACENT4WAY);

    //CREATION
    if (availableSite && ew.is(availableSite, ElementTypes.EMPTY)) {

      const createDReg: boolean = MFMUtils.oneIn(this.pDREG_CREATE);
      const createRes: boolean = MFMUtils.oneIn(this.pRES_CREATE);

      if (createDReg) {
        ew.move(availableSite, new Atom(ElementTypes.DREG));
      } else if (createRes) {
        ew.move(availableSite, new Atom(ElementTypes.RES));
      } else {
        ew.swap(availableSite);
      }
    } else if (availableSite && ew.is(availableSite, ElementTypes.DREG)) {

      const destroyDReg: boolean = MFMUtils.oneIn(this.pDREG_DESTROY);

      if (destroyDReg) {
        ew.move(availableSite);
      }

    } else if (availableSite) {
      //it's something else
      const destroyAny: boolean = MFMUtils.oneIn(this.pANY_DESTROY);

      if (destroyAny) {
        ew.move(availableSite);
      }
    }

    super.exec(ew);
  }
}
