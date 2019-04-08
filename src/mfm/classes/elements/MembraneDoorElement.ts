import { EventWindow } from "../Eventwindow";
import { ElementTypes } from "../ElementTypes";
import { MembraneWallElement } from "./MembraneWallElement";

export class MembraneDoorElement extends MembraneWallElement {

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

      ew.getAll(ElementTypes.STICKYMEMBRANE).filter(site => site).forEach(site => {
        site.killSelf();
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
