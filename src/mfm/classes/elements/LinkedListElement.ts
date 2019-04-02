import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { Atom } from "../Atom";

export class LinkedListElement extends Elem {

  next: number;
  prev: number;
  isSwapping: boolean;
  swapDirection: number; //0 = toward head (prev), 1 = toward tail (next)
  linkType: string;

  constructor(elementType: IElementType, prev: number = undefined, next: number = undefined) {
    super(elementType.name, elementType.type);

    this.prev = prev;
    this.next = next;
    this.isSwapping = false;
    this.swapDirection = 1;

    this.reflectOnType();

  }

  reflectOnType() {

    if (this.isAtHead()) {
      this.linkType = "HEAD";
    } else if (this.isAtTail()) {
      this.linkType = "TAIL";
    } else if (this.isInMiddle()) {
      this.linkType = "MIDDLE";
    }

    if (this.isSwapping) {
      this.linkType = "SWAPPER";
    }

  }

  //helper that takes in the next/prev EW index (direction) and returns the site
  getSiteDirection(ew: EventWindow, dir: number): Site {
    return ew.getSiteByIndex(dir);
  }

  getPrevSite(ew: EventWindow): Site {
    return this.getSiteDirection(ew, this.prev);
  }

  getNextSite(ew: EventWindow): Site {
    return this.getSiteDirection(ew, this.next);
  }

  getPrevElement(ew: EventWindow): LinkedListElement {
    const ps: Site = this.getPrevSite(ew);
    return (ps && ps.atom) ? ps.atom.elem as LinkedListElement : undefined;
  }

  getNextElement(ew: EventWindow): LinkedListElement {
    const ns: Site = this.getNextSite(ew);
    return (ns && ns.atom) ? ns.atom.elem as LinkedListElement : undefined;
  }

  isAtHead(): boolean {
    return !!(!this.prev && this.next);
  }

  isAtTail(): boolean {
    return !!(this.prev && !this.next);
  }

  isInMiddle(): boolean {
    return !!(this.next && this.prev);
  }

  //swap this element with it's previous link
  swapPrev(ew: EventWindow) {

    const prevSite: Site = this.getPrevSite(ew);

    if (prevSite) {
      const swapper = prevSite.atom.elem as LinkedListElement;
      this.swapLinks(swapper);
      ew.origin.swapAtoms(prevSite);
    }

  }

  //swap this element with it's next link
  swapNext(ew: EventWindow) {

    const nextSite: Site = this.getNextSite(ew);

    if (nextSite) {
      const swapper = nextSite.atom.elem as LinkedListElement;

      this.swapLinks(swapper);
      ew.origin.swapAtoms(nextSite);
    }

  }

  //swap next/prev links with another LinkedListElement
  swapLinks(swapper: LinkedListElement) {
    [this.next, swapper.next, this.prev, swapper.prev] = [swapper.next, this.next, swapper.prev, this.prev];
  }

  //reverse links
  reverseLinks(elem: LinkedListElement) {
    [elem.prev, elem.next] = [elem.next, elem.prev];
  }

  //remove self from the linked list, but don't let it fall apart
  unlink(ew: EventWindow) {

    const nextEl: LinkedListElement = this.getNextElement(ew);
    const prevEl: LinkedListElement = this.getPrevElement(ew);
    if (nextEl && prevEl) {
      //we're unlinking from the middle, close the gap
      nextEl.prev = ew.getRelativeIndexFromSiteToSite(this.next, this.prev); //this.next
      prevEl.next = ew.getRelativeIndexFromSiteToSite(this.prev, this.next); //this.prev
    } else if (prevEl) {
      //if there's a prev but no next, then we're at the tail and the prev needs to clear its next reference.
      prevEl.next = undefined;
    }


    this.next = undefined;
    this.prev = undefined;

  }

  //get the opposite direction of any index
  oppositeDirection(dir: number): number {
    const index: number = EventWindow.ALL.indexOf(dir);
    return EventWindow.OPPOSITES[index];
  }

  moveTo(ew: EventWindow, relativeIndexToGoTo: number) {


    let goSite: Site = this.getSiteDirection(ew, relativeIndexToGoTo);

    //if it's an empty site
    if (goSite && goSite.atom.type === ElementTypes.EMPTY) {

      let earShotIndexToNext: number;
      let earShotIndexToPrev: number;

      //if  moving there allows our links to stay in within ear-shot in event window (don't pull apart and lose each other)
      if (this.next) {
        earShotIndexToNext = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.next);
        if (!earShotIndexToNext || earShotIndexToNext > 8) return; //no go
      }
      if (this.prev) {
        earShotIndexToPrev = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.prev);
        if (!earShotIndexToPrev || earShotIndexToPrev > 8) return; //no go
      }



      if (this.next) {
        this.getNextElement(ew).prev = ew.getRelativeIndexFromSiteToSite(this.next, relativeIndexToGoTo);
      }

      if (this.prev) {
        this.getPrevElement(ew).next = ew.getRelativeIndexFromSiteToSite(this.prev, relativeIndexToGoTo)
      }

      ew.origin.moveAtom(goSite);

      if (earShotIndexToNext) {
        this.next = earShotIndexToNext;
      }

      if (earShotIndexToPrev) {
        this.prev = earShotIndexToPrev;
      }


    }

  }






  exec(ew: EventWindow) {

    //if swapper gets to end, unlink
    if (this.isSwapping && this.isAtTail()) {
      this.unlink(ew);
    }

    //unlinked nodes should die
    if (!this.next && !this.prev) {
      ew.origin.killSelf();
    }




    this.reflectOnType();

    if (this.isSwapping) {
      this.swapDirection === 1 ? this.swapNext(ew) : this.swapPrev(ew);
    }




    super.exec(ew);
  }
}

