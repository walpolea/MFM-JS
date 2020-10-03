import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";
import { Sorter } from "./SorterElement";

export class Emitter extends Elem {
  static TYPE_DEF: IElementType = { name: "EMITTER", type: "Em", class: Emitter, color: 0x33aa55 };
  static CREATE = Emitter.CREATOR();

  atomizer: Function;
  interval: number;
  count: number = 0;
  emitMap: number[];
  maxEmit:number;
  emitted = 0;

  constructor(_atomizer: Function, _emitMap: number[] = EventWindow.ADJACENT8WAY, _interval: number = 10, _maxEmit:number = Infinity) {
    super(Emitter.TYPE_DEF);

    this.atomizer = _atomizer;
    this.interval = _interval;
    this.emitMap = _emitMap;
    this.maxEmit = _maxEmit;
  }
  exec(ew: EventWindow) {
    if (this.emitted < this.maxEmit && ++this.count % this.interval === 0) {
      this.count = 0;

      const empty: number = ew.getIndexes(this.emitMap, Empty.TYPE_DEF, true)[0];
      if (empty !== undefined) {
        ew.mutate(empty, this.atomizer());
        this.emitted++;
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Emitter.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Emitter.TYPE_DEF);
