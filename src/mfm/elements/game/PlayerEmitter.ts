import { EventWindow } from "../../core/EventWindow";
import { Element } from "../../core/Element";
import { IElementType } from "../../core/IElementType";
import { ElementRegistry } from "../../core/ElementRegistry";
import { Empty } from "../EmptyElement";
import { Player } from "./Player";

export class PlayerEmitter extends Element {
  static BASE_TYPE: IElementType = { name: "PLAYER EMITTER", symbol: "Pm", class: PlayerEmitter, color: 0x33aa55 };
  static CREATE = PlayerEmitter.CREATOR();

  interval: number;
  count: number = 0;
  emitMap: number[];
  maxEmit: number;
  emitted: number = 0;
  isActive: boolean = false;

  constructor(_emitMap: number[] = EventWindow.ADJACENT8WAY, _interval: number = 10, _maxEmit: number = 10, _isActive: boolean = false) {
    super(PlayerEmitter.BASE_TYPE);

    this.interval = _interval;
    this.emitMap = _emitMap;
    this.maxEmit = _maxEmit;
    this.isActive = _isActive;
  }

  activate() {
    this.isActive = true;
  }

  exec(ew: EventWindow) {
    if (this.isActive && this.emitted < this.maxEmit && ++this.count % this.interval === 0) {
      this.count = 0;

      const empty: number = ew.getIndexes(this.emitMap, Empty.BASE_TYPE, true)[0];
      if (empty !== undefined) {
        ew.mutate(empty, Player.CREATE());
        this.emitted++;
      }
    }

    if (this.emitted === this.maxEmit) {
      ew.destroy();
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
PlayerEmitter.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
