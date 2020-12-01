import { EventWindow, EWIndex } from "../core/EventWindow";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { Atom } from "../core/Atom";
import { LinkedList } from "./LinkedListElement";
import { StuckMembrane } from "./StuckMembraneElement";
import { Res } from "./ResElement";
import { Wall } from "./WallElement";
import { Data } from "./DataElement";
import { StickyMembrane } from "./StickyMembraneElement";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";
import { Utils } from "../utils/MFMUtils";
import { SwapLine } from "./SwapLineElement";
import { QDirectional } from "./quarks/QDirectional";
import { Element } from "../core/Element";

export interface SwapWorm extends QDirectional {}

export class SwapWorm extends LinkedList {
  static BASE_TYPE: IElementType = { name: "SWAPWORM", symbol: "Sw", class: SwapWorm, color: 0xcc0066 };
  static CREATE = SwapWorm.CREATOR();
  static SW_SMALL = SwapWorm.CREATOR({ name: "SWAPWORM_SMALL", params: [2] });
  static SW_LONG = SwapWorm.CREATOR({ name: "SWAPWORM_LONG", params: [24] });
  static SW_SUPER = SwapWorm.CREATOR({ name: "SWAPWORM_SUPER", params: [255] });

  WORMSIZE: number;
  birthCount: number;
  idleCount: number = 0;
  dazedCount: number = 0;
  growData: number;
  useDirectionality: boolean = true;

  constructor(size: number = 7, prev?: number, next?: number) {
    super(SwapWorm.BASE_TYPE, prev, next);
    this.birthCount = this.WORMSIZE = size;
    this.direction = "W";

    this.registerClass(QDirectional);
  }

  birth(ew: EventWindow): boolean {
    //BE BORN
    const choices: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.BASE_TYPE);
    const relativeSiteToGoTo: number = Math.min(...choices); //choices[Math.random() * choices.length >> 0];
    const leavingAtom: Atom = new Atom(SwapWorm.BASE_TYPE, [0, relativeSiteToGoTo, this.next]);

    const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

    if (moved) {
      this.birthCount--;
    }

    return moved;
  }

  tailGrow(ew: EventWindow, moveChoices?: number[]) {
    const choices: number[] = ew.getIndexes(moveChoices || EventWindow.ADJACENT4WAY, Empty.BASE_TYPE);
    const relativeSiteToGoTo: number = choices[(Math.random() * choices.length) >> 0];

    if (relativeSiteToGoTo) {
      console.log("grow tail", relativeSiteToGoTo, this.prev);
      const leavingAtom: Atom = new Atom(SwapWorm.BASE_TYPE, [0, this.prev, relativeSiteToGoTo]);
      leavingAtom.data = { value: this.growData };
      const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

      return moved;
    }

    return false;
  }

  swapMove(ew: EventWindow, moveChoices?: number[]) {
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);
    let moved: boolean = false;

    if (ew.is(travelTo, Empty.BASE_TYPE)) {
      const leavingAtom: Atom = new Atom(SwapWorm.BASE_TYPE, [0, travelTo, this.next]);
      (leavingAtom.elem as LinkedList).isSwapping = true;

      moved = this.moveTo(ew, travelTo, leavingAtom);
    } else {
      const leftSite = Wayfinder.getDirectionalMove(Wayfinder.veerLeft(this.direction), true);
      const rightSite = Wayfinder.getDirectionalMove(Wayfinder.veerRight(this.direction), true);

      if (ew.is(rightSite, Empty.BASE_TYPE)) {
        this.slightRight();
      } else if (ew.is(leftSite, Empty.BASE_TYPE)) {
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

    // const choices: number[] = ew.getIndexes(moveChoices || [travelTo, leftSlightSite, rightSlightSite, leftSite, rightSite], Empty.BASE_TYPE);
    // // const choices: number[] = ew.getIndexes(moveChoices || EventWindow.ADJACENT4WAY, Empty.BASE_TYPE);
    // const relativeSiteToGoTo: number = choices[(Math.random() * choices.length) >> 0];
    // const leavingAtom: Atom = new Atom(SwapWorm.BASE_TYPE, [0, relativeSiteToGoTo, this.next]);
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
    let possibleData = ew.getAdjacent4Way(Data.BASE_TYPE);

    if (possibleData?.atom?.data?.value !== undefined) {
      this.dazedCount = 50;
      this.growData = possibleData.atom.data.value;
      possibleData.die();
    }
  }

  //check if the worm is stuck in itself
  isStuck(ew: EventWindow): boolean {
    const empties = ew.getIndexes(EventWindow.ADJACENT4WAY, Empty.BASE_TYPE);
    const worms = ew.getIndexes(EventWindow.ADJACENT4WAY, SwapWorm.BASE_TYPE);

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
    const choices: number[] = ew.getIndexes(EventWindow.ALLADJACENT, Empty.BASE_TYPE);
    const relativeSiteToGoTo: number = Math.min(...choices);
    if (relativeSiteToGoTo || relativeSiteToGoTo !== Infinity) {
      const leavingAtom: Atom = new Atom(SwapWorm.BASE_TYPE, [0, relativeSiteToGoTo, this.next]);
      (leavingAtom.elem as LinkedList).isSwapping = true;

      const moved: boolean = this.moveTo(ew, relativeSiteToGoTo, leavingAtom);

      return moved;
    }

    return false;
  }

  //Eat up the Stuck Membrane protecting the worm in order to improve chances of getting unstuck
  lowerDefenses(ew: EventWindow) {
    ew.getAll(StickyMembrane.BASE_TYPE).forEach((membraneSite) => {
      membraneSite.die();
    });

    // ew.getAll(StuckMembrane.BASE_TYPE).forEach(membraneSite => {
    //   membraneSite.killSelf();
    // })
  }

  shouldExcreteMembrane(ew: EventWindow) {
    return !ew.getAdjacent4Way(StickyMembrane.BASE_TYPE) && ew.getAdjacent8Way(Empty.BASE_TYPE);
    //return !ew.getAdjacent4Way(StuckMembrane.BASE_TYPE) && ew.getAdjacent8Way(Empty.BASE_TYPE);
  }

  //excrete membrane when no membrane around (4-way) and empty available (8-way)
  excreteMembrane(ew: EventWindow) {
    if (this.shouldExcreteMembrane(ew)) {
      ew.origin.mutateSite(ew.getAdjacent8Way(Empty.BASE_TYPE), new Atom(StickyMembrane.BASE_TYPE, [SwapWorm.BASE_TYPE, 0.75, 1]));
      //ew.origin.mutateSite(ew.getAdjacent8Way(Empty.BASE_TYPE), new Atom(StuckMembrane.BASE_TYPE, [SwapWorm.BASE_TYPE]));
    }
  }

  handleIdle(ew: EventWindow) {
    if (this.idleCount > 20) {
      this.lowerDefenses(ew);
    }
  }

  exec(ew: EventWindow) {
    if (ew.any(EventWindow.ADJACENT8WAY, SwapLine.BASE_TYPE)) {
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

Element.applyMixins(SwapWorm, [QDirectional]);
