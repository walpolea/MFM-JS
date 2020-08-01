import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../../utils/Symmetries";
import { Water } from "./WaterElement";
import { Utils } from "../../utils/MFMUtils";
import { Site } from "../Site";

export class Sand extends Elem {
  static TYPE_DEF: IElementType = { name: "SAND", type: "SB", class: Sand, color: 0xffdd00 };
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
    super(Sand.TYPE_DEF);

    Sand.SPLAT_MAP.set("w", (t: IElementType) => {
      return t === Water.TYPE_DEF || t === Empty.TYPE_DEF ? t : undefined;
    });
  }

  exec(ew: EventWindow) {
    //Using SPLAT

    //Falling
    const fallResult = ew.query(Sand.checkDownEW, 0, Sand.SPLAT_MAP);
    if (fallResult) {
      let isEmpty: boolean = false;
      let site: number;
      if (fallResult.get(Empty.TYPE_DEF)) {
        isEmpty = true;
        site = fallResult.get(Empty.TYPE_DEF)[0];
      } else {
        if (Utils.oneIn(2)) {
          return;
        }
        site = fallResult.get(Water.TYPE_DEF)[0];
      }
      //const site = fallResult.get(Empty.TYPE_DEF) ? fallResult.get(Empty.TYPE_DEF)[0] : fallResult.get(Water.TYPE_DEF)[0];

      ew.swap(site);
      ew.swap(Utils.getRandom([1, 4])[0], 0);
      return;
    }

    //Sliding
    const slideResult = ew.query(Sand.checkSlideEW, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);
    if (slideResult) {
      const site = slideResult.get(Empty.TYPE_DEF) ? slideResult.get(Empty.TYPE_DEF)[0] : slideResult.get(Water.TYPE_DEF)[0];
      ew.swap(site);
      return;
    }
  }
}

Sand.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(Sand.TYPE_DEF);
