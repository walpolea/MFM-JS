import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";

export class ReducerElement extends Elem {
  constructor() {
    super(ElementTypes.REDUCER.name, ElementTypes.REDUCER.type);
  }
  exec(ew: EventWindow) {
    let nearbyData: Site = ew.getAdjacent4Way(true, ElementTypes.DATA);
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
          console.log("adding");
          ew.origin.atom.data[k] += site.atom.data[k];
        }
      }

      console.log("REDUCED", ew.origin.atom.data);
      site.killSelf();
    }
  }
}
