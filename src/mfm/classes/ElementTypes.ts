import { EmptyElement } from "./elements/EmptyElement";
import { DRegElement } from "./elements/DRegElement";
import { ResElement } from "./elements/ResElement";
import { WallElement } from "./elements/WallElement";
import { MasonElement } from "./elements/MasonElement";
import { ForkBombElement } from "./elements/ForkBombElement";
import { AntiForkBombElement } from "./elements/AntiForkBombElement";
import { SentryElement } from "./elements/SentryElement";
import { SeekerElement } from "./elements/SeekerElement";
import { UberElement } from "./elements/UberElement";
import { DataElement } from "./elements/DataElement";
import { ReducerElement } from "./elements/ReducerElement";
import { SuperMasonElement } from "./elements/SuperMasonElement";
import { SuperForkBombElement } from "./elements/SuperForkBomb";
import { SwapWormElement } from "./elements/SwapWormElement";
import { SuperSwapWormElement } from "./elements/SuperSwapWormElement";

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
  static SUPER_MASON: IElementType = { name: "SUPER MASON", type: "SMa", class: SuperMasonElement, color: 0x20cccc };
  static FORK_BOMB: IElementType = { name: "FORK BOMB", type: "Fb", class: ForkBombElement, color: 0xaa2020 };
  static SUPER_FORK_BOMB: IElementType = {
    name: "SUPER FORK BOMB",
    type: "SFb",
    class: SuperForkBombElement,
    color: 0xaa0000
  };
  static UBER: IElementType = { name: "UBER", type: "Ub", class: UberElement, color: 0xffff00 };
  static DATA: IElementType = { name: "DATA", type: "Da", class: DataElement, color: 0xcccccc };
  static REDUCER: IElementType = { name: "REDUCER", type: "Re", class: ReducerElement, color: 0x00ffff };
  static ANTI_FORK_BOMB: IElementType = {
    name: "ANTI FORK BOMB",
    type: "Af",
    class: AntiForkBombElement,
    color: 0x7f7f20
  };
  static SEEKER: IElementType = { name: "SEEKER", type: "Sk", class: SeekerElement, color: 0x999933 };
  static SENTRY: IElementType = { name: "SENTRY", type: "Se", class: SentryElement, color: 0x7f7fff };
  static SWAPWORM: IElementType = { name:"SWAPWORM", type:"Sw", class:SwapWormElement, color:0xcc0066};
  static SUPERSWAPWORM: IElementType = { name:"SUPERSWAPWORM", type:"SSw", class:SuperSwapWormElement, color:0xcc00cc};
  static TYPES_MAP: Map<string, IElementType> = new Map<string, IElementType>();

  static registerType(name: string, type: string, c: any, color?: number) {
    this.TYPES_MAP.set(name, { name, type, class: c, color });
  }
}
