import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Font } from "../../utils/MFMFont";
import { Atom } from "../Atom";
import { Wall } from "./WallElement";
import { Eraser } from "./EraserElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Text extends Elem {

  static TYPE_DEF: IElementType = { name: "TEXT", type: "Tx", class: Text, color: 0xd66633 }

  pPATROL: number = 1;
  char: string;
  init: boolean = false;

  constructor(_char: string = "0123456789") {
    super(Text.TYPE_DEF);

    this.char = _char;
  }
  exec(ew: EventWindow) {

    if (this.char.length > 0) {

      if (this.char.length > 1) {
        const charr: string[] = this.char.split("");
        this.char = charr.shift();
        ew.mutate(40, new Atom(Text.TYPE_DEF, [charr.join("")]));
      } else if (ew.is(40, Text.TYPE_DEF)) {
        if (!this.init)
          ew.mutate(40, new Atom(Eraser.TYPE_DEF, [0, 9]));
      }

      const charMap: any = Font.characters.get(this.char);

      if (!charMap) {
        return;
      }

      const selfIsPos: boolean = charMap.positive.indexOf(0) > -1;

      charMap.positive.filter((i: number) => i != 0).forEach((i: number) => {
        ew.mutate(i, new Atom(Wall.TYPE_DEF, undefined, undefined, 0xf09a19));
      });

      charMap.negative.filter((i: number) => i != 0).forEach((i: number) => {
        ew.mutate(i, new Atom(Wall.TYPE_DEF, undefined, undefined, 0x000000));
      });

      //Camoflauge
      if (selfIsPos) {
        this.color = 0xf09a19;
      } else {
        this.color = 0x000000;
      }

      this.init = true;

    } else {
      ew.origin.killSelf(new Atom(Eraser.TYPE_DEF, [0, 9]))
    }
    super.exec(ew);
  }
}

