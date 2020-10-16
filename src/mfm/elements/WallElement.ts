import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";

export class Wall extends Element {
  static BASE_TYPE: IElementType = { name: "WALL", symbol: "w", class: Wall, color: 0x2020ff };
  static CREATE = Wall.CREATOR();
  static SOFT_WALL = Wall.CREATOR({ params: [100, 0] }, undefined, 0x4499cc);

  constructor(_moveability: number = 0, _destroyability: number = 100) {
    super(Wall.BASE_TYPE, _moveability, _destroyability);
  }

  behave(ew: EventWindow) {}

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Wall.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Wall.BASE_TYPE);
//Register a SPLAT symbol
ElementRegistry.registerSPLAT("w", Wall.BASE_TYPE);
