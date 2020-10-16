import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Atom } from "../core/Atom";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";
import { Sorter } from "./SorterElement";

export class Input extends Element {
  static BASE_TYPE: IElementType = { name: "INPUT", symbol: "In", class: Input, color: 0x888888 };
  static CREATE = Input.CREATOR();

  max: number;

  constructor(max: number = 40) {
    super(Input.BASE_TYPE);
    this.max = max;
  }
  exec(ew: EventWindow) {
    const indexes: number[] = [7, 4, 8];

    indexes.forEach((index) => {
      if (ew.is(index, Empty.BASE_TYPE)) {
        //ew.mutate(index, new Atom(Data.BASE_TYPE, undefined, { value: Math.random() * this.max << 0 }));
        ew.mutate(index, Data.CREATE({ params: [[(Math.random() * this.max) << 0], EventWindow.ADJACENT8WAY] }));
      }
    });

    if (ew.is(24, Empty.BASE_TYPE)) {
      ew.mutate(24, Sorter.CREATE({ params: [0, undefined, "E"] }));
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Input.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Input.BASE_TYPE);
