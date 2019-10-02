import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";
import { Empty } from "./EmptyElement";

export class Res extends Elem {

  static TYPE_DEF: IElementType = { name: "RES", type: "R", class: Res, color: 0x0e5100 };
  static CREATE = Res.CREATOR();

  constructor() {
    super(Res.TYPE_DEF);
  }
  exec(ew: EventWindow) {
    ew.swap(ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF));
    super.exec(ew);
  }
}
