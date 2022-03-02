import { Element, IElementType } from "../../mfm/Element";
import { EventWindow, EWIndex } from "../../mfm/EventWindow";
import { Res } from "./Res";

export class DReg extends Element {
  static CREATE = DReg.CREATOR(
    { name: "DREG", class: DReg, color: 0xff2020, groups: ["MFM"] },
    {
      pDREG_CREATE: 1000,
      pRES_CREATE: 200,
      pDREG_DESTROY: 10,
      pANY_DESTROY: 100,
    }
  );

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    const neighbor: EWIndex = ew.filter(EventWindow.ADJACENT4WAY, null, true)[0];

    if (ew.is(neighbor, "EMPTY")) {
      const createDReg: boolean = EventWindow.oneIn(this.state.pDREG_CREATE);
      const createRes: boolean = EventWindow.oneIn(this.state.pRES_CREATE);

      if (createDReg) {
        ew.move(neighbor, DReg.CREATE());
      } else if (createRes) {
        ew.move(neighbor, Res.CREATE());
      } else {
        ew.swap(neighbor);
      }
    } else if ((ew.is(neighbor, "DREG") && EventWindow.oneIn(this.state.pDREG_DESTROY)) || EventWindow.oneIn(this.state.pANY_DESTROY)) {
      ew.move(neighbor);
    }
  }
}
