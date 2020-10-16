import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";

export class ForkBomb extends Element {
  static BASE_TYPE: IElementType = { name: "FORKBOMB", symbol: "Fb", class: ForkBomb, color: 0xaa2020 };
  static CREATE = ForkBomb.CREATOR();

  constructor() {
    super(ForkBomb.BASE_TYPE);
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
