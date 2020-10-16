import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Atom } from "../core/Atom";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";
import { Sorter } from "./SorterElement";

export class Emitter extends Element {
  static BASE_TYPE: IElementType = { name: "EMITTER", symbol: "Em", class: Emitter, color: 0x33aa55 };
  static CREATE = Emitter.CREATOR();

  atomizer: Function;
  interval: number;
  count: number = 0;
  emitMap: number[];
  maxEmit: number;
  emitted = 0;

  constructor(_atomizer: Function, _emitMap: number[] = EventWindow.ADJACENT8WAY, _interval: number = 10, _maxEmit: number = Infinity) {
    super(Emitter.BASE_TYPE);

    this.atomizer = _atomizer;
    this.interval = _interval;
    this.emitMap = _emitMap;
    this.maxEmit = _maxEmit;
  }
  exec(ew: EventWindow) {
    if (this.emitted < this.maxEmit && ++this.count % this.interval === 0) {
      this.count = 0;

      const empty: number = ew.getIndexes(this.emitMap, Empty.BASE_TYPE, true)[0];
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
