import { EventWindow } from "./Eventwindow";

export abstract class Elem {
  _name: string;
  _type: string;
  _moveable: boolean;
  _killable: boolean;
  _data: any;

  constructor(_name: string, _type: string, _moveable: boolean = true, _killable: boolean = true, _data: any = 0) {
    this.name = _name;
    this.type = _type;
    this.data = _data;
    this.moveable = _moveable;
    this.killable = _killable;
  }

  set data(d: any) {
    this._data = d;
  }

  get data(): any {
    return this._data;
  }

  set name(n: string) {
    this._name = n;
  }

  get name(): string {
    return this._name;
  }

  set type(t: string) {
    this._type = t;
  }

  get type(): string {
    return this._type;
  }

  set moveable(m: boolean) {
    this._moveable = m;
  }

  get moveable(): boolean {
    return this._moveable;
  }

  set killable(k: boolean) {
    this._killable = k;
  }

  get killable(): boolean {
    return this._killable;
  }

  exec(ew: EventWindow) {}
}
