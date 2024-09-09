import { Element, EventWindow, Empty, Wall, Wayfinding, VirtualEventWindow } from "mfm-js";
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
    'N': 2,
    'E': 4,
    'S': 3,
    'W': 1
  }

  static FIELD_OF_VIEW = {
    'N': ["N", "NE", "NW"],
    'S': ["S", "SE", "SW"],
    'E': ["E", "SE", "NE"],
    'W': ["W", "SW", "NW"],
  }

  init() {

    this.state.heading = 'E';
    this.setRole('WALKER');
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    // console.log( VirtualEventWindow.ORIENTATIONS.map( m => Object.fromEntries(m)) );
    // console.log( VirtualEventWindow.getOrientedSite(39, 2, ew) );

    console.log( VirtualEventWindow.REVERSE_ORIENTATIONS );
    console.log( VirtualEventWindow.getVirtualIndexes(39, [2, 10, 22, 38]) );

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

    let moved = false;

    switch( this.state.role ) {
      case "WALKER":
        moved = this.walk(ew);
        break;
      case "DIGGER":
        if( !this.dig(ew) ) {
          moved = this.walk(ew);
        }
        break;
      case "BLOCKER":
        this.block(ew);
        break;
      case "MINER":
        if( !this.mine(ew) ) {
          moved = this.walk(ew);
        }
        break;
    }

  }

  walk(ew) {

    const WALK_CHANCE = 5;
    let walked = false;

    if( EventWindow.oneIn( WALK_CHANCE ) ) {
      const walkChecks = Lemming.FIELD_OF_VIEW[this.state.heading];
      
      this.behead(ew);
      walked = Wayfinding.MOVE_IN_DIRECTION(ew, this, walkChecks, "EMPTY");
      
      if(!walked && EventWindow.oneIn(2)) {
        Wayfinding.REVERSE(this);
      }

    }
    return false;
  }

  dig(ew) {
    let dug = false;
    const digChecks = Lemming.FIELD_OF_VIEW["S"];

    dug = Wayfinding.MOVE_IN_DIRECTION(ew, this, digChecks, "DIGGABLE");
    if( !dug ) {
      dug = Wayfinding.SWAP_IN_DIRECTION(ew, this, digChecks, "MOVABLE");
    }
    return dug;
  }

  mine(ew) {
    let mined = false;
    const mineChecks = Lemming.FIELD_OF_VIEW[this.state.heading];

    mined = Wayfinding.MOVE_IN_DIRECTION(ew, this, mineChecks, ["DIGGABLE", "MOVABLE"]);

    if( !mined ) {
      mined = Wayfinding.SWAP_IN_DIRECTION(ew, this, mineChecks, "MOVABLE");
    }
    return mined;
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
    if( ew.is( Lemming.DIRS.N, "LEMM_HEAD" ) ) {
      ew.mutate( Lemming.DIRS.N, Empty.CREATE );
    }
    if( ew.is( Lemming.DIRS[this.state.heading], "LEMM_HEAD" ) ) {
      ew.mutate( Lemming.DIRS[this.state.heading], Empty.CREATE );
    }
  }

  head(ew) {
    if( ew.is( Lemming.DIRS.N, "EMPTY" ) ) {
      ew.mutate( Lemming.DIRS.N, Lemming.HEAD );
    } else if( ew.is( Lemming.DIRS[this.state.heading], "EMPTY" ) ) {
      ew.mutate( Lemming.DIRS[this.state.heading], Lemming.HEAD );
    }
  }

  setRole(role) {
    this.declassify(this.state.role);
    this.state.role = role;
    this.classifyAs(this.state.role);
  }

  
}

