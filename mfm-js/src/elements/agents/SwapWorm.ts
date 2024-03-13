import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow, EWIndex } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";

export class SwapWorm extends Element {
  static CREATE = SwapWorm.CREATOR({ name: "SWAPWORM", symbol: "SWP", class: SwapWorm, color: 0xbe146f, classifications:["DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] });


  static SMOLSW = SwapWorm.CREATOR({ name: "SMOLSW", symbol: "SWP", class: SwapWorm, color: 0xbe146f, classifications:["SWAPWORM", "DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }, {growCount: 2});
  static BIGSW = SwapWorm.CREATOR({ name: "BIGSW", symbol: "SWP", class: SwapWorm, color: 0xbe146f, classifications:["SWAPWORM", "DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }, {growCount: 24});

  // static COLORS = [ 0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x940d3 ];

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.growCount = this.state.growCount ?? 8;
    // this.state.color = SwapWorm.COLORS[~~(Math.random()*SwapWorm.COLORS.length)];
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    let type = this.establishType(ew);
    let moved:boolean = false;
    
    if(!type && this.state.age > 1) {
      ew.destroy();
    }

    //GROW
    if( this.state.growCount ) {
      moved = this.grow(ew);
      if( moved ) {
        return;
      }
    }

    switch(type) {


      case "HEAD":
        return this.move(ew);
      break;
      case "MIDDLE":
        if( this.isAheadTemp(ew) ) {
          moved = this.swapSegments(ew, this.state.ahead );
  
          if( moved ) {
            return;
          }
        }
      break;
      case "TAIL":

        if( this.isTemp() ) {
          const ahead = this.getSegment( ew, this.state.ahead );
          if( ahead ) {
            ahead.state.behind = null;
          }
          ew.destroy();
        } else {
          if( this.isAheadTemp(ew) ) {
            moved = this.swapSegments(ew, this.state.ahead );
    
            if( moved ) {
              return;
            }
          }
        }

      break;
    }

  }

  establishType(ew:EventWindow):string {

    this.confirmBehind(ew);
    this.confirmAhead(ew);

    let type = undefined;

    if( this.isHead() ) {
      this.state.color = 0xddeeff;
      type = "HEAD";
    } else if( this.isTail() ) {
      // this.state.color = 0xff33ff;
      type = "TAIL";
    } else if( this.isMiddle() ) {
      // this.state.color = 0xcc0066;
      type = "MIDDLE";
    }

    if( this.isTemp() ) {
      // this.state.color = SwapWorm.COLORS[~~(Math.random()*SwapWorm.COLORS.length)];
    }

    return type;
  }

  isHead():boolean {
    return !!(!this.state.ahead && this.state.behind);
  }

  isTail():boolean {
    return !!( this.state.ahead && !this.state.behind) ;
  }

  isMiddle():boolean {
    return !!( this.state.ahead && this.state.behind );
  }

  isTemp():boolean {
    return this.state.temp;
  }

  confirmBehind(ew:EventWindow):boolean {
    const behind = this.getSegment( ew, this.state.behind );

    if( !behind || (behind && !behind.is('SWAPWORM'))) {
      this.state.behind = null;
      return false;
    }

    return true;
  }

  confirmAhead(ew:EventWindow):boolean {
    const ahead = this.getSegment( ew, this.state.ahead );

    if( !ahead || (ahead && !ahead.is('SWAPWORM'))) {
      this.state.ahead = null;
      return false;
    }

    return true;
  }

  isBehindTemp(ew:EventWindow):boolean {
    if( this.state.behind ) {
      const behind = this.getSegment( ew, this.state.behind );
      if( behind && behind.state.temp ) {
        return true;
      }
    }

    return false;
  }

  isAheadTemp(ew:EventWindow):boolean {
    if( this.state.ahead ) {
      const ahead = this.getSegment( ew, this.state.ahead );
      if( ahead && ahead.state.temp ) {
        return true;
      }
    }

    return false;
  }

  makeGrowSegment( a:EWIndex ):Element {
    return SwapWorm.CREATE(this.TYPE, { growCount: 0, ahead: a, behind: this.state.behind })
  }

  makeGrowTemp( a:EWIndex):Element {
    return SwapWorm.CREATE(this.TYPE, { growCount: 0, ahead: a, behind: this.state.behind, temp: true })
  }

  getSegment( ew:EventWindow, segIndex:EWIndex ):Element {

    if( !segIndex && segIndex !== 0 ) {
      return undefined;
    }

    const seg = ew.getSite(segIndex)?.atom;

    if( !seg || !seg.is("SWAPWORM") ) {
      return undefined;
    }

    return seg;
  }

  swapSegments( ew:EventWindow, segIndex:EWIndex ) {
    const segElement:Element = this.getSegment( ew, segIndex );
    [this.state.ahead, this.state.behind, segElement.state.ahead, segElement.state.behind] = [ segElement.state.ahead, segElement.state.behind, this.state.ahead, this.state.behind ];
    return ew.swap(segIndex);
  }

  grow(ew:EventWindow):boolean {

    const moveSite:EWIndex = Math.min( ...ew.filter( EventWindow.ADJACENT8WAY, "EMPTY") ) as EWIndex;

    if( moveSite && moveSite !== Infinity ) {
     const moved = ew.move( moveSite, this.makeGrowSegment( moveSite ) );

     if( moved ) {
      this.state.growCount--;
      this.state.behind = EventWindow.OPPOSITES[moveSite];
     }

     return moved;
    }

    return false;
  }

  move( ew:EventWindow ):boolean {

    if( this.state?.status === "HELD" ) {
      return false;
    }

    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else if (EventWindow.oneIn(2)) {

      
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.state.heading, true);
      let moved = false;

      if( ew.is(travelTo, "EMPTY") ) {
        moved = ew.move(travelTo, this.makeGrowTemp(travelTo) );
      }

      if( !(this.state?.status === "DIRECTED") ) {
        EventWindow.oneIn(10) && Wayfinding.SLIGHT_RANDOMLY(this);
      }
      
      if( !moved ) {
        Wayfinding.SLIGHT_RANDOMLY(this);
      } else {
        this.state.behind = EventWindow.OPPOSITES[travelTo];
      }

      return moved;
    }

    return false;

  }
}
