import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Site } from "../core/Site";
import { Atom } from "../core/Atom";
import { Empty } from "./EmptyElement";
import { Reducer } from "./ReducerElement";
import { SPLAT } from "../utils/SPLAT";

export class Sorter extends Element {
  static BASE_TYPE: IElementType = { name: "SORTER", symbol: "So", class: Sorter, color: 0x7c1515 };
  static CREATE = Sorter.CREATOR();

  static gridOut = SPLAT.splatToMap(`
  _~_
  ~@~
  _~_
  `);

  sortVal: number = 0;
  makeCount: number = 1;
  lifeSpan: number = 200;
  sortDirection: string = "E";

  constructor(sortVal: number = 0, lifeSpan: number = 200, sortDirection: string = "E") {
    super(Sorter.BASE_TYPE);

    this.sortVal = sortVal;
    this.lifeSpan = lifeSpan;
    this.sortDirection = sortDirection;
  }

  makeSorters(indexes: number[], val: number, ew: EventWindow) {
    indexes.forEach((index) => {
      const sorter: Site = ew.getSiteByIndex(index);

      if (ew.is(sorter, Empty.BASE_TYPE)) {
        ew.mutate(index, new Atom(Sorter.BASE_TYPE, [val, undefined, this.sortDirection]));
      }
    });
  }

  killSorters(indexes: number[], ew: EventWindow) {
    indexes.forEach((index) => {
      const sorter: Site = ew.getSiteByIndex(index);

      if (ew.is(sorter, Sorter.BASE_TYPE)) {
        ew.mutate(index, new Atom(Empty.BASE_TYPE));
      }
    });
  }

  exec(ew: EventWindow) {
    if (ew.is(1, Reducer.BASE_TYPE)) {
      ew.destroy();
    }

    if (this.age > this.lifeSpan) {
      ew.destroy();
    }

    //is there data to the east?
    const availableSite: Site = this.sortDirection === "W" ? ew.getSiteByIndex(4) : ew.getSiteByIndex(1);
    if (availableSite && availableSite.atom.data) {
      this.age = 0;

      const dval: any = availableSite.atom.data.value;

      if (this.sortDirection === "W") {
        if (dval == this.sortVal && ew.is(1, Empty.BASE_TYPE)) {
          ew.swap(1, 4);
        } else if (dval < this.sortVal && ew.is(19, Empty.BASE_TYPE)) {
          ew.swap(19, 4);

          this.makeSorters([6, 10, 7], dval - 1, ew);

          this.sortVal = dval;
        } else if (dval > this.sortVal && ew.is(20, Empty.BASE_TYPE)) {
          ew.swap(20, 4);
          this.sortVal = dval;

          this.makeSorters([5, 11, 8], dval + 1, ew);
        } else if (ew.is(1, Empty.BASE_TYPE)) {
          ew.swap(1, 4);
          this.sortVal = dval;
        }
      } else {
        if (dval == this.sortVal && ew.is(4, Empty.BASE_TYPE)) {
          ew.swap(4, 1);
        } else if (dval < this.sortVal && ew.is(13, Empty.BASE_TYPE)) {
          ew.swap(13, 1);

          this.makeSorters([8, 10, 5], dval - 1, ew);

          this.sortVal = dval;
        } else if (dval > this.sortVal && ew.is(14, Empty.BASE_TYPE)) {
          ew.swap(14, 1);
          this.sortVal = dval;

          this.makeSorters([6, 7, 11], dval + 1, ew);
        } else if (ew.is(4, Empty.BASE_TYPE)) {
          ew.swap(4, 1);
          this.sortVal = dval;
        }
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Sorter.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
