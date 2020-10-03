import { EventWindow } from "../EventWindow";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { MembraneWall } from "./MembraneWallElement";
import { StickyMembrane } from "./StickyMembraneElement";

export class MembraneDoor extends MembraneWall {

  static TYPE_DEF: IElementType = { name: "MEMBRANE DOOR", type: "Md", class: MembraneDoor, color: 0x6060ff };


  openCycles: number = 0
  closedCycles: number = 0;
  openCycleLimit: number;
  closedCycleLimit: number;

  constructor(openTime: number = 1, closedTime: number = 20) {
    super();

    this.openCycleLimit = openTime;
    this.closedCycleLimit = closedTime;

  }
  exec(ew: EventWindow) {

    if (this.activated) {

      this.closedCycles++;

      if (this.closedCycles > this.closedCycleLimit) {

        this.activated = false;
        this.closedCycles = 0;
      }
    } else {

      ew.getAll(StickyMembrane.TYPE_DEF).filter(site => site).forEach(site => {
        site.die();
      })

      this.openCycles++;

      if (this.openCycles > this.openCycleLimit) {

        this.activated = true;
        this.openCycles = 0;
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
MembraneDoor.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(MembraneDoor.TYPE_DEF);