import { GridCoord } from "../interfaces/IGridCoord";
import { EventWindow } from "../classes/Eventwindow";
import { Tile } from "../classes/Tile";

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
    return ((Math.random() * n) < 1);
  }

  static oneRandom(arr: any[]): any {
    return arr[(arr.length * Math.random()) >> 0];
  }

  //reduce an array to a random n of the values
  static getRandom(arr: any[], n: number = 1): any[] {

    while (arr.length > n) {
      arr.splice(Math.random() * arr.length >> 0, 1);
    }

    return arr;
  }
}