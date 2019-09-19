import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Atom } from "../Atom";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class WriterElement extends Elem {
  pPATROL: number = 1;

  str: string;

  constructor(_str: string = "HELLO WORLD") {
    super(ElementTypes.WRITER.name, ElementTypes.WRITER.type);
    this.str = _str;
  }
  exec(ew: EventWindow) {

    if (this.str) {

      const strray: string[] = this.str.split(" ");

      if (strray.length) {
        const nextStr = strray.shift();
        ew.mutate(12, new Atom(ElementTypes.TEXT, [nextStr]));
      }

      if (strray.length) {
        this.str = strray.join(" ");
        ew.move(39);
      } else {
        //die if no more strings to write
        ew.origin.killSelf();
      }


    }
    super.exec(ew);
  }
}

