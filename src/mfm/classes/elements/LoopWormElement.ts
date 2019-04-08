import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { Atom } from "../Atom";
import { LinkedListElement } from "./LinkedListElement";
import { MFMUtils } from "../../utils/utils";

export class LoopWormElement extends LinkedListElement {

  pCHANCE_TO_EAT: number = 1250;
  WORMSIZE: number;
  birthCount: number;
  isConnected: boolean = false;
  idleCount: number = 0;

  expandCount: number = 0;
  maxEats: number = 2;
  eatCount: number = 0;

  constructor(size: number = 4, prev: number = undefined, next: number = undefined) {

    super(ElementTypes.LOOPWORM, prev, next);
    this.birthCount = this.WORMSIZE = size;

  }

  isStuck(ew: EventWindow): boolean {

    const compareMap = new Map<number, IElementType>();
    compareMap.set(1, ElementTypes.EMPTY);
    compareMap.set(2, ElementTypes.EMPTY);
    compareMap.set(3, ElementTypes.EMPTY);
    compareMap.set(4, ElementTypes.EMPTY);

    return ew.windowNotCompare(compareMap);

  }

  connectToTail(ew: EventWindow) {

    let choices: number[] = EventWindow.ADJACENT4WAY;
    let relativeSiteToGo: number = choices[Math.random() * choices.length >> 0];
    let possibleTail: Site = this.getSiteDirection(ew, relativeSiteToGo);

    if (possibleTail && possibleTail.atom.type === ElementTypes.LOOPWORM) {
      const pt: LinkedListElement = (possibleTail.atom.elem as LinkedListElement);

      if (pt && pt.isAtTail()) {
        console.log("CONNECTED TAIL!!");
        this.prev = relativeSiteToGo;
        pt.next = this.oppositeDirection(relativeSiteToGo);
        this.isConnected = true;
      }
    }

  }

  eat(ew: EventWindow) {

    if (MFMUtils.oneIn(this.pCHANCE_TO_EAT)) {
      let possibleRes = ew.getAdjacent4Way(ElementTypes.RES);

      if (possibleRes) {
        possibleRes.killSelf();
        this.expandCount++;
        this.eatCount++;
        //console.log("ate a res");
      }
    }

  }


  exec(ew: EventWindow) {

    let choices: number[];
    let leavingAtom: Atom;
    let relativeSiteToGoTo: number;


    if (this.birthCount > 0) {

      //BE BORN
      choices = EventWindow.ADJACENT4WAY;
      relativeSiteToGoTo = choices[Math.random() * choices.length >> 0];
      leavingAtom = new Atom(ElementTypes.LOOPWORM, [0, relativeSiteToGoTo, this.next]);

      const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

      if (moved) {
        this.birthCount--;
      }

      if (this.isStuck(ew)) {
        this.idleCount++;
      } else {
        this.idleCount = 0;
      }

      if (this.idleCount > 100) {
        this.shouldDie = true;
      }



    } else if (this.isConnected) {

      //check that our next and prev are actually loopworms, otherwise, we diconnected somewhere!
      if (!(this.getPrevElement(ew) instanceof LinkedListElement) && !(this.getNextElement(ew) instanceof LinkedListElement)) {
        console.log("disconnected");
        ew.origin.killSelf();
        return;
      }

      //console.log("is connected");
      const nextEl: LoopWormElement = (this.getNextElement(ew) as LoopWormElement);
      if (nextEl) {
        nextEl.isConnected = true;
      }

      if (this.isSwapping) {
        this.isSwapping = false;
      } else {


        if (this.eatCount < this.maxEats) {
          this.eat(ew);
        }

        let choices: number[] = EventWindow.ADJACENT4WAY;
        let relativeSiteToGo: number = choices[Math.random() * choices.length >> 0];

        if (this.expandCount > 0
          && ew.getSites(EventWindow.ADJACENT8WAY, ElementTypes.LOOPWORM, false).filter(site => site).length < 3) {

          //console.log("time to grow")
          const leavingAtom: Atom = new Atom(ElementTypes.LOOPWORM, [0, relativeSiteToGo, this.next]);
          (leavingAtom.elem as LoopWormElement).isConnected = true;
          const moved = this.moveTo(ew, relativeSiteToGo, leavingAtom, 8);

          if (moved) {
            this.expandCount--;
          }

        }
        this.moveTo(ew, relativeSiteToGo, undefined, 8);

      }


    } else if (this.isAtHead() && this.getNextElement(ew) && !this.getNextElement(ew).isSwapping) {

      //MAKE SWAPPER
      choices = EventWindow.ADJACENT4WAY;
      relativeSiteToGoTo = choices[Math.random() * choices.length >> 0];
      leavingAtom = new Atom(ElementTypes.LOOPWORM, [0, relativeSiteToGoTo, this.next]);
      (leavingAtom.elem as LinkedListElement).isSwapping = true;

      const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

      this.connectToTail(ew);

      if (this.isStuck(ew)) {
        this.idleCount++;
      } else {
        this.idleCount = 0;
      }

      if (this.idleCount > 100) {
        this.shouldDie = true;
      }

    }

    super.exec(ew);
  }
}
