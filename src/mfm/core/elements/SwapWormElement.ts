import { EventWindow, EWIndex } from "../EventWindow";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { Atom } from "../Atom";
import { LinkedList } from "./LinkedListElement";
import { StuckMembrane } from "./StuckMembraneElement";
import { Res } from "./ResElement";
import { Wall } from "./WallElement";
import { Data } from "./DataElement";
import { StickyMembrane } from "./StickyMembraneElement";
import { Direction, Wayfinder } from "../../utils/MFMWayfinder";
import { Utils } from "../../utils/MFMUtils";
import { SwapLine } from "./SwapLineElement";

export class SwapWorm extends LinkedList {
  static TYPE_DEF: IElementType = { name: "SWAPWORM", type: "Sw", class: SwapWorm, color: 0xcc0066 };
  static CREATE = SwapWorm.CREATOR();

  WORMSIZE: number;
  birthCount: number;
  idleCount: number = 0;
  dazedCount: number = 0;
  growData: number;
  useDirectionality: boolean = true;
  direction: Direction = "W";

  constructor(size: number = 7, prev?: number, next?: number) {
    super(SwapWorm.TYPE_DEF, prev, next);
    this.birthCount = this.WORMSIZE = size;
  }

  birth(ew: EventWindow): boolean {
    //BE BORN
    const choices: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF);
    const relativeSiteToGoTo: number = Math.min(...choices); //choices[Math.random() * choices.length >> 0];
    const leavingAtom: Atom = new Atom(SwapWorm.TYPE_DEF, [0, relativeSiteToGoTo, this.next]);

    const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

    if (moved) {
      this.birthCount--;
    }

    return moved;
  }

  tailGrow(ew: EventWindow, moveChoices?: number[]) {
    const choices: number[] = ew.getIndexes(moveChoices || EventWindow.ADJACENT4WAY, Empty.TYPE_DEF);
    const relativeSiteToGoTo: number = choices[(Math.random() * choices.length) >> 0];

    if (relativeSiteToGoTo) {
      console.log("grow tail", relativeSiteToGoTo, this.prev);
      const leavingAtom: Atom = new Atom(SwapWorm.TYPE_DEF, [0, this.prev, relativeSiteToGoTo]);
      leavingAtom.data = { value: this.growData };
      const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

      return moved;
    }

    return false;
  }

  slightLeft() {
    this.direction = Wayfinder.slightLeft(this.direction);
  }
  veerLeft() {
    this.direction = Wayfinder.veerLeft(this.direction);
  }
  turnLeft() {
    this.direction = Wayfinder.turnLeft(this.direction);
  }

  slightRight() {
    this.direction = Wayfinder.slightRight(this.direction);
  }
  veerRight() {
    this.direction = Wayfinder.veerRight(this.direction);
  }
  turnRight() {
    this.direction = Wayfinder.turnRight(this.direction);
  }

  swapMove(ew: EventWindow, moveChoices?: number[]) {
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);
    let moved: boolean = false;

    if (ew.is(travelTo, Empty.TYPE_DEF)) {
      const leavingAtom: Atom = new Atom(SwapWorm.TYPE_DEF, [0, travelTo, this.next]);
      (leavingAtom.elem as LinkedList).isSwapping = true;

      moved = this.moveTo(ew, travelTo, leavingAtom);
    } else {
      const leftSite = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
      const rightSite = Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.direction), true);

      if (ew.is(rightSite, Empty.TYPE_DEF)) {
        this.slightRight();
      } else if (ew.is(leftSite, Empty.TYPE_DEF)) {
        this.slightLeft();
      } else {
        const randChange: Function = [this.slightLeft, this.slightRight, this.veerLeft, this.veerRight, this.turnLeft, this.turnRight][
          (Math.random() * 6) >> 0
        ];
        randChange.bind(this)();
      }
    }

    // const leftSlightSite = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
    // const rightSlightSite = Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.direction), true);
    // const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
    // const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);

    // const choices: number[] = ew.getIndexes(moveChoices || [travelTo, leftSlightSite, rightSlightSite, leftSite, rightSite], Empty.TYPE_DEF);
    // // const choices: number[] = ew.getIndexes(moveChoices || EventWindow.ADJACENT4WAY, Empty.TYPE_DEF);
    // const relativeSiteToGoTo: number = choices[(Math.random() * choices.length) >> 0];
    // const leavingAtom: Atom = new Atom(SwapWorm.TYPE_DEF, [0, relativeSiteToGoTo, this.next]);
    // (leavingAtom.elem as LinkedList).isSwapping = true;
    // if (relativeSiteToGoTo) {
    //   moved = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);
    //   this.direction = Wayfinder.indexToDirection(relativeSiteToGoTo as EWIndex, true);
    // }

    return moved;
  }

  //Eat res, and grow big and strong
  eat(ew: EventWindow) {
    //Eat Data
    let possibleData = ew.getAdjacent4Way(Data.TYPE_DEF);

    if (possibleData?.atom?.data?.value !== undefined) {
      this.dazedCount = 50;
      this.growData = possibleData.atom.data.value;
      possibleData.die();
    }
  }

  //check if the worm is stuck in itself
  isStuck(ew: EventWindow): boolean {
    const empties = ew.getIndexes(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF);
    const worms = ew.getIndexes(EventWindow.ADJACENT4WAY, SwapWorm.TYPE_DEF);

    if (empties.length > 0) {
      return false;
    }

    //worms should only be stuck by themselves... let walls and such trap them
    if (worms.length >= 2) {
      return true;
    }

    return false;
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

  //Eat up the Stuck Membrane protecting the worm in order to improve chances of getting unstuck
  lowerDefenses(ew: EventWindow) {
    ew.getAll(StickyMembrane.TYPE_DEF).forEach((membraneSite) => {
      membraneSite.die();
    });

    // ew.getAll(StuckMembrane.TYPE_DEF).forEach(membraneSite => {
    //   membraneSite.killSelf();
    // })
  }

  shouldExcreteMembrane(ew: EventWindow) {
    return !ew.getAdjacent4Way(StickyMembrane.TYPE_DEF) && ew.getAdjacent8Way(Empty.TYPE_DEF);
    //return !ew.getAdjacent4Way(StuckMembrane.TYPE_DEF) && ew.getAdjacent8Way(Empty.TYPE_DEF);
  }

  //excrete membrane when no membrane around (4-way) and empty available (8-way)
  excreteMembrane(ew: EventWindow) {
    if (this.shouldExcreteMembrane(ew)) {
      ew.origin.mutateSite(ew.getAdjacent8Way(Empty.TYPE_DEF), new Atom(StickyMembrane.TYPE_DEF, [SwapWorm.TYPE_DEF, 0.75, 1]));
      //ew.origin.mutateSite(ew.getAdjacent8Way(Empty.TYPE_DEF), new Atom(StuckMembrane.TYPE_DEF, [SwapWorm.TYPE_DEF]));
    }
  }

  handleIdle(ew: EventWindow) {
    if (this.idleCount > 20) {
      this.lowerDefenses(ew);
    }
  }

  exec(ew: EventWindow) {
    if (ew.any(EventWindow.ADJACENT8WAY, SwapLine.TYPE_DEF)) {
      return;
    }

    if (this.dazedCount > 0) {
      this.dazedCount--;
      return;
    } else {
      this.dazedCount = 0;
    }

    let moved: boolean = false;

    //Need to be born?
    if (this.birthCount > 0) {
      moved = this.birth(ew);

      if (!moved) {
        this.idleCount++;

        if (this.isStuck(ew) && this.unStick(ew)) {
          this.idleCount = 0;
        }

        this.handleIdle(ew);
      }
    }
    //If this is a head
    else if (this.isAtHead()) {
      //and no growData and next is not a swapper, we can move...
      if (!this.growData && this.getNextElement(ew) && !this.getNextElement(ew).isSwapping) {
        moved = this.swapMove(ew);

        //hungry for data?
        this.eat(ew);

        if (!moved) {
          this.idleCount++;

          if (this.isStuck(ew) && this.unStick(ew)) {
            this.idleCount = 0;
          }

          this.handleIdle(ew);
        }
      }
    }
    //Not a head
    else {
      //updateIdleCount down the worm
      if (this.getPrevElement(ew)) {
        const prevEl: SwapWorm = this.getPrevElement(ew) as SwapWorm;

        if (prevEl.growData && !this.isSwapping) {
          this.growData = prevEl.growData;
          prevEl.growData = undefined;
          //[this.growData, prevEl.growData] = [prevEl.growData, undefined];
        }

        this.idleCount = prevEl.idleCount;
      }
      this.handleIdle(ew);

      if (!this.isSwapping && this.isAtTail() && this.growData) {
        this.lowerDefenses(ew);
        if (this.tailGrow(ew)) {
          this.growData = undefined;
        }
      }

      this.excreteMembrane(ew);
    }

    super.exec(ew);

    if (this.growData) {
      this.color = 0x22aa44;
    } else {
      this.reflectOnType();
    }
  }
}

//Initialize Splat Map maps the # to to the self type
SwapWorm.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(SwapWorm.TYPE_DEF);
