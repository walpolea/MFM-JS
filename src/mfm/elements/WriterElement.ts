import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Atom } from "../core/Atom";
import { Site } from "../core/Site";
import { Text } from "./TextElement";
import { Reducer } from "./ReducerElement";
import { Data } from "./DataElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Writer extends Element {
  static BASE_TYPE: IElementType = { name: "WRITER", symbol: "Wr", class: Writer, color: 0xd66633 };
  static CREATE = Writer.CREATOR();

  pPATROL: number = 1;

  str: string;
  valid: boolean = true;

  constructor(_str: string = "") {
    super(Writer.BASE_TYPE);
    this.str = _str;
  }
  exec(ew: EventWindow) {
    //look for nearby data
    const dataEl: number = ew.getNearestIndex(EventWindow.ALL, Reducer.BASE_TYPE);
    const dataEl2: number = ew.getNearestIndex(EventWindow.ADJACENT8WAY, Data.BASE_TYPE);

    if (dataEl) {
      const d: Site = ew.getSiteByIndex(dataEl);
      if (d.atom.data !== undefined && d.atom.data.value !== undefined && this.str != d.atom.data.value.toString()) {
        this.str = d.atom.data.value.toString();
        this.valid = false;
      }
    } else if (dataEl2) {
      const d: Site = ew.getSiteByIndex(dataEl2);

      if (d.atom.data !== undefined && d.atom.data.value !== undefined && this.str != d.atom.data.value.toString()) {
        this.str = d.atom.data.value.toString();
        this.valid = false;
      }
    }

    if (!this.valid || (this.str && !ew.is(12, Text.BASE_TYPE))) {
      const strray: string[] = this.str.split(" ");
      let nextStr;
      if (strray.length) {
        nextStr = strray.shift();
        ew.mutate(12, new Atom(Text.BASE_TYPE, [nextStr]));

        this.str = nextStr;

        if (strray.length) {
          nextStr = strray.join(" ");
          ew.mutate(39, new Atom(Writer.BASE_TYPE, [nextStr]));
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

//Initialize Splat Map maps the # to to the self type
Writer.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Writer.BASE_TYPE);
