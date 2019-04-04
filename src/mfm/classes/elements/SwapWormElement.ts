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

  constructor(size: number, prev?: number, next?: number) {
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

  swapMove(ew: EventWindow, moveChoices?: number[]) {

    //MAKE SWAPPER
    const choices: number[] = moveChoices ? moveChoices : EventWindow.ADJACENT8WAY;
    const relativeSiteToGoTo: number = choices[Math.random() * choices.length >> 0];
    const leavingAtom: Atom = new Atom(ElementTypes.SWAPWORM, [0, relativeSiteToGoTo, this.next]);
    (leavingAtom.elem as LinkedListElement).isSwapping = true;

    const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

  }

  eat(ew: EventWindow) {

    //Eat Res
    let possibleRes = ew.getAdjacent4Way(ElementTypes.RES);

    if (possibleRes) {
      possibleRes.killSelf();
      this.birthCount = 1;
    }

  }

  isStuck(ew: EventWindow): boolean {

    const compareMap = new Map<number, IElementType>();

    EventWindow.ADJACENT8WAY.forEach(index => {
      compareMap.set(index, ElementTypes.EMPTY);
    })

    return ew.windowNotCompare(compareMap);

  }

  exec(ew: EventWindow) {




    if (this.birthCount > 0) {

      this.birth(ew);

    } else if (this.isAtHead() && this.getNextElement(ew) && !this.getNextElement(ew).isSwapping) {

      this.swapMove(ew);
      this.eat(ew);

      if (this.isStuck(ew)) {
        this.idleCount++;
      } else {
        this.idleCount = 0;
      }

      if (this.idleCount > 5) {
        this.swapMove(ew, EventWindow.ALLADJACENT);
      }

      if (this.idleCount > 100) {
        this.shouldDie = true;
      }
    }

    super.exec(ew);
  }
}
