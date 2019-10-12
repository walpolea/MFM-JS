import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../../utils/Symmetries";

export class Sand extends Elem {

	static TYPE_DEF: IElementType = { name: "SAND", type: "SB", class: Sand, color: 0xffdd00 };
	static CREATE = Sand.CREATOR();

	static checkDown = SPLAT.splatToMap(`
		~
		@
		_
	`)

	static checkSandSlide = SPLAT.splatToMap(`
		~~~
		~@~
		~#_
	`);

	static checkEdge = SPLAT.splatToMap(`
		~~~
		~@_
		~~_
	`);

	constructor() {
		super(Sand.TYPE_DEF);
	}

	exec(ew: EventWindow) {

		//Using SPLAT

		//Should I fall?
		const fallResult = ew.query(Sand.checkDown, 0, Sand.SPLAT_MAP);

		if (fallResult) {

			const emptySite = fallResult.get(Empty.TYPE_DEF)
			ew.swap(emptySite[0]);

		}
		//Should I slide?
		else {

			const shouldSlideLeftOrRight = ew.query(Sand.checkSandSlide, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);

			if (shouldSlideLeftOrRight) {
				const empty = shouldSlideLeftOrRight.get(Empty.TYPE_DEF)[0];
				ew.swap(empty);
			} else {

				const shouldSlideOffEdge = ew.query(Sand.checkEdge, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);

				if (shouldSlideOffEdge) {
					const empty = shouldSlideOffEdge.get(Empty.TYPE_DEF)[0];
					ew.swap(empty);
				}

			}
		}
	}

}

Sand.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(Sand.TYPE_DEF);
