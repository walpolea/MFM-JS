
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

  static NS_EXITS_WENT = OnewayDoor.CREATOR([[2, 3], 1]);
  static NS_EXITS_EENT = OnewayDoor.CREATOR([[2, 3], 4]);
  static EW_EXITS_SENT = OnewayDoor.CREATOR([[1, 4], 3]);
  static EW_EXITS_NENT = OnewayDoor.CREATOR([[1, 4], 2]);

  static E_EXIT_WENT = OnewayDoor.CREATOR([[4], 1]);
  static W_EXIT_EENT = OnewayDoor.CREATOR([[1], 4]);
  static N_EXIT_SENT = OnewayDoor.CREATOR([[2], 3]);
  static S_EXIT_NENT = OnewayDoor.CREATOR([[3], 2]);

  static NE_EXIT_WENT = OnewayDoor.CREATOR([[2, 4], 1]);

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