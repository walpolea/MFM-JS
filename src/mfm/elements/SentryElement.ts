import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Site } from "../core/Site";
import { Atom } from "../core/Atom";
import { Res } from "./ResElement";
import { Empty } from "./EmptyElement";
import { ForkBomb } from "./ForkBombElement";
import { AntiForkBomb } from "./AntiForkBombElement";

export class Sentry extends Element {
  static BASE_TYPE: IElementType = { name: "SENTRY", symbol: "Se", class: Sentry, color: 0x7f7fff };
  static CREATE = Sentry.CREATOR();

  onHighAlert: boolean = false;
  pSENTRY_CREATE: number = 20;
  pRES_CREATE: number = 1000;

  constructor() {
    super(Sentry.BASE_TYPE);
  }
  exec(ew: EventWindow) {
    super.exec(ew);

    let fb: Site = ew.getNearest(ForkBomb.BASE_TYPE);

    //fork bombs are near! High Alert!
    if (fb) {
      this.onHighAlert = true;
    }

    let se: Site = ew.getNearest(Sentry.BASE_TYPE);

    //Nearby Snetry is on high alert! We should be too!
    if (se && (se.atom.elem as Sentry).onHighAlert) {
      this.onHighAlert = true;
    }

    let totalNearbySentry: number = ew.getAll(Sentry.BASE_TYPE).length;

    //Kinda boring and crowded around here, requesting honorable discharge, sir!
    if (!this.onHighAlert && totalNearbySentry > 2) {
      ew.origin.die(Res.CREATE_BLUE());
    }

    //Res nearby? Maybe recruit someone for the cause
    var res: Site = ew.getAdjacent8Way(Res.BASE_TYPE);

    if (res) {
      //if high alert, definitely recruit, otherwise, maybe
      if (this.onHighAlert || Math.random() * this.pSENTRY_CREATE < 1) {
        ew.origin.mutateSite(res, Sentry.CREATE());
      }
      //no res nearby, maybe we should make one.
    } else if (Math.random() * this.pRES_CREATE < 1) {
      let nearEmpty: Site = ew.getNearest(Empty.BASE_TYPE);
      if (nearEmpty) {
        ew.origin.mutateSite(nearEmpty, Res.CREATE_BLUE());
      }
    }

    //Fire!!!
    if (this.onHighAlert) {
      var e: Site = ew.getNearest(Empty.BASE_TYPE);
      ew.origin.mutateSite(e, AntiForkBomb.CREATE());

      this.onHighAlert = false;
    }

    //patrol
    ew.origin.swapAtoms(ew.getAdjacent4Way(Empty.BASE_TYPE));
  }
}

//Initialize Splat Map maps the # to to the self type
Sentry.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
