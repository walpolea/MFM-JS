import { Element, IElementType } from "../../mfm/Element";
import { EventWindow, EWIndex } from "../../mfm/EventWindow";
import { Direction } from "../../mfm/Wayfinder";

export class HardCell3 extends Element {
  static CREATE = HardCell3.CREATOR({ name: "HARDCELL3", symbol: "HC3", class: HardCell3, color: 0xbe146f, classifications: ["HARDCELL3"], groups: ["MFM"] });

  // static CELL_SITES:EWIndex[] = [37, 38, 39, 40]; //HardCell4
  static CELL_SITES:EWIndex[] = [21,22,23,24];
  // static CELL_SITES:EWIndex[] = [9,10,11,12]; //HardCell2
  // static CELL_SITES:EWIndex[] = [1,2,3,4]; //HardCell1
  static CELL_WANDER_MAP = new Map<EWIndex, EWIndex[]>([
    [  0, [1, 2, 3, 4] ],
    [ 21, [9,29,30,37] ],
    [ 22, [10,31,33,38] ],
    [ 23, [11,32,34,39] ],
    [ 24, [12,35,36,40] ],
  ]);

  static CELL_DIRECTION_MAP = new Map<EWIndex, Direction>([
    [  2, "N" ],
    [ 11, "N" ],
    [ 29, "N" ],
    [ 35, "N" ],
    [ 38, "N" ],
    [  4, "E" ],
    [  9, "E" ],
    [ 33, "E" ],
    [ 34, "E" ],
    [ 40, "E" ],
    [  1, "W" ],
    [ 12, "W" ],
    [ 31, "W" ],
    [ 32, "W" ],
    [ 37, "W" ],
    [  3, "S" ],
    [ 10, "S" ],
    [ 30, "S" ],
    [ 36, "S" ],
    [ 39, "S" ],
  ]);

  static COLORS = [ 0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x940d3 ]

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.maxHops = this.state.maxHops ?? 8;
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    //figure out hopCount
    if( this.state.hops === undefined || EventWindow.oneIn(2)) {
      this.figureHops(ew);
      return;
    }

    //grow if empties (this will change when we need to account for movement)
    if( !this.isEnd() ) {
      const empties = ew.filter( HardCell3.CELL_SITES, "EMPTY" );
      if( empties.length ) {
        ew.mutateMany( empties, HardCell3.CREATOR( this.TYPE, { maxHops: this.state.maxHops } ));
      }
    }

    if( this.isRoot() ) {

      // EventWindow.oneIn(100) {
      //   ew.swap( EventWindow.RANDOM( HardCell3.CELL_WANDER_MAP.get(0) ), 0 );
      // }

    }

  }

  figureHops(ew:EventWindow) {

    const neighbors = ew.filter( HardCell3.CELL_SITES, "HARDCELL3" );
    
    if(neighbors.length === 0 || this.state.hops === 0 ) {
      this.state.hops = 0;
      this.setColor();
      return;

    } else {
      
      const neighborHops:EWIndex[] = neighbors.map( n => ew.getSite(n)?.atom.state.hops ).filter( h => !isNaN(h) && h !== undefined );

      if( neighborHops.length ) {
        this.state.hops = Math.min(...neighborHops) + 1;
      } else {
        return;
      }

    }

    this.setColor();

    if( isNaN(this.state.hops) ) {
      ew.destroy();
    }

  }

  setColor() {
    this.state.color = HardCell3.COLORS[this.state.hops % HardCell3.COLORS.length]
  }

  canMove( ew:EventWindow ):Boolean {

    return false;
  }


  wantsToMove( ew:EventWindow ):Boolean {

    const downstreams = this.downstreams(ew);

    if( this.state.hops < this.state.maxHops && downstreams.length < HardCell3.CELL_SITES.length ) {
      // const wandered = ew.filter( HardCell3.CELL_SITES, 
    }

    return false;
  }

  isRoot():Boolean {
    return this.state.hops === 0;
  }

  isEnd():Boolean {
    return this.state.hops === this.state.maxHops;
  }

  upstreams(ew:EventWindow):EWIndex[] {
    const neighbors = ew.filter( HardCell3.CELL_SITES, "HARDCELL3" );
    const cellSites = neighbors.filter( n => ew.getSite(n)?.atom.state?.hops > this.state.hops );

    return cellSites;
  }

  downstreams(ew:EventWindow):EWIndex[] {
    const neighbors = ew.filter( HardCell3.CELL_SITES, "HARDCELL3" );
    const cellSites = neighbors.filter( n => ew.getSite(n)?.atom.state?.hops < this.state.hops );

    return cellSites;
  }

  getDirectionFromWanderMap( ew:EventWindow, site:EWIndex ) {
    const sites:EWIndex[] = HardCell3.CELL_WANDER_MAP.get(site);

    if( !sites ) {
      return;
    }

    const wentSite:EWIndex = ew.filter( sites, "HARDCELL3", true)?.[0];

    if( wentSite ) {
      return HardCell3.CELL_DIRECTION_MAP.get(wentSite);
    }
  }
}
