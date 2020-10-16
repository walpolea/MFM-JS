import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Utils } from "../utils/MFMUtils";
import { QPatroller } from "./quarks/QPatroller";
import { QDirectional } from "./quarks/QDirectional";

export interface Mosquito extends QPatroller, QDirectional {}

export class Mosquito extends Element {
  static BASE_TYPE: IElementType = { name: "MOSQUITO", symbol: "p", class: Mosquito, color: 0xd1b0b0 };
  static CREATE = Mosquito.CREATOR();

  constructor() {
    super(Mosquito.BASE_TYPE);

    this.setRandomDirection();

    this.registerClass(QPatroller);
    this.registerClass(QDirectional);
  }

  behave(ew: EventWindow) {
    if (this.swapIfDirected(ew)) {
      return;
    }

    if (Utils.oneIn(2)) {
      this.veerRight();
    } else {
      this.veerLeft();
    }

    this.moveDirectionally(ew);
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Mosquito.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
//
//Register a SPLAT symbol
ElementRegistry.registerSPLAT("w", Mosquito.BASE_TYPE);

Element.applyMixins(Mosquito, [QPatroller, QDirectional]);
