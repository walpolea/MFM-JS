import { Element, IElementType } from "../../mfm/Element";
import { EventWindow, EWIndex } from "../../mfm/EventWindow";

export class HardCell3 extends Element {
  static CREATE = HardCell3.CREATOR({ name: "HARDCELL3", symbol: "HC3", class: HardCell3, color: 0xbe146f, classifications: ["HARDCELL3"], groups: ["MFM"] });

  static CELL_SITES:EWIndex[] = [21,22,23,24];
  static CELL_WANDER_MAP = new Map<EWIndex, EWIndex[]>([
    [ 21, [9,29,30,37] ],
    [ 22, [10,31,33,38] ],
    [ 23, [11,32,34,39] ],
    [ 24, [12,35,36,40] ],
  ]);

  static COLORS = [ 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff]

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.maxHops = this.state.maxHops ?? 16;
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    //intiial figure out hopCount
    if( this.state.hops === undefined ) {
      this.figureHops(ew);
      return;
    }

    this.figureHops(ew);

    //grow if empties (this will change when we need to account for movement)
    const empties = ew.filter( HardCell3.CELL_SITES, "EMPTY" );
    if( empties.length && this.state.hops < this.state.maxHops ) {
      ew.mutateMany( empties, HardCell3.CREATOR( this.TYPE, { maxHops: this.state.maxHops } ));
    }

    if( this.isRoot() ) {


    } else {


    }

  }

  figureHops(ew:EventWindow) {

    const neighbors = ew.filter( HardCell3.CELL_SITES, "HARDCELL3" );

    if(neighbors.length === 0 || this.state.hops === 0) {
      this.state.hops = 0;
    } else {

      const neighborHops:EWIndex[] = neighbors.map( n => ew.getSite(n)?.atom.state.hops).filter( v => !isNaN(v) && v !== undefined );

      if( neighborHops.length ) {
        this.state.hops = Math.min(...neighborHops) + 1;
      } else {
        return;
      }

    }

    this.state.color = HardCell3.COLORS[this.state.hops % HardCell3.COLORS.length]

    console.log( this.state.hops );

    if( isNaN(this.state.hops) ) {
      ew.destroy();
    }

  }

  canMove( ew:EventWindow ):Boolean {

    return false;
  }


  wantsToMove( ew:EventWindow ):Boolean {

    return false;
  }

  isRoot():Boolean {
    return this.state.hops === 0;
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
}
