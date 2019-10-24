import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Atom } from "../Atom";
import { Keyboard } from "./KeyboardElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class BasePlanter extends Elem {
  static TYPE_DEF: IElementType = { name: "PLANTER", type: "Pl", class: BasePlanter, color: 0xeeee22 }
  static CREATE = BasePlanter.CREATOR();


  PLANT_TYPE: IElementType;

  constructor(plantType: IElementType = Keyboard.TYPE_DEF) {
    super(BasePlanter.TYPE_DEF);
    this.PLANT_TYPE = plantType;
  }
  exec(ew: EventWindow) {

    //there and gone in a flash
    ew.mutateBase(new Atom(this.PLANT_TYPE));
    ew.origin.killSelf();
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
BasePlanter.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(BasePlanter.TYPE_DEF);