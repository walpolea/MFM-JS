import { Element, EventWindow, Empty, Wall, Wayfinding, VirtualEventWindow, Wayfinder } from "mfm-js";
import { Dirt } from "./Dirt";

export class Lemming extends Element {
  static CREATE = Lemming.CREATOR({ name: "LEMM", symbol: "LMG", class: Lemming, color: 0xffffff, groups: ["LEMMINGS"], classifications: ["WALKABLE"] });
  static HEAD = Wall.CREATOR(
    { name: "LEMM_HEAD", class: Wall, color: 0xffffff, classifications: ["DECAYABLE", "EMPTY"] },
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
    'N': (location = 0) => VirtualEventWindow.getOrientedSiteIndex( location, 2 ),
    'E': (location = 0) => VirtualEventWindow.getOrientedSiteIndex( location, 4 ),
    'S': (location = 0) => VirtualEventWindow.getOrientedSiteIndex( location, 3 ),
    'W': (location = 0) => VirtualEventWindow.getOrientedSiteIndex( location, 1 ),
  }

  static FIELD_OF_VIEW = {
    'N': ["N", "NE", "NW"],
    'S': ["S", "SE", "SW"],
    'E': ["E", "NE", "SE"],
    'W': ["W", "NW", "SW"],
  }

  static BUILD_WALK_TARGETS = {
    "E" : "NE",
    "W" : "NW",
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
      case "BUILDER":
        if( !this.build(ew) ) {
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

      if( !walked && EventWindow.oneIn(2) ) {
        walked = Wayfinding.SWAP_IN_DIRECTION(ew, this, walkChecks, "WALKABLE");
      }
      
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
      ew.mutate(0, Dirt.MOSS);
      if( ew.is(b, "EMPTY" ) ) {
        ew.mutate(b, Dirt.MOSS);
      }
    });
  }

  build(ew) {
    
    let built = false;
    this.state.buildCount = this.state.buildCount ?? 0;

    const buildChecks = Wayfinder.mapPath(this.buildPath() );

    if( ew.all( buildChecks, "EMPTY") ) {

      ew.mutateMany( buildChecks, Wall.CREATE );
      built = true;
      this.state.buildCount++;

      const buildWalkTarget = Wayfinder.getDestinationFromPath( [...this.buildPath(), "N"] );
      if( ew.is( buildWalkTarget, "EMPTY" ) ) {
        if( ew.move( buildWalkTarget ) ) {
          this.state.location = buildWalkTarget;
        }
      }
    }

    if( this.state.buildCount > 5 ) {
      this.setRole('WALKER');
      this.state.buildCount = 0;
    }

    return built;
  }

  buildPath() {
    const h = this.state.heading;
    return [ h, h, h];
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

