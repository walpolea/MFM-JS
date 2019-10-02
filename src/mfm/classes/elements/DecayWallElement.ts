import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";

export class DecayWall extends Elem {

  static TYPE_DEF: IElementType = { name: "DECAY WALL", type: "Dw", class: DecayWall, color: 0x4040ff };

  lifeSpan: number;

  constructor(lifeSpan: number = 10) {
    super(DecayWall.TYPE_DEF, 0, 100);

    this.lifeSpan = lifeSpan;
  }
  exec(ew: EventWindow) {

    if (this.age > this.lifeSpan) {
      ew.destroy();
    }


    super.exec(ew);
  }
}
