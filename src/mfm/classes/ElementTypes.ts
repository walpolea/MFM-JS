import { EmptyElement } from "./elements/EmptyElement";
import { DRegElement } from "./elements/DRegElement";
import { ResElement } from "./elements/ResElement";
import { WallElement } from "./elements/WallElement";
import { MasonElement } from "./elements/MasonElement";
import { ForkBombElement } from "./elements/ForkBombElement";
import { AntiForkBombElement } from "./elements/AntiForkBombElement";
import { SentryElement } from "./elements/SentryElement";

export interface IElementType {
  name: string;
  type: string;
  class: any;
  color?: number;
}

export class ElementTypes {
  static EMPTY: IElementType = { name: "EMPTY", type: "E", class: EmptyElement, color: 0x404040 };
  static DREG: IElementType = { name: "DREG", type: "D", class: DRegElement, color: 0xff2020 };
  static RES: IElementType = { name: "RES", type: "R", class: ResElement, color: 0x20ff40 };
  static WALL: IElementType = { name: "WALL", type: "W", class: WallElement, color: 0x2020ff };
  static MASON: IElementType = { name: "MASON", type: "Ma", class: MasonElement, color: 0x20ffff };
  static FORK_BOMB: IElementType = { name: "FORK BOMB", type: "Fb", class: ForkBombElement, color: 0xaa2020 };
  static ANTI_FORK_BOMB: IElementType = {
    name: "ANTI FORK BOMB",
    type: "Af",
    class: AntiForkBombElement,
    color: 0x7f7f20
  };
  static SENTRY: IElementType = { name: "SENTRY", type: "Se", class: SentryElement, color: 0x7f7fff };

  static TYPES_ARRAY: Array<IElementType> = [
    ElementTypes.EMPTY,
    ElementTypes.DREG,
    ElementTypes.RES,
    ElementTypes.WALL,
    ElementTypes.MASON,
    ElementTypes.FORK_BOMB,
    ElementTypes.ANTI_FORK_BOMB,
    ElementTypes.SENTRY
  ];

  static registerType(name: string, type: string, c: any, color?: number) {
    this.TYPES_ARRAY.push({ name, type, class: c, color });
  }
}
