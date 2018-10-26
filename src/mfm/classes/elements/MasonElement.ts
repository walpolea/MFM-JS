import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class MasonElement extends Elem {
  path: string[] = [];
  constructor(_path: string = "EEEENNNNWWWWSSSS") {
    super(ElementTypes.MASON.name, ElementTypes.MASON.type, 100, 10);
    _path = this.boxPath();
    this.path = _path.toUpperCase().split("");
  }

  //make a random wall path
  randomPath(): string {
    let path: string = "";
    const r: number = Math.floor(Math.random() * 8) + 6;
    const choices: string[] = ["E", "N", "S", "W"];
    for (var i = 0; i < r; i++) {
      const d: number = Math.floor(Math.random() * choices.length);
      const l: number = Math.floor(Math.random() * 3) + 3;
      const dir: string = choices[d];

      for (var j = 0; j < l; j++) {
        path = path.concat(dir);
      }
    }

    return path;
  }

  boxPath(sideLength: number = 5) {
    let path: string = "";
    const choices: string[] = ["E", "N", "W", "S"];
    while (choices.length) {
      const dir: string = choices.shift();

      for (var j = 0; j < sideLength; j++) {
        path = path.concat(dir);
      }
    }

    return path;
  }

  exec(ew: EventWindow) {
    if (this.path.length) {
      let availableSite: Site;
      let dir: string = this.path.shift();
      switch (dir) {
        case "E":
          availableSite = ew.getEast();
          break;
        case "N":
          availableSite = ew.getNorth();
          break;
        case "S":
          availableSite = ew.getSouth();
          break;
        case "W":
          availableSite = ew.getWest();
          break;
      }

      if (
        availableSite &&
        (availableSite.atom.type === ElementTypes.RES || availableSite.atom.type === ElementTypes.EMPTY)
      ) {
        ew.origin.moveAtom(availableSite, new Atom(ElementTypes.WALL));
      } else if (availableSite && availableSite.atom.type === ElementTypes.WALL) {
        //ew.origin.killSelf(new Atom(ElementTypes.WALL));
      }

      if (!availableSite) {
        //ew.origin.killSelf(new Atom(ElementTypes.WALL));
      }
    } else {
      ew.origin.killSelf(new Atom(ElementTypes.WALL));
    }
    super.exec(ew);
  }
}
