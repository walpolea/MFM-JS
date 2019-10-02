import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";

export class Eraser extends Elem {

  static TYPE_DEF: IElementType = { name: "ERASER", type: "Er", class: Eraser, color: 0x000000 }

  eraseFrom: number;
  eraseTo: number;

  constructor(_eraseFrom: number = 0, _eraseTo: number = 41) {
    super(Eraser.TYPE_DEF);

    this.eraseFrom = _eraseFrom;
    this.eraseTo = _eraseTo;
  }
  exec(ew: EventWindow) {

    //erase
    for (let i = this.eraseFrom; i < this.eraseTo; i++) {
      ew.destroy(i);
    }
    //die
    ew.origin.killSelf();

    super.exec(ew);
  }
}
