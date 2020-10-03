import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";

export class Reducer extends Elem {

  static TYPE_DEF: IElementType = { name: "REDUCER", type: "Re", class: Reducer, color: 0x00ffff };
  static CREATE = Reducer.CREATOR();

  constructor() {
    super(Reducer.TYPE_DEF);
  }
  exec(ew: EventWindow) {

    if (ew.is(2, Empty.TYPE_DEF)) {
      ew.mutate(2, new Atom(Reducer.TYPE_DEF));
    }

    if (ew.is(3, Empty.TYPE_DEF)) {
      ew.mutate(3, new Atom(Reducer.TYPE_DEF));
    }

    let nearbyData: Site = ew.getAdjacent4Way(Data.TYPE_DEF);
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
ElementTypes.registerType(Reducer.TYPE_DEF);