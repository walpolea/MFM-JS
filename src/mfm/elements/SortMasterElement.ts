import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { QDirectional } from "./quarks/QDirectional";
import { Utils } from "../utils/MFMUtils";
import { QData } from "./quarks/QData";
import { Wayfinder } from "../utils/MFMWayfinder";

export interface SortMaster extends QDirectional {}

export class SortMaster extends Element {
  //Define Element Type and Variant Macros
  static BASE_TYPE: IElementType = { name: "SORTMASTER", symbol: "Sm", class: SortMaster, color: 0xd66633 };
  static CREATE = SortMaster.CREATOR();

  sortVal: any = 0;

  constructor() {
    super(SortMaster.BASE_TYPE);

    this.setRandomDirection();
  }

  behave(ew: EventWindow) {
    const nearbyData = ew.getClassIndexes([1, 4], QData);

    if (nearbyData.length) {
      nearbyData.forEach((d) => {
        const val: any = ew.getSiteByIndex(d).atom.data?.value;
        if (val !== undefined && val !== null) {
          const dirEl: QDirectional = (ew.getSiteByIndex(d).atom.elem as unknown) as QDirectional;

          if (d === 1) {
            if (val > this.sortVal) {
              dirEl.direct("NW");
            } else if (val < this.sortVal) {
              dirEl.direct("SW");
            } else {
              dirEl.direct("E");
            }
            ew.swap(d);
          }

          if (d === 4) {
            if (val > this.sortVal) {
              dirEl.direct("NW");
            } else if (val < this.sortVal) {
              dirEl.direct("SW");
            } else {
              dirEl.direct("E");
            }
          }

          this.sortVal = val;
        }
      });
    } else {
      // if (Utils.oneIn(1)) {
      //   this.slightRight();
      // }

      if (!this.swapDirectionally(ew)) {
      }
      this.setRandomDirection();
    }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SortMaster.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

Element.applyMixins(SortMaster, [QDirectional]);
