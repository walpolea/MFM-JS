import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";

export class SwapLine extends Element {
  static CREATE = SwapLine.CREATOR({ name: "SWAPLINE", symbol: "SWL", class: SwapLine, color: 0x99aa22, groups: ["Swaplines"] });

  static NORTH = SwapLine.CREATOR({ name: "SWAPLINE NORTH", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "N"});
  static SOUTH = SwapLine.CREATOR({ name: "SWAPLINE SOUTH", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "S"});
  static EAST = SwapLine.CREATOR({ name: "SWAPLINE EAST", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "E"});
  static WEST = SwapLine.CREATOR({ name: "SWAPLINE WEST", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "W"});
  static NW = SwapLine.CREATOR({ name: "SWAPLINE NW", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "NW"});
  static NE = SwapLine.CREATOR({ name: "SWAPLINE NE", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "NE"});
  static SW = SwapLine.CREATOR({ name: "SWAPLINE SW", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "SW"});
  static SE = SwapLine.CREATOR({ name: "SWAPLINE SE", symbol: "SWL", class: SwapLine, color: 0x99aa22, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "SE"});


  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {

    if( !this.state.heading ) {
      this.state.heading = "E";
    }
    this.state.phase = "BUILD";

  }

  behave(ew: EventWindow) {
    super.behave(ew);


    const left = Wayfinder.directionToIndex( Wayfinder.turnLeft(this.state.heading) );
    const right = Wayfinder.directionToIndex( Wayfinder.turnRight( this.state.heading) );

    const fronts = Wayfinder.getInFront(this.state.heading);
    if( ew.is( fronts[0], "SWAPLINE") ) {
      ew.destroy();
    }
    

    switch( this.state.phase ) {

      case "BUILD":

        const leftFront = Wayfinder.getInFront( Wayfinder.veerLeft(this.state.heading));
        const rightFront = Wayfinder.getInFront( Wayfinder.veerRight( this.state.heading));

        if( ew.any( [...leftFront, ...rightFront], "SWAPLINE") ) {
          return;
        }

        if( ew.is(left, "EMPTY")) {
          ew.mutate( left, this.TYPE.CREATE );
        } else {
          this.state.color = 0xcccc00;
        }
    
        if( ew.is(right, "EMPTY")) {
          ew.mutate( right, this.TYPE.CREATE );
          this.state.color = 0xffff00;
        }

        if( !ew.any([left, right], "EMPTY") ) {
          this.state.phase = "WAIT_TO_SWAP";
          return;
        }

        ew.destroy();

      break;
      case "WAIT_TO_SWAP":
        this.state.color = 0x666666;
      if( ew.getSite(left)?.atom.state.phase !== "BUILD" && ew.getSite(right)?.atom.state.phase !== "BUILD") {
        this.state.phase = "SWAP";
      }

      break;
      case "SWAP":
        this.state.color = 0xff6600;


        const leftBack = Wayfinder.getInFront( Wayfinder.turnLeft( Wayfinder.veerLeft(this.state.heading) ) ).slice(0,2);
        const rightBack = Wayfinder.getInFront( Wayfinder.turnRight( Wayfinder.veerRight(this.state.heading) ) ).slice(0,2);

        const shouldSwap:Boolean = !ew.any([...fronts, ...leftBack, ...rightBack], "SWAPLINE");


        if( shouldSwap ) {
          const swapped = Wayfinding.SWAP_DIRECTIONALLY(ew, this, "ANY");
        }

        if( !ew.getSite(fronts[0]) ) {
          this.state.phase = "DIE";
        }

      break;
      case "DIE":
        ew.destroy();
    }
  }
}
