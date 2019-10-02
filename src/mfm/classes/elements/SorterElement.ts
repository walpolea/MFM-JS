import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { Reducer } from "./ReducerElement";

export class Sorter extends Elem {

  static TYPE_DEF: IElementType = { name: "SORTER", type: "So", class: Sorter, color: 0x7c1515 }

  sortVal: number = 0;
  makeCount: number = 1;
  lifeSpan: number = 200;
  sortDirection: string = "E";

  constructor(sortVal: number = 0, lifeSpan: number = 200, sortDirection: string = "E") {
    super(Sorter.TYPE_DEF);

    this.sortVal = sortVal;
    this.lifeSpan = lifeSpan;
    this.sortDirection = sortDirection;
  }

  makeSorters(indexes: number[], val: number, ew: EventWindow) {

    indexes.forEach(index => {

      const sorter: Site = ew.getSiteByIndex(index);

      if (ew.is(sorter, Empty.TYPE_DEF)) {
        ew.mutate(index, new Atom(Sorter.TYPE_DEF, [val, undefined, this.sortDirection]));
      }

    });

  }

  killSorters(indexes: number[], ew: EventWindow) {

    indexes.forEach(index => {

      const sorter: Site = ew.getSiteByIndex(index);

      if (ew.is(sorter, Sorter.TYPE_DEF)) {
        ew.mutate(index, new Atom(Empty.TYPE_DEF));
      }

    });

  }

  exec(ew: EventWindow) {

    if (ew.is(1, Reducer.TYPE_DEF)) {
      ew.destroy();
    }

    if (this.age > this.lifeSpan) {
      ew.destroy();
    }


    //is there data to the east?
    const availableSite: Site = this.sortDirection === "W" ? ew.getSiteByIndex(4) : ew.getSiteByIndex(1);
    if (availableSite.atom.data) {

      this.age = 0;

      const dval: any = availableSite.atom.data.value;

      if (this.sortDirection === "W") {
        if (dval == this.sortVal && ew.is(1, Empty.TYPE_DEF)) {
          ew.swap(1, 4);

        } else if (dval < this.sortVal && ew.is(19, Empty.TYPE_DEF)) {
          ew.swap(19, 4);

          this.makeSorters([6, 10, 7], dval - 1, ew);

          this.sortVal = dval;
        } else if (dval > this.sortVal && ew.is(20, Empty.TYPE_DEF)) {
          ew.swap(20, 4);
          this.sortVal = dval;

          this.makeSorters([5, 11, 8], dval + 1, ew);
        } else if (ew.is(1, Empty.TYPE_DEF)) {
          ew.swap(1, 4);
          this.sortVal = dval;
        }

      } else {

        if (dval == this.sortVal && ew.is(4, Empty.TYPE_DEF)) {
          ew.swap(4, 1);

        } else if (dval < this.sortVal && ew.is(13, Empty.TYPE_DEF)) {
          ew.swap(13, 1);

          this.makeSorters([8, 10, 5], dval - 1, ew);

          this.sortVal = dval;
        } else if (dval > this.sortVal && ew.is(14, Empty.TYPE_DEF)) {
          ew.swap(14, 1);
          this.sortVal = dval;

          this.makeSorters([6, 7, 11], dval + 1, ew);
        } else if (ew.is(4, Empty.TYPE_DEF)) {
          ew.swap(4, 1);
          this.sortVal = dval;
        }
      }



    }

    super.exec(ew);
  }

}
