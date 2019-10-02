import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { IElementType } from "../ElementTypes";

export class Keyboard extends Elem {

  static TYPE_DEF: IElementType = { name: "KEYBOARD", type: "Kb", class: Keyboard, color: 0xeeee22 }

  data: any = undefined;

  constructor() {
    super(Keyboard.TYPE_DEF);

    window.addEventListener("keyup", (e) => {
      this.onKey(e);
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
