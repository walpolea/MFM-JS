import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Atom } from "../core/Atom";
import { Keyboard } from "./KeyboardElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class BasePlanter extends Element {
  static BASE_TYPE: IElementType = { name: "PLANTER", symbol: "Pl", class: BasePlanter, color: 0xeeee22 };
  static CREATE = BasePlanter.CREATOR();

  PLANT_TYPE: IElementType;

  constructor(plantType: IElementType = Keyboard.BASE_TYPE) {
    super(BasePlanter.BASE_TYPE);
    this.PLANT_TYPE = plantType;
  }
  exec(ew: EventWindow) {
    //there and gone in a flash
    ew.mutateBase(new Atom(this.PLANT_TYPE));
    ew.origin.die();
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
BasePlanter.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(BasePlanter.BASE_TYPE);
