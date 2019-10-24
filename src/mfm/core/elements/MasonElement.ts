import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { Wall } from "./WallElement";
import { Res } from "./ResElement";

export class Mason extends Elem {

  static TYPE_DEF: IElementType = { name: "MASON", type: "Ma", class: Mason, color: 0x20ffff };
  static CREATE = Mason.CREATOR();

  path: string[] = [];
  curIndex: number = 0; //used to traverse index, but now this is sort of like the mason's ID in the path, it doesn't change for the individual, but is kept up (+1,-1) by neighbor masons

  //it's important that the path loops on itself, even if it just means reversing back to the beginning
  constructor(_path: string = undefined, _curIndex: number = 0) {
    super(Mason.TYPE_DEF);

    if (!_path) {
      _path = Mason.boxPath();
    }

    this.setPath(_path);
    this.curIndex = _curIndex;
  }

  setPath(path: string) {
    this.path = path.split("");
  }

  exec(ew: EventWindow) {
    if (this.curIndex >= this.path.length) {
      this.curIndex = 0;
    } else if (this.curIndex < 0) {
      this.curIndex = this.path.length - 1;
    }

    let lastdir: string = this.curIndex === 0 ? this.path[this.path.length - 1] : this.path[this.curIndex - 1];
    let reverseDir: string = Mason.getOppositeDir(lastdir);
    let dir: string = this.path[this.curIndex];

    let blueprints: any = {
      E: {
        moveSite() {
          return ew.east;
        },
        outerBuildSite() {
          return ew.south;
        },
        innerBuildSite() {
          return ew.north;
        }
      },
      N: {
        moveSite() {
          return ew.north;
        },
        outerBuildSite() {
          return ew.east;
        },
        innerBuildSite() {
          return ew.west;
        }
      },
      S: {
        moveSite() {
          return ew.south;
        },
        outerBuildSite() {
          return ew.west;
        },
        innerBuildSite() {
          return ew.east;
        }
      },
      W: {
        moveSite() {
          return ew.west;
        },
        outerBuildSite() {
          return ew.north;
        },
        innerBuildSite() {
          return ew.south;
        }
      }
    };

    const moveSite: Site = blueprints[dir].moveSite();
    const lastSite: Site = blueprints[reverseDir].moveSite();
    const outerBuildSite: Site = blueprints[dir].outerBuildSite();
    const innerBuildSite: Site = blueprints[dir].innerBuildSite();

    //console.log(dir, moveSite, lastSite, outerBuildSite, innerBuildSite);

    //for changing directions
    if (lastdir !== dir) {
      const lastOuterBuildSite: Site = blueprints[lastdir].outerBuildSite();
      if (lastOuterBuildSite) {
        ew.origin.mutateSite(lastOuterBuildSite, new Atom(Wall.TYPE_DEF));
      }
    }

    //build the outer wall
    if (outerBuildSite) {
      if (outerBuildSite.atom.type === Res.TYPE_DEF || outerBuildSite.atom.type === Empty.TYPE_DEF) {
        ew.origin.mutateSite(outerBuildSite, new Atom(Wall.TYPE_DEF));
      }
    }

    //build the inner wall
    if (innerBuildSite) {
      if (innerBuildSite.atom.type === Res.TYPE_DEF || innerBuildSite.atom.type === Empty.TYPE_DEF) {
        ew.origin.mutateSite(innerBuildSite, new Atom(Wall.TYPE_DEF));
      }
    }

    //move to next site and leave another mason to help
    if (moveSite) {
      ew.origin.mutateSite(
        moveSite,
        new Atom(Mason.TYPE_DEF, [Mason.pathToString(this.path), this.curIndex + 1])
      );
    }

    if (lastSite) {
      // ew.origin.mutateSite(
      //   lastSite,
      //   new Atom(Mason.TYPE_DEF, [MasonElement.pathToString(this.path), this.curIndex - 1])
      // );
    }

    super.exec(ew);
  }

  //Static path helper methods
  //At some point I think this should be broken out into a utility class
  //More elements will probably benefit from having the concept of a defined path

  //make a random wall path
  static randomPath(): string {
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

  static linePath(length: number = 48, direction: string = "E"): string {
    let path: string = "";
    for (var i = 0; i < length; i++) {
      path = path.concat(direction);
    }
    path = path.concat(this.reversePath(path));
    return path;
  }

  //make a box path
  static boxPath(sideLength: number = 7): string {
    let path: string = "";
    const choices: string[] = ["E", "N", "W", "S"];
    while (choices.length) {
      const dir: string = choices.shift();

      for (var j = 0; j < sideLength; j++) {
        path = path.concat(dir);
      }
    }
    //path = path.concat(this.reversePath(path));
    return path;
  }

  //convert a string[] to string (path serialization)
  static pathToString(path: string[]): string {
    return path.reduce((acc: string, dir: string, index: number) => {
      return acc.concat(dir);
    }, "");
  }

  //take a path with N,S,E,W and reverse the directions
  static reversePath(path: string): string {
    path = path
      .split("")
      .reverse()
      .reduce((acc: string, dir: string, index: number) => {
        return acc.concat(dir);
      }, "");

    path = path.replace(/N/g, "T");
    path = path.replace(/S/g, "N");
    path = path.replace(/T/g, "S");
    path = path.replace(/E/g, "T");
    path = path.replace(/W/g, "E");
    path = path.replace(/T/g, "W");
    return path;
  }

  //reverse a direction
  static getOppositeDir(dir: string): string {
    let map: any = {
      N: "S",
      S: "N",
      E: "W",
      W: "E"
    };

    return map[dir];
  }
}

//Initialize Splat Map maps the # to to the self type
Mason.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Mason.TYPE_DEF);