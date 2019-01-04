import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class SuperForkBombElement extends Elem {
  constructor() {
    super(ElementTypes.SUPER_FORK_BOMB.name, ElementTypes.SUPER_FORK_BOMB.type);
  }
  exec(ew: EventWindow) {
    //SUPER FORKBOMB
    ew.getAll().forEach(nextVictim => {
      if (nextVictim) {
        ew.origin.mutateSite(nextVictim, new Atom(ElementTypes.SUPER_FORK_BOMB));
      }
    });

    super.exec(ew);
  }
}
