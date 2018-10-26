import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class MasonElement extends Elem {
  path: string[] = [];
  curIndex: number = 0;

  constructor(_path: string = "EEEENNNNWWWWSSSS") {
    super(ElementTypes.MASON.name, ElementTypes.MASON.type, 100, 100);
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

  //make a box path
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
    if (this.curIndex >= this.path.length) {
      this.curIndex = 0;
    }

    let lastdir: string = this.curIndex === 0 ? this.path[this.path.length - 1] : this.path[this.curIndex - 1];
    let dir: string = this.path[this.curIndex];

    this.curIndex++;

    let blueprints: any = {
      E: {
        moveSite() {
          return ew.getEast();
        },
        buildSite() {
          return ew.getSouth();
        }
      },
      N: {
        moveSite() {
          return ew.getNorth();
        },
        buildSite() {
          return ew.getEast();
        }
      },
      S: {
        moveSite() {
          return ew.getSouth();
        },
        buildSite() {
          return ew.getWest();
        }
      },
      W: {
        moveSite() {
          return ew.getWest();
        },
        buildSite() {
          return ew.getNorth();
        }
      }
    };

    const moveSite: Site = blueprints[dir].moveSite();
    const buildSite: Site = blueprints[dir].buildSite();

    //for changing directions
    if (lastdir !== dir) {
      const lastBuildSite: Site = blueprints[lastdir].buildSite();
      if (lastBuildSite) {
        ew.origin.mutateSite(lastBuildSite, new Atom(ElementTypes.WALL));
      }
    }

    //build the wall
    if (buildSite) {
      if (buildSite.atom.type === ElementTypes.RES || buildSite.atom.type === ElementTypes.EMPTY) {
        ew.origin.mutateSite(buildSite, new Atom(ElementTypes.WALL));
        if (lastdir !== dir) {
          ew.origin.mutateSite(buildSite, new Atom(ElementTypes.WALL));
        }
      }
    }

    //move to next site
    if (moveSite) {
      ew.origin.moveAtom(moveSite);
    }

    super.exec(ew);
  }
}
