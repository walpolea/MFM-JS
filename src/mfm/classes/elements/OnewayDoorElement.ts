
import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Wall } from "./WallElement";

export class OnewayDoor extends Elem {

  static TYPE_DEF: IElementType = { name: "ONEWAY DOOR", type: "Od", class: OnewayDoor, color: 0x4466ff };
  static CREATE = OnewayDoor.CREATOR();

  //named by <ENTRANCE>_<EXIT(S)>
  //forks
  static W_NS = OnewayDoor.CREATOR([[2, 3], 1]);
  static E_NS = OnewayDoor.CREATOR([[2, 3], 4]);
  static S_EW = OnewayDoor.CREATOR([[1, 4], 3]);
  static N_EW = OnewayDoor.CREATOR([[1, 4], 2]);
  static W_NE = OnewayDoor.CREATOR([[2, 4], 1]);

  //counter-clockwise corners
  static E_S = OnewayDoor.CREATOR([[3], 4]);
  static N_E = OnewayDoor.CREATOR([[4], 2]);
  static W_N = OnewayDoor.CREATOR([[2], 1]);
  static S_W = OnewayDoor.CREATOR([[1], 3]);

  //clockwise corners
  static S_E = OnewayDoor.CREATOR([[4], 3]);
  static E_N = OnewayDoor.CREATOR([[2], 4]);
  static N_W = OnewayDoor.CREATOR([[1], 2]);
  static W_S = OnewayDoor.CREATOR([[3], 1]);

  //straights
  static W_E = OnewayDoor.CREATOR([[4], 1]);
  static E_W = OnewayDoor.CREATOR([[1], 4]);
  static S_N = OnewayDoor.CREATOR([[2], 3]);
  static N_S = OnewayDoor.CREATOR([[3], 2]);



  static checkWalls = SPLAT.splatToMap(`
    w~w
    ~@~
    w~w
  `);

  entrance: number;
  exits: number[];
  walls: number[];
  curExitIndex: number = 0;

  constructor(exits: number[] = [2, 4, 3], entrance: number = 1) {

    super(OnewayDoor.TYPE_DEF, 0, 100);

    this.exits = exits;
    this.entrance = entrance;
    //walls are wherever there are no exit or entrance
    this.walls = Utils.getMinus([1, 2, 3, 4, 5, 6, 7, 8], [this.entrance, ...this.exits]);

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

    //check entrance for visitor
    if (!ew.is(this.entrance, Empty.TYPE_DEF)) {

      //check that the exit is empty
      if (ew.is(this.exits[this.curExitIndex], Empty.TYPE_DEF)) {
        //all clear, do the swap!
        ew.swap(this.entrance, this.exits[this.curExitIndex]);
        this.nextExit();

      }
    }

  }
}

OnewayDoor.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(OnewayDoor.TYPE_DEF);