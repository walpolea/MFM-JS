import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { Actions } from "../../utils/MFMActions";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../../utils/Symmetries";

export class Water extends Elem {

	static TYPE_DEF: IElementType = { name: "Water", type: "W", class: Water, color: 0x0080ff };
	static CREATE = Water.CREATOR();

	static checkDown = SPLAT.splatToMap(`
		~
		@
		_
	`)

	static checkSlip = SPLAT.splatToMap(`
		~@_
	`);

	constructor() {
		super(Water.TYPE_DEF);
	}

	exec(ew: EventWindow) {

		//Should I fall?
		const fallResult = ew.query(Water.checkDown, 0, Water.SPLAT_MAP);

		if (fallResult) {

			const emptySite = fallResult.get(Empty.TYPE_DEF);
			ew.swap(emptySite[0]);

		}
		//Should I slip?
		else {

			const slipResult = ew.query(Water.checkSlip, 0, Water.SPLAT_MAP, Symmetries.REFLECTX);

			if (slipResult) {
				const empty = slipResult.get(Empty.TYPE_DEF)[0];
				ew.swap(empty);
			}
		}
	}

}

Water.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(Water.TYPE_DEF);
ElementTypes.registerSPLAT(Water.TYPE_DEF.type, Water.TYPE_DEF)
