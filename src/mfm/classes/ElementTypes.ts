import { EmptyElement } from "./elements/EmptyElement";
import { DRegElement } from "./elements/DRegElement";
import { ResElement } from "./elements/ResElement";
import { WallElement } from "./elements/WallElement";
import { MasonElement } from "./elements/MasonElement";
import { ForkBombElement } from "./elements/ForkBombElement";

export interface IElementType {
  name: string;
  type: string;
  class: any;
}

export class ElementTypes {
  static EMPTY: IElementType = { name: "EMPTY", type: "E", class: EmptyElement };
  static DREG: IElementType = { name: "DREG", type: "D", class: DRegElement };
  static RES: IElementType = { name: "RES", type: "R", class: ResElement };
  static WALL: IElementType = { name: "WALL", type: "W", class: WallElement };
  static MASON: IElementType = { name: "MASON", type: "Ma", class: MasonElement };
  static FORK_BOMB: IElementType = { name: "FORKBOMB", type: "Fb", class: ForkBombElement };

  static TYPES_ARRAY: Array<IElementType> = [
    ElementTypes.EMPTY,
    ElementTypes.DREG,
    ElementTypes.RES,
    ElementTypes.WALL,
    ElementTypes.MASON,
    ElementTypes.FORK_BOMB
  ];

  static registerType(name: string, type: string, c: any) {
    this.TYPES_ARRAY.push({ name, type, class: c });
  }
}
