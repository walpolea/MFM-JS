import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";

export class ForkBomb extends Elem {

  static TYPE_DEF: IElementType = { name: "FORK BOMB", type: "Fb", class: ForkBomb, color: 0xaa2020 };
  static CREATE = ForkBomb.CREATOR();

  constructor() {
    super(ForkBomb.TYPE_DEF);
  }
  exec(ew: EventWindow) {

    let nextVictim: number = ew.getRandomIndex(EventWindow.ADJACENT8WAY);

    if (nextVictim) {
      ew.mutate(nextVictim, ForkBomb.CREATE());
    }

    super.exec(ew);
  }
}
