import { EventWindow } from "../../core/EventWindow";
import { Quark } from "../../core/Quark";
import { Direction } from "../../utils/MFMWayfinder";
import { QDirectional } from "./QDirectional";

export class QDirector extends Quark {
  static CLASS: string = "DIRECTOR";

  direction: Direction;
  directingStrength: number[];
  color: number;

  directDirectionals(ew: EventWindow) {
    const directables: number[] = ew.getClassIndexes(this.directingStrength, QDirectional);

    if (directables.length) {
      directables.forEach((d) => {
        ((ew.getSiteByIndex(d).atom.elem as unknown) as QDirectional).direct(this.direction);
      });
    }
  }

  directDirectors(ew: EventWindow) {
    const directables: number[] = ew.getClassIndexes(this.directingStrength, QDirector);

    if (directables.length) {
      directables.forEach((d) => {
        ((ew.getSiteByIndex(d).atom.elem as unknown) as QDirector).direct(this.direction);
      });
    }
  }

  direct(d: Direction) {
    this.direction = d;
  }

  setColor() {
    switch (this.direction) {
      case "E":
        this.color = 0x20ccff;
        break;
      case "W":
        this.color = 0xccff20;
        break;
      case "N":
        this.color = 0xcc20ff;
        break;
      case "S":
        this.color = 0x4466aa;
        break;
    }
  }
}
