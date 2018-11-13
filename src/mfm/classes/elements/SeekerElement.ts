import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { GridCoord } from "../../interfaces/IGridCoord";
import { Site } from "../Site";

export class SeekerElement extends Elem {
  seekPos: GridCoord;
  constructor(_seekPos: GridCoord) {
    ElementTypes.registerType("SEEKER", "Sk", SeekerElement, 0x999933);
    super(ElementTypes.TYPES_MAP.get("SEEKER").name, ElementTypes.TYPES_MAP.get("SEEKER").type);

    this.seekPos = _seekPos;
  }
  exec(ew: EventWindow) {
    let opos: GridCoord = ew.origin.tilePos;

    let targetPos: GridCoord = ew.origin.coordToward(this.seekPos);

    //we made it!
    if (!targetPos) {
      return;
    }

    let optimalSite: Site = ew.getDirection(targetPos);

    if (optimalSite && optimalSite.atom.type === ElementTypes.EMPTY) {
      ew.origin.swapAtoms(optimalSite);
    } else {
      //optimal is taken, go another way?
      let random8way: Site = ew.getAdjacent8Way(true, ElementTypes.EMPTY);
      if (random8way) {
        ew.origin.swapAtoms(random8way);
      }
    }

    //try to move into the optimal direction
    //ew.origin.swapAtoms(ew.getDirection(targetPos));

    super.exec(ew);
  }
}
