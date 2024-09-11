import { Element, EventWindow, Empty } from "mfm-js";

export class Power extends Element {
  static CREATE = Power.CREATOR({ name: "POWER", symbol: "POW", class: Power, color: 0x2390aa, groups: ["LEMMINGS"] });
  static DIGGER = Power.CREATOR({ name: "DIGGER", symbol: "DIG", class: Power, color: 0xffffff, groups: ["LEMMINGS"] }, { power: "DIGGER", charges: 1});
  static BLOCKER = Power.CREATOR({ name: "BLOCKER", symbol: "BLK", class: Power, color: 0x2390aa, groups: ["LEMMINGS"] }, { power: "BLOCKER", charges: 1});
  static MINER = Power.CREATOR({ name: "MINER", symbol: "MNR", class: Power, color: 0x2390aa, groups: ["LEMMINGS"] }, { power: "MINER", charges: 1});
  static BUILDER = Power.CREATOR({ name: "BUILDER", symbol: "MNR", class: Power, color: 0x2390aa, groups: ["LEMMINGS"] }, { power: "BUILDER", charges: 1});


  constructor(type, state = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.power = this.state.power ?? "WALKER";
    this.state.charges = this.state.charges ?? 1;
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if( !ew.exists( 3 ) ) {
      ew.destroy();
    }

    
    if(this.state.charges <= 0) {
      ew.destroy();
      return;
    }
    
    const nearbyLemming = ew.randomOfType( EventWindow.ADJACENT8WAY, "WALKER" );

    if( nearbyLemming ) {
      (ew.getSite(nearbyLemming).atom as Lemming)?.setRole(this.state.power);
      this.state.charges--;
    }
  }

  

  
}

