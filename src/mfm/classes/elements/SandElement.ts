import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { Actions } from "../../utils/MFMActions";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";

export class Sand extends Elem {
	
	static TYPE_DEF: IElementType = { name: "SAND", type: "SB", class: Sand, color: 0xffdd00 };
	static CREATE = Sand.CREATOR();
	
	static checkDown = SPLAT.splatToMap(`
		~
		@
		_
	`)
  
	static checkDownRight = SPLAT.splatToMap(`
		~~~
		~@~
		~#_
	`)
  
	static checkDownLeft = SPLAT.splatToMap(`
		~~~
		~@~
		_#~
	`)

  constructor() {
    super(Sand.TYPE_DEF);
  }

  exec(ew: EventWindow) {

    //Using SPLAT
    const fallResult = ew.query(Sand.checkDown, 0, Sand.SPLAT_MAP);
    if (fallResult) {
      const emptySite = fallResult.get(Empty.TYPE_DEF)
	  ew.swap(emptySite[0])
    }
	
    const slideRightResult = ew.query(Sand.checkDownRight, 0, Sand.SPLAT_MAP);
    if (slideRightResult) {
      const emptySite = slideRightResult.get(Empty.TYPE_DEF)
	  ew.swap(emptySite[0])
    }
	
    const slideLeftResult = ew.query(Sand.checkDownLeft, 0, Sand.SPLAT_MAP);
    if (slideLeftResult) {
      const emptySite = slideLeftResult.get(Empty.TYPE_DEF)
	  ew.swap(emptySite[0])
    }

  }
}

Sand.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(Sand.TYPE_DEF);
