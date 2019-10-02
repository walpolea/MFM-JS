import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";

export class Empty extends Elem {

  static TYPE_DEF: IElementType = { name: "EMPTY", type: "E", class: Empty, color: 0x303030 };
  static CREATE = Empty.CREATOR();

  constructor() {
    super(Empty.TYPE_DEF);
  }
  exec(ew: EventWindow) {
    super.exec(ew);
  }
}