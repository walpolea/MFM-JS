import { EventWindow } from "./Eventwindow";

export abstract class Elem {
  name: string;
  type: string;
  moveability: number;
  destroyability: number;

  constructor(_name: string, _type: string, _moveability: number = 100, _destroyability: number = 100) {
    this.name = _name;
    this.type = _type;
    this.moveability = _moveability;
    this.destroyability = _destroyability;
  }

  exec(ew: EventWindow) {}
}
