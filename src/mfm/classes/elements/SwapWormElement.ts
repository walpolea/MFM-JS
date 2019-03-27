import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { Atom } from "../Atom";

export class SwapWormElement extends Elem {
  
    pCHANCESWAPPER:number = 100;
    WORMSIZE:number;
    birthCount:number;
    segmentType:string;
    next:string;
    prev:string;
    lastDirection:string;

  constructor( size:number = 4, segType:string = "HEAD", prev:string = undefined, next:string = undefined ) {
    super(ElementTypes.SWAPWORM.name, ElementTypes.SWAPWORM.type);

    this.birthCount = this.WORMSIZE = size;
    this.segmentType = segType;
    this.prev = prev;
    this.next = next;
    
  }

  getSiteDirection(ew:EventWindow, dir:String):Site {
    switch(dir) {
      case "N":
        return ew.getNorth();
      break;
      case "S":
        return ew.getSouth();
      break;
      case "E":
        return ew.getEast();
      break;
      case "W":
      default:
        return ew.getWest();
      break;
      case "NE":
        return ew.getNorthEast();
      break;
      case "SE":
        return ew.getSouthEast();
      break;
      case "NW":
        return ew.getNorthWest();
      break;
      case "SW":
        return ew.getSouthWest();
      break;
    }
  }

  oppositeDirection( dir:String ):string {
    switch(dir) {
      case "N":
        return "S";
      break;
      case "S":
        return "N";
      break;
      case "E":
        return "W";
      break;
      case "W":
      default:
        return "E";
      break;
      case "NE":
        return "SW";
      break;
      case "SE":
        return "NW";
      break;
      case "NW":
        return "SE";
      break;
      case "SW":
        return "NE";
      break;
    }
  }

  toSwapWorm( el:Elem ):SwapWormElement {
    return el as SwapWormElement;
  }

  atomIsType(atom:Atom, type:string ):boolean {

    if( atom.type !== ElementTypes.SWAPWORM ) {
      return false;
    }

    if( this.toSwapWorm(atom.elem).segmentType === type ) {
      return true;
    }

    return false;

  }

  exec(ew: EventWindow) {

    if( this.segmentType === "HEAD" ) {

      //choose a direction to go in
      const choices: string[] = ["E", "N", "S", "W", "NW", "SW", "NE", "SE"];
      const dir:string = choices[Math.random() * choices.length >> 0];
      const goSite:Site = this.getSiteDirection(ew, dir);

      //if the site chosen exists and is empty...
      if( goSite && goSite.atom.type === ElementTypes.EMPTY ) {

        let leavingType:string;

        if( this.birthCount > 0 ) { //grow the worm - be born

          if( this.birthCount === this.WORMSIZE ) {
            leavingType = "END"
          } else {
            leavingType = "MIDDLE";
          }

          this.birthCount--;

        } else {
          leavingType = "SWAPPER";
        }

        const leavingAtom:Atom = new Atom(ElementTypes.SWAPWORM, [0, leavingType, dir, this.next]);
        //move to empty site and leave either a middle (if being born) or swapper (if already born)
        ew.origin.moveAtom( goSite, leavingAtom);
        this.next = this.oppositeDirection(dir);


        //check if we're stuck and maybe do some magic
        const availableEmpty = ew.getAdjacent4Way(ElementTypes.EMPTY);
        if( !availableEmpty ) {
          
        }
        
      }
    }

    if( this.segmentType === "MIDDLE" || this.segmentType === "END" ) {

      const prevSite:Site = this.getSiteDirection(ew, this.prev);

      if( this.atomIsType(prevSite.atom, "SWAPPER") ) {
        const swapper = this.toSwapWorm(prevSite.atom.elem);
        //swap links
        [this.next, swapper.next, this.prev, swapper.prev] = [swapper.next, this.next, swapper.prev, this.prev];
        ew.origin.swapAtoms( prevSite );

        if( this.segmentType === "END" ) {
          ew.origin.killSelf();
        }

      }
      

    }
    

    // //get a random NESW site
    // const availableSite: Site = ew.getAdjacent4Way(ElementTypes.EMPTY);

    // if( this.segmentType === "SWAPPER" ) {


    // }

    // //Be born!
    // if( !this.born && this.segmentType !== "SWAPPER") {

    //   if( this.WORMSIZE > 0 ) {

    //     console.log(`${this.WORMSIZE} is born`)
    //     availableSite.mutateSite( availableSite, new Atom( ElementTypes.SWAPWORM, [this.WORMSIZE-1, "MIDDLE", ew.origin] ) );
    //     this.next = availableSite;
        
    //   } else {

    //     console.log( "END IS BORN" )
    //     this.segmentType = "END";
    //     this.next = undefined;

    //   }

    //   this.born = true;

    // } else {

    //   //of we're the head, we can move as long as there isn't already a swapper
    //   if( this.segmentType === "HEAD" && this.next && (this.next.atom.elem as SwapWormElement).segmentType !== "SWAPPER" ) {
        
    //     const availableEmptySite: Site = ew.getAdjacent4Way(ElementTypes.EMPTY);

    //     if( availableEmptySite /* && (Math.random() * this.pCHANCESWAPPER < 1)*/ ) {
    //       //move and create a swapper behind me
    //       console.log("making swapper");
    //       ew.origin.moveAtom( availableEmptySite, new Atom( ElementTypes.SWAPWORM, [0, "SWAPPER", ew.origin]))
    //       const swapper = (ew.origin.atom.elem as SwapWormElement);
    //       //swap nexts, head doesnt have prev, but set it on the swapper when it was created
    //       [swapper.next, this.next] = [this.next, swapper.next];

    //     }
      
    //   }

    //   //if the prev (towards the head) is a swapper, let's swap
    //   if( this.prev && this.prev.atom && (this.prev.atom.elem as SwapWormElement).segmentType === "SWAPPER" ) {

    //     const swapper = (this.prev.atom.elem as SwapWormElement);

    //     if( this.segmentType === "END" ) {

    //       console.log("END IS EATING SWAPPER");
    //       this.prev = swapper.prev;
    //       ew.origin.swapAtoms(this.prev);
    //       this.prev.killSelf();

    //     } else {

    //       console.log("Middle is swapping")
    //       ew.origin.swapAtoms( this.prev );
          
    //       //switch nexts and prevs;
    //       [swapper.next, this.next] = [this.next, swapper.next];
    //       [swapper.prev, this.prev] = [this.prev, swapper.prev];

    //       console.log( "SWAPPER PREV", swapper.prev);
    //       console.log( "SWAPPER NEXT", swapper.next);
    //       console.log( "MIDDLE PREV", swapper.prev);
    //       console.log( "MIDDLE NEXT", swapper.next);

    //     }
      
    //   }
    // }

    super.exec(ew);
  }
}
