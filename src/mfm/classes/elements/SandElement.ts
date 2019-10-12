import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { Actions } from "../../utils/MFMActions";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../../utils/Symmetries";
import { Water } from "./WaterElement";

export class Sand extends Elem {

	static TYPE_DEF: IElementType = { name: "SAND", type: "SB", class: Sand, color: 0xffdd00 };
	static CREATE = Sand.CREATOR();

	static checkDownEmpty = SPLAT.splatToMap(`
		~
		@
		_
	`)
	
	static checkDownWater = SPLAT.splatToMap(`
		~
		@
		W
	`)
	
	static checkSlideEmpty = SPLAT.splatToMap(`
		~~~
		~@_
		~~_
	`);
	
	static checkSlideWater = SPLAT.splatToMap(`
		~~~
		~@W
		~~W
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
	}
	
	exec(ew: EventWindow) {
		
		//Using SPLAT
		
		//Should I fall?
		const fallResult = ew.query(Sand.checkDownEmpty, 0, Sand.SPLAT_MAP);
		if (fallResult) {
			const emptySite = fallResult.get(Empty.TYPE_DEF)[0];
			ew.swap(emptySite);
			return;
		}
		
		//Should I displace?
		const displaceResult = ew.query(Sand.checkDownWater, 0, Sand.SPLAT_MAP);
		if (displaceResult) {
			const waterSite = displaceResult.get(Water.TYPE_DEF)[0];
			ew.swap(waterSite);
			return;
		}
		
		//Should I slide?
		const slideEmptyResult = ew.query(Sand.checkSlideEmpty, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);
		if (slideEmptyResult) {
			const emptySite = slideEmptyResult.get(Empty.TYPE_DEF)[0];
			ew.swap(emptySite);
			return;
		}
		
		//Should I slide in water?
		const slideWaterResult = ew.query(Sand.checkSlideWater, 0, Sand.SPLAT_MAP, Symmetries.REFLECTX);
		if (slideWaterResult) {
			const waterSite = slideWaterResult.get(Water.TYPE_DEF)[0];
			ew.swap(waterSite);
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
