import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { SPLAT } from "../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../utils/Symmetries";
import { Water } from "./WaterElement";
import { Utils } from "../utils/MFMUtils";
import { Site } from "../core/Site";

export class Sand extends Element {
  static BASE_TYPE: IElementType = { name: "SAND", symbol: "SB", class: Sand, color: 0xffdd00 };
  static CREATE = Sand.CREATOR();

  static checkDownEW = SPLAT.splatToMap(`
		~
		@
		w
	`);

  static checkSlideEW = SPLAT.splatToMap(`
		~~~
		~@w
		~~w
	`);

  constructor() {
    super(Sand.BASE_TYPE);

    Sand.SPLAT_MAP.set("w", (t: IElementType) => {
      return t?.name === Water.BASE_TYPE.name || t?.name === Empty.BASE_TYPE.name ? t : undefined;
    });
  }

  exec(ew: EventWindow) {
    //Using SPLAT

    //Falling
    const fallResult = ew.query(Sand.checkDownEW, 0, Sand.SPLAT_MAP);
    if (fallResult) {
      let isEmpty: boolean = false;
      let site: number;
      if (fallResult.get(Empty.BASE_TYPE.name)) {
        isEmpty = true;
        site = fallResult.get(Empty.BASE_TYPE.name)[0];
      } else {
        if (Utils.oneIn(2)) {
          return;
        }
        site = fallResult.get(Water.BASE_TYPE.name)[0];
      }

      ew.swap(site);
      ew.swap(Utils.getRandom([1, 4])[0], 0);
      return;
    }

    //Sliding
    const slideResult = ew.query(Sand.checkSlideEW, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);
    if (slideResult) {
      const site = slideResult.get(Empty.BASE_TYPE.name) ? slideResult.get(Empty.BASE_TYPE.name)[0] : slideResult.get(Water.BASE_TYPE.name)[0];
      ew.swap(site);
      return;
    }
  }
}

Sand.INITIALIZE_SPLAT_MAP()();
ElementRegistry.registerType(Sand.BASE_TYPE);
