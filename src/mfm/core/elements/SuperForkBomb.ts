import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class SuperForkBomb extends Elem {
  static TYPE_DEF: IElementType = { name: "SUPERFORKBOMB", type: "SFb", class: SuperForkBomb, color: 0xaa0000 };
  static CREATE = SuperForkBomb.CREATOR();

  constructor() {
    super(SuperForkBomb.TYPE_DEF);
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
ElementTypes.registerType(SuperForkBomb.TYPE_DEF);
