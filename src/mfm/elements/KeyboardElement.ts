import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";

export class Keyboard extends Element {
  static BASE_TYPE: IElementType = { name: "KEYBOARD", symbol: "Kb", class: Keyboard, color: 0xeeee22 };
  data: any = undefined;

  constructor() {
    super(Keyboard.BASE_TYPE);

    window.addEventListener("keyup", (e) => {
      this.onKey(e);
      e.preventDefault();
    });
  }

  //Not used, this is for base layers
  exec(ew: EventWindow) {
    super.exec(ew);
  }

  onKey(e: KeyboardEvent): void {
    this.data = e.key;
  }
}

//Initialize Splat Map maps the # to to the self type
Keyboard.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
//
