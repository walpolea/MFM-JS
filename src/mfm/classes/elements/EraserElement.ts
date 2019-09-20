import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

export class EraserElement extends Elem {

  eraseFrom: number;
  eraseTo: number;

  constructor(_eraseFrom: number = 0, _eraseTo: number = 41) {
    super(ElementTypes.ERASER.name, ElementTypes.ERASER.type, 0, 100);

    this.eraseFrom = _eraseFrom;
    this.eraseTo = _eraseTo;
  }
  exec(ew: EventWindow) {

    for (let i = this.eraseFrom; i < this.eraseTo; i++) {
      ew.destroy(i);
    }
    ew.origin.killSelf();

    super.exec(ew);
  }
}
