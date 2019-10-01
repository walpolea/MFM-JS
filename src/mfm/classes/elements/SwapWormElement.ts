import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { Atom } from "../Atom";
import { LinkedListElement } from "./LinkedListElement";

export class SwapWormElement extends LinkedListElement {

  WORMSIZE: number;
  birthCount: number;
  idleCount: number = 0;

  constructor(size: number = 7, prev?: number, next?: number) {
    super(ElementTypes.SWAPWORM, prev, next);
    this.birthCount = this.WORMSIZE = size;

  }

  birth(ew: EventWindow) {
    //BE BORN
    const choices: number[] = EventWindow.ADJACENT8WAY;
    const relativeSiteToGoTo: number = choices[Math.random() * choices.length >> 0];
    const leavingAtom: Atom = new Atom(ElementTypes.SWAPWORM, [0, relativeSiteToGoTo, this.next]);

    const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

    if (moved) {
      this.birthCount--;
    }
  }

  //Eat up the Sticky Membrane protecting the worm in order to improve chances of getting unstuck
  lowerDefenses(ew: EventWindow) {
    // ew.getAll(ElementTypes.STICKYMEMBRANE).forEach(membraneSite => {
    //   membraneSite.killSelf();
    // });

    ew.getAll(ElementTypes.STUCKMEMBRANE).forEach(membraneSite => {
      membraneSite.killSelf();
    })
  }

  swapMove(ew: EventWindow, moveChoices?: number[]) {

    //MAKE SWAPPER
    const choices: number[] = moveChoices ? moveChoices : EventWindow.ADJACENT8WAY;
    const relativeSiteToGoTo: number = choices[Math.random() * choices.length >> 0];
    const leavingAtom: Atom = new Atom(ElementTypes.SWAPWORM, [0, relativeSiteToGoTo, this.next]);
    (leavingAtom.elem as LinkedListElement).isSwapping = true;

    const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

    return moved;

  }

  //Eat res, and grow big and strong
  eat(ew: EventWindow) {

    //Eat Res
    let possibleRes = ew.getAdjacent4Way(ElementTypes.RES);

    if (possibleRes) {
      possibleRes.killSelf();
      this.birthCount = 1;
    }

  }

  //check if the worm is stuck in itself
  isStuck(ew: EventWindow): boolean {

    const compareMap = new Map<number, IElementType>();

    EventWindow.ADJACENT8WAY.forEach(index => {
      compareMap.set(index, ElementTypes.EMPTY);
    })

    return ew.windowNotCompare(compareMap);

  }


  shouldExcreteMembrane(ew: EventWindow) {
    //return !ew.getAdjacent4Way(ElementTypes.STICKYMEMBRANE) && ew.getAdjacent8Way(ElementTypes.EMPTY);
    return !ew.getAdjacent4Way(ElementTypes.STUCKMEMBRANE) && ew.getAdjacent8Way(ElementTypes.EMPTY);
  }

  //excrete membrane when no membrane around (4-way) and empty available (8-way)
  excreteMembrane(ew: EventWindow) {
    if (this.shouldExcreteMembrane(ew)) {
      //ew.origin.mutateSite(ew.getAdjacent8Way(ElementTypes.EMPTY), new Atom(ElementTypes.STICKYMEMBRANE, [ElementTypes.SWAPWORM, 0.5, 1]));
      ew.origin.mutateSite(ew.getAdjacent8Way(ElementTypes.EMPTY), new Atom(ElementTypes.STUCKMEMBRANE, [ElementTypes.SWAPWORM]));
    }
  }

  exec(ew: EventWindow) {


    this.excreteMembrane(ew);

    //Need to be born?
    if (this.birthCount > 0) {

      this.birth(ew);

    }
    //If this is a head, and next is not a swapper, we can move...
    else if (this.isAtHead() && this.getNextElement(ew) && !this.getNextElement(ew).isSwapping) {

      const moved: boolean = this.swapMove(ew);

      //hungry for res?
      //this.eat(ew);

      if (!moved) {



        if (this.isStuck(ew)) {
          this.idleCount++;
        } else {
          this.idleCount = 0;
        }

        if (this.idleCount > 2) {
          this.lowerDefenses(ew);
        }

        if (this.idleCount > 50) {

          this.swapMove(ew, EventWindow.ALLADJACENT);
        }

        if (this.idleCount > 100) {
          this.shouldDie = true;
        }
      }
    }

    super.exec(ew);
  }
}
