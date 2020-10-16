import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { QDirectional } from "./quarks/QDirectional";
import { Sand } from "./SandElement";
import { Empty } from "./EmptyElement";

//Tell TypeScript what Quarks this Element will Inherit from
export interface Fly extends QDirectional {}

export class Fly extends Element {
  static BASE_TYPE: IElementType = { name: "FLY", symbol: "Fl", class: Fly, color: 0xff66cc };
  static CREATE = Fly.CREATOR();

  counter = 0;
  max = 4;

  constructor() {
    super(Fly.BASE_TYPE);
    this.setRandomDirection();

    //Register this element with the Classes of the Quark
    //for identification purposes with Atom.isClass(Quark)
    this.registerClass(QDirectional);
  }

  behave(ew: EventWindow) {
    const swimTypes: IElementType[] = [Empty.BASE_TYPE, Sand.BASE_TYPE];

    //Am I being directed?
    if (this.swapIfDirected(ew, swimTypes)) {
      return;
    }

    this.counter++;

    if (!this.swapDirectionally(ew, swimTypes)) {
      this.turnRandomly();
    }

    if (this.counter % this.max == 0) {
      this.counter = 0;
      this.veerRandomly();
    }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Apply Quark properties and methods to the Element
Element.applyMixins(Fly, [QDirectional]);

//Initialize Splat Map maps the # to to the self type
Fly.INITIALIZE_SPLAT_MAP()();
