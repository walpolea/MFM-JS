import { Element, EventWindow, Empty } from "mfm-js";

export class Lemming extends Element {
  static CREATE = Lemming.CREATOR({ name: "LEMM", symbol: "LMG", class: Lemming, color: 0xbe146f, groups: ["LEMMINGS"] });

  constructor(type, state = {}) {
    super(type, state);
    this.init();
  }

  static DIRS = {
    'UP': 2,
    'RIGHT': 4,
    'DOWN': 3,
    'LEFT': 1
  }

  static WALK_CHECKS = {
    'LEFT': [1, 5],
    'RIGHT': [4, 7]
  }

  init() {

    this.state.direction = 'RIGHT';
    this.setRole('WALKER');
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if( !ew.exists( 3 ) ) {
      ew.destroy();
    }

    //Gravity?
    if( ew.is(3, "EMPTY") ) {
      ew.swap(3);
      return;
    }

    switch( this.state.role ) {
      case "WALKER":
        this.walk(ew);
        break;
      case "DIGGER":
        if( !this.dig(ew) ) {
          this.walk(ew);
        }
        break;
    }
  }

  walk(ew) {
    const walkChecks = Lemming.WALK_CHECKS[this.state.direction];
    const empties = ew.filterByType( walkChecks, "EMPTY" );

    if( empties.length > 0 ) {
      ew.swap( empties[0] );
      return;
    } else {
      this.state.direction = this.state.direction === 'RIGHT' ? 'LEFT' : 'RIGHT';
    }

  }

  dig(ew) {
    let dug = false;
    if( ew.is( 3, "DIGGABLE") ) {
      ew.mutate(3, Empty.CREATE);
      dug = true;
    }
    return dug;
  }

  setRole(role) {
    this.declassify(this.state.role);
    this.state.role = role;
    this.classifyAs(this.state.role);
  }
}

