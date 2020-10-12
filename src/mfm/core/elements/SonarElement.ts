import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../../utils/Symmetries";
import { Utils } from "../../utils/MFMUtils";

export class Sonar extends Elem {
  static TYPE_DEF: IElementType = { name: "SONAR", type: "Ra", class: Sonar, color: 0x559922 };
  static CREATE = Sonar.CREATOR();
  static CREATE_BLUE = Sonar.CREATOR(undefined, undefined, 0x5599bb);
  static CREATE_EAST = Sonar.CREATOR(["E"]);
  static CREATE_WEST = Sonar.CREATOR(["W"]);
  static CREATE_NORTH = Sonar.CREATOR(["N"]);
  static CREATE_SOUTH = Sonar.CREATOR(["S"]);

  direction: string;
  interval: number;
  intervalCount: number = 0;
  intervalChange: number = 1;
  intervalMax: number = 4;
  intervalMin: number = 4;

  hitSomething: boolean = false;

  p_ChanceToDeviate: number = 20;

  constructor(_direction: string = undefined) {
    super(Sonar.TYPE_DEF);

    this.direction = _direction ?? ["N", "S", "E", "W"][(Math.random() * 4) >> 0];
    this.interval = this.intervalMin;
  }

  getToDirection(ew: EventWindow): number {
    switch (this.direction) {
      case "E":
        return 4;
        break;
      case "W":
        return 1;
        break;
      case "N":
        return 2;
        break;
      case "S":
        return 3;
        break;
    }
  }

  getToSymmetry(ew: EventWindow): Map<number, number>[] {
    switch (this.direction) {
      case "E":
        return Symmetries.NORMAL;
        break;
      case "W":
        return Symmetries.FLIPX;
        break;
      case "N":
        return Symmetries.ROTATE_270L;
        break;
      case "S":
        return Symmetries.ROTATE_90R;
        break;
    }
  }

  getNextDirection(): string {
    //direction map for a clockwise square
    const directionMapClockwise: Map<string, string> = new Map<string, string>([
      ["E", "S"],
      ["S", "W"],
      ["W", "N"],
      ["N", "E"],
    ]);

    //direction map for a counter-clockwise square
    const directionMapCounter: Map<string, string> = new Map<string, string>([
      ["E", "N"],
      ["N", "W"],
      ["W", "S"],
      ["S", "E"],
    ]);

    //direction map for a counter-clockwise square
    const directionMapBounce: Map<string, string> = new Map<string, string>([
      ["E", "W"],
      ["N", "S"],
      ["W", "E"],
      ["S", "N"],
    ]);

    // return directionMapBounce.get(this.direction);
    return directionMapClockwise.get(this.direction);
    return Utils.oneIn(10) ? directionMapClockwise.get(this.direction) : directionMapBounce.get(this.direction);
    return Utils.oneIn(2) ? directionMapClockwise.get(this.direction) : directionMapCounter.get(this.direction);
  }

  changeDirection() {
    if (this.interval >= this.intervalMax) {
      this.intervalChange = -1;
    }

    if (this.interval <= this.intervalMin) {
      this.intervalChange = 1;
    }

    this.intervalCount = 0;
    this.interval += this.intervalChange;
    this.direction = this.getNextDirection();
  }

  exec(ew: EventWindow) {
    const toDir = this.getToDirection(ew);

    if (this.intervalCount % this.interval == 0) {
      this.changeDirection();
      this.hitSomething = false;
    }

    if (ew.is(toDir, Empty.TYPE_DEF)) {
      ew.swap(toDir);
    } else {
      this.changeDirection();
      this.hitSomething = true;
    }

    this.intervalCount++;

    //sync up
    // const nearbySonar = ew.getIndexes(EventWindow.ADJACENT8WAY, Sonar.TYPE_DEF, true)[0];

    // if (nearbySonar) {
    //   const n = ew.getSiteByIndex(nearbySonar).atom.elem as Sonar;
    //   this.direction = n.direction;
    //   this.interval = n.interval;
    //   this.intervalCount = n.intervalCount;
    //   this.intervalChange = n.intervalChange;
    // }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Sonar.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Sonar.TYPE_DEF);
