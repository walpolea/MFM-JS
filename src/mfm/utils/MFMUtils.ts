import { GridCoord } from "../core/IGridCoord";
import { EventWindow } from "../core/EventWindow";
import { Tile } from "../core/Tile";

export class Utils {
  static CtoID(c: GridCoord): string {
    return `${c.row}:${c.col}`;
  }

  static IDtoC(id: string): GridCoord {
    let rca: string[] = id.split(":");
    return { row: +rca[0], col: +rca[1] };
  }

  static GenerateEventWindow(tile: Tile, w: number, h: number): EventWindow {
    let rc = (Math.random() * w) >> 0;
    let rr = (Math.random() * h) >> 0;

    return new EventWindow(tile, { row: rr, col: rc });
  }

  static oneIn(n: number): boolean {
    return Math.random() * n < 1;
  }

  static oneRandom(arr: any[]): any {
    return arr[(arr.length * Math.random()) >> 0];
  }

  //reduce an array to a random n of the values
  static getRandom(arr: any[], n: number = 1): any[] {
    while (arr.length > n) {
      arr.splice((Math.random() * arr.length) >> 0, 1);
    }

    return arr;
  }

  static processArrayMiddleOut(array: any[], startIndex?: number, direction: string = "left") {
    if (!startIndex) {
      startIndex = (array.length * 0.5) >> 0;
    }
    if (startIndex < 0) {
      startIndex = 0;
    } else if (startIndex > array.length) {
      startIndex = array.length - 1;
    }

    var newArray = [];

    var i = startIndex;

    if (direction === "right") {
      var j = i + 1;
      while (j < array.length || i >= 0) {
        if (i >= 0) newArray.push(array[i]);
        if (j < array.length) newArray.push(array[j]);
        i--;
        j++;
      }
    } else if (direction === "left") {
      var j = i - 1;
      while (j >= 0 || i < array.length) {
        if (i < array.length) newArray.push(array[i]);
        if (j >= 0) newArray.push(array[j]);
        i++;
        j--;
      }
    }

    return newArray;
  }

  /////////////////////////////////
  //A bunch of useful number[] math
  /////////////////////////////////

  //put many site sets together
  //pass in as many site sets (number[]) as you like!
  static getUnion(...siteSets: number[][]): number[] {
    let union: number[] = [];
    siteSets.forEach((set) => {
      union = [...union, ...set];
    });

    //remove duplicates and put indexes back in window order - for any near/far calculations
    union = Array.from(new Set<number>(union)).sort((a, b) => a - b); //ascending sort

    return union;
  }

  //returns a number[] of values intersecting all siteSets
  //good for dynamic EW sets, like sites on LAYER1 that are also in NORTHERM_HEMISPHERE
  static getIntersection(...siteSets: number[][]): number[] {
    let intersection: number[] = this.getUnion(...siteSets);

    siteSets.forEach((set, index) => {
      intersection = [...intersection.filter((value) => -1 !== set.indexOf(value))];
    });

    return intersection;
  }

  //returns the opposite of an intersection, the indexes that don't overlap in the sets
  static getExclusion(...siteSets: number[][]): number[] {
    const allIndexes: number[] = this.getUnion(...siteSets);
    const inclusion: number[] = this.getIntersection(...siteSets);

    let exclusion: number[] = allIndexes.filter((value) => -1 === inclusion.indexOf(value));

    return exclusion;
  }

  //given a base set of indexes, minus (remove) any in the minus sets
  static getMinus(baseSet: number[], ...minusSets: number[][]): number[] {
    const minusUnion: number[] = this.getUnion(...minusSets);
    return baseSet.filter((value) => -1 === minusUnion.indexOf(value)).sort((a, b) => a - b);
  }

  static rgbToHex(r: number, g: number, b: number): number {
    return (1 << 24) + (r << 16) + (g << 8) + b;
  }

  static classOf<T>(o: T): any {
    return o.constructor;
  }
}
