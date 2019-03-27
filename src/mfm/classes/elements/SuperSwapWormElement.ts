import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { Atom } from "../Atom";

export class SuperSwapWormElement extends Elem {
  
    pCHANCESWAPPER:number = 100;
    WORMSIZE:number;
    birthCount:number;
    segmentType:string;
    next:number;
    prev:number;
    lastDirection:string;

  constructor( size:number = 4, segType:string = "HEAD", prev:number = undefined, next:number = undefined ) {
    super(ElementTypes.SWAPWORM.name, ElementTypes.SWAPWORM.type);

    this.birthCount = this.WORMSIZE = size;
    this.segmentType = segType;
    this.prev = prev;
    this.next = next;

    
  }
  getSiteDirection(ew:EventWindow, dir:number):Site {
    return ew.getSiteByIndex(dir);
  }

  toSwapWorm( el:Elem ):SuperSwapWormElement {
    return el as SuperSwapWormElement;
  }

  atomIsType(atom:Atom, type:string ):boolean {

    if( atom.type !== ElementTypes.SUPERSWAPWORM ) {
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

  reverseLinks(elem:SuperSwapWormElement) {
    [elem.prev, elem.next] = [elem.next, elem.prev];
  }


  oppositeDirection(dir:number):number {
    const index:number = EventWindow.ALL.indexOf(dir);
    return EventWindow.OPPOSITES[index];
  }


  exec(ew: EventWindow) {

    
      if( this.segmentType === "HEAD" ) {

        
        const choices: number[] = EventWindow.ALL;
        const dir:number = choices[Math.random() * choices.length >> 0];
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
            console.log("leaving swapper");
            leavingType = "SWAPPER";
          }

          const leavingAtom:Atom = new Atom(ElementTypes.SUPERSWAPWORM, [0, leavingType, dir, this.next]);
          //move to empty site and leave either a middle (if being born) or swapper (if already born)
          ew.origin.moveAtom( goSite, leavingAtom);
          this.next = this.oppositeDirection(dir);
          
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

    super.exec(ew);
  }
}
