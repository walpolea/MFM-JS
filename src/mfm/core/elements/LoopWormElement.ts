import { EventWindow } from "../EventWindow";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Empty } from "./EmptyElement";
import { Atom } from "../Atom";
import { LinkedList } from "./LinkedListElement";
import { Utils } from "../../utils/MFMUtils";
import { StickyMembrane } from "./StickyMembraneElement";
import { Res } from "./ResElement";
import { StuckMembrane } from "./StuckMembraneElement";
import { SPLAT } from "../../utils/SPLAT";

export class LoopWorm extends LinkedList {
  static TYPE_DEF: IElementType = { name: "LOOP WORM", type: "Tw", class: LoopWorm, color: 0xcc00cc };
  static CREATE = LoopWorm.CREATOR();

  pCHANCE_TO_EAT: number = 1000;
  WORMSIZE: number;
  birthCount: number;
  isConnected: boolean = false;
  idleCount: number = 0;

  expandCount: number = 0;
  maxEats: number = 2;
  eatCount: number = 0;

  mateCheck: Map<number, string>;

  constructor(size: number = 4, prev: number = undefined, next: number = undefined) {
    super(LoopWorm.TYPE_DEF, prev, next);
    LoopWorm.INITIALIZE_SPLAT_MAP()();

    this.birthCount = this.WORMSIZE = size;

    this.mateCheck = SPLAT.splatToMap(`
          ~~##~
          ~#@~~
          ##~~~
      `);
  }

  isStuck(ew: EventWindow): boolean {
    const compareMap = new Map<number, IElementType>();
    compareMap.set(1, Empty.TYPE_DEF);
    compareMap.set(2, Empty.TYPE_DEF);
    compareMap.set(3, Empty.TYPE_DEF);
    compareMap.set(4, Empty.TYPE_DEF);

    return ew.windowNotCompare(compareMap);
  }

  connectToTail(ew: EventWindow) {
    let choices: number[] = EventWindow.ADJACENT4WAY;
    let relativeSiteToGo: number = choices[(Math.random() * choices.length) >> 0];
    let possibleTail: Site = this.getSiteDirection(ew, relativeSiteToGo);

    if (possibleTail && possibleTail.atom.type === LoopWorm.TYPE_DEF) {
      const pt: LinkedList = possibleTail.atom.elem as LinkedList;

      if (pt && pt.isAtTail()) {
        console.log("CONNECTED TAIL!!");
        this.prev = relativeSiteToGo;
        pt.next = this.oppositeDirection(relativeSiteToGo);
        this.isConnected = true;
      }
    }
  }

  eat(ew: EventWindow) {
    if (Utils.oneIn(this.pCHANCE_TO_EAT)) {
      let possibleRes = ew.getAdjacent4Way(Res.TYPE_DEF);

      if (possibleRes) {
        possibleRes.killSelf();
        this.expandCount++;
        this.eatCount++;
      }

      //console.log("ate a res");
    }
  }

  hardenMembrane(ew: EventWindow) {
    let possibleRes = ew.getIndexes(EventWindow.ADJACENT4WAY, Res.TYPE_DEF, true)[0];
    if (possibleRes) {
      ew.mutate(possibleRes, new Atom(StuckMembrane.TYPE_DEF, [LoopWorm.TYPE_DEF]));
    }
  }

  exec(ew: EventWindow) {
    let choices: number[];
    let leavingAtom: Atom;
    let relativeSiteToGoTo: number;

    if (this.birthCount > 0) {
      //BE BORN
      choices = EventWindow.ADJACENT4WAY;
      relativeSiteToGoTo = choices[(Math.random() * choices.length) >> 0];
      leavingAtom = new Atom(LoopWorm.TYPE_DEF, [0, relativeSiteToGoTo, this.next]);

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
      //mating
      // if (Utils.oneIn(10)) {
      //   const results = ew.query(this.mateCheck, 0, LoopWorm.SPLAT_MAP);
      //   //console.log("mating", LoopSeed.SPLAT_MAP, this.mateCheck, results);
      //   if (results) {
      //     ew.mutate(0, LoopSeed.CREATE());
      //   }
      // }

      if (Utils.oneIn(10)) this.excreteMembrane(ew);

      //check that our next and prev are actually loopworms, otherwise, we diconnected somewhere!
      if (!(this.getPrevElement(ew) instanceof LinkedList) && !(this.getNextElement(ew) instanceof LinkedList) && !this.hasMoved(ew)) {
        console.log("disconnected");
        ew.origin.killSelf();
        return;
      }

      const nextEl: LoopWorm = this.getNextElement(ew) as LoopWorm;
      if (nextEl) {
        nextEl.isConnected = true;
      }

      if (this.isSwapping) {
        this.isSwapping = false;
      } else {
        if (this.eatCount < this.maxEats) {
          this.eat(ew);
        } else {
          // this.hardenMembrane(ew);
        }

        let choices: number[] = ew.getIndexes(EventWindow.ADJACENT8WAY, Empty.TYPE_DEF);
        let relativeSiteToGo: number = choices[(Math.random() * choices.length) >> 0];

        if (this.expandCount > 0 && ew.getSites(EventWindow.ADJACENT8WAY, LoopWorm.TYPE_DEF, false).filter((site) => site).length < 3) {
          const leavingAtom: Atom = new Atom(LoopWorm.TYPE_DEF, [0, relativeSiteToGo, this.next]);
          (leavingAtom.elem as LoopWorm).isConnected = true;
          const moved = this.moveTo(ew, relativeSiteToGo, leavingAtom);

          if (moved) {
            this.expandCount--;
          }
        } else {
          this.moveTo(ew, relativeSiteToGo, undefined);
        }
      }
    } else if (this.isAtHead() && this.getNextElement(ew) && !this.getNextElement(ew).isSwapping) {
      //MAKE SWAPPER
      choices = EventWindow.ADJACENT4WAY;
      relativeSiteToGoTo = choices[(Math.random() * choices.length) >> 0];
      leavingAtom = new Atom(LoopWorm.TYPE_DEF, [0, relativeSiteToGoTo, this.next]);
      (leavingAtom.elem as LinkedList).isSwapping = true;

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

  shouldExcreteMembrane(ew: EventWindow) {
    return !ew.getAdjacent4Way(StickyMembrane.TYPE_DEF) && ew.getSites(EventWindow.LAYER2, Empty.TYPE_DEF, true)[0];
  }

  //excrete membrane when no membrane around (4-way) and empty available (8-way)
  excreteMembrane(ew: EventWindow) {
    if (this.shouldExcreteMembrane(ew)) {
      //ew.origin.mutateSite(ew.getAdjacent8Way(Empty.TYPE_DEF), new Atom(StickyMembrane.TYPE_DEF, [LoopWorm.TYPE_DEF, 0.5, 1]));
      ew.origin.mutateSite(ew.getSites(EventWindow.LAYER2, Empty.TYPE_DEF, true)[0], StickyMembrane.CREATE([LoopWorm.TYPE_DEF, 0.1, 1]));
    }
  }
}

//Initialize Splat Map maps the # to to the self type
LoopWorm.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(LoopWorm.TYPE_DEF);
