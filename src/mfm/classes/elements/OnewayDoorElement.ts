import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Wall } from "./WallElement";

export class OnewayDoor extends Elem {

  static TYPE_DEF: IElementType = { name: "ONEWAY DOOR", type: "Od", class: OnewayDoor, color: 0x4466ff };
  static CREATE = OnewayDoor.CREATOR([[1], [2, 3, 4]]);
  static N_WSE = OnewayDoor.CREATOR([[2], [1, 3, 4]]);
  static WNE_S = OnewayDoor.CREATOR([[1, 2, 4], [3]]);
  //named by <ENTRANCE>_<EXIT(S)>
  //forks
  static W_NS = OnewayDoor.CREATOR([[1], [2, 3]]);
  static E_NS = OnewayDoor.CREATOR([[4], [2, 3]]);
  static S_EW = OnewayDoor.CREATOR([[3], [1, 4]]);
  static N_EW = OnewayDoor.CREATOR([[2], [1, 4]]);
  static W_NE = OnewayDoor.CREATOR([[1], [2, 4]]);

  //counter-clockwise corners
  static E_S = OnewayDoor.CREATOR([[4], [3]]);
  static N_E = OnewayDoor.CREATOR([[2], [4]]);
  static W_N = OnewayDoor.CREATOR([[1], [2]]);
  static S_W = OnewayDoor.CREATOR([[3], [1]]);

  //clockwise corners
  static S_E = OnewayDoor.CREATOR([[3], [4]]);
  static E_N = OnewayDoor.CREATOR([[4], [2]]);
  static N_W = OnewayDoor.CREATOR([[2], [1]]);
  static W_S = OnewayDoor.CREATOR([[1], [3]]);

  //straights
  static W_E = OnewayDoor.CREATOR([[1], [4]]);
  static E_W = OnewayDoor.CREATOR([[4], [1]]);
  static S_N = OnewayDoor.CREATOR([[3], [2]]);
  static N_S = OnewayDoor.CREATOR([[2], [3]]);



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

    super(OnewayDoor.TYPE_DEF, 0, 100);

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
    const wallCount: number = ew.filterIndexesByType(this.walls, Wall.TYPE_DEF).length;
    if (wallCount < this.walls.length) {
      ew.mutateMany(this.walls, Wall.CREATE);
    }

    //check entrances for visitor
    this.entrances.forEach(entrance => {

      if (!ew.is(entrance, Empty.TYPE_DEF)) {

        //check that the exit is empty
        if (ew.is(this.exits[this.curExitIndex], Empty.TYPE_DEF)) {
          //all clear, do the swap!
          ew.swap(entrance, this.exits[this.curExitIndex]);

          //push out one more if you can
          if (ew.is(this.exits[this.curExitIndex] + 8, Empty.TYPE_DEF)) {
            ew.swap(this.exits[this.curExitIndex], this.exits[this.curExitIndex] + 8)
          }

          this.nextExit();

        }
      }

    })


  }
}

OnewayDoor.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(OnewayDoor.TYPE_DEF);