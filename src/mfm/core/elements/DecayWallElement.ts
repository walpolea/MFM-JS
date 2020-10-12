import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";

export class DecayWall extends Elem {
  static TYPE_DEF: IElementType = { name: "DECAYWALL", type: "Dw", class: DecayWall, color: 0x4040ff };
  static CREATE = DecayWall.CREATOR();

  static LIVE_100 = DecayWall.CREATOR([100]);
  static LIVE_1000 = DecayWall.CREATOR([1000]);
  static LIVE_10000 = DecayWall.CREATOR([10000]);

  lifeSpan: number;

  constructor(lifeSpan: number = 10) {
    super(DecayWall.TYPE_DEF, 0, 100);

    this.lifeSpan = lifeSpan;
  }
  exec(ew: EventWindow) {
    if (this.age > this.lifeSpan) {
      ew.destroy();
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DecayWall.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(DecayWall.TYPE_DEF);
