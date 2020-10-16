import { EventWindow } from "../core/EventWindow";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { MembraneWall } from "./MembraneWallElement";
import { StickyMembrane } from "./StickyMembraneElement";
import { Site } from "../core/Site";

export class MembraneDoor extends MembraneWall {
  static BASE_TYPE: IElementType = { name: "MEMBRANEDOOR", symbol: "Md", class: MembraneDoor, color: 0x6060ff };

  openCycles: number = 0;
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
      ew.getAll(StickyMembrane.BASE_TYPE)
        .filter((site: Site) => site)
        .forEach((site: Site) => {
          site.die();
        });

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
ElementRegistry.registerType(MembraneDoor.BASE_TYPE);
