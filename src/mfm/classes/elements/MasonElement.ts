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
    const r: number = (Math.random() * 8 + 6) >> 0;
    const choices: string[] = ["E", "N", "S", "W"];
    for (var i = 0; i < r; i++) {
      const d: number = (Math.random() * choices.length) >> 0;
      const l: number = (Math.random() * 3 + 3) >> 0;
      const dir: string = choices[d];

      for (var j = 0; j < l; j++) {
        path = path.concat(dir);
      }
    }

    return path;
  }

  //make a box path
  boxPath(sideLength: number = 7) {
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
        outerBuildSite() {
          return ew.getSouth();
        },
        innerBuildSite() {
          return ew.getNorth();
        }
      },
      N: {
        moveSite() {
          return ew.getNorth();
        },
        outerBuildSite() {
          return ew.getEast();
        },
        innerBuildSite() {
          return ew.getWest();
        }
      },
      S: {
        moveSite() {
          return ew.getSouth();
        },
        outerBuildSite() {
          return ew.getWest();
        },
        innerBuildSite() {
          return ew.getEast();
        }
      },
      W: {
        moveSite() {
          return ew.getWest();
        },
        outerBuildSite() {
          return ew.getNorth();
        },
        innerBuildSite() {
          return ew.getSouth();
        }
      }
    };

    const moveSite: Site = blueprints[dir].moveSite();
    const outerBuildSite: Site = blueprints[dir].outerBuildSite();
    const innerBuildSite: Site = blueprints[dir].innerBuildSite();

    //for changing directions
    if (lastdir !== dir) {
      const lastOuterBuildSite: Site = blueprints[lastdir].outerBuildSite();
      if (lastOuterBuildSite) {
        ew.origin.mutateSite(lastOuterBuildSite, new Atom(ElementTypes.WALL));
      }
    }

    //build the outer wall
    if (outerBuildSite) {
      if (outerBuildSite.atom.type === ElementTypes.RES || outerBuildSite.atom.type === ElementTypes.EMPTY) {
        ew.origin.mutateSite(outerBuildSite, new Atom(ElementTypes.WALL));
      }
    }

    //build the inner wall
    if (innerBuildSite) {
      if (innerBuildSite.atom.type === ElementTypes.RES || innerBuildSite.atom.type === ElementTypes.EMPTY) {
        ew.origin.mutateSite(innerBuildSite, new Atom(ElementTypes.WALL));
      }
    }

    //move to next site
    if (moveSite) {
      ew.origin.moveAtom(moveSite, new Atom(ElementTypes.WALL));
    }

    super.exec(ew);
  }
}
