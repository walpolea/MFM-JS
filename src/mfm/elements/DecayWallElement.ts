import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { QDecayable } from "./quarks/QDecayable";

export interface DecayWall extends QDecayable {}

export class DecayWall extends Element {
  static BASE_TYPE: IElementType = { name: "DECAYWALL", symbol: "Dw", class: DecayWall, color: 0x4040ff };
  static CREATE = DecayWall.CREATOR();

  static LIVE_100 = DecayWall.CREATOR({ params: [100] });
  static LIVE_1000 = DecayWall.CREATOR({ params: [1000] });
  static LIVE_10000 = DecayWall.CREATOR({ params: [10000] });

  constructor(_lifeSpan: number = 10) {
    super(DecayWall.BASE_TYPE, 0, 100);

    this.lifeSpan = _lifeSpan;

    this.registerClass(QDecayable);
  }

  behave(ew: EventWindow) {
    this.decay(ew);
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
DecayWall.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

Element.applyMixins(DecayWall, [QDecayable]);
