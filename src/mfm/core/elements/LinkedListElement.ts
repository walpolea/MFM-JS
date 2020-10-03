import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { Site } from "../Site";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { Data } from "./DataElement";

export class LinkedList extends Elem {
  static TYPE_DEF: IElementType = { name: "LINKED LIST ELEMENT", type: "Ll", class: LinkedList, color: 0xcc0066 };

  next: number;
  prev: number;
  isSwapping: boolean;
  swapDirection: number; //0 = toward head (prev), 1 = toward tail (next)
  linkType: string;
  shouldDie: boolean = false;

  constructor(elementType: IElementType, prev?: number, next?: number) {
    super(LinkedList.TYPE_DEF);

    this.prev = prev;
    this.next = next;
    this.isSwapping = false;
    this.swapDirection = 1;

    if (!prev && !next) {
      this.linkType = "INITIAL";
    } else {
      this.reflectOnType();
    }
  }

  reflectOnType(ew?: EventWindow) {
    if (ew && !this.hasMoved(ew)) {
      if (this.next !== undefined) this.confirmNext(ew);
      if (this.prev !== undefined) this.confirmPrev(ew);
    }

    if (this.isAtHead()) {
      this.color = 0xccffff;
      this.linkType = "HEAD";
    } else if (this.isAtTail()) {
      this.color = 0xff33ff;
      this.linkType = "TAIL";
    } else if (this.isInMiddle()) {
      this.color = 0xcc0066;
      this.linkType = "MIDDLE";
    }

    if (this.isSwapping) {
      this.color = 0xfe7f9c;
      this.linkType = "SWAPPER";
    }
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

  confirmNext(ew: EventWindow): boolean {
    if (!(this.getNextElement(ew) instanceof LinkedList)) {
      console.log("no next");
      this.next = undefined;
      return false;
    }

    return true;
  }

  confirmPrev(ew: EventWindow): boolean {
    if (!(this.getPrevElement(ew) instanceof LinkedList)) {
      this.prev = undefined;
      return false;
    }

    return true;
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

  getPrevElement(ew: EventWindow): LinkedList {
    const ps: Site = this.getPrevSite(ew);
    // console.log(this.prev, ps?.atom?.elem);
    return ps?.atom?.elem instanceof LinkedList ? (ps.atom.elem as LinkedList) : undefined;
  }

  getNextElement(ew: EventWindow): LinkedList {
    const ns: Site = this.getNextSite(ew);
    return ns && ns.atom && ns.atom.elem instanceof LinkedList ? (ns.atom.elem as LinkedList) : undefined;
  }

  //swap this element with it's previous link
  swapPrev(ew: EventWindow) {
    const prevSite: Site = this.getPrevSite(ew);

    if (this.prev) {
      const swapper = prevSite.atom.elem as LinkedList;
      this.swapLinks(swapper);
      ew.origin.swapAtoms(prevSite);
    }
  }

  //swap this element with it's next link
  swapNext(ew: EventWindow) {
    const nextSite: Site = this.getNextSite(ew);

    if (nextSite) {
      const swapper = nextSite.atom.elem as LinkedList;

      this.swapLinks(swapper);
      //ew.swap(this.next);
      ew.origin.swapAtoms(nextSite);
    }
  }

  //swap next/prev links with another LinkedList
  swapLinks(swapper: LinkedList) {
    [this.next, swapper.next, this.prev, swapper.prev] = [swapper.next, this.next, swapper.prev, this.prev];
  }

  //reverse links
  reverseLinks(link: LinkedList) {
    [link.prev, link.next] = [link.next, link.prev];
  }

  //remove self from the linked list, but don't let it fall apart
  unlink(ew: EventWindow) {
    const nextEl: LinkedList = this.getNextElement(ew);
    const prevEl: LinkedList = this.getPrevElement(ew);

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
    const nextEl: LinkedList = this.getNextElement(ew);

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

  //Allow a node to move, but do all the proper checking so that it doesn't pull itself apart
  moveTo(ew: EventWindow, relativeIndexToGoTo: number, leavingAtom?: Atom, maxIndex: number = 8): boolean {
    const iAmHead: boolean = this.isAtHead();
    const iAmTail: boolean = this.isAtTail();
    const iAmMiddle: boolean = this.isInMiddle();

    let goSite: Site = this.getSiteDirection(ew, relativeIndexToGoTo);
    let earShotIndexToNext: number;
    let earShotIndexToPrev: number;

    let nextSet: boolean = false;

    //if goSite is an Empty
    if (goSite && goSite.atom.is(Empty.TYPE_DEF)) {
      //if we're adding a link
      if (leavingAtom) {
        //if tail or middle, it needs to stay within bounds
        if (iAmTail) {
          console.log("I AM TAIL!");

          earShotIndexToPrev = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, 0);

          if (!earShotIndexToPrev || earShotIndexToPrev > maxIndex) {
            return false; //no go
          }

          // this.next = undefined;
          nextSet = true;
          this.prev = earShotIndexToPrev;
        } else if (iAmMiddle) {
          console.log("I AM MIDDLE");

          earShotIndexToPrev = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.prev);

          if (!earShotIndexToPrev || earShotIndexToPrev >= maxIndex) {
            return false; //no go
          }

          this.prev = earShotIndexToPrev;
          console.log("earShotIndexToPrev", this.prev);
        } else {
          console.log("I AM HEAD!");
        }

        if (!nextSet) {
          this.next = this.oppositeDirection(relativeIndexToGoTo);
        }

        ew.move(relativeIndexToGoTo, leavingAtom);

        return true;
      }
      //we're not adding a link, just trying to move
      else {
        //if  moving there allows our links to stay in within ear-shot in event window (don't pull apart and lose each other)
        if (this.next) {
          earShotIndexToNext = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.next);
          if (!earShotIndexToNext || earShotIndexToNext > maxIndex) {
            // console.log("too far");
            return false; //move is too far away, let's make like a tree
          }
        }

        if (this.prev) {
          earShotIndexToPrev = ew.getRelativeIndexFromSiteToSite(relativeIndexToGoTo, this.prev);
          if (!earShotIndexToPrev || earShotIndexToPrev > maxIndex) {
            return false; //move is too far away, and get outta here
          }
        }

        if (!this.getNextElement(ew)) {
          return false;
        } else {
          this.getNextElement(ew).prev = ew.getRelativeIndexFromSiteToSite(this.next, relativeIndexToGoTo);
        }

        if (!this.getPrevElement(ew)) {
          return false;
        } else {
          this.getPrevElement(ew).next = ew.getRelativeIndexFromSiteToSite(this.prev, relativeIndexToGoTo);
        }

        ew.origin.moveAtom(goSite);

        if (earShotIndexToNext) {
          // console.log("next", earShotIndexToNext);
          this.next = earShotIndexToNext;
        }

        if (earShotIndexToPrev) {
          // console.log("prev", earShotIndexToPrev);
          this.prev = earShotIndexToPrev;
        }

        return true;
      }
    }

    return false;
  }

  hasMoved(ew: EventWindow): boolean {
    return !(this === ew.origin.atom.elem);
  }

  exec(ew: EventWindow) {
    this.reflectOnType(ew);

    if (this.shouldDie) {
      this.die(ew);
    }

    //if swapper gets to end, unlink
    if (this.isSwapping && this.isAtTail()) {
      // console.log("unlink swapper");
      this.unlink(ew);
    }

    //unlinked nodes should die
    if (this.linkType !== "INITIAL" && !this.hasMoved(ew) && !this.next && !this.prev) {
      if (ew.origin.atom.data) {
        ew.origin.atom = Data.CREATE([ew.origin.atom.data.value]);
      } else {
        ew.origin.die();
      }
    }

    //swapper, keep swapping
    if (this.isSwapping) {
      this.swapDirection === 1 ? this.swapNext(ew) : this.swapPrev(ew);
    }

    this.reflectOnType(ew);

    super.exec(ew);
  }
}
