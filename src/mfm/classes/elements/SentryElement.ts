import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class SentryElement extends Elem {
  onHighAlert: boolean = false;
  pSENTRY_CREATE: number = 20;
  constructor() {
    super(ElementTypes.SENTRY.name, ElementTypes.SENTRY.type);
  }
  exec(ew: EventWindow) {
    super.exec(ew);

    let fb: Site = ew.getNearest(ElementTypes.FORK_BOMB);

    //fork bombs are near! High Alert!
    if (fb) {
      this.onHighAlert = true;
    }

    let se: Site = ew.getNearest(ElementTypes.SENTRY);

    //Nearby Snetry is on high alert! We should be too!
    if (se && (se.atom.elem as SentryElement).onHighAlert) {
      this.onHighAlert = true;
    }

    //Fire!!!
    if (this.onHighAlert) {
      var e: Site = ew.getNearest(ElementTypes.EMPTY);
      ew.origin.mutateSite(e, new Atom(ElementTypes.ANTI_FORK_BOMB));

      this.onHighAlert = false;
    }

    let totalNearbySentry: number = ew.getAll(ElementTypes.SENTRY).length;

    //Requesting honorable discharge, sir!
    if (totalNearbySentry > 2) {
      ew.origin.killSelf(new Atom(ElementTypes.RES));
    }

    //Res nearby? Maybe recruit someone for the cause
    var res: Site = ew.getAdjacent8Way(true, ElementTypes.RES);

    if (res && Math.random() * this.pSENTRY_CREATE < 1) {
      ew.origin.mutateSite(res, new Atom(ElementTypes.SENTRY));
    }

    //patrol
    ew.origin.swapAtoms(ew.getAdjacent4Way(true, ElementTypes.EMPTY));
  }
}
