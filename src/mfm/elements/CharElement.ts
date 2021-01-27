import { Element } from "../core/Element";
import { EventWindow, EWIndex } from "../core/EventWindow";
import { IElementType } from "../core/IElementType";
import { Site } from "../core/Site";
import { Font, FontCharacter } from "../utils/MFMFont";
import { Utils } from "../utils/MFMUtils";
import { Empty } from "./EmptyElement";
import { QChar } from "./quarks/QChar";
import { QDirectional } from "./quarks/QDirectional";

export interface Char extends QChar, QDirectional {}

export class Char extends Element {
  static BASE_TYPE: IElementType = { name: "CHAR", symbol: "Cha", class: Char, color: 0x000000 };
  static CREATE = Char.CREATOR();

  isDrawing: boolean = false;

  constructor(_character: string = "A", _charPosition: EWIndex = 0) {
    super(Char.BASE_TYPE);

    this.character = _character; //Utils.oneRandom(Font.ALL_CHARACTERS); //_character;
    this.charPosition = _charPosition;
    this.isCenter = this.charPosition === 0;
    this.color = this.getColor();

    this.registerClass(QDirectional);
    this.registerClass(QChar);
  }

  draw(ew: EventWindow) {
    if (this.isCenter) {
      const fc: FontCharacter = this.getFontCharacter();

      fc.positive.forEach((i) => {
        if (ew.getSiteByIndex(i)?.atom.is(Empty.BASE_TYPE)) ew.mutate(i, Char.CREATE({ params: [this.character, i] }));
      });

      fc.negative.forEach((i) => {
        if (ew.getSiteByIndex(i)?.atom.is(Empty.BASE_TYPE)) ew.mutate(i, Char.CREATE({ params: [this.character, i] }));
      });
    } else {
      const centerIndex = Font.POSITION_ORIGIN_MAP.get(this.charPosition);
      if (!ew.getSiteByIndex(centerIndex)?.atom.is(Char.BASE_TYPE)) ew.mutate(centerIndex, Char.CREATE({ params: [this.character, 0] }));
    }
  }

  getCenterChar(ew: EventWindow): Char {
    return ew.getSiteByIndex(Font.POSITION_ORIGIN_MAP.get(this.charPosition))?.atom.elem as Char;
  }

  lineUp(ew: EventWindow) {
    //don't draw when soemthing else is around

    if (!ew.siteExists(21)) {
      this.isDrawing = true;
      return;
    }

    const clearArea: EWIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    if (ew.filterIndexesByType(clearArea, Empty.BASE_TYPE).length < clearArea.length) {
      return;
    }

    const possibleLeftChar: Site = ew.getSiteByIndex(37);
    const possibleRightChar: Site = ew.getSiteByIndex(40);

    if (
      (possibleLeftChar?.atom.is(Char.BASE_TYPE) && (possibleLeftChar?.atom.elem as Char).isCenter) ||
      (possibleRightChar?.atom.is(Char.BASE_TYPE) && (possibleRightChar?.atom.elem as Char).isCenter)
    ) {
      this.isDrawing = true;
    } else {
      this.isDrawing = false;
    }
  }

  behave(ew: EventWindow) {
    this.color = this.getColor();

    if (!this.isCenter) {
      this.isDrawing = this.getCenterChar(ew).isDrawing;
    } else {
      this.lineUp(ew);
    }

    //Drawing or moving?
    if (this.isDrawing) {
      this.draw(ew);
      return;
    }

    //not center and also not drawing? die
    if (!this.isCenter) {
      ew.destroy();
      return;
    }

    //center and moving

    if (this.direction) {
      if (!this.moveIfDirected(ew)) {
        this.slightRight();
      }
    } else {
      this.setRandomDirection();
    }

    // if (ew.getSites(EventWindow.ADJACENT4WAY, undefined, false).length < EventWindow.ADJACENT4WAY.length) {
    //   this.reverse();
    // }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

Element.applyMixins(Char, [QChar, QDirectional]);
