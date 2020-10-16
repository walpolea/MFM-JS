import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Utils } from "../utils/MFMUtils";
import { SPLAT } from "../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Wall } from "./WallElement";

export class OnewayDoor extends Element {
  static BASE_TYPE: IElementType = { name: "ONEWAYDOOR", symbol: "Od", class: OnewayDoor, color: 0x4466ff };
  static CREATE = OnewayDoor.CREATOR({ params: [[1], [2, 3, 4]] });
  static N_WSE = OnewayDoor.CREATOR({ params: [[2], [1, 3, 4]] });
  static WNE_S = OnewayDoor.CREATOR({ params: [[1, 2, 4], [3]] });
  //named by <ENTRANCE>_<EXIT(S)>
  //forks
  static W_NS = OnewayDoor.CREATOR({ params: [[1], [2, 3]] });
  static E_NS = OnewayDoor.CREATOR({ params: [[4], [2, 3]] });
  static S_EW = OnewayDoor.CREATOR({ params: [[3], [1, 4]] });
  static N_EW = OnewayDoor.CREATOR({ params: [[2], [1, 4]] });
  static W_NE = OnewayDoor.CREATOR({ params: [[1], [2, 4]] });

  //counter-clockwise corners
  static E_S = OnewayDoor.CREATOR({ params: [[4], [3]] });
  static N_E = OnewayDoor.CREATOR({ params: [[2], [4]] });
  static W_N = OnewayDoor.CREATOR({ params: [[1], [2]] });
  static S_W = OnewayDoor.CREATOR({ params: [[3], [1]] });

  //clockwise corners
  static S_E = OnewayDoor.CREATOR({ params: [[3], [4]] });
  static E_N = OnewayDoor.CREATOR({ params: [[4], [2]] });
  static N_W = OnewayDoor.CREATOR({ params: [[2], [1]] });
  static W_S = OnewayDoor.CREATOR({ params: [[1], [3]] });

  //straights
  static W_E = OnewayDoor.CREATOR({ params: [[1], [4]] });
  static E_W = OnewayDoor.CREATOR({ params: [[4], [1]] });
  static S_N = OnewayDoor.CREATOR({ params: [[3], [2]] });
  static N_S = OnewayDoor.CREATOR({ params: [[2], [3]] });

  static checkWalls = SPLAT.splatToMap(`
    w~w
    ~@~
    w~w
  `);

  entrances: number[];
  exits: number[];
  walls: number[];
  curExitIndex: number = 0;

  constructor(_entrances: number[] = [1], _exits: number[] = [2, 4, 3]) {
    super(OnewayDoor.BASE_TYPE, 0, 100);

    this.exits = _exits;
    this.entrances = _entrances;
    //walls are wherever there are no exit or entrance
    console.log(this.entrances);
    this.walls = Utils.getMinus([1, 2, 3, 4, 5, 6, 7, 8], [...this.entrances, ...this.exits]);
  }

  nextExit() {
    this.curExitIndex = (this.curExitIndex + 1) % this.exits.length;
  }

  exec(ew: EventWindow) {
    //Set up the base structure
    const wallCount: number = ew.filterIndexesByType(this.walls, Wall.BASE_TYPE).length;
    if (wallCount < this.walls.length) {
      ew.mutateMany(this.walls, Wall.CREATE);
    }

    //check entrances for visitor
    this.entrances.forEach((entrance) => {
      if (!ew.is(entrance, Empty.BASE_TYPE)) {
        //check that the exit is empty
        if (ew.is(this.exits[this.curExitIndex], Empty.BASE_TYPE)) {
          //all clear, do the swap!
          ew.swap(entrance, this.exits[this.curExitIndex]);

          //push out one more if you can
          if (ew.is(this.exits[this.curExitIndex] + 8, Empty.BASE_TYPE)) {
            ew.swap(this.exits[this.curExitIndex], this.exits[this.curExitIndex] + 8);
          }

          this.nextExit();
        }
      }
    });
  }
}

OnewayDoor.INITIALIZE_SPLAT_MAP()();
ElementRegistry.registerType(OnewayDoor.BASE_TYPE);
