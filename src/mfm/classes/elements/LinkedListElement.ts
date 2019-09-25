import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class LinkedListElement extends Elem {

  next: number;
  prev: number;
  isSwapping: boolean;
  swapDirection: number; //0 = toward head (prev), 1 = toward tail (next)
  linkType: string;
  shouldDie: boolean = false;

  constructor(elementType: IElementType, prev?: number, next?: number) {
    super(elementType.name, elementType.type);

    this.prev = prev;
    this.next = next;
    this.isSwapping = false;
    this.swapDirection = 1;

    this.reflectOnType();

  }

  reflectOnType() {

    if (this.isAtHead()) {
      this.color = 0xccffff;
      this.linkType = "HEAD";
    } else if (this.isAtTail()) {
      this.color = 0xff33ff;
      this.linkType = "TAIL";
    } else if (this.isInMiddle()) {
      this.linkType = "MIDDLE";
    }

    if (this.isSwapping) {
      this.color = 0xfe7f9c;
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
      //ew.swap(this.next);
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

  die(ew: EventWindow) {

    const nextEl: LinkedListElement = this.getNextElement(ew);

    if (nextEl) {
      nextEl.shouldDie = true;
    }

    this.next = undefined;
    this.prev = undefined;
  }

  //get the opposite direction of any index
  oppositeDirection(dir: number): number {
    const index: number = EventWindow.ALL.indexOf(dir);
    return EventWindow.OPPOSITES[index];
  }

  moveTo(ew: EventWindow, relativeIndexToGoTo: number, leavingAtom?: Atom, maxIndex?: number): boolean {

    if (!maxIndex) {
      maxIndex = 8;
    }

    let goSite: Site = this.getSiteDirection(ew, relativeIndexToGoTo);
    let earShotIndexToNext: number;
    let earShotIndexToPrev: number;

    //if it's an empty site
    if (goSite && goSite.atom.type === ElementTypes.EMPTY) {

      //if we're adding a link
      if (leavingAtom) {

        //if this has a prev, it needs to stay within bounds
        if (this.prev) {
          earShotIndexToPrev = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.prev);
          if (!earShotIndexToPrev || earShotIndexToPrev > maxIndex) return false; //no go
          this.prev = earShotIndexToPrev;
        }

        ew.origin.moveAtom(goSite, leavingAtom);
        this.next = this.oppositeDirection(relativeIndexToGoTo);

        return true;

      } else {

        //if  moving there allows our links to stay in within ear-shot in event window (don't pull apart and lose each other)
        if (this.next) {
          earShotIndexToNext = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.next);
          if (!earShotIndexToNext || earShotIndexToNext > maxIndex) return false; //no go
        }
        if (this.prev) {
          earShotIndexToPrev = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.prev);
          if (!earShotIndexToPrev || earShotIndexToPrev > maxIndex) return false; //no go
        }

        if (this.getNextElement(ew)) {

          //found that sometimes we want to link up with empty, oops!
          if (!(this.getNextElement(ew) instanceof LinkedListElement)) return false;

          this.getNextElement(ew).prev = ew.getRelativeIndexFromSiteToSite(this.next, relativeIndexToGoTo);

        }

        if (this.getPrevElement(ew)) {

          if (!(this.getPrevElement(ew) instanceof LinkedListElement)) return false;

          this.getPrevElement(ew).next = ew.getRelativeIndexFromSiteToSite(this.prev, relativeIndexToGoTo);
        }

        ew.origin.moveAtom(goSite);

        if (earShotIndexToNext) {
          this.next = earShotIndexToNext;
        }

        if (earShotIndexToPrev) {
          this.prev = earShotIndexToPrev;
        }

        return true;

      }

    }

    return false;

  }

  exec(ew: EventWindow) {

    this.reflectOnType();

    if (this.shouldDie) {
      this.die(ew);
    }

    //if swapper gets to end, unlink
    if (this.isSwapping && this.isAtTail()) {
      this.unlink(ew);
    }

    //unlinked nodes should die
    if (!this.next && !this.prev) {
      ew.origin.killSelf();
    }

    //swapper, keep swapping
    if (this.isSwapping) {
      this.swapDirection === 1 ? this.swapNext(ew) : this.swapPrev(ew);
    }

    this.reflectOnType();

    super.exec(ew);
  }
}

