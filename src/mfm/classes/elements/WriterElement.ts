import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Atom } from "../Atom";
import { MFMUtils } from "../../utils/utils";
import { DataElement } from "./DataElement";
import { Site } from "../Site";
import { KeyboardElement } from "./KeyboardElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class WriterElement extends Elem {
  pPATROL: number = 1;

  str: string;
  valid: boolean = true;

  constructor(_str: string = "            ") {
    super(ElementTypes.WRITER.name, ElementTypes.WRITER.type);
    this.str = _str;

  }
  exec(ew: EventWindow) {


    //look for nearby data
    const dataEl: number = ew.getNearestIndex(EventWindow.ALL, ElementTypes.REDUCER);
    const dataEl2: number = ew.getNearestIndex(EventWindow.ADJACENT8WAY, ElementTypes.DATA);

    if (dataEl) {
      const d: Site = ew.getSiteByIndex(dataEl);
      if (d.atom.data && d.atom.data.value && this.str != (d.atom.data.value).toString()) {

        this.str = (d.atom.data.value).toString();
        this.valid = false;

      }

    } else if (dataEl2) {
      const d: Site = ew.getSiteByIndex(dataEl2);

      if (d.atom.data && d.atom.data.value && this.str != (d.atom.data.value).toString()) {

        this.str = (d.atom.data.value).toString();
        this.valid = false;

      }
    }


    if (!this.valid || (this.str && !ew.is(12, ElementTypes.TEXT))) {

      const strray: string[] = this.str.split(" ");
      let nextStr;
      if (strray.length) {
        nextStr = strray.shift();
        ew.mutate(12, new Atom(ElementTypes.TEXT, [nextStr]));

        this.str = nextStr;

        if (strray.length) {

          nextStr = strray.join(" ");
          ew.mutate(39, new Atom(ElementTypes.WRITER, [nextStr]));
        }
      }

      this.valid = true;
    } else {
      this.color = 0x222222;
    }

    super.exec(ew);
  }

  changeStr(newStr: string) {
    this.str = newStr;
    this.valid = false;
  }
}

