import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class SorterElement extends Elem {

  sortVal: number = 0;
  makeCount: number = 1;
  lifeSpan: number = 200;
  sortDirection: string = "E";

  constructor(sortVal: number = 0, lifeSpan: number = 200, sortDirection: string = "E") {
    super(ElementTypes.SORTER.name, ElementTypes.SORTER.type);
    this.sortVal = sortVal;

    this.lifeSpan = lifeSpan;
    this.sortDirection = sortDirection;
  }

  makeSorters(indexes: number[], val: number, ew: EventWindow) {

    indexes.forEach(index => {

      const sorter: Site = ew.getSiteByIndex(index);

      if (ew.is(sorter, ElementTypes.EMPTY)) {
        ew.mutate(index, new Atom(ElementTypes.SORTER, [val, undefined, this.sortDirection]));
      }

    });

  }

  killSorters(indexes: number[], ew: EventWindow) {

    indexes.forEach(index => {

      const sorter: Site = ew.getSiteByIndex(index);

      if (ew.is(sorter, ElementTypes.SORTER)) {
        ew.mutate(index, new Atom(ElementTypes.EMPTY));
      }

    });

  }

  exec(ew: EventWindow) {

    if (ew.is(1, ElementTypes.REDUCER)) {
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
        if (dval == this.sortVal && ew.is(1, ElementTypes.EMPTY)) {
          ew.swap(1, 4);

        } else if (dval < this.sortVal && ew.is(19, ElementTypes.EMPTY)) {
          ew.swap(19, 4);

          this.makeSorters([6, 10, 7], dval - 1, ew);

          this.sortVal = dval;
        } else if (dval > this.sortVal && ew.is(20, ElementTypes.EMPTY)) {
          ew.swap(20, 4);
          this.sortVal = dval;

          this.makeSorters([5, 11, 8], dval + 1, ew);
        } else if (ew.is(1, ElementTypes.EMPTY)) {
          ew.swap(1, 4);
          this.sortVal = dval;
        }

      } else {

        if (dval == this.sortVal && ew.is(4, ElementTypes.EMPTY)) {
          ew.swap(4, 1);

        } else if (dval < this.sortVal && ew.is(13, ElementTypes.EMPTY)) {
          ew.swap(13, 1);

          this.makeSorters([8, 10, 5], dval - 1, ew);

          this.sortVal = dval;
        } else if (dval > this.sortVal && ew.is(14, ElementTypes.EMPTY)) {
          ew.swap(14, 1);
          this.sortVal = dval;

          this.makeSorters([6, 7, 11], dval + 1, ew);
        } else if (ew.is(4, ElementTypes.EMPTY)) {
          ew.swap(4, 1);
          this.sortVal = dval;
        }
      }



    }

    super.exec(ew);
  }

}
