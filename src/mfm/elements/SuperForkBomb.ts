import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Site } from "../core/Site";
import { Atom } from "../core/Atom";

export class SuperForkBomb extends Element {
  static BASE_TYPE: IElementType = { name: "SUPERFORKBOMB", symbol: "SFb", class: SuperForkBomb, color: 0xaa0000 };
  static CREATE = SuperForkBomb.CREATOR();

  constructor() {
    super(SuperForkBomb.BASE_TYPE);
  }
  exec(ew: EventWindow) {
    //SUPER FORKBOMB
    ew.getIndexes(EventWindow.ALLADJACENT).forEach((nextVictim) => {
      nextVictim ? ew.mutate(nextVictim, SuperForkBomb.CREATE()) : null;
    });

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SuperForkBomb.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
