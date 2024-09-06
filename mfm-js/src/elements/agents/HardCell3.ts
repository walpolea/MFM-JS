import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow, EWIndex } from "../../mfm/EventWindow";
import { Direction } from "../../mfm/Wayfinder";

export class HardCell3 extends Element {
  static CREATE = HardCell3.CREATOR({ name: "HARDCELL3x16", symbol: "HC3", class: HardCell3, color: 0xbe146f, classifications: ["HARDCELL3"], groups: ["MFM"] });
  static HC3x8 = HardCell3.CREATOR({ name: "HARDCELL3x8", symbol: "HC3", class: HardCell3, color: 0xbe146f, classifications: ["HARDCELL3"], groups: ["MFM"] }, { maxHops: 8});
  static HC3x4 = HardCell3.CREATOR({ name: "HARDCELL3x4", symbol: "HC3", class: HardCell3, color: 0xbe146f, classifications: ["HARDCELL3"], groups: ["MFM"] }, { maxHops: 4});

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

  static COLORS = [ 0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x940d3 ];

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.maxHops = this.state.maxHops ?? 16;
    this.state.stasus = false;

    if( !this.state.localId ) {
      this.state.localId = (~~(Math.random()*255)).toString(16);
    }

    this.classifyAs( `HC3-${this.state.localId}` );
  }

  behave(ew: EventWindow) {
    super.behave(ew);


    this.state.stasus = this.hasStasis(ew);

    //figure out hopCount
    if( this.state.hops === undefined || this.hasBadStructure(ew) ) {
      this.figureHops(ew);

      return;
    }

    //check for movement
    if( !this.isRoot() ) {

      const dir = this.shouldMove(ew);
      if( dir ) {
        const moved = Wayfinding.MOVE_IN_DIRECTION( ew, this, dir );
        return;
      }
    }

    //grow if empties
    //would like this to happen more than once (for regrowth)
    // if( !this.isEnd() && !this.shouldMove(ew) && !this.state.stasus ) {
    if( this.shouldRegrow(ew) ) {
      const empties = ew.filter( HardCell3.CELL_SITES, "EMPTY" );
      if( empties.length ) {
        ew.mutateMany( empties, HardCell3.CREATOR( this.TYPE, { maxHops: this.state.maxHops,  localId: this.state.localId } ));
      }
    }

    if( this.isRoot() && this.state.stasus ) {

      if( EventWindow.oneIn(4) && this.canMove(ew) ) {
        ew.swap( EventWindow.RANDOM( HardCell3.CELL_WANDER_MAP.get(0) ), 0 );

        //experimental move root within grid
        // const neighbors = this.neighbors(ew);
        // const up = ew.getSite( EventWindow.RANDOM( neighbors ) );
        // neighbors.forEach( n => ew.getSite(n).atom.state.hops = undefined );
        // [this.state.hops, up.atom.state.hops] = [undefined, 0];
        
      }

    }

    if( this.isEnd() ) {
      this.classifyAs( `HC3-END` );
    }

  }

  //stasus means you have all 4 HardCell3's surrounding you if you're not the end
  //AND all upstream HardCell3's are also in stasus
  hasStasis( ew:EventWindow ):Boolean {

    if( this.isEnd() ) {
      return true;
    }

    const neighbors = this.neighbors(ew);
    
    if( neighbors.length !== ew.getSites(HardCell3.CELL_SITES).filter(s => s).length) {
      return false;
    }
    
    const neighborStasus = this.upstreams(ew).map( n => ew.getSite(n).atom.state.stasus ?? false ).some( v => !v );
    return !neighborStasus;

  }

  //bad structure is if the neighbors have too high or low or no hop count
  hasBadStructure( ew :EventWindow ):Boolean {
    const neighborHops = this.neighbors(ew).map( n => ew.getSite(n).atom.state.hops );
    const badStructure = neighborHops.some( h => h === undefined ) || neighborHops.some( h => h > this.state.hops+1 ) || neighborHops.some( h => h < this.state.hops-1 ) || neighborHops.some( h => h === undefined );

    return badStructure;
  }


  figureHops(ew:EventWindow) {

    const neighbors = this.neighbors(ew);
    
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
    return this.neighbors(ew).length === HardCell3.CELL_SITES.length;
  }

  shouldRegrow(ew:EventWindow):Boolean {

    if( this.isEnd() ) {
      return false;
    }

    const allHC3 = ew.filter( EventWindow.ALLADJACENT, this.localType() );

    if( allHC3.length === 4 ) {
      return false;
    }

    return true;
  }


  shouldMove( ew:EventWindow ):Direction | false {

    // const downstreams = this.downstreams(ew);

    // if( this.state.hops < this.state.maxHops && downstreams.length < HardCell3.CELL_SITES.length ) {
    //   // const wandered = ew.filter( HardCell3.CELL_SITES, 
    // }

    const empties = ew.filter( HardCell3.CELL_SITES, "EMPTY" );

    if( empties.length ) {

      const e = EventWindow.RANDOM(empties);
      const lookArounds = HardCell3.CELL_WANDER_MAP.get(e);

      const hc3s = ew.filter( lookArounds, this.localType() ).filter( h => ew.getSite(h).atom.state.hops < this.state.hops );

      if( hc3s.length ) {
        const hc3 = EventWindow.RANDOM(hc3s);
        return HardCell3.CELL_DIRECTION_MAP.get( hc3 );
      }
    }

    return false;
  }

  localType():string {
    return `HC3-${this.state.localId}`;
  }

  isRoot():Boolean {
    return this.state.hops === 0;
  }

  isEnd():Boolean {
    return this.state.hops === this.state.maxHops;
  }

  upstreams(ew:EventWindow):EWIndex[] {
    const neighbors = ew.filter( HardCell3.CELL_SITES, this.localType() );
    const cellSites = neighbors.filter( n => ew.getSite(n)?.atom.state?.hops > this.state.hops );

    return cellSites;
  }

  downstreams(ew:EventWindow):EWIndex[] {
    const neighbors = ew.filter( HardCell3.CELL_SITES, this.localType() );
    const cellSites = neighbors.filter( n => ew.getSite(n)?.atom.state?.hops < this.state.hops );

    return cellSites;
  }

  //returns actual HardCell3's at CELL_SITES
  neighbors(ew:EventWindow):EWIndex[] {
    return ew.filter( HardCell3.CELL_SITES, this.localType() );
  }

  getDirectionFromWanderMap( ew:EventWindow, site:EWIndex ) {
    const sites:EWIndex[] = HardCell3.CELL_WANDER_MAP.get(site);

    if( !sites ) {
      return;
    }

    const wentSite:EWIndex = ew.filter( sites, this.localType(), true)?.[0];

    if( wentSite ) {
      return HardCell3.CELL_DIRECTION_MAP.get(wentSite);
    }
  }
}
