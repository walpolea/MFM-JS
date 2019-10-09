import { EventWindow } from "../EventWindow";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { Atom } from "../Atom";
import { LinkedList } from "./LinkedListElement";
import { StuckMembrane } from "./StuckMembraneElement";
import { Res } from "./ResElement";

export class SwapWorm extends LinkedList {

  static TYPE_DEF: IElementType = { name: "SWAP WORM", type: "Sw", class: SwapWorm, color: 0xcc0066 };
  static CREATE = SwapWorm.CREATOR();

  WORMSIZE: number;
  birthCount: number;
  idleCount: number = 0;

  constructor(size: number = 7, prev?: number, next?: number) {
    super(SwapWorm.TYPE_DEF, prev, next);
    this.birthCount = this.WORMSIZE = size;
  }

  birth(ew: EventWindow): boolean {
    //BE BORN
    const choices: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF);
    const relativeSiteToGoTo: number = Math.min(...choices);//choices[Math.random() * choices.length >> 0];
    const leavingAtom: Atom = new Atom(SwapWorm.TYPE_DEF, [0, relativeSiteToGoTo, this.next]);

    const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

    if (moved) {
      this.birthCount--;
    }

    return moved;
  }

  //Eat up the Sticky Membrane protecting the worm in order to improve chances of getting unstuck
  lowerDefenses(ew: EventWindow) {
    // ew.getAll(StickyMembrane.TYPE_DEF).forEach(membraneSite => {
    //   membraneSite.killSelf();
    // });

    ew.getAll(StuckMembrane.TYPE_DEF).forEach(membraneSite => {
      membraneSite.killSelf();
    })
  }

  swapMove(ew: EventWindow, moveChoices?: number[]) {

    //MAKE SWAPPER
    const choices: number[] = ew.getIndexes(moveChoices || EventWindow.ADJACENT4WAY, Empty.TYPE_DEF);
    const relativeSiteToGoTo: number = choices[Math.random() * choices.length >> 0];
    if (relativeSiteToGoTo) {
      const leavingAtom: Atom = new Atom(SwapWorm.TYPE_DEF, [0, relativeSiteToGoTo, this.next]);
      (leavingAtom.elem as LinkedList).isSwapping = true;

      const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

      return moved;
    }

    return false;
  }

  //Eat res, and grow big and strong
  eat(ew: EventWindow) {

    //Eat Res
    let possibleRes = ew.getAdjacent4Way(Res.TYPE_DEF);

    if (possibleRes) {
      possibleRes.killSelf();
      this.birthCount = 1;
    }

  }

  //check if the worm is stuck in itself
  isStuck(ew: EventWindow): boolean {

    const empties = ew.getIndexes(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF);

    if (empties.length) {
      return false;
    }

    return true;

  }

  unStick(ew: EventWindow): boolean {

    const choices: number[] = ew.getIndexes(EventWindow.ALLADJACENT, Empty.TYPE_DEF);
    const relativeSiteToGoTo: number = Math.min(...choices);
    if (relativeSiteToGoTo || relativeSiteToGoTo !== Infinity) {
      const leavingAtom: Atom = new Atom(SwapWorm.TYPE_DEF, [0, relativeSiteToGoTo, this.next]);
      (leavingAtom.elem as LinkedList).isSwapping = true;

      const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

      return moved;
    }

    return false;
  }


  shouldExcreteMembrane(ew: EventWindow) {
    //return !ew.getAdjacent4Way(StickyMembrane.TYPE_DEF) && ew.getAdjacent8Way(Empty.TYPE_DEF);
    return !ew.getAdjacent4Way(StuckMembrane.TYPE_DEF) && ew.getAdjacent8Way(Empty.TYPE_DEF);
  }

  //excrete membrane when no membrane around (4-way) and empty available (8-way)
  excreteMembrane(ew: EventWindow) {
    if (this.shouldExcreteMembrane(ew)) {
      //ew.origin.mutateSite(ew.getAdjacent8Way(Empty.TYPE_DEF), new Atom(StickyMembrane.TYPE_DEF, [SwapWorm.TYPE_DEF, 0.5, 1]));
      ew.origin.mutateSite(ew.getAdjacent8Way(Empty.TYPE_DEF), new Atom(StuckMembrane.TYPE_DEF, [SwapWorm.TYPE_DEF]));
    }
  }

  handleIdle(ew: EventWindow) {
    if (this.idleCount > 2) {
      console.log("lower defenses");
      this.lowerDefenses(ew);
    }

    if (this.idleCount > 50) {
      console.log("unsticking");
      if (this.unStick(ew)) {
        this.idleCount = 0;
      }

    }

    if (this.idleCount > 100) {
      console.log("die");
      this.shouldDie = true;
    }
  }

  exec(ew: EventWindow) {

    let moved: boolean = false;


    //Need to be born?
    if (this.birthCount > 0) {

      moved = this.birth(ew);

      if (!moved) {

        console.log("stuck");

        if (this.isStuck(ew)) {
          this.idleCount++;
        } else {
          this.idleCount = 0;
        }

        this.handleIdle(ew);
      }

    }
    //If this is a head, and next is not a swapper, we can move...
    else if (this.isAtHead() && this.getNextElement(ew) && !this.getNextElement(ew).isSwapping) {

      moved = this.swapMove(ew);

      //hungry for res?
      //this.eat(ew);

      if (!moved) {

        console.log("stuck");

        if (this.isStuck(ew)) {
          this.idleCount++;
        } else {
          this.idleCount = 0;
        }

        this.handleIdle(ew);
      }


    } else {
      this.excreteMembrane(ew);
    }



    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
SwapWorm.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(SwapWorm.TYPE_DEF);