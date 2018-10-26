import { EventWindow } from "./Eventwindow";

export abstract class Elem {
  name: string;
  type: string;
  moveability: number;
  killability: number;

  constructor(_name: string, _type: string, _moveability: number = 100, _killability: number = 100) {
    this.name = _name;
    this.type = _type;
    this.moveability = _moveability;
    this.killability = _killability;
  }

  exec(ew: EventWindow) {}
}
