import { EventWindow } from "../../EventWindow";
import { Elem } from "../../Elem";
import { IElementType } from "../../IElementType";
import { ElementTypes } from "../../ElementTypes";
import { Utils } from "../../../utils/MFMUtils";

export class Clearer extends Elem {
  static TYPE_DEF: IElementType = { name: "CLEARER", type: "Cl", class: Clearer, color: 0xaaff20 };
  static CREATE = Clearer.CREATOR();

  lifeSpan = 20;
  isSpreader = true;

  constructor(_isSpreader: boolean = true) {
    super(Clearer.TYPE_DEF);

    this.isSpreader = _isSpreader;
  }
  exec(ew: EventWindow) {
    //let nextVictim: number = ew.getRandomIndex(EventWindow.ADJACENT8WAY);
    let nextVictims = ew.getIndexes([0, 1, 2, 3, 4, 5, 6, 7, 8], undefined, false);

    nextVictims.forEach((nextVictim) => {
      if (Utils.oneIn(2) && this.isSpreader && nextVictim && ew.getSiteByIndex(nextVictim).atom.type !== Clearer.TYPE_DEF) {
        if (this.age > 3) {
          ew.mutate(nextVictim, Clearer.CREATE([false]));
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
ElementTypes.registerType(Clearer.TYPE_DEF);
