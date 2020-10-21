import { IElementType } from "../core/IElementType";
import { QDirectional } from "./quarks/QDirectional";
import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { Direction } from "../utils/MFMWayfinder";
import { Utils } from "../utils/MFMUtils";
import { QData } from "./quarks/QData";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";

export interface DirectionalData extends QData, QDirectional {}

export class DirectionalData extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTIONALDATA", symbol: "Dda", class: DirectionalData, color: 0xcccccc };
  static CREATE = DirectionalData.CREATOR();

  counter: number = 0;

  constructor(_initialData: any = undefined, _initialDirection: Direction = undefined) {
    super(DirectionalData.BASE_TYPE);

    this.direction = _initialDirection;

    this.registerClass(QDirectional);
    this.registerClass(QData);
  }

  behave(ew: EventWindow) {
    if (this.age < 1) {
      this.setData(ew, ((Math.random() * 40) << 0) + 1);
    }

    if (this.hasData(ew)) {
      this.color = Utils.rgbToHex(ew.origin.atom.data.value * 5, ew.origin.atom.data.value * 5, ew.origin.atom.data.value * 5);
    }

    if (this.direction) {
      if (this.moveDirectionally(ew)) {
        this.counter = 0;
      }
    }

    //move if stale
    this.counter++;
    if (this.counter > 100) {
      if (!this.direction) this.setRandomDirection();
      this.moveDirectionally(ew);
      this.counter = 0;
    }

    this.stop();
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

Element.applyMixins(DirectionalData, [QData, QDirectional]);
