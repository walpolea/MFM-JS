import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

export class DecayWallElement extends Elem {

  lifeSpan: number;

  constructor(lifeSpan: number = 10) {
    super(ElementTypes.DECAYWALL.name, ElementTypes.DECAYWALL.type, 0, 100);

    this.lifeSpan = lifeSpan;
  }
  exec(ew: EventWindow) {

    if (this.age > this.lifeSpan) {
      ew.destroy();
    }


    super.exec(ew);
  }
}
