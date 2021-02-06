import { IElementType } from "../core/IElementType";
import { QDirectional } from "./quarks/QDirectional";
import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";
import { Utils } from "../utils/MFMUtils";
import { QData } from "./quarks/QData";

export interface DirectionalData extends QData, QDirectional {}

export class DirectionalData extends Element {
  static BASE_TYPE: IElementType = { name: "DIRECTIONALDATA", symbol: "Dda", class: DirectionalData, color: 0xcccccc };
  static CREATE = DirectionalData.CREATOR();

  counter: number = 0;

  constructor(_initialData: any = undefined, _initialDirection: Direction = undefined) {
    super(DirectionalData.BASE_TYPE);

    this.direction = _initialDirection;
    this.makeStubborn();

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

    if (this.direction && (this.moveDirectionally(ew) || this.moveInDirection(ew, Wayfinder.turnRandom(this.direction)))) {
      this.counter = 0;
    }

    //move if stale
    if (!this.isDirected) {
      this.counter++;
    } else {
      this.counter = 0;
    }

    if (this.counter > 10) {
      if (!this.direction) {
        console.log("SRD");
        this.setRandomDirection();
      }
      this.moveDirectionally(ew);
      this.counter = 0;
    }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

Element.applyMixins(DirectionalData, [QData, QDirectional]);
