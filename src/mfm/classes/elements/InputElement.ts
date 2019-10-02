import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";
import { Sorter } from "./SorterElement";

export class Input extends Elem {

  static TYPE_DEF: IElementType = { name: "INPUT", type: "In", class: Input, color: 0x888888 };

  max: number;

  constructor(max: number = 40) {
    super(Input.TYPE_DEF);
    this.max = max;
  }
  exec(ew: EventWindow) {

    const indexes: number[] = [7, 4, 8];

    indexes.forEach(index => {

      if (ew.is(index, Empty.TYPE_DEF)) {
        ew.mutate(index, new Atom(Data.TYPE_DEF, undefined, { value: Math.random() * this.max << 0 }));
      }

    })

    if (ew.is(24, Empty.TYPE_DEF)) {
      ew.mutate(24, new Atom(Sorter.TYPE_DEF, [0, undefined, "E"]));
    }

    super.exec(ew);
  }
}
