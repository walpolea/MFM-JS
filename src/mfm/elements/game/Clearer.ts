import { EventWindow } from "../../core/EventWindow";
import { Element } from "../../core/Element";
import { IElementType } from "../../core/IElementType";
import { ElementRegistry } from "../../core/ElementRegistry";
import { Utils } from "../../utils/MFMUtils";

export class Clearer extends Element {
  static BASE_TYPE: IElementType = { name: "CLEARER", symbol: "Cl", class: Clearer, color: 0xaaff20 };
  static CREATE = Clearer.CREATOR();

  lifeSpan = 20;
  isSpreader = true;

  constructor(_isSpreader: boolean = true) {
    super(Clearer.BASE_TYPE);

    this.isSpreader = _isSpreader;
  }
  exec(ew: EventWindow) {
    //let nextVictim: number = ew.getRandomIndex(EventWindow.ADJACENT8WAY);
    let nextVictims = ew.getIndexes([0, 1, 2, 3, 4, 5, 6, 7, 8], undefined, false);

    nextVictims.forEach((nextVictim) => {
      if (Utils.oneIn(2) && this.isSpreader && nextVictim && ew.getSiteByIndex(nextVictim).atom.type !== Clearer.BASE_TYPE) {
        if (this.age > 3) {
          ew.mutate(nextVictim, Clearer.CREATE({ params: [false] }));
        } else {
          ew.mutate(nextVictim, Clearer.CREATE());
        }
      }
    });

    if (this.age > this.lifeSpan) {
      ew.destroy();
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Clearer.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
