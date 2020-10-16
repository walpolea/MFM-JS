import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Utils } from "../utils/MFMUtils";
import { Actions } from "../utils/MFMActions";
import { SPLAT } from "../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../utils/Symmetries";

export class Water extends Element {
  static BASE_TYPE: IElementType = { name: "WATER", symbol: "W", class: Water, color: 0x0080ff };
  static CREATE = Water.CREATOR();

  static checkDown = SPLAT.splatToMap(`
		~
		@
		_
	`);

  static checkSlip = SPLAT.splatToMap(`
		~@_
	`);

  constructor() {
    super(Water.BASE_TYPE);
  }

  exec(ew: EventWindow) {
    //Should I fall?
    const fallResult = ew.query(Water.checkDown, 0, Water.SPLAT_MAP);

    if (fallResult) {
      const emptySite = fallResult.get(Empty.BASE_TYPE.name);
      ew.swap(emptySite[0]);
    }
    //Should I slip?
    else {
      const slipResult = ew.query(Water.checkSlip, 0, Water.SPLAT_MAP, Symmetries.REFLECTX);

      if (slipResult) {
        const empty = slipResult.get(Empty.BASE_TYPE.name)[0];
        ew.swap(empty);
      }
    }
  }
}

Water.INITIALIZE_SPLAT_MAP()();

ElementRegistry.registerSPLAT(Water.BASE_TYPE.symbol, Water.BASE_TYPE);
