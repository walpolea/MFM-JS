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
    this.state.maxHops = 5;
    this.state.hops = this.state.hops ?? 0;
    this.state.color = HardCell3.COLORS[this.state.hops]
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    //initial Make
    if( this.state.age === 1 && this.state.hops < this.state.maxHops ) {

      const empties = ew.filter( HardCell3.CELL_SITES, "EMPTY" );
      ew.mutateMany( empties, HardCell3.CREATOR( this.TYPE, { hops: this.state.hops+1 }));
    }

    //check if need to grow
    else if( this.state.hops < this.state.maxHops ) {
      const downstreams = this.downstreams(ew);
      // const hopsLeft = this.state.maxHops - this.state.hops;

      if( downstreams.length < HardCell3.CELL_SITES.length ) {
        const empties = HardCell3.CELL_SITES.filter( i => !downstreams.includes(i) );
        ew.mutateMany( empties, HardCell3.CREATOR( this.TYPE, { hops: this.state.hops+1 }));
      }

    }

    if( this.isRoot() ) {


    } else {


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
