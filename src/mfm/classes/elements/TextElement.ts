import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { MFMUtils } from "../../utils/utils";
import { MFMFont } from "../../utils/MFMFont";
import { Atom } from "../Atom";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class TextElement extends Elem {
  pPATROL: number = 1;

  char: string;

  constructor(_char: string = "ABCDEFHIJKLMNOPQRSTUVWXYZ") {
    super(ElementTypes.TEXT.name, ElementTypes.TEXT.type);
    this.char = _char;
  }
  exec(ew: EventWindow) {

    if (this.char.length > 0) {



      if (this.char.length > 1) {
        const charr: string[] = this.char.split("");
        this.char = charr.shift();
        ew.mutate(40, new Atom(ElementTypes.TEXT, [charr.join("")]));
      }

      const charMap: any = MFMFont.characters.get(this.char);

      const selfIsPos: boolean = charMap.positive.indexOf(0) > -1;

      charMap.positive.filter((i: number) => i != 0).forEach((i: number) => {
        ew.mutate(i, new Atom(ElementTypes.WALL, undefined, undefined, 0xf09a19));
      });

      charMap.negative.filter((i: number) => i != 0).forEach((i: number) => {
        ew.mutate(i, new Atom(ElementTypes.WALL, undefined, undefined, 0x000000));
      });

      //Camoflauge
      if (selfIsPos) {
        this.color = 0xf09a19;
      } else {
        this.color = 0x000000;
      }
    } else {
      ew.origin.killSelf()
    }
    super.exec(ew);
  }
}

