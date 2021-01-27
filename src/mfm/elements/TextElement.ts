import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { Font } from "../utils/MFMFont";
import { Atom } from "../core/Atom";
import { Wall } from "./WallElement";
import { Eraser } from "./EraserElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Text extends Element {
  static BASE_TYPE: IElementType = { name: "TEXT", symbol: "Tx", class: Text, color: 0xd66633 };
  static CREATE = Text.CREATOR();

  pPATROL: number = 1;
  char: string;
  init: boolean = false;

  constructor(_char: string = "0123456789") {
    super(Text.BASE_TYPE, 0);

    this.char = _char;
  }
  exec(ew: EventWindow) {
    if (this.char.length > 0) {
      if (this.char.length > 1) {
        const charr: string[] = this.char.split("");
        this.char = charr.shift();
        ew.mutate(40, new Atom(Text.BASE_TYPE, [charr.join("")]));
      } else if (ew.is(40, Text.BASE_TYPE)) {
        if (!this.init) ew.mutate(40, new Atom(Eraser.BASE_TYPE, [0, 9]));
      }

      const charMap: any = Font.characters.get(this.char);

      if (!charMap) {
        return;
      }

      const selfIsPos: boolean = charMap.positive.indexOf(0) > -1;

      charMap.positive
        .filter((i: number) => i != 0)
        .forEach((i: number) => {
          ew.mutate(i, new Atom(Wall.BASE_TYPE, [100], undefined, 0xf09a19));
        });

      charMap.negative
        .filter((i: number) => i != 0)
        .forEach((i: number) => {
          ew.mutate(i, new Atom(Wall.BASE_TYPE, [100], undefined, 0x000000));
        });

      //Camoflauge
      if (selfIsPos) {
        this.color = 0xf09a19;
      } else {
        this.color = 0x000000;
      }

      this.init = true;
    } else {
      ew.origin.die(new Atom(Eraser.BASE_TYPE, [0, 9]));
    }
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Text.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
