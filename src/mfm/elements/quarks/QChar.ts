import { EWIndex } from "../../core/EventWindow";
import { Quark } from "../../core/Quark";
import { Font, FontCharacter } from "../../utils/MFMFont";

export class QChar extends Quark {
  static CLASS: string = "CHAR";

  character: string;
  charPosition: EWIndex;
  isCenter: boolean;

  getFontCharacter(): FontCharacter {
    return Font.characters.get(this.character);
  }

  getColor(): number {
    if (this.isPositive()) {
      return 0xf09a19;
    } else {
      return 0x333333;
    }
  }

  isPositive(): Boolean {
    const fc = this.getFontCharacter();
    if (fc?.positive.includes(this.charPosition)) {
      return true;
    }

    return false;
  }
}
