import { EventWindow } from "../../EventWindow";
import { Elem } from "../../Elem";
import { IElementType } from "../../IElementType";
import { ElementTypes } from "../../ElementTypes";
import { Empty } from "../EmptyElement";
import { Player } from "./Player";

export class PlayerEmitter extends Elem {
  static TYPE_DEF: IElementType = { name: "PLAYER EMITTER", type: "Pm", class: PlayerEmitter, color: 0x33aa55 };
  static CREATE = PlayerEmitter.CREATOR();

  interval: number;
  count: number = 0;
  emitMap: number[];
  maxEmit:number;
  emitted = 0;

  constructor( _emitMap: number[] = EventWindow.ADJACENT8WAY, _interval: number = 10, _maxEmit:number = 10) {
    super(PlayerEmitter.TYPE_DEF);

    this.interval = _interval;
    this.emitMap = _emitMap;
    this.maxEmit = _maxEmit;
  }

  exec(ew: EventWindow) {
    if (this.emitted < this.maxEmit && ++this.count % this.interval === 0) {
      this.count = 0;

      const empty: number = ew.getIndexes(this.emitMap, Empty.TYPE_DEF, true)[0];
      if (empty !== undefined) {
        ew.mutate(empty, Player.CREATE() );
        this.emitted++;
      }
    }

    if( this.emitted === this.maxEmit ) {
      ew.destroy();
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
PlayerEmitter.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(PlayerEmitter.TYPE_DEF);
