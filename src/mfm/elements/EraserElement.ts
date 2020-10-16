import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";

export class Eraser extends Element {
  static BASE_TYPE: IElementType = { name: "ERASER", symbol: "Er", class: Eraser, color: 0x000000 };
  static CREATE = Eraser.CREATOR();

  eraseFrom: number;
  eraseTo: number;

  constructor(_eraseFrom: number = 0, _eraseTo: number = 41) {
    super(Eraser.BASE_TYPE);

    this.eraseFrom = _eraseFrom;
    this.eraseTo = _eraseTo;
  }
  exec(ew: EventWindow) {
    //erase
    for (let i = this.eraseFrom; i < this.eraseTo; i++) {
      ew.destroy(i);
    }
    //die
    ew.origin.die();

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Eraser.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
