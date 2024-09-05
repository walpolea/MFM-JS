import { Element } from "mfm-js";
import { EventWindow } from "mfm-js";

export class Lemming extends Element {
  static CREATE = Lemming.CREATOR({ name: "LEMM", symbol: "LMG", class: Lemming, color: 0xbe146f, groups: ["LEMMINGS"] });

  constructor(type, state = {}) {
    super(type, state);

    this.init();
  }

  init() {

    this.state.direction = 1;
  }

  behave(ew: EventWindow) {
    super.behave(ew);


    //Gravity?
    if( ew.is(3, "EMPTY") ) {
      ew.swap(3);
      return;
    }

    if( ew.is( this.state.direction, "EMPTY") ) {
      ew.swap( this.state.direction );
      return;
    } else {
      this.state.direction = this.state.direction === 1 ? 4 : 1;
    }
  }
}
