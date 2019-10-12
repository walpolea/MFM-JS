import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../../utils/Symmetries";
import { Water } from "./WaterElement";

export class Sand extends Elem {

	static TYPE_DEF: IElementType = { name: "SAND", type: "SB", class: Sand, color: 0xffdd00 };
	static CREATE = Sand.CREATOR();

	static checkDownEW = SPLAT.splatToMap(`
		~
		@
		w
	`)

	static checkSlideEW = SPLAT.splatToMap(`
		~~~
		~@w
		~~w
	`);

	static checkSplash = SPLAT.splatToMap(`
		~~~
		~@_
		~~W
	`);

	static checkSplashOut = SPLAT.splatToMap(`
		~~~
		~@W
		~~_
	`);

	constructor() {
		super(Sand.TYPE_DEF);

		Sand.SPLAT_MAP.set("w", (t: IElementType) => {
			return (t === Water.TYPE_DEF || t === Empty.TYPE_DEF) ? t : undefined;
		});
	}

	exec(ew: EventWindow) {

		//Using SPLAT

		//Falling
		const fallResult = ew.query(Sand.checkDownEW, 0, Sand.SPLAT_MAP);
		if (fallResult) {
			const site = fallResult.get(Empty.TYPE_DEF) ? fallResult.get(Empty.TYPE_DEF)[0] : fallResult.get(Water.TYPE_DEF)[0];
			ew.swap(site);
			return;
		}

		//Sliding
		const slideResult = ew.query(Sand.checkSlideEW, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);
		if (slideResult) {
			const site = slideResult.get(Empty.TYPE_DEF) ? slideResult.get(Empty.TYPE_DEF)[0] : slideResult.get(Water.TYPE_DEF)[0];
			ew.swap(site);
			return;
		}

		//Should I splash into water?
		const splashResult = ew.query(Sand.checkSplash, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);
		if (splashResult) {
			const waterSite = splashResult.get(Water.TYPE_DEF)[0];
			ew.swap(waterSite);
			return;
		}

		//Should I splash into water?
		const splashOutResult = ew.query(Sand.checkSplashOut, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);
		if (splashOutResult) {
			const emptySite = splashOutResult.get(Empty.TYPE_DEF)[0];
			ew.swap(emptySite);
			return;
		}
	}

}

Sand.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(Sand.TYPE_DEF);
