import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Site } from "../core/Site";
import { Atom } from "../core/Atom";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";

export class Reducer extends Element {
  static BASE_TYPE: IElementType = { name: "REDUCER", symbol: "Re", class: Reducer, color: 0x00ffff };
  static CREATE = Reducer.CREATOR();

  constructor() {
    super(Reducer.BASE_TYPE);
  }
  exec(ew: EventWindow) {
    if (ew.is(2, Empty.BASE_TYPE)) {
      ew.mutate(2, new Atom(Reducer.BASE_TYPE));
    }

    if (ew.is(3, Empty.BASE_TYPE)) {
      ew.mutate(3, new Atom(Reducer.BASE_TYPE));
    }

    let nearbyData: Site = ew.getAdjacent4Way(Data.BASE_TYPE);
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
          ew.origin.atom.data[k] = site.atom.data[k]; //Math.round((ew.origin.atom.data[k] + site.atom.data[k]) * .5);
          this.color = site.atom.elem.color;
        }
      }

      //console.log("REDUCED", ew.origin.atom.data);
      site.die();
    }
  }
}

//Initialize Splat Map maps the # to to the self type
Reducer.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
