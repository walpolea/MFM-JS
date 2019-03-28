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
    reversing:boolean;

  constructor( size:number = 4, segType:string = "HEAD", prev:string = undefined, next:string = undefined ) {
    super(ElementTypes.SWAPWORM.name, ElementTypes.SWAPWORM.type);

    this.birthCount = this.WORMSIZE = size;
    this.segmentType = segType;
    this.prev = prev;
    this.next = next;

    this.reversing = false;
    
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

  swapPrev( ew:EventWindow ) {
    const prevSite:Site = this.getSiteDirection(ew, this.prev);
    if( prevSite ) {
      const swapper = this.toSwapWorm(prevSite.atom.elem);
    //swap links
    [this.next, swapper.next, this.prev, swapper.prev] = [swapper.next, this.next, swapper.prev, this.prev];
    ew.origin.swapAtoms( prevSite );
    }
    
  }

  swapNext( ew:EventWindow ) {
    const nextSite:Site = this.getSiteDirection(ew, this.next);
    if( nextSite ) {
      const swapper = this.toSwapWorm(nextSite.atom.elem);
      //swap links
      [this.next, swapper.next, this.prev, swapper.prev] = [swapper.next, this.next, swapper.prev, this.prev];
      ew.origin.swapAtoms( nextSite );
    }
    
  }

  reverseLinks(elem:SwapWormElement) {
    [elem.prev, elem.next] = [elem.next, elem.prev];
  }



  exec(ew: EventWindow) {

    if( this.reversing ) {

      console.log("reversing");

      const nextSite:Site = this.getSiteDirection(ew, this.next);

      let state:string = "REVERSE";

      //found the end, finish reversing
      if( nextSite && this.atomIsType(nextSite.atom, "END") ) {
        state = "END";
        console.log( "found the end");
        console.log( "END", nextSite );
        this.toSwapWorm(nextSite.atom.elem).segmentType = "MIDDLE";

      } else if( nextSite && !this.prev ) { //first reverse needs to get next to "END"
        state = "FIRST";
        this.toSwapWorm(nextSite.atom.elem).segmentType = "END";
      }

      this.swapNext(ew);
      this.reverseLinks( this.toSwapWorm(ew.origin.atom.elem) );

      if( state === "END" ) {
        console.log(this);
        this.reversing = false;
      }

    } else {
    
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
          const availableEmpty = ew.getAdjacent8Way(ElementTypes.EMPTY);
          if( !availableEmpty ) {
            //this.reversing = true;
          }
          
        }

      }

      if( this.segmentType === "MIDDLE" || this.segmentType === "END" ) {

        const prevSite:Site = this.getSiteDirection(ew, this.prev);

        if( this.atomIsType(prevSite.atom, "SWAPPER") ) {
          
          this.swapPrev(ew);

          if( this.segmentType === "END" ) {
            ew.origin.killSelf();
          }

        }
        
      }

  }

    super.exec(ew);
  }
}
