import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Atom } from "../Atom";

export class InputElement extends Elem {

  max: number;

  constructor(max: number = 40) {
    super(ElementTypes.WALL.name, ElementTypes.WALL.type, 0, 100);
    this.max = max;
  }
  exec(ew: EventWindow) {

    const indexes: number[] = [1, 5, 6];

    indexes.forEach(index => {

      if (ew.is(index, ElementTypes.EMPTY)) {
        ew.mutate(index, new Atom(ElementTypes.DATA, undefined, { value: Math.random() * this.max << 0 }));
      }

    })

    if (ew.is(21, ElementTypes.EMPTY)) {
      ew.mutate(21, new Atom(ElementTypes.SORTER));
    }

    super.exec(ew);
  }
}
