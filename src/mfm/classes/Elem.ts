import { EventWindow } from "./Eventwindow";
import { ElementTypes } from "./ElementTypes";

export abstract class Elem {
  name: string;
  type: string;
  moveability: number;
  destroyability: number;
  age: number = 0;
  color: number;

  constructor(_name: string, _type: string, _moveability: number = 100, _destroyability: number = 100, _color: number = 0xffffff) {
    this.name = _name;
    this.type = _type;
    this.moveability = _moveability;
    this.destroyability = _destroyability;
    this.color = _color;
  }

  exec(ew: EventWindow) {
    this.age++;
  }
}
