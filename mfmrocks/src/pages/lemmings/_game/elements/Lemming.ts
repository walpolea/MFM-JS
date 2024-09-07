import { Element, EventWindow, Empty, Wall } from "mfm-js";
import { Dirt } from "./Dirt";

export class Lemming extends Element {
  static CREATE = Lemming.CREATOR({ name: "LEMM", symbol: "LMG", class: Lemming, color: 0x505CFE, groups: ["LEMMINGS"] });
  static HEAD = Wall.CREATOR(
    { name: "LEMM_HEAD", class: Wall, color: 0x05b604, classifications: ["DECAYABLE", "EMPTY"] },
    { lifeSpan: 10 }
  );

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

    this.behead(ew);

    //Gravity?
    if( ew.is(3, "EMPTY") ) {
      ew.swap(3);
      return;
    }

    this.head(ew);


    switch( this.state.role ) {
      case "WALKER":
        this.walk(ew);
        break;
      case "DIGGER":
        if( !this.dig(ew) ) {
          this.walk(ew);
        }
        break;
      case "BLOCKER":
        this.block(ew);
        break;
      case "MINER":
        if( !this.mine(ew) ) {
          this.walk(ew);
        }
        break;
    }
  }

  walk(ew) {

    const WALK_CHANCE = 5;
    if( EventWindow.oneIn( WALK_CHANCE ) ) {

      const walkChecks = Lemming.WALK_CHECKS[this.state.direction];
      const empties = ew.filterByType( walkChecks, "EMPTY" );
      
      if( empties.length > 0 ) {
        this.behead(ew);
        ew.move( empties[0] );
        return;
      } else {
        this.state.direction = this.state.direction === 'RIGHT' ? 'LEFT' : 'RIGHT';
      }
      
    }
  }

  dig(ew) {
    let dug = false;
    if( ew.is( Lemming.DIRS.DOWN, "DIGGABLE") ) {
      ew.mutate(Lemming.DIRS.DOWN, Empty.CREATE);
      dug = true;
    }
    return dug;
  }

  block(ew) {
    const blocks = [2,3,10,22,38];
    blocks.forEach( b => {
      if( ew.is(b, "EMPTY" ) ) {
        ew.mutate(b, Dirt.MOSS);
      }
    });
  }

  behead(ew) {
    if( ew.is( Lemming.DIRS.UP, "LEMM_HEAD" ) ) {
      ew.mutate( Lemming.DIRS.UP, Empty.CREATE );
    }
  }

  head(ew) {
    if( ew.is( Lemming.DIRS.UP, "EMPTY" ) ) {
      ew.mutate( Lemming.DIRS.UP, Lemming.HEAD );
    }
  }

  setRole(role) {
    this.declassify(this.state.role);
    this.state.role = role;
    this.classifyAs(this.state.role);
  }

  mine(ew) {
    let dug = false;
    if( ew.is( Lemming.DIRS[this.state.direction], "DIGGABLE") ) {
      ew.mutate(Lemming.DIRS[this.state.direction], Empty.CREATE);
      dug = true;
    }
    return dug;
  }
}

