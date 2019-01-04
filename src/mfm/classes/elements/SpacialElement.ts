import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { GridCoord } from "../../interfaces/IGridCoord";

export class SpacialElement extends Elem {
  birthPlace: GridCoord;
  currentPlace: GridCoord;

  constructor(_name: string, _type: string, _moveability: number = 100, _destroyability: number = 100) {
    super(_name, _type, _moveability, _destroyability);

    this.birthPlace = { row: 0, col: 0 };
    this.currentPlace = { row: 0, col: 0 };
  }

  trackWest() {
    this.currentPlace.col--;
  }

  trackNorth() {
    this.currentPlace.row--;
  }

  trackEast() {
    this.currentPlace.col++;
  }

  trackSouth() {
    this.currentPlace.row++;
  }

  trackNW() {
    this.trackNorth();
    this.trackWest();
  }

  trackNE() {
    this.trackNorth();
    this.trackEast();
  }

  trackSE() {
    this.trackSouth();
    this.trackEast();
  }

  trackSW() {
    this.trackSouth();
    this.trackWest();
  }

  exec(ew: EventWindow) {
    super.exec(ew);
  }
}
