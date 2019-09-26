import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

export class KeyboardElement extends Elem {

  data: any = undefined;

  constructor() {
    super(ElementTypes.KEYBOARD.name, ElementTypes.KEYBOARD.type);

    window.addEventListener("keyup", (e) => {
      this.onKey(e);
    });
  }

  //Not used, this is for base layers
  exec(ew: EventWindow) {
    super.exec(ew);
  }

  onKey(e: KeyboardEvent): void {
    console.log("key", e.key);
    this.data = e.key;
  }


}
