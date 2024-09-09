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

  static ORIENTED_DIRS = {
    'N': (location) => VirtualEventWindow.getOrientedSiteIndex( location, 2 ),
    'E': (location) => VirtualEventWindow.getOrientedSiteIndex( location, 4 ),
    'S': (location) => VirtualEventWindow.getOrientedSiteIndex( location, 3 ),
    'W': (location) => VirtualEventWindow.getOrientedSiteIndex( location, 1 ),
  }

  static FIELD_OF_VIEW = {
    'N': ["N", "NE", "NW"],
    'S': ["S", "SE", "SW"],
    'E': ["E", "SE", "NE"],
    'W': ["W", "SW", "NW"],
  }

  init() {

    this.state.heading = 'E';
    this.state.location = 0;

    this.setRole('WALKER');
  }

  behave(ew: EventWindow) {
    super.behave(ew);
    this.state.location = 0;

    if( !ew.exists( 3 ) ) {
      ew.destroy();
    }

    this.behead(ew);

    //Gravity?
    if( ew.is(3, "EMPTY") ) {
      const swapped = ew.swap(3);
      if( swapped ) this.state.location = 3;
      this.head(ew);
      return;
    }

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

    this.head(ew);
  }

  walk(ew) {

    const WALK_CHANCE = 5;
    let walked = false;

    if( EventWindow.oneIn( WALK_CHANCE ) ) {
      const walkChecks = Lemming.FIELD_OF_VIEW[this.state.heading];
      
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
    if( ew.is( Lemming.ORIENTED_DIRS.N(this.state.location), "LEMM_HEAD" ) ) {
      ew.mutate( Lemming.ORIENTED_DIRS.N(this.state.location), Empty.CREATE );
    }
    if( ew.is( Lemming.ORIENTED_DIRS[this.state.heading](this.state.location), "LEMM_HEAD" ) ) {
      ew.mutate( Lemming.ORIENTED_DIRS[this.state.heading](this.state.location), Empty.CREATE );
    }
  }

  head(ew) {
    if( ew.is( Lemming.ORIENTED_DIRS.N(this.state.location), "EMPTY" ) ) {
      ew.mutate( Lemming.ORIENTED_DIRS.N(this.state.location), Lemming.HEAD );
    } else if( ew.is( Lemming.ORIENTED_DIRS[this.state.heading](this.state.location), "EMPTY" ) ) {
      ew.mutate( Lemming.ORIENTED_DIRS[this.state.heading](this.state.location), Lemming.HEAD );
    }
  }

  setRole(role) {
    this.declassify(this.state.role);
    this.state.role = role;
    this.classifyAs(this.state.role);
  }

  
}

