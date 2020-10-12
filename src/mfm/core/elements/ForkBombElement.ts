import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";

export class ForkBomb extends Elem {
  static TYPE_DEF: IElementType = { name: "FORKBOMB", type: "Fb", class: ForkBomb, color: 0xaa2020 };
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

//Initialize Splat Map maps the # to to the self type
ForkBomb.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(ForkBomb.TYPE_DEF);
