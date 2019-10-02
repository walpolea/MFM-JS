import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class SuperForkBomb extends Elem {
  static TYPE_DEF: IElementType = { name: "SUPER FORK BOMB", type: "SFb", class: SuperForkBomb, color: 0xaa0000 };
  static CREATE = SuperForkBomb.CREATOR();


  constructor() {
    super(SuperForkBomb.TYPE_DEF);
  }
  exec(ew: EventWindow) {
    //SUPER FORKBOMB
    ew.getIndexes(EventWindow.ALLADJACENT).forEach(nextVictim => {
      nextVictim ? ew.mutate(nextVictim, SuperForkBomb.CREATE()) : null;
    });

    super.exec(ew);
  }
}
