import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";

export class Wall extends Elem {

  static TYPE_DEF: IElementType = { name: "WALL", type: "w", class: Wall, color: 0x2020ff };
  static CREATE = Wall.CREATOR();

  constructor() {
    super(Wall.TYPE_DEF, 0, 100);

    Wall.INITIALIZE_SPLAT_MAP()();

  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}
