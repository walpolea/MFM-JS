import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class ForkBombElement extends Elem {
  constructor() {
    super(ElementTypes.EMPTY.name, ElementTypes.EMPTY.type);
  }
  exec(ew: EventWindow) {

    let nextVictim: number = ew.getRandomIndex(EventWindow.ADJACENT8WAY);
    if (nextVictim) {
      ew.mutate(nextVictim, new Atom(ElementTypes.FORK_BOMB));
    }

    super.exec(ew);
  }
}
