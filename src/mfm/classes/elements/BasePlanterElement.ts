import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Atom } from "../Atom";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class BasePlanterElement extends Elem {
  PLANT_TYPE: IElementType;

  constructor(plantType: IElementType = ElementTypes.KEYBOARD) {
    super(ElementTypes.BASE_PLANTER.name, ElementTypes.BASE_PLANTER.type);

    this.PLANT_TYPE = plantType;
  }
  exec(ew: EventWindow) {

    //there and gone in a flash
    ew.mutateBase(new Atom(this.PLANT_TYPE));
    ew.origin.killSelf();
    super.exec(ew);
  }
}
