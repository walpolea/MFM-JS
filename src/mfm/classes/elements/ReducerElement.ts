import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class ReducerElement extends Elem {
  constructor() {
    super(ElementTypes.REDUCER.name, ElementTypes.REDUCER.type);
  }
  exec(ew: EventWindow) {

    if (ew.is(2, ElementTypes.EMPTY)) {
      ew.mutate(2, new Atom(ElementTypes.REDUCER));
    }

    if (ew.is(3, ElementTypes.EMPTY)) {
      ew.mutate(3, new Atom(ElementTypes.REDUCER));
    }

    let nearbyData: Site = ew.getAdjacent4Way(ElementTypes.DATA);
    if (nearbyData) {
      this.reduce(nearbyData, ew);
    }
    super.exec(ew);
  }

  reduce(site: Site, ew: EventWindow) {

    if (site.atom.data) {
      if (!ew.origin.atom.data) {
        ew.origin.atom.data = {};
      }

      for (let k in site.atom.data) {
        if (!ew.origin.atom.data[k]) {
          ew.origin.atom.data[k] = site.atom.data[k];
        } else {
          //console.log("adding");
          ew.origin.atom.data[k] = Math.round((ew.origin.atom.data[k] + site.atom.data[k]) * .5);
        }
      }

      //console.log("REDUCED", ew.origin.atom.data);
      site.killSelf();
    }
  }
}
