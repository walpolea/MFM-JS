import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";
import { Res } from "./ResElement";
import { Empty } from "./EmptyElement";
import { ForkBomb } from "./ForkBombElement";
import { AntiForkBomb } from "./AntiForkBombElement";

export class Sentry extends Elem {

  static TYPE_DEF: IElementType = { name: "SENTRY", type: "Se", class: Sentry, color: 0x7f7fff };
  static CREATE = Sentry.CREATOR();

  onHighAlert: boolean = false;
  pSENTRY_CREATE: number = 20;
  pRES_CREATE: number = 1000;

  constructor() {
    super(Sentry.TYPE_DEF);
  }
  exec(ew: EventWindow) {
    super.exec(ew);

    let fb: Site = ew.getNearest(ForkBomb.TYPE_DEF);

    //fork bombs are near! High Alert!
    if (fb) {
      this.onHighAlert = true;
    }

    let se: Site = ew.getNearest(Sentry.TYPE_DEF);

    //Nearby Snetry is on high alert! We should be too!
    if (se && (se.atom.elem as Sentry).onHighAlert) {
      this.onHighAlert = true;
    }

    let totalNearbySentry: number = ew.getAll(Sentry.TYPE_DEF).length;

    //Kinda boring and crowded around here, requesting honorable discharge, sir!
    if (!this.onHighAlert && totalNearbySentry > 2) {
      ew.origin.die(Res.CREATE_BLUE());
    }

    //Res nearby? Maybe recruit someone for the cause
    var res: Site = ew.getAdjacent8Way(Res.TYPE_DEF);

    if (res) {
      //if high alert, definitely recruit, otherwise, maybe
      if (this.onHighAlert || Math.random() * this.pSENTRY_CREATE < 1) {
        ew.origin.mutateSite(res, Sentry.CREATE());
      }
      //no res nearby, maybe we should make one.
    } else if (Math.random() * this.pRES_CREATE < 1) {
      let nearEmpty: Site = ew.getNearest(Empty.TYPE_DEF);
      if (nearEmpty) {
        ew.origin.mutateSite(nearEmpty, Res.CREATE_BLUE());
      }
    }

    //Fire!!!
    if (this.onHighAlert) {
      var e: Site = ew.getNearest(Empty.TYPE_DEF);
      ew.origin.mutateSite(e, AntiForkBomb.CREATE());

      this.onHighAlert = false;
    }

    //patrol
    ew.origin.swapAtoms(ew.getAdjacent4Way(Empty.TYPE_DEF));
  }
}

//Initialize Splat Map maps the # to to the self type
Sentry.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Sentry.TYPE_DEF);