import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class SorterElement extends Elem {

  sortVal: number = 0;
  makeCount: number = 1;
  lifeSpan: number = 200;

  constructor(sortVal: number = 0, lifeSpan: number = 200) {
    super(ElementTypes.SORTER.name, ElementTypes.SORTER.type);
    this.sortVal = sortVal;

    this.lifeSpan = lifeSpan;
  }

  makeSorters(indexes: number[], val: number, ew: EventWindow) {

    indexes.forEach(index => {

      const sorter: Site = ew.getSiteByIndex(index);

      if (ew.is(sorter, ElementTypes.EMPTY)) {
        ew.mutate(index, new Atom(ElementTypes.SORTER, [val]));
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
    const availableSite: Site = ew.getSiteByIndex(4);
    if (availableSite.atom.data) {

      this.age = 0;

      const dval: any = availableSite.atom.data.value;

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

    }



    // let make: boolean = true;

    // const stopIndexes: number[] = [21, 22, 23,];

    // stopIndexes.forEach(index => {

    //   if (!ew.is(index, ElementTypes.EMPTY)) {
    //     make = false;
    //   }

    // })


    // const makeIndexes: number[] = [5, 6, 9,];

    // if (make && this.age < 30) {

    //   makeIndexes.forEach(index => {

    //     const sorter: Site = ew.getSiteByIndex(index);

    //     if (ew.is(sorter, ElementTypes.EMPTY)) {
    //       ew.mutate(index, new Atom(ElementTypes.SORTER));
    //     }

    //   });


    //   const wallIndexes: number[] = [35, 36];
    //   wallIndexes.forEach(index => {

    //     const wall: Site = ew.getSiteByIndex(index);

    //     if (ew.is(wall, ElementTypes.EMPTY)) {
    //       ew.mutate(index, new Atom(ElementTypes.DECAYWALL, [10]));
    //     }

    //   });


    // } else {


    // }

    super.exec(ew);
  }

}
